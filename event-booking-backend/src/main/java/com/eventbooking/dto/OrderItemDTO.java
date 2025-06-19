package com.eventbooking.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class OrderItemDTO {
    private Long id;
    private Long orderId;
    private Long ticketTypeId;
    private String ticketTypeName;
    private Integer quantity;
    private BigDecimal unitPrice;
    private BigDecimal subtotal;
    private String eventName;
    private String eventImage;
    private java.time.LocalDateTime eventDate;
    private String eventLocation;
} 