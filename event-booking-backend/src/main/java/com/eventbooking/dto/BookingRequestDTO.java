package com.eventbooking.dto;

import java.math.BigDecimal;
import java.util.List;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonProperty;

@Data
public class BookingRequestDTO {
    @NotNull(message = "Event ID is required")
    private Long eventId;

    @NotEmpty(message = "At least one ticket is required")
    private List<BookingTicketDTO> tickets;

    @NotBlank(message = "Customer name is required")
    private String customerName;

    @NotBlank(message = "Customer email is required")
    @Email(message = "Invalid email format")
    private String customerEmail;

    @NotBlank(message = "Customer phone is required")
    private String customerPhone;

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "Number of tickets is required")
    @JsonProperty("numberOfTickets")
    private Integer numberOfTickets;

    @NotBlank(message = "Payment method is required")
    private String paymentMethod;

    @NotNull(message = "Total amount is required")
    private BigDecimal totalAmount;

    @Data
    public static class BookingTicketDTO {
        @NotNull(message = "Ticket type ID is required")
        private Long ticketTypeId;

        @NotNull(message = "Quantity is required")
        private Integer quantity;
    }
} 