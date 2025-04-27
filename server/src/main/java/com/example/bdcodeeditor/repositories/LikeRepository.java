package com.example.bdcodeeditor.repositories;

import com.example.bdcodeeditor.models.Like;
import com.example.bdcodeeditor.models.Project;
import com.example.bdcodeeditor.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
    boolean existsByUserAndProject(User user, Project project);
    Optional<Like> findByUserAndProject(User user, Project project);
    long countByProject(Project project);
}
