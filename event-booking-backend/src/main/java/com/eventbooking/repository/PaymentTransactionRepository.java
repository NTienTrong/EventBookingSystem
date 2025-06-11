package com.eventbooking.repository;

import com.eventbooking.model.PaymentTransaction;
import com.eventbooking.model.TransactionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentTransactionRepository extends JpaRepository<PaymentTransaction, Long> {
    Optional<PaymentTransaction> findByTransactionId(String transactionId);
    
    List<PaymentTransaction> findByOrderId(Long orderId);
    
    @Query("SELECT pt FROM PaymentTransaction pt WHERE pt.status = :status AND pt.createdAt BETWEEN :startDate AND :endDate")
    List<PaymentTransaction> findByStatusAndDateRange(@Param("status") TransactionStatus status,
                                                    @Param("startDate") LocalDateTime startDate,
                                                    @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT COUNT(pt) FROM PaymentTransaction pt WHERE pt.status = :status AND pt.createdAt BETWEEN :startDate AND :endDate")
    long countByStatusAndDateRange(@Param("status") TransactionStatus status,
                                  @Param("startDate") LocalDateTime startDate,
                                  @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT SUM(pt.amount) FROM PaymentTransaction pt WHERE pt.status = :status AND pt.createdAt BETWEEN :startDate AND :endDate")
    Double sumAmountByStatusAndDateRange(@Param("status") TransactionStatus status,
                                        @Param("startDate") LocalDateTime startDate,
                                        @Param("endDate") LocalDateTime endDate);
} 