package com.eventbooking.service.impl;

import com.eventbooking.dto.TicketTypeDTO;
import com.eventbooking.model.Event;
import com.eventbooking.model.TicketType;
import com.eventbooking.repository.EventRepository;
import com.eventbooking.repository.TicketTypeRepository;
import com.eventbooking.service.TicketTypeService;
import com.eventbooking.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class TicketTypeServiceImpl implements TicketTypeService {

    private final TicketTypeRepository ticketTypeRepository;
    private final EventRepository eventRepository;

    @Autowired
    public TicketTypeServiceImpl(TicketTypeRepository ticketTypeRepository,
                               EventRepository eventRepository) {
        this.ticketTypeRepository = ticketTypeRepository;
        this.eventRepository = eventRepository;
    }

    @Override
    public TicketTypeDTO createTicketType(TicketTypeDTO ticketTypeDTO) {
        Event event = eventRepository.findById(ticketTypeDTO.getEventId())
            .orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        TicketType ticketType = new TicketType();
        ticketType.setName(ticketTypeDTO.getName());
        ticketType.setPrice(ticketTypeDTO.getPrice());
        ticketType.setQuantity(ticketTypeDTO.getQuantity());
        ticketType.setRemainingQuantity(ticketTypeDTO.getQuantity());
        ticketType.setEvent(event);
        ticketType.setDescription(ticketTypeDTO.getDescription());
        ticketType.setActive(ticketTypeDTO.isActive());
        TicketType savedTicketType = ticketTypeRepository.save(ticketType);
        return convertToDTO(savedTicketType);
    }

    @Override
    public TicketTypeDTO updateTicketType(Long id, TicketTypeDTO ticketTypeDTO) {
        TicketType ticketType = ticketTypeRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Ticket type not found"));

        // Update ticket type properties
        ticketType.setName(ticketTypeDTO.getName());
        ticketType.setPrice(ticketTypeDTO.getPrice());
        ticketType.setQuantity(ticketTypeDTO.getQuantity());
        ticketType.setRemainingQuantity(ticketTypeDTO.getRemainingQuantity());
        ticketType.setDescription(ticketTypeDTO.getDescription());
        ticketType.setActive(ticketTypeDTO.isActive());

        TicketType updatedTicketType = ticketTypeRepository.save(ticketType);
        return convertToDTO(updatedTicketType);
    }

    @Override
    public void deleteTicketType(Long id) {
        if (!ticketTypeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Ticket type not found");
        }
        ticketTypeRepository.deleteById(id);
    }

    @Override
    public TicketTypeDTO getTicketTypeById(Long id) {
        TicketType ticketType = ticketTypeRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Ticket type not found"));
        return convertToDTO(ticketType);
    }

    @Override
    public List<TicketTypeDTO> getTicketTypesByEventId(Long eventId) {
        return ticketTypeRepository.findByEventIdAndActiveTrue(eventId).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    @Override
    public void updateRemainingQuantity(Long id, Integer quantity) {
        TicketType ticketType = ticketTypeRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Ticket type not found"));
        
        ticketType.setRemainingQuantity(ticketType.getRemainingQuantity() - quantity);
        ticketTypeRepository.save(ticketType);
    }

    private TicketTypeDTO convertToDTO(TicketType ticketType) {
        TicketTypeDTO dto = new TicketTypeDTO();
        dto.setId(ticketType.getId());
        dto.setName(ticketType.getName());
        dto.setPrice(ticketType.getPrice());
        dto.setQuantity(ticketType.getQuantity());
        dto.setRemainingQuantity(ticketType.getRemainingQuantity());
        dto.setEventId(ticketType.getEvent().getId());
        dto.setDescription(ticketType.getDescription());
        dto.setActive(ticketType.isActive());
        return dto;
    }
} 