package com.eventbooking.observer;

import com.eventbooking.model.Booking;
import org.springframework.stereotype.Component;

@Component
public class EmailNotificationObserver implements BookingObserver {
    @Override
    public void update(Booking booking, String eventType) {
        switch (eventType) {
            case "BOOKING_CREATED":
                sendBookingConfirmationEmail(booking);
                break;
            case "BOOKING_CANCELLED":
                sendBookingCancellationEmail(booking);
                break;
            case "PAYMENT_RECEIVED":
                sendPaymentConfirmationEmail(booking);
                break;
        }
    }

    private void sendBookingConfirmationEmail(Booking booking) {
        // TODO: Implement email sending logic
        System.out.println("Sending booking confirmation email for booking ID: " + booking.getId());
    }

    private void sendBookingCancellationEmail(Booking booking) {
        // TODO: Implement email sending logic
        System.out.println("Sending booking cancellation email for booking ID: " + booking.getId());
    }

    private void sendPaymentConfirmationEmail(Booking booking) {
        // TODO: Implement email sending logic
        System.out.println("Sending payment confirmation email for booking ID: " + booking.getId());
    }
} 