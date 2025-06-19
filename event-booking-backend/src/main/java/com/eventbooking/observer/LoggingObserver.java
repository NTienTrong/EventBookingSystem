package com.eventbooking.observer;

import org.springframework.stereotype.Component;

import com.eventbooking.entity.Booking;

@Component
public class LoggingObserver implements BookingObserver {
    @Override
    public void update(Booking booking, String eventType) {
        switch (eventType) {
            case "BOOKING_CREATED":
                logBookingCreation(booking);
                break;
            case "BOOKING_CANCELLED":
                logBookingCancellation(booking);
                break;
            case "PAYMENT_RECEIVED":
                logPaymentReceived(booking);
                break;
        }
    }

    private void logBookingCreation(Booking booking) {
        System.out.println("Logging: New booking created - ID: " + booking.getId());
    }

    private void logBookingCancellation(Booking booking) {
        System.out.println("Logging: Booking cancelled - ID: " + booking.getId());
    }

    private void logPaymentReceived(Booking booking) {
        System.out.println("Logging: Payment received - Booking ID: " + booking.getId());
    }
} 