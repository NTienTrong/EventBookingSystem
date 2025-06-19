package com.eventbooking.service;

import java.util.List;

import com.eventbooking.dto.TicketTypeDTO;

public interface TicketTypeService {
    TicketTypeDTO createTicketType(TicketTypeDTO ticketTypeDTO);
    TicketTypeDTO getTicketTypeById(Long id);
    List<TicketTypeDTO> getTicketTypesByEventId(Long eventId);
    List<TicketTypeDTO> getAllTicketTypes(String search, Long eventId);
    TicketTypeDTO updateTicketType(Long id, TicketTypeDTO ticketTypeDTO);
    void deleteTicketType(Long id);
    void updateAvailableQuantity(Long ticketTypeId, int quantityChange);
} 