package com.example.bdcodeeditor.repositories;

import com.example.bdcodeeditor.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByUserId(Long userId);

    List<Project> findByProjectNameContainingIgnoreCase(String query);

    // @Query("SELECT p FROM Project p WHERE p.privateFlag = false AND " +
    // "(LOWER(p.projectName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
    // "LOWER(p.user.email) LIKE LOWER(CONCAT('%', :query, '%')))")
    // List<Project> searchByProjectNameOrEmail(@Param("query") String query);

    @Query("SELECT p FROM Project p WHERE p.privateFlag = false AND " +
            "LOWER(p.projectName) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Project> searchByProjectName(@Param("query") String query);

    List<Project> findByPrivateFlagFalse();

    List<Project> findByUserIdAndPrivateFlagFalse(Long userId);

}
