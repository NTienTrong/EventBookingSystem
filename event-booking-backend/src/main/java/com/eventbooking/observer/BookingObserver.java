package com.eventbooking.observer;

import com.eventbooking.entity.Booking;

public interface BookingObserver {
    void update(Booking booking, String eventType);
} 