package com.example.bdcodeeditor.controllers;

import com.example.bdcodeeditor.dto.CommentDTO;
import com.example.bdcodeeditor.models.Comment;
import com.example.bdcodeeditor.models.Project;
import com.example.bdcodeeditor.models.User;
import com.example.bdcodeeditor.repositories.CommentRepository;
import com.example.bdcodeeditor.repositories.ProjectRepository;
import com.example.bdcodeeditor.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentRepository commentRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @PostMapping("/{projectId}/add")
    public ResponseEntity<Comment> addComment(
            @PathVariable Long projectId,
            @RequestParam Long userId,
            @RequestBody CommentDTO commentDTO) {

        Optional<User> userOptional = userRepository.findById(userId);
        Optional<Project> projectOptional = projectRepository.findById(projectId);

        Comment comment = new Comment();
        comment.setUser(userOptional.get());
        comment.setProject(projectOptional.get());
        comment.setContent(commentDTO.getContent());

        commentRepository.save(comment);

        return ResponseEntity.ok(comment);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<List<Comment>> getComments(@PathVariable Long projectId) {
        Optional<Project> projectOpt = projectRepository.findById(projectId);
        if (projectOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<Comment> comments = commentRepository.findByProjectOrderByCreatedAtDesc(projectOpt.get());
        return ResponseEntity.ok(comments);
    }
}
