package com.example.bdcodeeditor.services;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.bdcodeeditor.dto.LanguageResponse;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExternalLanguageService {

    private final RestTemplate restTemplate;

    public ExternalLanguageService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<String> getTopLanguages(int limit) {
        String apiUrl = "https://github-trending-api.de.a9sapp.eu/languages";

        LanguageResponse[] response = restTemplate.getForObject(apiUrl, LanguageResponse[].class);

        if (response == null) {
            throw new RuntimeException("External API is unavailable");
        }

        return Arrays.stream(response)
                .map(LanguageResponse::getName)
                .limit(limit)
                .collect(Collectors.toList());
    }
}

