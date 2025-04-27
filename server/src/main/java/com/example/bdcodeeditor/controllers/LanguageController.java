package com.example.bdcodeeditor.controllers;

import com.example.bdcodeeditor.services.ExternalLanguageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class LanguageController {

    private final ExternalLanguageService externalLanguageService;

    public LanguageController(ExternalLanguageService externalLanguageService) {
        this.externalLanguageService = externalLanguageService;
    }

    @GetMapping("/popular-languages")
    public ResponseEntity<List<String>> getPopularLanguages(
            @RequestParam(defaultValue = "5") int limit) {
        return ResponseEntity.ok(externalLanguageService.getTopLanguages(limit));
    }
}
