package com.eventbooking.service;

import java.time.LocalDateTime;

import com.eventbooking.dto.ReportDTO;

public interface ReportService {
    ReportDTO getRevenueReport(LocalDateTime startDate, LocalDateTime endDate);
    ReportDTO getTicketTypeReport(LocalDateTime startDate, LocalDateTime endDate);
    ReportDTO getTicketTypeRevenueReport(LocalDateTime startDate, LocalDateTime endDate);
    ReportDTO getSummaryReport(LocalDateTime startDate, LocalDateTime endDate);
    ReportDTO getUserActivityReport(LocalDateTime startDate, LocalDateTime endDate);
    ReportDTO getUserTicketHistoryReport(LocalDateTime startDate, LocalDateTime endDate);
    ReportDTO getUserEventHistoryReport(LocalDateTime startDate, LocalDateTime endDate);
} 