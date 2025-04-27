package com.example.bdcodeeditor.repositories;

import com.example.bdcodeeditor.models.Project;
import com.example.bdcodeeditor.models.User;
import com.example.bdcodeeditor.models.View;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ViewRepository extends JpaRepository<View, Long> {
    boolean existsByUserAndProject(User user, Project project);

    long countByProject(Project project);
}
