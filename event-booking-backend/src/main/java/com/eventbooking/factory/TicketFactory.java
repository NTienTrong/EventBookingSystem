package com.eventbooking.factory;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.stereotype.Component;

import com.eventbooking.dto.CreateTicketDTO;
import com.eventbooking.dto.TicketDTO;
import com.eventbooking.entity.Ticket;
import com.eventbooking.entity.TicketType;
import com.eventbooking.entity.User;
import com.eventbooking.enums.TicketStatus;

@Component
public class TicketFactory {
    
    public Ticket createTicket(CreateTicketDTO dto, TicketType ticketType) {
        Ticket ticket = new Ticket();
        ticket.setTicketCode(generateTicketCode());
        ticket.setQrCode(generateQRCode());
        ticket.setStatus(TicketStatus.ACTIVE);
        ticket.setIssuedAt(LocalDateTime.now());
        ticket.setTicketType(ticketType);
        ticket.setPrice(ticketType.getPrice());
        return ticket;
    }
    
    public TicketDTO createTicketDTO(Ticket ticket) {
        if (ticket == null) {
            return null;
        }

        TicketDTO dto = new TicketDTO();
        dto.setId(ticket.getId());
        dto.setTicketCode(ticket.getTicketCode());
        dto.setQrCode(ticket.getQrCode());
        dto.setStatus(ticket.getStatus());
        dto.setIssuedAt(ticket.getIssuedAt());
        dto.setUsedAt(ticket.getUsedAt());
        
        // Set ticket type info
        if (ticket.getTicketType() != null) {
            TicketType ticketType = ticket.getTicketType();
            dto.setTicketTypeId(ticketType.getId());
            dto.setTicketTypeName(ticketType.getName());
            dto.setTicketTypePrice(ticketType.getPrice());
            
            // Set event info
            if (ticketType.getEvent() != null) {
                dto.setEventId(ticketType.getEvent().getId());
                dto.setEventName(ticketType.getEvent().getName());
                dto.setEventLocation(ticketType.getEvent().getLocation());
                dto.setEventStartTime(ticketType.getEvent().getStartTime());
                dto.setEventEndTime(ticketType.getEvent().getEndTime());
            }
        }
        
        // Set order info
        if (ticket.getBooking() != null) {
            dto.setOrderId(ticket.getBooking().getId());
            dto.setOrderNumber(ticket.getBooking().getOrderNumber());
        }
        
        // Lấy thông tin user từ OrderItem
        if (ticket.getOrderItem() != null && ticket.getOrderItem().getOrder() != null) {
            User user = ticket.getOrderItem().getOrder().getUser();
            if (user != null) {
                dto.setCustomerId(user.getId());
                dto.setCustomerName(user.getFullName());
                dto.setCustomerEmail(user.getEmail());
                dto.setCustomerPhone(user.getPhone());
            }
        }
        
        return dto;
    }

    private String generateTicketCode() {
        return UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    private String generateQRCode() {
        return UUID.randomUUID().toString();
    }
} 