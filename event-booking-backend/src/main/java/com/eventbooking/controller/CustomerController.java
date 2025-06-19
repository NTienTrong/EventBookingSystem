package com.eventbooking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eventbooking.dto.ChangePasswordRequest;
import com.eventbooking.dto.UpdateProfileRequest;
import com.eventbooking.dto.UserDTO;
import com.eventbooking.factory.UserFactory;
import com.eventbooking.service.UserService;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserFactory userFactory;

    @GetMapping("/profile")
    public ResponseEntity<UserDTO> getProfile(Authentication authentication) {
        String username = authentication.getName();
        UserDTO userDTO = userFactory.toDTO(userService.getUserByUsername(username));
        return ResponseEntity.ok(userDTO);
    }

    @PutMapping("/profile")
    public ResponseEntity<UserDTO> updateProfile(
            Authentication authentication,
            @RequestBody UpdateProfileRequest request) {
        String username = authentication.getName();
        UserDTO userDTO = userFactory.toDTO(
            userService.updateProfile(
                userService.getUserByUsername(username).getId(),
                request
            )
        );
        return ResponseEntity.ok(userDTO);
    }

    @PostMapping("/change-password")
    public ResponseEntity<Void> changePassword(
            Authentication authentication,
            @RequestBody ChangePasswordRequest request) {
        String username = authentication.getName();
        userService.changePassword(
            userService.getUserByUsername(username).getId(),
            request.getCurrentPassword(),
            request.getNewPassword()
        );
        return ResponseEntity.ok().build();
    }
} 