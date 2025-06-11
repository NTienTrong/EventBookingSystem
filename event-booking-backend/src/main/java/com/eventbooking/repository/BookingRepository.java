package com.eventbooking.repository;

import com.eventbooking.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(Long userId);
    List<Booking> findByEventId(Long eventId);
    List<Booking> findByUserIdAndEventId(Long userId, Long eventId);
    List<Booking> findByBookingTimeBetween(LocalDateTime start, LocalDateTime end);
} 