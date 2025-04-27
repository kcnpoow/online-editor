package com.example.bdcodeeditor.services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendSimpleEmail(List<String> to, String subject, String text) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, false);
            helper.setTo(to.toArray(new String[0]));
            helper.setSubject(subject);
            helper.setText(text, false);
            mailSender.send(message);
        } catch (MessagingException | MailException e) {
            throw new RuntimeException("Failed to send simple email", e);
        }
    }

    public void sendHtmlEmail(List<String> to, String subject, String htmlBody) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, false);
            helper.setTo(to.toArray(new String[0]));
            helper.setSubject(subject);
            helper.setText(htmlBody, true);
            mailSender.send(message);
        } catch (MessagingException | MailException e) {
            throw new RuntimeException("Failed to send HTML email", e);
        }
    }

    public void sendEmailWithAttachment(List<String> to, String subject, String text, File file) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to.toArray(new String[0]));
            helper.setSubject(subject);
            helper.setText(text, false);

            FileSystemResource fileResource = new FileSystemResource(file);
            helper.addAttachment(file.getName(), fileResource);

            mailSender.send(message);
        } catch (MessagingException | MailException e) {
            throw new RuntimeException("Failed to send email with attachment", e);
        }
    }
}