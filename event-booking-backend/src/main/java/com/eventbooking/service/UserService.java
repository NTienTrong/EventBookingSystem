package com.eventbooking.service;

import java.util.List;

import com.eventbooking.dto.UpdateProfileRequest;
import com.eventbooking.entity.User;

// Service Layer Pattern
public interface UserService {
    User createUser(User user);
    User updateUser(Long id, User user);
    User getUserById(Long id);
    List<User> getAllUsers();
    User getUserByUsername(String username);
    User findByEmail(String email);
    User updateProfile(Long id, UpdateProfileRequest request);
    void changePassword(Long id, String currentPassword, String newPassword);
    void deleteUser(Long id);
    void updateLastLoginAt(Long userId, java.time.LocalDateTime lastLoginAt);
} 