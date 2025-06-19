package com.eventbooking.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eventbooking.dto.EventDTO;
import com.eventbooking.exception.BadRequestException;
import com.eventbooking.exception.InternalServerException;
import com.eventbooking.exception.ResourceNotFoundException;
import com.eventbooking.service.EventService;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class EventController {

    private static final Logger logger = LoggerFactory.getLogger(EventController.class);

    @Autowired
    private EventService eventService;

    @GetMapping
    public ResponseEntity<List<EventDTO>> getAllEvents(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String status) {
        try {
            logger.info("Fetching events with search: {}, status: {}", search, status);
            List<EventDTO> events = eventService.getAllEvents(search, status);
            return ResponseEntity.ok(events);
        } catch (ResourceNotFoundException e) {
            logger.error("Resource not found: {}", e.getMessage());
            throw e;
        } catch (BadRequestException e) {
            logger.error("Bad request: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            logger.error("Error fetching events", e);
            throw new InternalServerException("Error fetching events: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventDTO> getEventById(@PathVariable Long id) {
        try {
            EventDTO event = eventService.getEventById(id);
            return ResponseEntity.ok(event);
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new InternalServerException("Error fetching event: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<EventDTO> createEvent(@RequestBody EventDTO eventDTO) {
        try {
            logger.info("Creating new event: {}", eventDTO.getName());
            
            if (eventDTO.getOrganizerId() == null) {
                logger.error("Organizer ID is missing");
                throw new BadRequestException("Organizer ID is required");
            }

            // Validate required fields
            if (eventDTO.getName() == null || eventDTO.getName().trim().isEmpty()) {
                logger.error("Event name is missing");
                throw new BadRequestException("Event name is required");
            }
            if (eventDTO.getDescription() == null || eventDTO.getDescription().trim().isEmpty()) {
                logger.error("Event description is missing");
                throw new BadRequestException("Event description is required");
            }
            if (eventDTO.getStartTime() == null) {
                logger.error("Event start time is missing");
                throw new BadRequestException("Event start time is required");
            }
            if (eventDTO.getEndTime() == null) {
                logger.error("Event end time is missing");
                throw new BadRequestException("Event end time is required");
            }
            if (eventDTO.getLocation() == null || eventDTO.getLocation().trim().isEmpty()) {
                logger.error("Event location is missing");
                throw new BadRequestException("Event location is required");
            }
            if (eventDTO.getCapacity() == null || eventDTO.getCapacity() <= 0) {
                logger.error("Invalid event capacity: {}", eventDTO.getCapacity());
                throw new BadRequestException("Event capacity must be greater than 0");
            }

            EventDTO createdEvent = eventService.createEvent(eventDTO);
            logger.info("Successfully created event with ID: {}", createdEvent.getId());
            return ResponseEntity.ok(createdEvent);
        } catch (BadRequestException e) {
            logger.error("Bad request while creating event: {}", e.getMessage());
            throw e;
        } catch (ResourceNotFoundException e) {
            logger.error("Resource not found while creating event: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            logger.error("Unexpected error while creating event", e);
            throw new InternalServerException("Error creating event: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventDTO> updateEvent(
            @PathVariable Long id,
            @RequestBody EventDTO eventDTO) {
        try {
            if (eventDTO.getOrganizerId() == null) {
                throw new BadRequestException("Organizer ID is required");
            }
            EventDTO updatedEvent = eventService.updateEvent(id, eventDTO);
            return ResponseEntity.ok(updatedEvent);
        } catch (BadRequestException e) {
            throw e;
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new InternalServerException("Error updating event: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        try {
            eventService.deleteEvent(id);
            return ResponseEntity.ok().build();
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new InternalServerException("Error deleting event: " + e.getMessage());
        }
    }

    @GetMapping("/{id}/statistics")
    public ResponseEntity<Map<String, Object>> getEventStatistics(@PathVariable Long id) {
        try {
            Map<String, Object> stats = eventService.getEventStatistics(id);
            return ResponseEntity.ok(stats);
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new InternalServerException("Error fetching event statistics: " + e.getMessage());
        }
    }

    @GetMapping("/organizer/{organizerId}")
    public ResponseEntity<List<EventDTO>> getEventsByOrganizer(@PathVariable Long organizerId) {
        try {
            List<EventDTO> events = eventService.getEventsByOrganizer(organizerId);
            return ResponseEntity.ok(events);
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new InternalServerException("Error fetching organizer events: " + e.getMessage());
        }
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<EventDTO>> getEventsByCategory(@PathVariable String category) {
        try {
            List<EventDTO> events = eventService.getEventsByCategory(category);
            return ResponseEntity.ok(events);
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new InternalServerException("Error fetching category events: " + e.getMessage());
        }
    }

    @GetMapping("/upcoming")
    public ResponseEntity<List<EventDTO>> getUpcomingEvents() {
        try {
            List<EventDTO> events = eventService.getUpcomingEvents();
            return ResponseEntity.ok(events);
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new InternalServerException("Error fetching upcoming events: " + e.getMessage());
        }
    }

    @GetMapping("/location/{location}")
    public ResponseEntity<List<EventDTO>> getEventsByLocation(@PathVariable String location) {
        try {
            List<EventDTO> events = eventService.getEventsByLocation(location);
            return ResponseEntity.ok(events);
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new InternalServerException("Error fetching location events: " + e.getMessage());
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<EventDTO>> searchEvents(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String category) {
        try {
            List<EventDTO> events;
            if (keyword != null && location != null && category != null) {
                events = eventService.searchEventsByNameLocationAndCategory(keyword, location, category);
            } else if (keyword != null && location != null) {
                events = eventService.searchEventsByNameAndLocation(keyword, location);
            } else if (keyword != null) {
                events = eventService.searchEventsByName(keyword);
            } else {
                events = eventService.getAllEvents(null, null);
            }
            return ResponseEntity.ok(events);
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new InternalServerException("Error searching events: " + e.getMessage());
        }
    }
} 