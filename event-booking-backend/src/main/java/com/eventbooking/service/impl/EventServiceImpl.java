package com.eventbooking.service.impl;

import com.eventbooking.dto.EventDTO;
import com.eventbooking.model.Event;
import com.eventbooking.model.User;
import com.eventbooking.repository.EventRepository;
import com.eventbooking.repository.UserRepository;
import com.eventbooking.service.EventService;
import com.eventbooking.exception.ResourceNotFoundException;
import com.eventbooking.factory.EventFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Map;
import java.util.HashMap;

@Service
@Transactional
public class EventServiceImpl implements EventService {
    
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final EventFactory eventFactory;

    @Autowired
    public EventServiceImpl(EventRepository eventRepository, 
                          UserRepository userRepository,
                          EventFactory eventFactory) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
        this.eventFactory = eventFactory;
    }

    @Override
    public EventDTO createEvent(EventDTO eventDTO) {
        User organizer = userRepository.findById(eventDTO.getOrganizerId())
            .orElseThrow(() -> new ResourceNotFoundException("Organizer not found"));
        
        Event event = eventFactory.createEvent(eventDTO, organizer);
        Event savedEvent = eventRepository.save(event);
        return eventFactory.createEventDTO(savedEvent);
    }

    @Override
    public EventDTO updateEvent(Long id, EventDTO eventDTO) {
        Event event = eventRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));
        
        event.setName(eventDTO.getName());
        event.setDescription(eventDTO.getDescription());
        event.setStartTime(eventDTO.getStartTime());
        event.setEndTime(eventDTO.getEndTime());
        event.setLocation(eventDTO.getLocation());
        event.setCapacity(eventDTO.getCapacity());
        event.setPrice(eventDTO.getPrice());
        event.setImageUrl(eventDTO.getImageUrl());
        event.setCategory(eventDTO.getCategory());
        event.setStatus(eventDTO.getStatus());
        
        Event updatedEvent = eventRepository.save(event);
        return eventFactory.createEventDTO(updatedEvent);
    }

    @Override
    public void deleteEvent(Long id) {
        if (!eventRepository.existsById(id)) {
            throw new ResourceNotFoundException("Event not found with id: " + id);
        }
        eventRepository.deleteById(id);
    }

    @Override
    public EventDTO getEventById(Long id) {
        Event event = eventRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));
        return eventFactory.createEventDTO(event);
    }

    @Override
    public List<EventDTO> getAllEvents(String search, String status) {
        if (search != null && !search.isEmpty()) {
            return eventRepository.searchByName(search).stream()
                .map(eventFactory::createEventDTO)
                .collect(Collectors.toList());
        }
        if (status != null && !status.isEmpty()) {
            return eventRepository.findByStatus(status).stream()
                .map(eventFactory::createEventDTO)
                .collect(Collectors.toList());
        }
        return eventRepository.findAll().stream()
            .map(eventFactory::createEventDTO)
            .collect(Collectors.toList());
    }

    @Override
    public List<EventDTO> getEventsByOrganizer(Long organizerId) {
        return eventRepository.findByOrganizerId(organizerId).stream()
            .map(eventFactory::createEventDTO)
            .collect(Collectors.toList());
    }

    @Override
    public List<EventDTO> getEventsByCategory(String category) {
        return eventRepository.findByCategory(category).stream()
            .map(eventFactory::createEventDTO)
            .collect(Collectors.toList());
    }

    @Override
    public List<EventDTO> getUpcomingEvents() {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public List<EventDTO> getEventsByLocation(String location) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public List<EventDTO> searchEventsByName(String keyword) {
        return eventRepository.searchByName(keyword).stream()
            .map(eventFactory::createEventDTO)
            .collect(Collectors.toList());
    }

    @Override
    public List<EventDTO> filterEventsByDateRange(LocalDateTime start, LocalDateTime end) {
        return eventRepository.findByStartTimeBetween(start, end).stream()
            .map(eventFactory::createEventDTO)
            .collect(Collectors.toList());
    }

    @Override
    public List<EventDTO> searchEventsByNameAndDateRange(String keyword, LocalDateTime start, LocalDateTime end) {
        return eventRepository.searchByNameAndDateRange(keyword, start, end).stream()
            .map(eventFactory::createEventDTO)
            .collect(Collectors.toList());
    }

    @Override
    public List<EventDTO> searchEventsByNameAndLocation(String keyword, String location) {
        return eventRepository.searchByNameAndLocation(keyword, location).stream()
            .map(eventFactory::createEventDTO)
            .collect(Collectors.toList());
    }

    @Override
    public List<EventDTO> searchEventsByNameLocationAndCategory(String keyword, String location, String category) {
        return eventRepository.searchByNameLocationAndCategory(keyword, location, category).stream()
            .map(eventFactory::createEventDTO)
            .collect(Collectors.toList());
    }

    @Override
    public Map<String, Object> getEventStatistics(Long id) {
        Event event = eventRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Event not found"));
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalTickets", event.getTotalTickets());
        stats.put("soldTickets", event.getSoldTickets());
        stats.put("revenue", event.getRevenue());
        return stats;
    }
} 