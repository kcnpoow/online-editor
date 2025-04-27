package com.example.bdcodeeditor.lib;

import java.security.SecureRandom;

public class Utils {

    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final SecureRandom random = new SecureRandom();

    public static String createRandomKey(int length) {
        StringBuilder key = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            key.append(CHARACTERS.charAt(randomIndex));
        }
        return key.toString();
    }

    /**
     * Creates a full HTML document with embedded CSS and JavaScript.
     *
     * @param html The HTML content.
     * @param css  The CSS content.
     * @param js   The JavaScript content.
     * @return The complete HTML document as a string.
     */
    public static String createHtmlWithCssAndJs(String html, String css, String js) {
        return "<!DOCTYPE html>" +
                "<html lang=\"en\">" +
                "<head>" +
                "<meta charset=\"UTF-8\">" +
                "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">" +
                "<style>" + css + "</style>" + // Embedding CSS
                "<title>Generated Page</title>" +
                "</head>" +
                "<body>" +
                html + // Embedding HTML content
                "<script>" + js + "</script>" + // Embedding JS
                "</body>" +
                "</html>";
    }
}
