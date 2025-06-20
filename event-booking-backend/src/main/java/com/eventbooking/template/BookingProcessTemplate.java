package com.eventbooking.template;

import com.eventbooking.dto.BookingRequestDTO;

public abstract class BookingProcessTemplate {
    // Template method
    public final void processBooking(BookingRequestDTO request) {
        validateRequest(request);
        beforeBooking(request);
        doBooking(request);
        afterBooking(request);
    }

    protected void validateRequest(BookingRequestDTO request) {
        // Bước kiểm tra chung
        System.out.println("Validate booking request");
    }

    protected void beforeBooking(BookingRequestDTO request) {
        // Hook method, có thể override
    }

    protected abstract void doBooking(BookingRequestDTO request);

    protected void afterBooking(BookingRequestDTO request) {
        // Hook method, có thể override
    }
} 