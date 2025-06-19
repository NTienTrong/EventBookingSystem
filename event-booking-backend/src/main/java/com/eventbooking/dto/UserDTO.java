package com.eventbooking.dto;

import com.eventbooking.entity.UserRole;

import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String password;
    private String fullName;
    private String phoneNumber;
    private String address;
    private UserRole role;
    private java.time.LocalDateTime lastLoginAt;
}