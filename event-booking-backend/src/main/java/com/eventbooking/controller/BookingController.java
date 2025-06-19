package com.eventbooking.controller;

import com.eventbooking.dto.BookingDTO;
import com.eventbooking.dto.BookingRequestDTO;
import com.eventbooking.dto.BookingResponseDTO;
import com.eventbooking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class BookingController {
    
    private final BookingService bookingService;

    @Autowired
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public ResponseEntity<BookingResponseDTO> createBooking(@RequestBody BookingRequestDTO request) {
        BookingDTO booking = bookingService.createBooking(request);
        return ResponseEntity.ok(new BookingResponseDTO(booking));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingDTO> getBookingById(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.getBookingById(id));
    }

    @GetMapping
    public ResponseEntity<List<BookingDTO>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @GetMapping("/order/{orderNumber}")
    public ResponseEntity<BookingDTO> getBookingByOrderNumber(@PathVariable String orderNumber) {
        return ResponseEntity.ok(bookingService.getBookingByOrderNumber(orderNumber));
    }
} 