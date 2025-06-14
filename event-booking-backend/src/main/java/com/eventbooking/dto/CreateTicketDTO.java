package com.eventbooking.dto;

import lombok.Data;

@Data
public class CreateTicketDTO {
    private Long orderItemId;
    private String ticketCode;
    private String qrCode;
} 