package com.eventbooking.service;

public interface EmailService {
    void sendPasswordResetEmail(String to, String resetLink);
} 