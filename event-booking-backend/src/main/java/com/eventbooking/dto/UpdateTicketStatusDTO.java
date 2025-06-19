package com.eventbooking.dto;

import com.eventbooking.enums.TicketStatus;

import lombok.Data;

@Data
public class UpdateTicketStatusDTO {
    private TicketStatus status;
} 