package com.eventbooking.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class TicketTypeDTO {
    private Long id;

    @NotNull(message = "Event ID is required")
    private Long eventId;

    @NotBlank(message = "Ticket type name is required")
    private String name;

    private String description;

    @Min(value = 0, message = "Price cannot be negative")
    private BigDecimal price;

    @NotNull(message = "Quantity is required")
    @Min(value = 0, message = "Quantity cannot be negative")
    private Integer quantity;

    private Integer availableQuantity;

    @NotNull(message = "Active status is required")
    private Boolean active;

    private LocalDateTime saleStartDate;
    private LocalDateTime saleEndDate;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 