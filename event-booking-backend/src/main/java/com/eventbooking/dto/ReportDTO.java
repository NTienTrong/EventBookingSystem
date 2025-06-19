package com.eventbooking.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import lombok.Data;

@Data
public class ReportDTO {
    // Revenue data
    private List<Map<String, Object>> revenueData;
    
    // Ticket type distribution
    private List<Map<String, Object>> ticketTypeData;
    
    // Popular events
    private List<Map<String, Object>> popularEvents;
    
    // Summary statistics
    private Map<String, Object> summary;
    
    // User activity
    private Map<String, Object> userActivity;
    
    // User ticket history
    private List<Map<String, Object>> userTicketHistory;
    
    // User event history
    private List<Map<String, Object>> userEventHistory;
    
    // Date range
    private LocalDateTime startDate;
    private LocalDateTime endDate;
} 