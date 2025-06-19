package com.eventbooking.observer;

import com.eventbooking.entity.Booking;

public interface BookingSubject {
    void registerObserver(BookingObserver observer);
    void removeObserver(BookingObserver observer);
    void notifyObservers(Booking booking, String eventType);
} 