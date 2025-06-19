package com.eventbooking.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class EventDTO {
    private Long id;

    @NotBlank(message = "Event name is required")
    @Size(min = 3, max = 100, message = "Event name must be between 3 and 100 characters")
    private String name;

    @NotBlank(message = "Description is required")
    @Size(max = 1000, message = "Description cannot exceed 1000 characters")
    private String description;

    @NotNull(message = "Start time is required")
    @Future(message = "Start time must be in the future")
    private LocalDateTime startTime;

    @NotNull(message = "End time is required")
    @Future(message = "End time must be in the future")
    private LocalDateTime endTime;

    @NotBlank(message = "Location is required")
    private String location;

    @NotNull(message = "Capacity is required")
    @Min(value = 1, message = "Capacity must be at least 1")
    private Integer capacity;

    private String imageUrl;
    private String category;
    private String status;

    @NotNull(message = "Organizer ID is required")
    private Long organizerId;

    @NotNull(message = "Total tickets is required")
    @Min(value = 0, message = "Total tickets cannot be negative")
    private Integer totalTickets;

    @NotNull(message = "Sold tickets is required")
    @Min(value = 0, message = "Sold tickets cannot be negative")
    private Integer soldTickets;

    private List<TicketTypeDTO> ticketTypes;

    // Getters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public LocalDateTime getStartTime() { return startTime; }
    public LocalDateTime getEndTime() { return endTime; }
    public String getLocation() { return location; }
    public Integer getCapacity() { return capacity; }
    public String getImageUrl() { return imageUrl; }
    public String getCategory() { return category; }
    public String getStatus() { return status; }
    public Long getOrganizerId() { return organizerId; }
    public Integer getTotalTickets() { return totalTickets; }
    public Integer getSoldTickets() { return soldTickets; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setDescription(String description) { this.description = description; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }
    public void setLocation(String location) { this.location = location; }
    public void setCapacity(Integer capacity) { this.capacity = capacity; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public void setCategory(String category) { this.category = category; }
    public void setStatus(String status) { this.status = status; }
    public void setOrganizerId(Long organizerId) { this.organizerId = organizerId; }
    public void setTotalTickets(Integer totalTickets) { this.totalTickets = totalTickets; }
    public void setSoldTickets(Integer soldTickets) { this.soldTickets = soldTickets; }
} 