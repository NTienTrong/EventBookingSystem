package com.eventbooking.service;

import java.util.List;

import com.eventbooking.dto.CreateTicketDTO;
import com.eventbooking.dto.TicketDTO;
import com.eventbooking.entity.Ticket;
import com.eventbooking.enums.TicketStatus;

public interface TicketService {
    List<TicketDTO> getAllTickets(String search, Long eventId, TicketStatus status);
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
    void deleteTicket(Long id);
}