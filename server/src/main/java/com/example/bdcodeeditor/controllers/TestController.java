package com.example.bdcodeeditor.controllers;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {

    @GetMapping("/error")
    public String triggerError() {
        throw new RuntimeException("Принудительная ошибка 500");
    }
}