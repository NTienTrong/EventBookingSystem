package com.eventbooking.repository;

import com.eventbooking.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findByOrderId(Long orderId);
    
    @Query("SELECT oi FROM OrderItem oi WHERE oi.order.id = :orderId AND oi.ticketType.id = :ticketTypeId")
    List<OrderItem> findByOrderIdAndTicketTypeId(@Param("orderId") Long orderId, 
                                               @Param("ticketTypeId") Long ticketTypeId);
    
    @Query("SELECT SUM(oi.quantity) FROM OrderItem oi WHERE oi.ticketType.id = :ticketTypeId")
    Integer sumQuantityByTicketTypeId(@Param("ticketTypeId") Long ticketTypeId);
    
    @Query("SELECT oi FROM OrderItem oi WHERE oi.ticketType.event.id = :eventId")
    List<OrderItem> findByEventId(@Param("eventId") Long eventId);
} 