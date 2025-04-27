package com.example.bdcodeeditor.repositories;

import com.example.bdcodeeditor.models.Project;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByUserId(Long userId);

    List<Project> findByProjectNameContainingIgnoreCase(String query);

    @Query("SELECT p FROM Project p WHERE p.privateFlag = false AND " +
            "LOWER(p.projectName) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Project> searchByProjectName(@Param("query") String query);

    Page<Project> findByPrivateFlagFalse(Pageable pageable);

    List<Project> findByUserIdAndPrivateFlagFalse(Long userId);

    @Query("SELECT p FROM Project p WHERE LOWER(p.projectName) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<Project> searchByProjectName(@Param("query") String query, Pageable pageable);

}
