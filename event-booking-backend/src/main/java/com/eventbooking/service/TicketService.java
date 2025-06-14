package com.eventbooking.service;

import com.eventbooking.model.Ticket;
import com.eventbooking.model.TicketStatus;
import com.eventbooking.dto.CreateTicketDTO;
import java.util.List;

public interface TicketService {
    Ticket getTicketById(Long id);
    Ticket getTicketByCode(String ticketCode);
    List<Ticket> getTicketsByOrderId(Long orderId);
    List<Ticket> getTicketsByCustomerId(Long customerId);
    List<Ticket> getTicketsByEventId(Long eventId);
    List<Ticket> getTicketsByEventIdAndStatus(Long eventId, TicketStatus status);
    Ticket updateTicketStatus(Long id, TicketStatus status);
    void validateTicket(String ticketCode);
    long countTicketsByEventIdAndStatus(Long eventId, TicketStatus status);
    Ticket createTicket(CreateTicketDTO createTicketDTO);
    List<Ticket> getAllTickets();
} 