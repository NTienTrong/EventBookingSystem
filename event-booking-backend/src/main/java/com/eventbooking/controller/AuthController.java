package com.eventbooking.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eventbooking.dto.LoginRequest;
import com.eventbooking.entity.User;
import com.eventbooking.security.JwtTokenProvider;
import com.eventbooking.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getUsername(),
                    loginRequest.getPassword()
                )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = tokenProvider.generateToken(authentication);
            
            // Get user data from authentication
            User user = userService.getUserByUsername(loginRequest.getUsername());
            
            // Nếu là CUSTOMER, cập nhật lastLoginAt
            if (user.getRole() == com.eventbooking.entity.UserRole.CUSTOMER) {
                userService.updateLastLoginAt(user.getId(), java.time.LocalDateTime.now());
            }
            
            // Create response with both token and user data
            Map<String, Object> response = new HashMap<>();
            response.put("accessToken", jwt);
            response.put("user", user);
            
            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
            return ResponseEntity.badRequest().body("Invalid username or password");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An error occurred during authentication");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            // Validate required fields
            if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Username is required"));
            }
            if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Email is required"));
            }
            if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Password is required"));
            }
            if (user.getFullName() == null || user.getFullName().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Full name is required"));
            }

            user.setRole(com.eventbooking.entity.UserRole.CUSTOMER);
            User createdUser = userService.createUser(user);
            return ResponseEntity.ok(createdUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // The following endpoints are deprecated and should be removed or refactored if needed
    // @PostMapping("/forgot-password")
    // public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request) {
    //     return ResponseEntity.status(501).body("Not implemented");
    // }

    // @PostMapping("/reset-password")
    // public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
    //     return ResponseEntity.status(501).body("Not implemented");
    // }

    // Temporary endpoint to view user info (including encoded password)
    @GetMapping("/debug/user/{username}")
    public ResponseEntity<?> getUserInfo(@PathVariable String username) {
        try {
            User user = userService.getUserByUsername(username);
            Map<String, Object> response = new HashMap<>();
            response.put("username", user.getUsername());
            response.put("role", user.getRole());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
} 