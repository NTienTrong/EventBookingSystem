package com.eventbooking.observer;

import com.eventbooking.model.Booking;

public interface BookingSubject {
    void registerObserver(BookingObserver observer);
    void removeObserver(BookingObserver observer);
    void notifyObservers(Booking booking, String eventType);
} 