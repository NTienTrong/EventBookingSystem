package com.eventbooking.service;

import java.util.List;

import com.eventbooking.dto.BookingDTO;
import com.eventbooking.dto.BookingRequestDTO;
import com.eventbooking.exception.ResourceNotFoundException;

public interface BookingService {
    BookingDTO createBooking(BookingRequestDTO request);
    BookingDTO getBookingById(Long id) throws ResourceNotFoundException;
    BookingDTO getBookingByOrderNumber(String orderNumber) throws ResourceNotFoundException;
    List<BookingDTO> getAllBookings();
    void processPayment(Long bookingId, String paymentMethod, String transactionId);
}