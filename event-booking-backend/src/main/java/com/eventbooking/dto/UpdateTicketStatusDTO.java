package com.eventbooking.dto;

import com.eventbooking.model.TicketStatus;
import lombok.Data;

@Data
public class UpdateTicketStatusDTO {
    private TicketStatus status;
} 