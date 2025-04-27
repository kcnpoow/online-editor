package com.example.bdcodeeditor.controllers;

import com.example.bdcodeeditor.dto.EmailRequest;
import com.example.bdcodeeditor.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/api/email")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send-simple-email")
    public ResponseEntity<?> sendSimpleEmail(@RequestBody EmailRequest request) {
        emailService.sendSimpleEmail(request.getTo(), request.getSubject(), request.getBody());
        return ResponseEntity.ok("Simple email sent");
    }

    @PostMapping("/send-html-email")
    public ResponseEntity<?> sendHtmlEmail(@RequestBody EmailRequest request) {
        emailService.sendHtmlEmail(request.getTo(), request.getSubject(), request.getBody());
        return ResponseEntity.ok("HTML email sent");
    }

    @PostMapping("/send-email-with-attachment")
    public ResponseEntity<?> sendEmailWithAttachment(
            @RequestPart("email") EmailRequest request,
            @RequestPart("file") MultipartFile file) throws IOException {


        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || originalFilename.isBlank()) {
            originalFilename = "default.txt";
        }
        File tempFile = File.createTempFile("attachment-", originalFilename);
        file.transferTo(tempFile);

        emailService.sendEmailWithAttachment(request.getTo(), request.getSubject(), request.getBody(), tempFile);
        return ResponseEntity.ok("Email with attachment sent");
    }
}
