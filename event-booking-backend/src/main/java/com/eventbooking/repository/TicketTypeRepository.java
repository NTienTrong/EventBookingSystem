package com.eventbooking.repository;

import com.eventbooking.model.TicketType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import jakarta.persistence.LockModeType;
import java.util.List;

@Repository
public interface TicketTypeRepository extends JpaRepository<TicketType, Long> {
    List<TicketType> findByEventId(Long eventId);
    List<TicketType> findByEventIdAndActiveTrue(Long eventId);
    
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT tt FROM TicketType tt WHERE tt.id = :id")
    TicketType findByIdForUpdate(@Param("id") Long id);
    
    @Query("SELECT tt FROM TicketType tt WHERE tt.event.id = :eventId AND tt.availableQuantity > 0")
    List<TicketType> findAvailableByEventId(@Param("eventId") Long eventId);
    
    @Query("SELECT COUNT(tt) FROM TicketType tt WHERE tt.event.id = :eventId AND tt.availableQuantity > 0")
    long countAvailableByEventId(@Param("eventId") Long eventId);
} 