package com.example.bdcodeeditor.controllers;

import com.example.bdcodeeditor.models.Like;
import com.example.bdcodeeditor.models.Project;
import com.example.bdcodeeditor.models.User;
import com.example.bdcodeeditor.repositories.LikeRepository;
import com.example.bdcodeeditor.repositories.ProjectRepository;
import com.example.bdcodeeditor.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/likes")
public class LikeController {

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @PostMapping("/{projectId}/toggle")
    public ResponseEntity<String> toggleLike(
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

        Optional<Like> existingLike = likeRepository.findByUserAndProject(user, project);

        if (existingLike.isPresent()) {
            likeRepository.delete(existingLike.get());
            return ResponseEntity.ok("Лайк удалён");
        } else {
            Like like = new Like();
            like.setUser(user);
            like.setProject(project);
            likeRepository.save(like);
            return ResponseEntity.ok("Лайк поставлен");
        }
    }


    @GetMapping("/{projectId}/count")
    public ResponseEntity<Long> getLikeCount(@PathVariable Long projectId) {
        Optional<Project> projectOpt = projectRepository.findById(projectId);
        if (projectOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        long count = likeRepository.countByProject(projectOpt.get());
        return ResponseEntity.ok(count);
    }
}
