package com.eventbooking.service.impl;

import com.eventbooking.model.Ticket;
import com.eventbooking.model.TicketStatus;
import com.eventbooking.model.OrderStatus;
import com.eventbooking.model.OrderItem;
import com.eventbooking.dto.CreateTicketDTO;
import com.eventbooking.repository.TicketRepository;
import com.eventbooking.repository.OrderItemRepository;
import com.eventbooking.service.TicketService;
import com.eventbooking.exception.ResourceNotFoundException;
import com.eventbooking.exception.TicketValidationException;
import com.eventbooking.service.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class TicketServiceImpl implements TicketService {

    private final TicketRepository ticketRepository;
    private final OrderItemRepository orderItemRepository;
    private final SecurityService securityService;

    @Autowired
    public TicketServiceImpl(TicketRepository ticketRepository,
                            OrderItemRepository orderItemRepository,
                            SecurityService securityService) {
        this.ticketRepository = ticketRepository;
        this.orderItemRepository = orderItemRepository;
        this.securityService = securityService;
    }

    @Override
    public Ticket getTicketById(Long id) {
        return ticketRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Ticket not found with id: " + id));
    }

    @Override
    public Ticket getTicketByCode(String ticketCode) {
        return ticketRepository.findByTicketCode(ticketCode)
            .orElseThrow(() -> new ResourceNotFoundException("Ticket not found with code: " + ticketCode));
    }

    @Override
    public List<Ticket> getTicketsByOrderId(Long orderId) {
        return ticketRepository.findByOrderId(orderId);
    }

    @Override
    public List<Ticket> getTicketsByCustomerId(Long customerId) {
        return ticketRepository.findByCustomerId(customerId);
    }

    @Override
    public List<Ticket> getTicketsByEventId(Long eventId) {
        return ticketRepository.findByEventIdAndStatus(eventId, TicketStatus.ACTIVE);
    }

    @Override
    public List<Ticket> getTicketsByEventIdAndStatus(Long eventId, TicketStatus status) {
        return ticketRepository.findByEventIdAndStatus(eventId, status);
    }

    @Override
    public Ticket updateTicketStatus(Long id, TicketStatus status) {
        Ticket ticket = getTicketById(id);
        ticket.setStatus(status);
        if (status == TicketStatus.USED) {
            ticket.setUsedAt(LocalDateTime.now());
        }
        return ticketRepository.save(ticket);
    }

    @Override
    public void validateTicket(String ticketCode) {
        Ticket ticket = getTicketByCode(ticketCode);
        if (ticket.getStatus() != TicketStatus.ACTIVE) {
            throw new TicketValidationException("Ticket is not active");
        }
        if (ticket.getOrderItem().getOrder().getStatus() != OrderStatus.CONFIRMED) {
            throw new TicketValidationException("Order is not confirmed");
        }
    }

    @Override
    public long countTicketsByEventIdAndStatus(Long eventId, TicketStatus status) {
        return ticketRepository.countByEventIdAndStatus(eventId, status);
    }

    @Override
    public Ticket createTicket(CreateTicketDTO createTicketDTO) {
        OrderItem orderItem = orderItemRepository.findById(createTicketDTO.getOrderItemId())
            .orElseThrow(() -> new ResourceNotFoundException("Order item not found"));

        if (orderItem.getOrder().getStatus() != OrderStatus.CONFIRMED) {
            throw new TicketValidationException("Order is not confirmed");
        }

        Ticket ticket = new Ticket();
        ticket.setOrderItem(orderItem);
        ticket.setTicketCode(createTicketDTO.getTicketCode());
        ticket.setQrCode(createTicketDTO.getQrCode());
        ticket.setStatus(TicketStatus.ACTIVE);
        ticket.setIssuedAt(LocalDateTime.now());

        return ticketRepository.save(ticket);
    }

    @Override
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }
} 