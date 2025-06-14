package com.eventbooking.controller;

import com.eventbooking.model.Ticket;
import com.eventbooking.model.TicketStatus;
import com.eventbooking.dto.TicketDTO;
import com.eventbooking.dto.CreateTicketDTO;
import com.eventbooking.dto.UpdateTicketStatusDTO;
import com.eventbooking.service.TicketService;
import com.eventbooking.factory.TicketFactory;
import com.eventbooking.exception.ResourceNotFoundException;
import com.eventbooking.exception.TicketValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService ticketService;
    private final TicketFactory ticketFactory;

    @Autowired
    public TicketController(TicketService ticketService, TicketFactory ticketFactory) {
        this.ticketService = ticketService;
        this.ticketFactory = ticketFactory;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TicketDTO> createTicket(@RequestBody CreateTicketDTO createTicketDTO) {
        try {
            Ticket ticket = ticketService.createTicket(createTicketDTO);
            return ResponseEntity.ok(ticketFactory.createTicketDTO(ticket));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (TicketValidationException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @securityService.isTicketOwner(#id)")
    public ResponseEntity<TicketDTO> getTicketById(@PathVariable Long id) {
        try {
            Ticket ticket = ticketService.getTicketById(id);
            return ResponseEntity.ok(ticketFactory.createTicketDTO(ticket));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/code/{ticketCode}")
    @PreAuthorize("hasRole('ADMIN') or @securityService.isTicketOwnerByCode(#ticketCode)")
    public ResponseEntity<TicketDTO> getTicketByCode(@PathVariable String ticketCode) {
        try {
            Ticket ticket = ticketService.getTicketByCode(ticketCode);
            return ResponseEntity.ok(ticketFactory.createTicketDTO(ticket));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/order/{orderId}")
    @PreAuthorize("hasRole('ADMIN') or @securityService.isOrderOwner(#orderId)")
    public ResponseEntity<List<TicketDTO>> getTicketsByOrderId(@PathVariable Long orderId) {
        List<Ticket> tickets = ticketService.getTicketsByOrderId(orderId);
        List<TicketDTO> ticketDTOs = tickets.stream()
            .map(ticketFactory::createTicketDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(ticketDTOs);
    }

    @GetMapping("/customer/{customerId}")
    @PreAuthorize("hasRole('ADMIN') or @securityService.isCurrentUser(#customerId)")
    public ResponseEntity<List<TicketDTO>> getTicketsByCustomerId(@PathVariable Long customerId) {
        List<Ticket> tickets = ticketService.getTicketsByCustomerId(customerId);
        List<TicketDTO> ticketDTOs = tickets.stream()
            .map(ticketFactory::createTicketDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(ticketDTOs);
    }

    @GetMapping("/event/{eventId}")
    @PreAuthorize("hasRole('ADMIN') or @securityService.isEventOrganizer(#eventId)")
    public ResponseEntity<List<TicketDTO>> getTicketsByEventId(@PathVariable Long eventId) {
        List<Ticket> tickets = ticketService.getTicketsByEventId(eventId);
        List<TicketDTO> ticketDTOs = tickets.stream()
            .map(ticketFactory::createTicketDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(ticketDTOs);
    }

    @GetMapping("/event/{eventId}/status/{status}")
    @PreAuthorize("hasRole('ADMIN') or @securityService.isEventOrganizer(#eventId)")
    public ResponseEntity<List<TicketDTO>> getTicketsByEventIdAndStatus(
            @PathVariable Long eventId,
            @PathVariable TicketStatus status) {
        List<Ticket> tickets = ticketService.getTicketsByEventIdAndStatus(eventId, status);
        List<TicketDTO> ticketDTOs = tickets.stream()
            .map(ticketFactory::createTicketDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(ticketDTOs);
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN') or @securityService.isEventOrganizerForTicket(#id)")
    public ResponseEntity<TicketDTO> updateTicketStatus(
            @PathVariable Long id,
            @RequestBody UpdateTicketStatusDTO updateTicketStatusDTO) {
        try {
            Ticket ticket = ticketService.updateTicketStatus(id, updateTicketStatusDTO.getStatus());
            return ResponseEntity.ok(ticketFactory.createTicketDTO(ticket));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/validate/{ticketCode}")
    @PreAuthorize("hasRole('ADMIN') or @securityService.isEventOrganizerForTicketByCode(#ticketCode)")
    public ResponseEntity<Void> validateTicket(@PathVariable String ticketCode) {
        try {
            ticketService.validateTicket(ticketCode);
            return ResponseEntity.ok().build();
        } catch (TicketValidationException e) {
            return ResponseEntity.badRequest().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/event/{eventId}/count")
    @PreAuthorize("hasRole('ADMIN') or @securityService.isEventOrganizer(#eventId)")
    public ResponseEntity<Long> countTicketsByEventIdAndStatus(
            @PathVariable Long eventId,
            @RequestParam TicketStatus status) {
        long count = ticketService.countTicketsByEventIdAndStatus(eventId, status);
        return ResponseEntity.ok(count);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<TicketDTO>> getAllTickets() {
        List<Ticket> tickets = ticketService.getAllTickets();
        List<TicketDTO> ticketDTOs = tickets.stream()
            .map(ticketFactory::createTicketDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(ticketDTOs);
    }
} 