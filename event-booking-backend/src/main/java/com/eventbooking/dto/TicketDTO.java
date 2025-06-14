package com.eventbooking.dto;

import com.eventbooking.model.TicketStatus;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class TicketDTO {
    private Long id;
    private String ticketCode;
    private String qrCode;
    private TicketStatus status;
    private LocalDateTime issuedAt;
    private LocalDateTime usedAt;
    private Long orderItemId;
    private Long orderId;
    private Long eventId;
    private String eventName;
    private Long customerId;
    private String customerName;
    private String customerEmail;
} 