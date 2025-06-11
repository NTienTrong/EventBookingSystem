package com.eventbooking.service;

import com.eventbooking.dto.TicketTypeDTO;
import java.util.List;

public interface TicketTypeService {
    TicketTypeDTO createTicketType(TicketTypeDTO ticketTypeDTO);
    TicketTypeDTO updateTicketType(Long id, TicketTypeDTO ticketTypeDTO);
    void deleteTicketType(Long id);
    TicketTypeDTO getTicketTypeById(Long id);
    List<TicketTypeDTO> getTicketTypesByEventId(Long eventId);
    void updateRemainingQuantity(Long id, Integer quantity);
} 