package com.eventbooking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eventbooking.entity.TicketType;

@Repository
public interface TicketTypeRepository extends JpaRepository<TicketType, Long> {
    List<TicketType> findByEventId(Long eventId);
    List<TicketType> findByNameContainingIgnoreCase(String name);
} 