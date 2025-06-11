package com.eventbooking.repository;

import com.eventbooking.model.Event;
import com.eventbooking.model.EventStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    Page<Event> findByStatus(EventStatus status, Pageable pageable);
    
    @Query("SELECT e FROM Event e WHERE e.status = :status AND e.eventDate > :now")
    Page<Event> findUpcomingEvents(@Param("status") EventStatus status, @Param("now") LocalDateTime now, Pageable pageable);
    
    @Query("SELECT e FROM Event e WHERE e.status = :status AND e.eventDate < :now")
    Page<Event> findPastEvents(@Param("status") EventStatus status, @Param("now") LocalDateTime now, Pageable pageable);
    
    @Query("SELECT e FROM Event e WHERE e.status = :status AND " +
           "LOWER(e.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(e.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Event> searchEvents(@Param("status") EventStatus status, @Param("keyword") String keyword, Pageable pageable);
    
    List<Event> findByCategoryId(Long categoryId);

    List<Event> findByOrganizerId(Long organizerId);
    
    @Query("SELECT e FROM Event e WHERE e.startTime > :now AND e.status = 'ACTIVE'")
    List<Event> findUpcomingEvents(LocalDateTime now);
    
    List<Event> findByCategory(String category);
    
    @Query("SELECT e FROM Event e WHERE e.location LIKE %:location%")
    List<Event> findByLocationContaining(String location);

    List<Event> findByLocation(String location);

    // Tìm kiếm theo tên (tìm kiếm mờ)
    @Query("SELECT e FROM Event e WHERE LOWER(e.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Event> searchByName(@Param("keyword") String keyword);
    
    // Lọc theo khoảng thời gian
    List<Event> findByStartTimeBetween(LocalDateTime start, LocalDateTime end);
    
    // Tìm kiếm theo tên và lọc theo khoảng thời gian
    @Query("SELECT e FROM Event e WHERE LOWER(e.name) LIKE LOWER(CONCAT('%', :keyword, '%')) AND e.startTime BETWEEN :start AND :end")
    List<Event> searchByNameAndDateRange(
        @Param("keyword") String keyword,
        @Param("start") LocalDateTime start,
        @Param("end") LocalDateTime end
    );
    
    // Tìm kiếm theo tên và địa điểm
    @Query("SELECT e FROM Event e WHERE LOWER(e.name) LIKE LOWER(CONCAT('%', :keyword, '%')) AND LOWER(e.location) LIKE LOWER(CONCAT('%', :location, '%'))")
    List<Event> searchByNameAndLocation(
        @Param("keyword") String keyword,
        @Param("location") String location
    );
    
    // Tìm kiếm theo tên, địa điểm và thể loại
    @Query("SELECT e FROM Event e WHERE LOWER(e.name) LIKE LOWER(CONCAT('%', :keyword, '%')) AND LOWER(e.location) LIKE LOWER(CONCAT('%', :location, '%')) AND e.category = :category")
    List<Event> searchByNameLocationAndCategory(
        @Param("keyword") String keyword,
        @Param("location") String location,
        @Param("category") String category
    );
} 