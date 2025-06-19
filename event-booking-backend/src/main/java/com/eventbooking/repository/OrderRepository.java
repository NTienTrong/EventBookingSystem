package com.eventbooking.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.eventbooking.entity.Order;
import com.eventbooking.enums.OrderStatus;
import com.eventbooking.enums.PaymentStatus;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Page<Order> findAll(Pageable pageable);
    List<Order> findByStatus(OrderStatus status);
    List<Order> findByUserId(Long userId);
    List<Order> findByOrderItemsTicketTypeEventId(Long eventId);

    @Query("SELECT o FROM Order o LEFT JOIN FETCH o.orderItems oi LEFT JOIN FETCH oi.ticketType tt LEFT JOIN FETCH tt.event WHERE o.id = :id")
    Optional<Order> findByIdWithDetails(@Param("id") Long id);

    Optional<Order> findByOrderNumber(String orderNumber);

    @Query("SELECT o FROM Order o WHERE " +
           "(:search IS NULL OR LOWER(o.orderNumber) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(o.customerEmail) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:status IS NULL OR o.status = :status) AND " +
           "(:paymentStatus IS NULL OR o.paymentStatus = :paymentStatus) AND " +
           "(:startDate IS NULL OR o.createdAt >= :startDate) AND " +
           "(:endDate IS NULL OR o.createdAt <= :endDate)")
    Page<Order> searchOrders(
        @Param("search") String search,
        @Param("status") OrderStatus status,
        @Param("paymentStatus") PaymentStatus paymentStatus,
        @Param("startDate") LocalDateTime startDate,
        @Param("endDate") LocalDateTime endDate,
        Pageable pageable
    );
} 