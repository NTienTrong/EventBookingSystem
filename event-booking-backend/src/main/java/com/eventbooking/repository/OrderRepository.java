package com.eventbooking.repository;

import com.eventbooking.model.Order;
import com.eventbooking.model.OrderStatus;
import com.eventbooking.model.PaymentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByOrderNumber(String orderNumber);
    
    Page<Order> findByCustomerId(Long customerId, Pageable pageable);
    
    @Query("SELECT o FROM Order o WHERE o.customer.id = :customerId AND o.status = :status")
    Page<Order> findByCustomerIdAndStatus(@Param("customerId") Long customerId, 
                                        @Param("status") OrderStatus status, 
                                        Pageable pageable);
    
    @Query("SELECT o FROM Order o WHERE o.status = :orderStatus AND o.paymentStatus = :paymentStatus")
    List<Order> findByOrderStatusAndPaymentStatus(@Param("orderStatus") OrderStatus orderStatus,
                                                @Param("paymentStatus") PaymentStatus paymentStatus);
    
    @Query("SELECT o FROM Order o WHERE o.createdAt BETWEEN :startDate AND :endDate")
    Page<Order> findByDateRange(@Param("startDate") LocalDateTime startDate,
                               @Param("endDate") LocalDateTime endDate,
                               Pageable pageable);
} 