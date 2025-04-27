package com.example.bdcodeeditor.controllers;

import com.example.bdcodeeditor.dto.ProjectResponseDTO;
import com.example.bdcodeeditor.lib.JwtCore;
import com.example.bdcodeeditor.lib.Utils;
import com.example.bdcodeeditor.models.Project;
import com.example.bdcodeeditor.models.User;
import com.example.bdcodeeditor.repositories.ProjectRepository;
import com.example.bdcodeeditor.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
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
    public ResponseEntity<?> searchProjects(@RequestParam String query,
            @RequestParam(required = false, defaultValue = "date") String sortBy,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Project> results = projectRepository.searchByProjectName(query, pageable);

        List<Project> sortedContent = new ArrayList<>(results.getContent()); // ВАЖНО! создаём копию для сортировки

        sortedContent.sort((p1, p2) -> {
            switch (sortBy) {
                case "commentsCount":
                    return Integer.compare(p2.getComments().size(), p1.getComments().size());
                case "likesCount":
                    return Integer.compare(p2.getLikes().size(), p1.getLikes().size());
                case "viewsCount":
                    return Integer.compare(p2.getViews().size(), p1.getViews().size());
                case "createdDate":
                default:
                    return p2.getCreatedAt().compareTo(p1.getCreatedAt());
            }
        });

        // Теперь мапим в ProjectResponseDTO
        List<ProjectResponseDTO> responseContent = sortedContent.stream()
                .map(project -> new ProjectResponseDTO(
                        project.getId(),
                        project.getProjectName(),
                        project.getScreenshotUrl(),
                        project.getComments().size(),
                        project.getLikes().size(),
                        project.getViews().size(),
                        project.getUser()))
                .toList();

        Map<String, Object> response = Map.of(
                "content", responseContent,
                "page", results.getNumber(),
                "size", results.getSize(),
                "totalElements", results.getTotalElements(),
                "totalPages", results.getTotalPages(),
                "last", results.isLast());

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllProjects(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "1") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Project> projectsPage = projectRepository.findByPrivateFlagFalse(pageable);

        List<ProjectResponseDTO> responseContent = projectsPage.getContent().stream()
                .map(project -> new ProjectResponseDTO(
                        project.getId(),
                        project.getProjectName(),
                        project.getScreenshotUrl(),
                        project.getComments().size(),
                        project.getLikes().size(),
                        project.getViews().size(),
                        project.getUser()))
                .toList();

        Map<String, Object> response = Map.of(
                "content", responseContent,
                "page", projectsPage.getNumber(),
                "size", projectsPage.getSize(),
                "totalElements", projectsPage.getTotalElements(),
                "totalPages", projectsPage.getTotalPages(),
                "last", projectsPage.isLast());

        return ResponseEntity.ok(response);
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

        // Fetch the user from the database
        User user = userRepository.findById(project.getUser().getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        // Set the user in the project
        project.setUser(user);

        // Save the project to the database
        Project savedProject = projectRepository.save(project);

        // Generate the screenshot
        String path;
        try {
            path = generateScreenshot(savedProject);
            savedProject.setScreenshotUrl(path);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to generate screenshot"));
        }

        // Save the project again with the updated screenshot URL
        projectRepository.save(savedProject);

        // Return the saved project as the response
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

        String path = generateScreenshot(project);
        project.setScreenshotUrl(path);

        projectRepository.save(project);

        return ResponseEntity.ok(project);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id) {
        Optional<Project> projectOpt = projectRepository.findById(id);
        if (projectOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Project not found"));
        }

        Project project = projectOpt.get();

        // Delete the screenshot if it exists
        if (project.getScreenshotUrl() != null) {
            try {
                Path screenshotPath = Paths.get("server/src/main/resources/static/screenshots",
                        project.getScreenshotUrl().replace("/screenshots/", ""));
                Files.deleteIfExists(screenshotPath);
                System.out.println("Screenshot deleted: " + screenshotPath);
            } catch (Exception e) {
                System.err.println("Failed to delete screenshot: " + e.getMessage());
            }
        }

        // Delete the project from the database
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

    private String generateScreenshot(Project project) {
        try {
            // 1. Prepare full HTML
            String fullHtml = generateHtmlContent(project.getHtml(), project.getCss(), project.getJs());

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

    private String generateHtmlContent(String html, String css, String js) {
        StringBuilder htmlBuilder = new StringBuilder();

        htmlBuilder.append("<!DOCTYPE html>")
                .append("<html>")
                .append("<head>")
                .append("<meta charset=\"UTF-8\">")
                .append("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">")
                .append("<style>").append(css).append("</style>")
                .append("</head>")
                .append("<body>")
                .append(html)
                .append("<script>").append(js).append("</script>")
                .append("</body>")
                .append("</html>");

        return htmlBuilder.toString();
    }
}
