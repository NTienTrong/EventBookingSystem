package com.eventbooking.service;

import com.eventbooking.dto.PaymentRequest;
import com.eventbooking.dto.BookingDTO;

public interface PaymentService {
    BookingDTO processPayment(PaymentRequest paymentRequest);
    BookingDTO refundPayment(Long bookingId);
} 