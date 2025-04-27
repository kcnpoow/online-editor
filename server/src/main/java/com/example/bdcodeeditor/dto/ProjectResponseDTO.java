package com.example.bdcodeeditor.dto;

import com.example.bdcodeeditor.models.User;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProjectResponseDTO {
    private Long id;
    private String projectName;
    private String screenshotUrl;
    private int commentsCount;
    private int likesCount;
    private int viewsCount;
    private User user;
}
