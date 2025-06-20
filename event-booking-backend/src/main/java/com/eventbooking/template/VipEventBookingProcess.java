package com.eventbooking.template;

import org.springframework.stereotype.Component;

import com.eventbooking.dto.BookingRequestDTO;

@Component
public class VipEventBookingProcess extends BookingProcessTemplate {
    @Override
    protected void beforeBooking(BookingRequestDTO request) {
        System.out.println("Special check for VIP event");
    }

    @Override
    protected void doBooking(BookingRequestDTO request) {
        System.out.println("Booking for VIP event: " + request.getEventId());
        // Logic booking cho sự kiện VIP
    }
} 