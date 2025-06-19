package com.eventbooking.service.impl;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eventbooking.dto.EventDTO;
import com.eventbooking.exception.BadRequestException;
import com.eventbooking.exception.ResourceNotFoundException;
import com.eventbooking.factory.EventFactory;
import com.eventbooking.entity.Event;
import com.eventbooking.enums.EventStatus;
import com.eventbooking.entity.TicketType;
import com.eventbooking.entity.User;
import com.eventbooking.repository.EventRepository;
import com.eventbooking.repository.UserRepository;
import com.eventbooking.service.EventService;

@Service
@Transactional
public class EventServiceImpl implements EventService {
    
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final EventFactory eventFactory;
    private static final Logger logger = LoggerFactory.getLogger(EventServiceImpl.class);

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
        validateEventData(eventDTO);
        Event event = eventFactory.createEvent(eventDTO);
        Event savedEvent = eventRepository.save(event);
        return eventFactory.createEventDTO(savedEvent);
    }

    @Override
    public EventDTO updateEvent(Long id, EventDTO eventDTO) {
        Event existingEvent = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));

        validateEventData(eventDTO);

        existingEvent.setName(eventDTO.getName());
        existingEvent.setDescription(eventDTO.getDescription());
        existingEvent.setStartTime(eventDTO.getStartTime());
        existingEvent.setEndTime(eventDTO.getEndTime());
        existingEvent.setLocation(eventDTO.getLocation());
        existingEvent.setCapacity(eventDTO.getCapacity());
        existingEvent.setImageUrl(eventDTO.getImageUrl());
        existingEvent.setCategory(eventDTO.getCategory());
        existingEvent.setStatus(EventStatus.valueOf(eventDTO.getStatus().toUpperCase()));
        existingEvent.setTotalTickets(eventDTO.getTotalTickets());
        existingEvent.setSoldTickets(eventDTO.getSoldTickets());

        existingEvent.setUpdatedAt(LocalDateTime.now()); // Ensure updated time is set for the event itself
        Event savedEvent = eventRepository.save(existingEvent);
        return eventFactory.createEventDTO(savedEvent);
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
        List<Event> events;
        if (search != null && !search.isEmpty()) {
            events = eventRepository.findByNameContainingOrDescriptionContaining(search, search);
        } else if (status != null && !status.isEmpty()) {
            try {
                logger.info("Converting status: {} to EventStatus enum", status);
                EventStatus eventStatus = EventStatus.valueOf(status.toUpperCase());
                events = eventRepository.findByStatus(eventStatus, Pageable.unpaged()).getContent();
            } catch (IllegalArgumentException e) {
                logger.error("Invalid event status: {}", status);
                throw new BadRequestException("Invalid event status: " + status);
            }
        } else {
            events = eventRepository.findAll();
        }
        return events.stream()
                .map(eventFactory::createEventDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Page<EventDTO> getEventsByPage(Pageable pageable) {
        return eventRepository.findAll(pageable).map(eventFactory::createEventDTO);
    }

    @Override
    public List<EventDTO> getUpcomingEvents() {
        LocalDateTime now = LocalDateTime.now();
        return eventRepository.findByStartTimeAfter(now).stream()
                .map(eventFactory::createEventDTO)
                .toList();
    }

    @Override
    public List<EventDTO> getEventsByOrganizer(Long organizerId) {
        return eventRepository.findByOrganizerId(organizerId).stream()
                .map(eventFactory::createEventDTO)
                .toList();
    }

    @Override
    public List<EventDTO> getEventsByCategory(String category) {
        return eventRepository.findByCategory(category).stream()
            .map(eventFactory::createEventDTO)
            .collect(Collectors.toList());
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
        return stats;
    }

    private void validateEventData(EventDTO eventDTO) {
        if (eventDTO.getName() == null || eventDTO.getName().trim().isEmpty()) {
            throw new BadRequestException("Event name is required");
        }
        if (eventDTO.getDescription() == null || eventDTO.getDescription().trim().isEmpty()) {
            throw new BadRequestException("Event description is required");
        }
        if (eventDTO.getStartTime() == null || eventDTO.getEndTime() == null) {
            throw new IllegalArgumentException("Start time and end time are required");
        }
        if (eventDTO.getStartTime().isAfter(eventDTO.getEndTime())) {
            throw new IllegalArgumentException("Start time must be before end time");
        }
        if (eventDTO.getLocation() == null || eventDTO.getLocation().trim().isEmpty()) {
            throw new BadRequestException("Location is required");
        }
        if (eventDTO.getCapacity() != null && eventDTO.getCapacity() < 0) {
            throw new IllegalArgumentException("Capacity cannot be negative");
        }
        if (eventDTO.getOrganizerId() == null) {
            throw new BadRequestException("Organizer ID is required");
        }
        if (eventDTO.getTotalTickets() != null && eventDTO.getTotalTickets() < 0) {
            throw new IllegalArgumentException("Total tickets cannot be negative");
        }
        if (eventDTO.getSoldTickets() != null && eventDTO.getSoldTickets() < 0) {
            throw new IllegalArgumentException("Sold tickets cannot be negative");
        }
        if (eventDTO.getTotalTickets() != null && eventDTO.getSoldTickets() != null 
            && eventDTO.getSoldTickets() > eventDTO.getTotalTickets()) {
            throw new IllegalArgumentException("Sold tickets cannot be greater than total tickets");
        }
    }
} 