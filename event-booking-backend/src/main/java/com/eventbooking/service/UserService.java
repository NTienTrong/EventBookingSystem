package com.eventbooking.service;

import com.eventbooking.dto.UserDTO;
import java.util.List;

// Service Layer Pattern
public interface UserService {
    UserDTO createUser(UserDTO userDTO);
    UserDTO updateUser(Long id, UserDTO userDTO);
    void deleteUser(Long id);
    UserDTO getUserById(Long id);
    List<UserDTO> getAllUsers();
    UserDTO findByUsername(String username);
    UserDTO findByEmail(String email);
} 