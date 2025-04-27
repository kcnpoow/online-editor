package com.example.bdcodeeditor.repositories;

import com.example.bdcodeeditor.models.Comment;
import com.example.bdcodeeditor.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByProject(Project project);

    List<Comment> findByProjectOrderByCreatedAtDesc(Project project);
}
