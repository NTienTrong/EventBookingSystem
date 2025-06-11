package com.eventbooking.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class EventReportDTO {
    private Long eventId;
    private String eventName;
    private Integer ticketsSold;
    private BigDecimal revenue;

    public Integer getTicketsSold() {
        return ticketsSold;
    }

    public void setTicketsSold(Integer ticketsSold) {
        this.ticketsSold = ticketsSold;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public void setRevenue(BigDecimal revenue) {
        this.revenue = revenue;
    }
} 