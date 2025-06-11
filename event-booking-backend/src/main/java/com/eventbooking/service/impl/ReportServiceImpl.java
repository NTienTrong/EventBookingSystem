package com.eventbooking.service.impl;

import com.eventbooking.dto.ReportDTO;
import com.eventbooking.dto.EventReportDTO;
import com.eventbooking.model.Booking;
import com.eventbooking.model.Event;
import com.eventbooking.repository.BookingRepository;
import com.eventbooking.repository.EventRepository;
import com.eventbooking.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.math.BigDecimal;

@Service
public class ReportServiceImpl implements ReportService {

    private final BookingRepository bookingRepository;
    private final EventRepository eventRepository;

    @Autowired
    public ReportServiceImpl(BookingRepository bookingRepository,
                           EventRepository eventRepository) {
        this.bookingRepository = bookingRepository;
        this.eventRepository = eventRepository;
    }

    @Override
    public ReportDTO generateRevenueReport(LocalDate startDate, LocalDate endDate) {
        List<Booking> bookings = bookingRepository.findByBookingTimeBetween(startDate.atStartOfDay(), endDate.atTime(23, 59, 59));
        
        ReportDTO report = new ReportDTO();
        report.setStartDate(startDate);
        report.setEndDate(endDate);
        
        // Calculate total revenue
        double totalRevenue = bookings.stream()
            .mapToDouble(booking -> booking.getTotalAmount().doubleValue())
            .sum();
        report.setTotalRevenue(new BigDecimal(totalRevenue));
        
        // Calculate revenue by event
        Map<Event, Double> revenueByEvent = bookings.stream()
            .collect(Collectors.groupingBy(
                Booking::getEvent,
                Collectors.summingDouble(booking -> booking.getTotalAmount().doubleValue())
            ));
        
        List<EventReportDTO> eventReports = revenueByEvent.entrySet().stream()
            .map(entry -> {
                EventReportDTO eventReport = new EventReportDTO();
                eventReport.setEventId(entry.getKey().getId());
                eventReport.setEventName(entry.getKey().getName());
                eventReport.setRevenue(new BigDecimal(entry.getValue()));
                return eventReport;
            })
            .collect(Collectors.toList());
        
        report.setEventReports(eventReports);
        return report;
    }

    @Override
    public ReportDTO generateTicketReport(LocalDate startDate, LocalDate endDate) {
        List<Booking> bookings = bookingRepository.findByBookingTimeBetween(startDate.atStartOfDay(), endDate.atTime(23, 59, 59));
        
        ReportDTO report = new ReportDTO();
        report.setStartDate(startDate);
        report.setEndDate(endDate);
        
        // Calculate total tickets sold
        int totalTickets = bookings.stream()
            .mapToInt(Booking::getNumberOfTickets)
            .sum();
        report.setTotalTicketsSold(totalTickets);
        
        // Calculate tickets sold by event
        Map<Event, Integer> ticketsByEvent = bookings.stream()
            .collect(Collectors.groupingBy(
                Booking::getEvent,
                Collectors.summingInt(Booking::getNumberOfTickets)
            ));
        
        List<EventReportDTO> eventReports = ticketsByEvent.entrySet().stream()
            .map(entry -> {
                EventReportDTO eventReport = new EventReportDTO();
                eventReport.setEventId(entry.getKey().getId());
                eventReport.setEventName(entry.getKey().getName());
                eventReport.setTicketsSold(entry.getValue());
                return eventReport;
            })
            .collect(Collectors.toList());
        
        report.setEventReports(eventReports);
        return report;
    }

    @Override
    public ReportDTO generatePopularEventsReport(LocalDate startDate, LocalDate endDate) {
        List<Booking> bookings = bookingRepository.findByBookingTimeBetween(startDate.atStartOfDay(), endDate.atTime(23, 59, 59));
        
        ReportDTO report = new ReportDTO();
        report.setStartDate(startDate);
        report.setEndDate(endDate);
        
        // Calculate popularity by number of bookings
        Map<Event, Long> popularityByEvent = bookings.stream()
            .collect(Collectors.groupingBy(
                Booking::getEvent,
                Collectors.counting()
            ));
        List<EventReportDTO> eventReports = popularityByEvent.entrySet().stream()
            .map(entry -> {
                EventReportDTO eventReport = new EventReportDTO();
                eventReport.setEventId(entry.getKey().getId());
                eventReport.setEventName(entry.getKey().getName());
                eventReport.setTicketsSold(entry.getValue().intValue());
                return eventReport;
            })
            .sorted((a, b) -> b.getTicketsSold().compareTo(a.getTicketsSold()))
            .collect(Collectors.toList());
        
        report.setEventReports(eventReports);
        return report;
    }
} 