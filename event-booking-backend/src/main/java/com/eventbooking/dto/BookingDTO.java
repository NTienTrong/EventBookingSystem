package com.eventbooking.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.eventbooking.enums.BookingStatus;
import com.eventbooking.enums.PaymentStatus;

import lombok.Data;

@Data
public class BookingDTO {
    private Long id;
    private String orderNumber;
    private Long eventId;
    private Long userId;
    private Integer numberOfTickets;
    private BigDecimal totalAmount;
    private BookingStatus status;
    private PaymentStatus paymentStatus;
    private String paymentMethod;
    private String transactionId;
    private List<TicketDTO> tickets;
    private LocalDateTime bookingTime;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Getters
    public Long getId() { return id; }
    public Long getEventId() { return eventId; }
    public Long getUserId() { return userId; }
    public Integer getNumberOfTickets() { return numberOfTickets; }
    public BigDecimal getTotalAmount() { return totalAmount; }
    public BookingStatus getStatus() { return status; }
    public PaymentStatus getPaymentStatus() { return paymentStatus; }
    public String getPaymentMethod() { return paymentMethod; }
    public String getTransactionId() { return transactionId; }
    public LocalDateTime getBookingTime() { return bookingTime; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setEventId(Long eventId) { this.eventId = eventId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public void setNumberOfTickets(Integer numberOfTickets) { this.numberOfTickets = numberOfTickets; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }
    public void setStatus(BookingStatus status) { this.status = status; }
    public void setPaymentStatus(PaymentStatus paymentStatus) { this.paymentStatus = paymentStatus; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }
    public void setBookingTime(LocalDateTime bookingTime) { this.bookingTime = bookingTime; }
} 