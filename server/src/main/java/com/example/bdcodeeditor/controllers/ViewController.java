package com.example.bdcodeeditor.controllers;

import com.example.bdcodeeditor.models.Project;
import com.example.bdcodeeditor.models.User;
import com.example.bdcodeeditor.models.View;
import com.example.bdcodeeditor.repositories.ProjectRepository;
import com.example.bdcodeeditor.repositories.UserRepository;
import com.example.bdcodeeditor.repositories.ViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/views")
public class ViewController {

    @Autowired
    private ViewRepository viewRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/{projectId}/add")
    public ResponseEntity<String> addView(
            @PathVariable Long projectId,
            @RequestParam Long userId
    ) {
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<Project> projectOpt = projectRepository.findById(projectId);

        if (userOpt.isEmpty() || projectOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid user or project");
        }

        User user = userOpt.get();
        Project project = projectOpt.get();

        if (!viewRepository.existsByUserAndProject(user, project)) {
            View view = new View();
            view.setUser(user);
            view.setProject(project);
            viewRepository.save(view);
        }

        return ResponseEntity.ok("View registered");
    }

    @GetMapping("/{projectId}/count")
    public ResponseEntity<Long> getViewCount(@PathVariable Long projectId) {
        Optional<Project> projectOpt = projectRepository.findById(projectId);
        if (projectOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        long count = viewRepository.countByProject(projectOpt.get());
        return ResponseEntity.ok(count);
    }
}
