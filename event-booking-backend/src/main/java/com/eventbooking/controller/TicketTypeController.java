package com.eventbooking.controller;

import java.util.List;

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

import com.eventbooking.dto.TicketTypeDTO;
import com.eventbooking.service.TicketTypeService;

@RestController
@RequestMapping("/api/ticket-types")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class TicketTypeController {

    private final TicketTypeService ticketTypeService;

    @Autowired
    public TicketTypeController(TicketTypeService ticketTypeService) {
        this.ticketTypeService = ticketTypeService;
    }

    @GetMapping
    public ResponseEntity<List<TicketTypeDTO>> getAllTicketTypes(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Long eventId) {
        return ResponseEntity.ok(ticketTypeService.getAllTicketTypes(search, eventId));
    }

    @PostMapping
    public ResponseEntity<TicketTypeDTO> createTicketType(@RequestBody TicketTypeDTO ticketTypeDTO) {
        return ResponseEntity.ok(ticketTypeService.createTicketType(ticketTypeDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TicketTypeDTO> updateTicketType(
            @PathVariable Long id,
            @RequestBody TicketTypeDTO ticketTypeDTO) {
        return ResponseEntity.ok(ticketTypeService.updateTicketType(id, ticketTypeDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTicketType(@PathVariable Long id) {
        ticketTypeService.deleteTicketType(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TicketTypeDTO> getTicketTypeById(@PathVariable Long id) {
        return ResponseEntity.ok(ticketTypeService.getTicketTypeById(id));
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<TicketTypeDTO>> getTicketTypesByEventId(@PathVariable Long eventId) {
        return ResponseEntity.ok(ticketTypeService.getTicketTypesByEventId(eventId));
    }
} 