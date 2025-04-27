package com.example.bdcodeeditor.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectDTO {

    private Long id;
    private Long userId;
    private String projectName;
    private String js;
    private String css;
    private String html;
    private String key;
    private String screenshotUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean privateFlag;
    private int viewsCount;
    private int commentsCount;
    private int likesCount;
}
