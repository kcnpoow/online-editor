package com.example.bdcodeeditor.controllers;

import com.example.bdcodeeditor.lib.JwtCore;
import com.example.bdcodeeditor.models.SignupRequest;
import com.example.bdcodeeditor.models.User;
import com.example.bdcodeeditor.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtCore jwtCore;

    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager, JwtCore jwtCore) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtCore = jwtCore;
    }

    private ResponseEntity<Map<String, String>> errorResponse(String message, HttpStatus status) {
        Map<String, String> response = new HashMap<>();
        response.put("error", message);
        return ResponseEntity.status(status).body(response);
    }

    @DeleteMapping("/delete-account")
    public ResponseEntity<?> deleteAccount(@RequestHeader("Authorization") String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return errorResponse("Invalid token", HttpStatus.UNAUTHORIZED);
        }

        String jwt = token.substring(7);
        String username = jwtCore.getNameFromJwt(jwt);

        if (username == null) {
            return errorResponse("Invalid or expired token", HttpStatus.UNAUTHORIZED);
        }

        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isEmpty()) {
            return errorResponse("User not found", HttpStatus.NOT_FOUND);
        }

        userRepository.delete(userOptional.get());
        return ResponseEntity.ok(Map.of("message", "Account deleted successfully"));
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userRepository.findAll();
        if (users.isEmpty()) {
            return errorResponse("No users found", HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) {
            return errorResponse("User not found", HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(userOptional.get());
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@RequestHeader("Authorization") String token,
            @RequestBody SignupRequest updatedUser) {
        if (token == null || !token.startsWith("Bearer ")) {
            return errorResponse("Invalid token", HttpStatus.UNAUTHORIZED);
        }

        String jwt = token.substring(7);
        String username = jwtCore.getNameFromJwt(jwt);

        if (username == null) {
            return errorResponse("Invalid or expired token", HttpStatus.UNAUTHORIZED);
        }

        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isEmpty()) {
            return errorResponse("User not found", HttpStatus.NOT_FOUND);
        }

        User user = userOptional.get();
        if (updatedUser.getUsername() != null && !updatedUser.getUsername().isEmpty()) {
            user.setUsername(updatedUser.getUsername());
        }
        if (updatedUser.getEmail() != null && !updatedUser.getEmail().isEmpty()) {
            user.setEmail(updatedUser.getEmail());
        }

        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "User updated successfully"));
    }

}
