// src/main/java/com/travelapp/backend/controller/AuthController.java
package com.TourGO.backend.controller;

import com.TourGO.backend.dto.LoginRequest;
import com.TourGO.backend.dto.LoginResponse;
import com.TourGO.backend.model.User;
import com.TourGO.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping(value = "/login", produces = "application/json")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<User> userOptional = userRepository.findByUsername(loginRequest.getUsername());

        // 2. Check if user exists and if the password matches
        if (userOptional.isPresent() &&
                passwordEncoder.matches(loginRequest.getPassword(), userOptional.get().getPassword())) {

            // Passwords match, login is successful
            // For now, we return a simple success message.
            // Later, we will generate and return a JWT token here.
            return ResponseEntity.ok(new LoginResponse("Login successful!"));
        } else {
            // User not found or password incorrect.
            // Return 401 Unauthorized for security reasons (don't reveal which was wrong)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }
}