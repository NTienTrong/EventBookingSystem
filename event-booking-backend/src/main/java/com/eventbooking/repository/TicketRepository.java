package com.eventbooking.repository;

import com.eventbooking.model.Ticket;
import com.eventbooking.model.TicketStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    Optional<Ticket> findByTicketCode(String ticketCode);
    
    List<Ticket> findByOrderItemId(Long orderItemId);
    
    @Query("SELECT t FROM Ticket t WHERE t.orderItem.order.customer.id = :customerId")
    List<Ticket> findByCustomerId(@Param("customerId") Long customerId);
    
    @Query("SELECT t FROM Ticket t WHERE t.orderItem.order.id = :orderId")
    List<Ticket> findByOrderId(@Param("orderId") Long orderId);
    
    @Query("SELECT t FROM Ticket t WHERE t.orderItem.ticketType.event.id = :eventId AND t.status = :status")
    List<Ticket> findByEventIdAndStatus(@Param("eventId") Long eventId, @Param("status") TicketStatus status);
    
    @Query("SELECT COUNT(t) FROM Ticket t WHERE t.orderItem.ticketType.event.id = :eventId AND t.status = :status")
    long countByEventIdAndStatus(@Param("eventId") Long eventId, @Param("status") TicketStatus status);
} 