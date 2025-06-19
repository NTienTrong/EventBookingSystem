package com.eventbooking.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eventbooking.dto.TicketTypeDTO;
import com.eventbooking.entity.Event;
import com.eventbooking.entity.TicketType;
import com.eventbooking.exception.ResourceNotFoundException;
import com.eventbooking.repository.EventRepository;
import com.eventbooking.repository.TicketTypeRepository;
import com.eventbooking.service.TicketTypeService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TicketTypeServiceImpl implements TicketTypeService {

    private final TicketTypeRepository ticketTypeRepository;
    private final EventRepository eventRepository;

    private TicketTypeDTO convertToDTO(TicketType ticketType) {
        TicketTypeDTO dto = new TicketTypeDTO();
        dto.setId(ticketType.getId());
        dto.setEventId(ticketType.getEvent().getId());
        dto.setName(ticketType.getName());
        dto.setDescription(ticketType.getDescription());
        dto.setPrice(ticketType.getPrice());
        dto.setQuantity(ticketType.getQuantity());
        dto.setAvailableQuantity(ticketType.getAvailableQuantity());
        dto.setActive(ticketType.getActive());
        dto.setSaleStartDate(ticketType.getSaleStartDate());
        dto.setSaleEndDate(ticketType.getSaleEndDate());
        dto.setCreatedAt(ticketType.getCreatedAt());
        dto.setUpdatedAt(ticketType.getUpdatedAt());
        return dto;
    }

    private TicketType convertToEntity(TicketTypeDTO dto) {
        Event event = eventRepository.findById(dto.getEventId())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with ID: " + dto.getEventId()));

        TicketType ticketType = new TicketType();
        ticketType.setId(dto.getId());
        ticketType.setEvent(event);
        ticketType.setName(dto.getName());
        ticketType.setDescription(dto.getDescription());
        ticketType.setPrice(dto.getPrice());
        ticketType.setQuantity(dto.getQuantity());
        ticketType.setAvailableQuantity(dto.getAvailableQuantity() != null ? dto.getAvailableQuantity() : dto.getQuantity());
        ticketType.setActive(dto.getActive() != null ? dto.getActive() : true);
        ticketType.setSaleStartDate(dto.getSaleStartDate());
        ticketType.setSaleEndDate(dto.getSaleEndDate());
        ticketType.setCreatedAt(dto.getCreatedAt() != null ? dto.getCreatedAt() : LocalDateTime.now());
        ticketType.setUpdatedAt(LocalDateTime.now());
        return ticketType;
    }

    @Override
    @Transactional
    public TicketTypeDTO createTicketType(TicketTypeDTO ticketTypeDTO) {
        TicketType ticketType = convertToEntity(ticketTypeDTO);
        ticketType.setCreatedAt(LocalDateTime.now());
        ticketType.setUpdatedAt(LocalDateTime.now());
        TicketType savedTicketType = ticketTypeRepository.save(ticketType);
        return convertToDTO(savedTicketType);
    }

    @Override
    public TicketTypeDTO getTicketTypeById(Long id) {
        TicketType ticketType = ticketTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TicketType not found with ID: " + id));
        return convertToDTO(ticketType);
    }

    @Override
    public List<TicketTypeDTO> getTicketTypesByEventId(Long eventId) {
        return ticketTypeRepository.findByEventId(eventId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<TicketTypeDTO> getAllTicketTypes(String search, Long eventId) {
        List<TicketType> ticketTypes;
        if (search != null && !search.isEmpty()) {
            ticketTypes = ticketTypeRepository.findByNameContainingIgnoreCase(search);
        } else if (eventId != null) {
            ticketTypes = ticketTypeRepository.findByEventId(eventId);
        } else {
            ticketTypes = ticketTypeRepository.findAll();
        }
        return ticketTypes.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public TicketTypeDTO updateTicketType(Long id, TicketTypeDTO ticketTypeDTO) {
        TicketType existingTicketType = ticketTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TicketType not found with ID: " + id));

        Event event = eventRepository.findById(ticketTypeDTO.getEventId())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with ID: " + ticketTypeDTO.getEventId()));

        existingTicketType.setEvent(event);
        existingTicketType.setName(ticketTypeDTO.getName());
        existingTicketType.setDescription(ticketTypeDTO.getDescription());
        existingTicketType.setPrice(ticketTypeDTO.getPrice());
        existingTicketType.setQuantity(ticketTypeDTO.getQuantity());
        existingTicketType.setAvailableQuantity(ticketTypeDTO.getAvailableQuantity());
        existingTicketType.setActive(ticketTypeDTO.getActive());
        existingTicketType.setSaleStartDate(ticketTypeDTO.getSaleStartDate());
        existingTicketType.setSaleEndDate(ticketTypeDTO.getSaleEndDate());
        existingTicketType.setUpdatedAt(LocalDateTime.now());

        TicketType updatedTicketType = ticketTypeRepository.save(existingTicketType);
        return convertToDTO(updatedTicketType);
    }

    @Override
    @Transactional
    public void deleteTicketType(Long id) {
        TicketType ticketType = ticketTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TicketType not found with ID: " + id));
        ticketTypeRepository.delete(ticketType);
    }

    @Override
    @Transactional
    public void updateAvailableQuantity(Long ticketTypeId, int quantityChange) {
        TicketType ticketType = ticketTypeRepository.findById(ticketTypeId)
                .orElseThrow(() -> new ResourceNotFoundException("TicketType not found with ID: " + ticketTypeId));

        int newAvailableQuantity = ticketType.getAvailableQuantity() + quantityChange;
        if (newAvailableQuantity < 0) {
            throw new IllegalArgumentException("Available quantity cannot be negative");
        }
        ticketType.setAvailableQuantity(newAvailableQuantity);
        ticketType.setUpdatedAt(LocalDateTime.now());
        ticketTypeRepository.save(ticketType);
    }
} 