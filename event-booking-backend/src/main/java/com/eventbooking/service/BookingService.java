package com.eventbooking.service;

import com.eventbooking.dto.BookingDTO;
import java.util.List;

// Service Layer Pattern
public interface BookingService {
    BookingDTO createBooking(BookingDTO bookingDTO);
    BookingDTO updateBooking(Long id, BookingDTO bookingDTO);
    void cancelBooking(Long id);
    BookingDTO getBookingById(Long id);
    List<BookingDTO> getBookingsByUserId(Long userId);
    List<BookingDTO> getBookingsByEventId(Long eventId);
    List<BookingDTO> getAllBookings();
    void processPayment(Long id, String paymentMethod, String transactionId);
} 