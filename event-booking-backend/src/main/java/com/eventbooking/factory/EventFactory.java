package com.eventbooking.factory;

import com.eventbooking.dto.EventDTO;
import com.eventbooking.model.Event;
import com.eventbooking.model.User;
import org.springframework.stereotype.Component;

// Factory Pattern: Tách biệt logic tạo đối tượng
@Component
public class EventFactory {
    
    public Event createEvent(EventDTO dto, User organizer) {
        Event event = new Event();
        event.setName(dto.getName());
        event.setDescription(dto.getDescription());
        event.setStartTime(dto.getStartTime());
        event.setEndTime(dto.getEndTime());
        event.setLocation(dto.getLocation());
        event.setCapacity(dto.getCapacity());
        event.setPrice(dto.getPrice());
        event.setImageUrl(dto.getImageUrl());
        event.setCategory(dto.getCategory());
        event.setStatus(dto.getStatus());
        event.setOrganizer(organizer);
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
        dto.setCapacity(event.getCapacity());
        dto.setPrice(event.getPrice());
        dto.setImageUrl(event.getImageUrl());
        dto.setCategory(event.getCategory());
        dto.setStatus(event.getStatus());
        dto.setOrganizerId(event.getOrganizer().getId());
        return dto;
    }
} 