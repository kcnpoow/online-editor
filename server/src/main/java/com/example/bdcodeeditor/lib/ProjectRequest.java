package com.example.bdcodeeditor.lib;

import lombok.Data;

@Data
public class ProjectRequest {
    private Long userId;
    private String projectName;
    private String js;
    private String css;
    private String html;
}
