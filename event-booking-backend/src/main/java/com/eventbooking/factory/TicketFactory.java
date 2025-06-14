package com.eventbooking.factory;

import com.eventbooking.model.Ticket;
import com.eventbooking.dto.TicketDTO;
import com.eventbooking.dto.CreateTicketDTO;
import com.eventbooking.model.OrderItem;
import com.eventbooking.model.TicketStatus;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;

@Component
public class TicketFactory {
    
    public Ticket createTicket(CreateTicketDTO dto, OrderItem orderItem) {
        Ticket ticket = new Ticket();
        ticket.setTicketCode(dto.getTicketCode());
        ticket.setQrCode(dto.getQrCode());
        ticket.setStatus(TicketStatus.ACTIVE);
        ticket.setIssuedAt(LocalDateTime.now());
        ticket.setOrderItem(orderItem);
        return ticket;
    }
    
    public TicketDTO createTicketDTO(Ticket ticket) {
        TicketDTO dto = new TicketDTO();
        dto.setId(ticket.getId());
        dto.setTicketCode(ticket.getTicketCode());
        dto.setQrCode(ticket.getQrCode());
        dto.setStatus(ticket.getStatus());
        dto.setIssuedAt(ticket.getIssuedAt());
        dto.setUsedAt(ticket.getUsedAt());
        dto.setOrderItemId(ticket.getOrderItem().getId());
        dto.setOrderId(ticket.getOrderItem().getOrder().getId());
        dto.setEventId(ticket.getOrderItem().getTicketType().getEvent().getId());
        dto.setEventName(ticket.getOrderItem().getTicketType().getEvent().getName());
        dto.setCustomerId(ticket.getOrderItem().getOrder().getCustomer().getId());
        dto.setCustomerName(ticket.getOrderItem().getOrder().getCustomer().getFullName());
        dto.setCustomerEmail(ticket.getOrderItem().getOrder().getCustomer().getEmail());
        return dto;
    }
} 