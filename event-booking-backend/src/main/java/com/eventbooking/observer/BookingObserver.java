package com.eventbooking.observer;

import com.eventbooking.model.Booking;

public interface BookingObserver {
    void update(Booking booking, String eventType);
} 