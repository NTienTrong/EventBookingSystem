package com.eventbooking.dto;

import java.math.BigDecimal;
import java.util.List;

import com.eventbooking.enums.TicketStatus;

import lombok.Data;

@Data
public class BookingResponseDTO {
    private Long id;
    private String orderNumber;
    private String status;
    private String paymentStatus;
    private BigDecimal totalAmount;
    private List<TicketDTO> tickets;
    private String message;

    public BookingResponseDTO(BookingDTO booking) {
        this.id = booking.getId();
        this.orderNumber = booking.getOrderNumber();
        this.status = booking.getStatus() != null ? booking.getStatus().toString() : null;
        this.paymentStatus = booking.getPaymentStatus() != null ? booking.getPaymentStatus().toString() : null;
        this.totalAmount = booking.getTotalAmount();
        if (booking.getTickets() != null) {
            this.tickets = booking.getTickets().stream().map(t -> {
                TicketDTO dto = new TicketDTO();
                dto.id = t.getId();
                dto.ticketCode = t.getTicketCode();
                dto.qrCode = t.getQrCode();
                dto.status = t.getStatus();
                dto.ticketTypeName = t.getTicketTypeName();
                dto.price = t.getTicketTypePrice();
                return dto;
            }).toList();
        }
        this.message = "Booking created successfully";
    }

    @Data
    public static class TicketDTO {
        private Long id;
        private String ticketCode;
        private String qrCode;
        private TicketStatus status;
        private String ticketTypeName;
        private BigDecimal price;
    }
} 