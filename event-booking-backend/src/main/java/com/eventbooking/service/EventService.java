package com.eventbooking.service;

import com.eventbooking.dto.EventDTO;
import java.time.LocalDateTime;
import java.util.List;

// Service Layer Pattern
public interface EventService {
    EventDTO createEvent(EventDTO eventDTO, Long organizerId);
    EventDTO updateEvent(Long id, EventDTO eventDTO);
    void deleteEvent(Long id);
    EventDTO getEventById(Long id);
    List<EventDTO> getAllEvents();
    List<EventDTO> getUpcomingEvents();
    List<EventDTO> getEventsByCategory(String category);
    List<EventDTO> getEventsByLocation(String location);
    List<EventDTO> getEventsByOrganizer(Long organizerId);
    
    // Tìm kiếm theo tên
    List<EventDTO> searchEventsByName(String keyword);
    
    // Lọc theo khoảng thời gian
    List<EventDTO> filterEventsByDateRange(LocalDateTime start, LocalDateTime end);
    
    // Tìm kiếm theo tên và lọc theo khoảng thời gian
    List<EventDTO> searchEventsByNameAndDateRange(String keyword, LocalDateTime start, LocalDateTime end);
    
    // Tìm kiếm theo tên và địa điểm
    List<EventDTO> searchEventsByNameAndLocation(String keyword, String location);
    
    // Tìm kiếm theo tên, địa điểm và thể loại
    List<EventDTO> searchEventsByNameLocationAndCategory(String keyword, String location, String category);
} 