package com.eventbooking.factory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.eventbooking.dto.EventDTO;
import com.eventbooking.entity.Event;
import com.eventbooking.entity.User;
import com.eventbooking.enums.EventStatus;
import com.eventbooking.repository.UserRepository;

// Factory Pattern: Tách biệt logic tạo đối tượng
@Component
public class EventFactory {
    @Autowired
    private UserRepository userRepository;

    public Event createEvent(EventDTO dto) {
        Event event = new Event();
        event.setName(dto.getName());
        event.setDescription(dto.getDescription());
        event.setStartTime(dto.getStartTime());
        event.setEndTime(dto.getEndTime());
        event.setLocation(dto.getLocation());
        event.setImageUrl(dto.getImageUrl());
        event.setCategory(dto.getCategory());
        event.setCapacity(dto.getCapacity());
        event.setTotalTickets(dto.getTotalTickets());
        event.setSoldTickets(dto.getSoldTickets());
        event.setStatus(EventStatus.valueOf(dto.getStatus().toUpperCase()));
        // Set organizer as admin with id 1
        User admin = userRepository.findById(1L).orElse(null);
        event.setOrganizer(admin);
        return event;
    }

    public EventDTO createEventDTO(Event event) {
        EventDTO dto = new EventDTO();
        dto.setId(event.getId());
        dto.setName(event.getName());
        dto.setDescription(event.getDescription());
        dto.setStartTime(event.getStartTime());
        dto.setEndTime(event.getEndTime());
        dto.setLocation(event.getLocation());
        dto.setImageUrl(event.getImageUrl());
        dto.setCategory(event.getCategory());
        dto.setCapacity(event.getCapacity());
        dto.setTotalTickets(event.getTotalTickets());
        dto.setSoldTickets(event.getSoldTickets());
        dto.setStatus(event.getStatus().name());
        if (event.getOrganizer() != null) {
            dto.setOrganizerId(event.getOrganizer().getId());
        }
        return dto;
    }
} 