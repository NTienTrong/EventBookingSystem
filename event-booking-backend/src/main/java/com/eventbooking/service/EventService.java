package com.eventbooking.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.eventbooking.dto.EventDTO;

// Service Layer Pattern
public interface EventService {
    List<EventDTO> getAllEvents(String search, String status);
    EventDTO getEventById(Long id);
    EventDTO createEvent(EventDTO eventDTO);
    EventDTO updateEvent(Long id, EventDTO eventDTO);
    void deleteEvent(Long id);
    Map<String, Object> getEventStatistics(Long id);
    
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

    Page<EventDTO> getEventsByPage(Pageable pageable);
} 