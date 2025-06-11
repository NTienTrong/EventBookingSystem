package com.eventbooking.service;

import com.eventbooking.dto.ReportDTO;
import java.time.LocalDate;

public interface ReportService {
    ReportDTO generateRevenueReport(LocalDate startDate, LocalDate endDate);
    ReportDTO generateTicketReport(LocalDate startDate, LocalDate endDate);
    ReportDTO generatePopularEventsReport(LocalDate startDate, LocalDate endDate);
} 