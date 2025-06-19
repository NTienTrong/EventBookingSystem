package com.eventbooking.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.eventbooking.enums.OrderStatus;
import com.eventbooking.enums.PaymentStatus;

import lombok.Data;

@Data
public class OrderDTO {
    private Long id;
    private Long customerId;
    private String customerFullName;
    private String customerEmail;
    private String customerPhone;
    private String orderNumber;
    private BigDecimal totalAmount;
    private OrderStatus status;
    private PaymentStatus paymentStatus;
    private String paymentMethod;
    private String transactionId;
    private String notes;
    private String eventName;
    private String eventImage;
    private String ticketType;
    private Integer quantity;
    private BigDecimal amount;
    private LocalDateTime eventDate;
    private String eventLocation;
    private List<OrderItemDTO> orderItems = new ArrayList<>();
    private List<OrderItemDTO> tickets = new ArrayList<>();
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 