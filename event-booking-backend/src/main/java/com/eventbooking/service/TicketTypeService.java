package com.eventbooking.service;

import java.util.List;

import com.eventbooking.dto.TicketTypeDTO;

public interface TicketTypeService {
    List<TicketTypeDTO> getAllTicketTypes();
    TicketTypeDTO createTicketType(TicketTypeDTO ticketTypeDTO);
    TicketTypeDTO updateTicketType(Long id, TicketTypeDTO ticketTypeDTO);
    void deleteTicketType(Long id);
    TicketTypeDTO getTicketTypeById(Long id);
    List<TicketTypeDTO> getTicketTypesByEventId(Long eventId);
    void updateRemainingQuantity(Long id, Integer quantity);
} 