package com.example.bdcodeeditor.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class EmailRequest {
    private List<String> to;
    private String subject;
    private String body;

}


