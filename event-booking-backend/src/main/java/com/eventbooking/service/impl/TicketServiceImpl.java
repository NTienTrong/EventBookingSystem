package com.eventbooking.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eventbooking.dto.CreateTicketDTO;
import com.eventbooking.dto.TicketDTO;
import com.eventbooking.entity.Ticket;
import com.eventbooking.entity.TicketType;
import com.eventbooking.enums.TicketStatus;
import com.eventbooking.exception.ResourceNotFoundException;
import com.eventbooking.exception.TicketValidationException;
import com.eventbooking.factory.TicketFactory;
import com.eventbooking.repository.BookingRepository;
import com.eventbooking.repository.TicketRepository;
import com.eventbooking.repository.TicketTypeRepository;
import com.eventbooking.service.SecurityService;
import com.eventbooking.service.TicketService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class TicketServiceImpl implements TicketService {

    private final TicketRepository ticketRepository;
    private final TicketTypeRepository ticketTypeRepository;
    private final BookingRepository bookingRepository;
    private final SecurityService securityService;
    private final TicketFactory ticketFactory;

    @Override
    @Transactional(readOnly = true)
    public List<TicketDTO> getAllTickets(String search, Long eventId, TicketStatus status) {
        List<Ticket> tickets;
        
        if (search != null && !search.isEmpty()) {
            tickets = ticketRepository.findByTicketCodeContainingIgnoreCaseOrTicketTypeEventNameContainingIgnoreCase(search, search);
        } else if (eventId != null) {
            tickets = ticketRepository.findByTicketTypeEventId(eventId);
        } else if (status != null) {
            tickets = ticketRepository.findByStatus(status);
        } else {
            tickets = ticketRepository.findAll();
        }
        
        return tickets.stream()
            .map(ticketFactory::createTicketDTO)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Ticket getTicketById(Long id) {
        return ticketRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Ticket not found"));
    }

    @Override
    @Transactional(readOnly = true)
    public Ticket getTicketByCode(String ticketCode) {
        return ticketRepository.findByTicketCode(ticketCode)
            .orElseThrow(() -> new ResourceNotFoundException("Ticket not found with code: " + ticketCode));
    }

    @Override
    @Transactional(readOnly = true)
    public List<Ticket> getTicketsByOrderId(Long orderId) {
        return ticketRepository.findByOrderId(orderId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Ticket> getTicketsByCustomerId(Long customerId) {
        return ticketRepository.findByUserId(customerId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Ticket> getTicketsByEventId(Long eventId) {
        return ticketRepository.findByTicketTypeEventIdAndStatus(eventId, null);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Ticket> getTicketsByEventIdAndStatus(Long eventId, TicketStatus status) {
        return ticketRepository.findByTicketTypeEventIdAndStatus(eventId, status);
    }

    @Override
    @Transactional
    public Ticket updateTicketStatus(Long id, TicketStatus status) {
        Ticket ticket = getTicketById(id);
        ticket.setStatus(status);
        if (status == TicketStatus.USED) {
            ticket.setUsedAt(LocalDateTime.now());
        }
        return ticketRepository.save(ticket);
    }

    @Override
    @Transactional
    public void validateTicket(String ticketCode) {
        Ticket ticket = getTicketByCode(ticketCode);
        if (ticket.getStatus() != TicketStatus.ACTIVE) {
            throw new TicketValidationException("Ticket is not active");
        }
        if (ticket.getTicketType() != null && ticket.getTicketType().getEvent() != null) {
            LocalDateTime now = LocalDateTime.now();
            if (now.isBefore(ticket.getTicketType().getEvent().getStartTime())) {
                throw new TicketValidationException("Event has not started yet");
            }
            if (now.isAfter(ticket.getTicketType().getEvent().getEndTime())) {
                throw new TicketValidationException("Event has already ended");
            }
        }
    }

    @Override
    @Transactional(readOnly = true)
    public long countTicketsByEventIdAndStatus(Long eventId, TicketStatus status) {
        return ticketRepository.countByEventIdAndStatus(eventId, status);
    }

    @Override
    @Transactional
    public Ticket createTicket(CreateTicketDTO createTicketDTO) {
        TicketType ticketType = ticketTypeRepository.findById(createTicketDTO.getTicketTypeId())
            .orElseThrow(() -> new ResourceNotFoundException("Ticket type not found"));

        if (!ticketType.getActive()) {
            throw new TicketValidationException("Ticket type is not active");
        }

        if (ticketType.getAvailableQuantity() <= 0) {
            throw new TicketValidationException("No tickets available");
        }

        var booking = bookingRepository.findById(createTicketDTO.getBookingId())
            .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        Ticket ticket = ticketFactory.createTicket(createTicketDTO, ticketType);
        ticket.setBooking(booking);
        ticket = ticketRepository.save(ticket);

        ticketType.setAvailableQuantity(ticketType.getAvailableQuantity() - 1);
        ticketTypeRepository.save(ticketType);

        return ticket;
    }

    @Override
    @Transactional
    public void deleteTicket(Long id) {
        Ticket ticket = getTicketById(id);
        ticketRepository.delete(ticket);
    }
}