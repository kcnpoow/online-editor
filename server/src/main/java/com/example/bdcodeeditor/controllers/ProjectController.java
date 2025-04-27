package com.example.bdcodeeditor.controllers;

import com.example.bdcodeeditor.lib.JwtCore;
import com.example.bdcodeeditor.lib.Utils;
import com.example.bdcodeeditor.models.Project;
import com.example.bdcodeeditor.models.User;
import com.example.bdcodeeditor.repositories.ProjectRepository;
import com.example.bdcodeeditor.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/projects")
public class ProjectController {

    private final ProjectRepository projectRepository;
    private final JwtCore jwtCore;
    private final UserRepository userRepository;

    @Autowired
    public ProjectController(ProjectRepository projectRepository, JwtCore jwtCore, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.jwtCore = jwtCore;
        this.userRepository = userRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProjectById(@PathVariable Long id,
            @RequestParam(required = false) String key,
            HttpServletRequest request) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found"));

        if (project.isPrivateFlag()) {
            String username = extractUsernameFromRequest(request);

            boolean isOwner = username != null && username.equals(project.getUser().getUsername());
            boolean hasValidKey = key != null && key.equals(project.getKey());

            if (!isOwner && !hasValidKey) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("error", "Access denied: invalid key or not owner"));
            }
        }

        return ResponseEntity.ok(project);
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchProjects(@RequestParam String query) {
        List<Project> results = projectRepository.searchByProjectName(query);

        return ResponseEntity.ok(results);
    }

    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        List<Project> projects = projectRepository.findByPrivateFlagFalse();
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getProjectsByUserId(@PathVariable Long userId, HttpServletRequest request) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "User not found"));
        }

        String username = extractUsernameFromRequest(request);
        User user = userOpt.get();

        List<Project> projects = (username != null && username.equals(user.getUsername()))
                ? projectRepository.findByUserId(userId)
                : projectRepository.findByUserIdAndPrivateFlagFalse(userId);

        return ResponseEntity.ok(projects);
    }

    @PostMapping
    public ResponseEntity<?> createProject(@RequestBody Project project) {
        if (project.getJs() == null || project.getCss() == null || project.getHtml() == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "JS, CSS, and HTML fields are required"));
        }

        if (project.getUser() == null || project.getUser().getId() == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "User data is required"));
        }

        User user = userRepository.findById(project.getUser().getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        project.setUser(user);
        Project savedProject = projectRepository.save(project);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedProject);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProject(@PathVariable Long id, @RequestBody Project projectDetails) {
        Optional<Project> projectOpt = projectRepository.findById(id);

        if (projectOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Project not found"));
        }

        Project project = projectOpt.get();

        // String path = generateScreenshot(projectDetails);

        // updateProjectFields(project, projectDetails);
        // Project updatedProject = projectRepository.save(project);

        if (projectDetails.getJs() != null)
            project.setJs(projectDetails.getJs());
        if (projectDetails.getCss() != null)
            project.setCss(projectDetails.getCss());
        if (projectDetails.getHtml() != null)
            project.setHtml(projectDetails.getHtml());
        if (projectDetails.getProjectName() != null)
            project.setProjectName(projectDetails.getProjectName());

        boolean wasPrivate = project.isPrivateFlag();
        project.setPrivateFlag(projectDetails.isPrivateFlag());
        if (projectDetails.isPrivateFlag() && !wasPrivate) {
            project.setKey(Utils.createRandomKey(10));
        } else if (!projectDetails.isPrivateFlag()) {
            project.setKey(null);
        }

        return ResponseEntity.ok(project);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id) {
        if (!projectRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Project not found"));
        }

        projectRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private String extractUsernameFromRequest(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
            return jwtCore.getNameFromJwt(token);
        }
        return null;
    }

    private void updateProjectFields(Project project, Project details) {
        if (details.getJs() != null)
            project.setJs(details.getJs());
        if (details.getCss() != null)
            project.setCss(details.getCss());
        if (details.getHtml() != null)
            project.setHtml(details.getHtml());
        if (details.getProjectName() != null)
            project.setProjectName(details.getProjectName());

        boolean wasPrivate = project.isPrivateFlag();
        project.setPrivateFlag(details.isPrivateFlag());

        if (details.isPrivateFlag() && !wasPrivate) {
            project.setKey(Utils.createRandomKey(10));
        } else if (!details.isPrivateFlag()) {
            project.setKey(null);
        }
    }

    private String generateScreenshot(Project project) {
        try {
            // 1. Prepare full HTML
            String fullHtml = "dfgdfgdfg";

            // 2. Paths inside your Spring Boot project
            Path staticDir = Paths.get("server/src/main/resources/static/screenshots");
            Files.createDirectories(staticDir);

            String screenshotFileName = "screenshot_" + project.getId() + ".png";
            Path screenshotPath = staticDir.resolve(screenshotFileName);

            // Temp HTML file (optional, can be placed in temp folder)
            Path tempHtmlDir = Paths.get("temp");
            Files.createDirectories(tempHtmlDir);

            String htmlFileName = "temp_" + UUID.randomUUID() + ".html";
            Path htmlPath = tempHtmlDir.resolve(htmlFileName);

            // 3. Save HTML content
            Files.writeString(htmlPath, fullHtml);

            // 4. Run Node.js Puppeteer script
            ProcessBuilder pb = new ProcessBuilder(
                    "node", "puppeteer-screenshot/screenshot.js",
                    htmlPath.toAbsolutePath().toString(),
                    screenshotPath.toAbsolutePath().toString());
            pb.redirectErrorStream(true);

            Process process = pb.start();

            int exitCode = process.waitFor();
            if (exitCode != 0) {
                System.err.println("Screenshot generation failed");
            } else {
                System.out.println("Screenshot saved successfully: " + screenshotPath);
            }

            // Optional: delete temp HTML file
            Files.deleteIfExists(htmlPath);

            String path = "/screenshots/" + screenshotFileName;

            return path;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
