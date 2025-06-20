package com.eventbooking.template;

import org.springframework.stereotype.Component;

import com.eventbooking.dto.BookingRequestDTO;

@Component
public class StandardEventBookingProcess extends BookingProcessTemplate {
    @Override
    protected void doBooking(BookingRequestDTO request) {
        System.out.println("Booking for standard event: " + request.getEventId());
        // Logic booking cho sự kiện thường
    }
} 