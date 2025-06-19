package com.eventbooking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eventbooking.dto.CreateTicketDTO;
import com.eventbooking.dto.TicketDTO;
import com.eventbooking.dto.UpdateTicketStatusDTO;
import com.eventbooking.entity.Ticket;
import com.eventbooking.enums.TicketStatus;
import com.eventbooking.exception.ResourceNotFoundException;
import com.eventbooking.exception.TicketValidationException;
import com.eventbooking.factory.TicketFactory;
import com.eventbooking.service.SecurityService;
import com.eventbooking.service.TicketService;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class TicketController {
    private final TicketService ticketService;
    private final TicketFactory ticketFactory;
    private final SecurityService securityService;

    @Autowired
    public TicketController(TicketService ticketService, TicketFactory ticketFactory, SecurityService securityService) {
        this.ticketService = ticketService;
        this.ticketFactory = ticketFactory;
        this.securityService = securityService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<TicketDTO>> getAllTickets(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Long eventId,
            @RequestParam(required = false) TicketStatus status) {
        return ResponseEntity.ok(ticketService.getAllTickets(search, eventId, status));
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

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TicketDTO> createTicket(@RequestBody CreateTicketDTO createTicketDTO) {
        try {
            if (createTicketDTO.getBookingId() == null) {
                return ResponseEntity.badRequest().build();
            }
            Ticket ticket = ticketService.createTicket(createTicketDTO);
            return ResponseEntity.ok(ticketFactory.createTicketDTO(ticket));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (TicketValidationException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TicketDTO> updateTicket(@PathVariable Long id, @RequestBody TicketDTO ticketDTO) {
        try {
            Ticket ticket = ticketService.updateTicketStatus(id, ticketDTO.getStatus());
            return ResponseEntity.ok(ticketFactory.createTicketDTO(ticket));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteTicket(@PathVariable Long id) {
        try {
            ticketService.deleteTicket(id);
            return ResponseEntity.ok().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TicketDTO> updateTicketStatus(
            @PathVariable Long id,
            @RequestBody UpdateTicketStatusDTO statusDTO) {
        try {
            Ticket ticket = ticketService.updateTicketStatus(id, statusDTO.getStatus());
            return ResponseEntity.ok(ticketFactory.createTicketDTO(ticket));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/validate")
    public ResponseEntity<Boolean> validateTicket(@RequestBody String ticketCode) {
        try {
            ticketService.validateTicket(ticketCode);
            return ResponseEntity.ok(true);
        } catch (TicketValidationException e) {
            return ResponseEntity.ok(false);
        }
    }

    @GetMapping("/customer/{customerId}")
    @PreAuthorize("hasRole('ADMIN') or @securityService.isCurrentUser(#customerId)")
    public ResponseEntity<List<TicketDTO>> getTicketsByCustomerId(@PathVariable Long customerId) {
        return ResponseEntity.ok(
            ticketService.getTicketsByCustomerId(customerId)
                .stream()
                .map(ticketFactory::createTicketDTO)
                .toList()
        );
    }
} 