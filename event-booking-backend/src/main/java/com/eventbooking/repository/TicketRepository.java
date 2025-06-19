package com.eventbooking.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.eventbooking.entity.Event;
import com.eventbooking.entity.Ticket;
import com.eventbooking.enums.TicketStatus;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    
    @EntityGraph(attributePaths = {"ticketType.event", "orderItem.order.user"})
    List<Ticket> findAll();
    
    @EntityGraph(attributePaths = {"ticketType.event", "orderItem.order.user"})
    Optional<Ticket> findById(Long id);
    
    @EntityGraph(attributePaths = {"ticketType.event", "orderItem.order.user"})
    List<Ticket> findByTicketTypeEventId(Long eventId);
    
    @EntityGraph(attributePaths = {"ticketType", "ticketType.event", "orderItem", "orderItem.order", "orderItem.order.user"})
    List<Ticket> findByTicketTypeEventIdAndStatus(@Param("eventId") Long eventId, @Param("status") TicketStatus status);
    
    @EntityGraph(attributePaths = {"ticketType.event", "orderItem.order.user"})
    List<Ticket> findByOrderItemOrderUserId(Long userId);
    
    @EntityGraph(attributePaths = {"ticketType.event", "orderItem.order.user"})
    List<Ticket> findByOrderItemOrderUserIdAndStatus(Long userId, TicketStatus status);
    
    @EntityGraph(attributePaths = {"ticketType.event", "orderItem.order.user"})
    List<Ticket> findByStatus(TicketStatus status);
    
    @EntityGraph(attributePaths = {"ticketType.event", "orderItem.order.user"})
    @Query("SELECT t FROM Ticket t WHERE t.ticketCode = :code")
    Optional<Ticket> findByTicketCode(@Param("code") String code);
    
    @EntityGraph(attributePaths = {"ticketType.event", "orderItem.order.user"})
    @Query("SELECT t FROM Ticket t WHERE t.qrCode = :code")
    Optional<Ticket> findByQrCode(@Param("code") String code);
    
    @EntityGraph(attributePaths = {"ticketType.event", "orderItem.order.user"})
    @Query("SELECT t FROM Ticket t WHERE t.ticketType.event.id = :eventId AND (:status IS NULL OR t.status = :status)")
    List<Ticket> findByEventIdAndStatus(@Param("eventId") Long eventId, @Param("status") TicketStatus status);

    @EntityGraph(attributePaths = {"ticketType.event", "orderItem.order.user"})
    @Query("SELECT t FROM Ticket t WHERE t.orderItem.order.id = :orderId")
    List<Ticket> findByOrderId(@Param("orderId") Long orderId);

    @EntityGraph(attributePaths = {"ticketType.event", "orderItem.order.user"})
    @Query("SELECT t FROM Ticket t WHERE t.orderItem.order.user.id = :userId")
    List<Ticket> findByUserId(@Param("userId") Long userId);

    @Query("SELECT COUNT(t) FROM Ticket t WHERE t.ticketType.event.id = :eventId AND t.status = :status")
    long countByEventIdAndStatus(@Param("eventId") Long eventId, @Param("status") TicketStatus status);

    List<Ticket> findByBookingId(Long bookingId);

    @Query("SELECT COUNT(t) FROM Ticket t WHERE t.ticketType.event = :event")
    long countByEvent(@Param("event") Event event);

    @EntityGraph(attributePaths = {"ticketType.event", "orderItem.order.user"})
    @Query("SELECT t FROM Ticket t WHERE LOWER(t.ticketCode) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(t.ticketType.event.name) LIKE LOWER(CONCAT('%', :search, '%'))")
    List<Ticket> findByTicketCodeContainingIgnoreCaseOrTicketTypeEventNameContainingIgnoreCase(@Param("search") String search, @Param("search") String search2);
} 