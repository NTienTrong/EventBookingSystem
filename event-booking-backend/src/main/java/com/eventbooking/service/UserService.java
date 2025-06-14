package com.eventbooking.service;

import java.util.List;

import com.eventbooking.dto.UserDTO;

// Service Layer Pattern
public interface UserService {
    UserDTO createUser(UserDTO userDTO);
    UserDTO updateUser(Long id, UserDTO userDTO);
    void deleteUser(Long id);
    UserDTO getUserById(Long id);
    UserDTO findByEmail(String email);
    UserDTO findByUsername(String username);
    UserDTO getUserByUsername(String username);
    List<UserDTO> getAllUsers();
    UserDTO updateUserStatus(Long id, boolean isActive);
    void sendPasswordResetEmail(String email);
    void resetPassword(String token, String newPassword);
} 