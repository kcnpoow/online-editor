package com.example.bdcodeeditor.controllers;

import com.example.bdcodeeditor.lib.JwtCore;
import com.example.bdcodeeditor.models.SigninRequest;
import com.example.bdcodeeditor.models.SignupRequest;
import com.example.bdcodeeditor.models.User;
import com.example.bdcodeeditor.models.UserDetailsImpl;
import com.example.bdcodeeditor.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class SecurityController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtCore jwtCore;

    @Autowired
    public SecurityController(UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtCore jwtCore) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtCore = jwtCore;
    }

    @GetMapping("/auth")
    public ResponseEntity<?> getUserInfo(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token missing or invalid");
        }

        String token = authHeader.substring(7);
        String username = jwtCore.getNameFromJwt(token);

        if (username == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }

        return userRepository.findByUsername(username)
                .map(user -> {
                    user.setPassword(null);
                    return ResponseEntity.ok(user);
                })
                .map(ResponseEntity.class::cast)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "User not found")));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest signupRequest) {
        try {
            if (userRepository.existsByUsername(signupRequest.getUsername())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(Map.of("error", "Username already taken"));
            }

            if (userRepository.existsByEmail(signupRequest.getEmail())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(Map.of("error", "Email already in use"));
            }

            User user = new User();
            user.setUsername(signupRequest.getUsername());
            user.setEmail(signupRequest.getEmail());
            user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));

            userRepository.save(user);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of("message", "User registered successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "An unexpected error occurred during registration"));
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody SigninRequest signinRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(signinRequest.getUsername(), signinRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            Map<String, Object> tokenResponse = jwtCore.generateToken(authentication);

            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

            Map<String, Object> userData = Map.of(
                    "id", userDetails.getId(),
                    "username", userDetails.getUsername(),
                    "email", userDetails.getEmail(),
                    "roles", userDetails.getAuthorities());

            tokenResponse.put("user", userData);

            return ResponseEntity.ok(tokenResponse);

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid username or password"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Invalid request data"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "An unexpected error occurred during authentication"));
        }
    }

}
