package com.eventbooking.service.impl;

import com.eventbooking.model.Ticket;
import com.eventbooking.model.Order;
import com.eventbooking.model.Event;
import com.eventbooking.model.User;
import com.eventbooking.repository.TicketRepository;
import com.eventbooking.repository.OrderRepository;
import com.eventbooking.repository.EventRepository;
import com.eventbooking.repository.UserRepository;
import com.eventbooking.service.SecurityService;
import com.eventbooking.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class SecurityServiceImpl implements SecurityService {

    private final TicketRepository ticketRepository;
    private final OrderRepository orderRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    @Autowired
    public SecurityServiceImpl(TicketRepository ticketRepository,
                             OrderRepository orderRepository,
                             EventRepository eventRepository,
                             UserRepository userRepository) {
        this.ticketRepository = ticketRepository;
        this.orderRepository = orderRepository;
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    @Override
    public boolean isTicketOwner(Long ticketId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            return false;
        }

        String username = auth.getName();
        Ticket ticket = ticketRepository.findById(ticketId)
            .orElseThrow(() -> new ResourceNotFoundException("Ticket not found"));
        
        return ticket.getOrderItem().getOrder().getCustomer().getUsername().equals(username);
    }

    @Override
    public boolean isTicketOwnerByCode(String ticketCode) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            return false;
        }

        String username = auth.getName();
        Ticket ticket = ticketRepository.findByTicketCode(ticketCode)
            .orElseThrow(() -> new ResourceNotFoundException("Ticket not found"));
        
        return ticket.getOrderItem().getOrder().getCustomer().getUsername().equals(username);
    }

    @Override
    public boolean isOrderOwner(Long orderId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            return false;
        }

        String username = auth.getName();
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        
        return order.getCustomer().getUsername().equals(username);
    }

    @Override
    public boolean isCurrentUser(Long userId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            return false;
        }

        String username = auth.getName();
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        return user.getUsername().equals(username);
    }

    @Override
    public boolean isEventOrganizer(Long eventId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            return false;
        }

        String username = auth.getName();
        Event event = eventRepository.findById(eventId)
            .orElseThrow(() -> new ResourceNotFoundException("Event not found"));
        
        return event.getOrganizer().getUsername().equals(username);
    }

    @Override
    public boolean isEventOrganizerForTicket(Long ticketId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            return false;
        }

        String username = auth.getName();
        Ticket ticket = ticketRepository.findById(ticketId)
            .orElseThrow(() -> new ResourceNotFoundException("Ticket not found"));
        
        return ticket.getOrderItem().getTicketType().getEvent().getOrganizer().getUsername().equals(username);
    }

    @Override
    public boolean isEventOrganizerForTicketByCode(String ticketCode) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            return false;
        }

        String username = auth.getName();
        Ticket ticket = ticketRepository.findByTicketCode(ticketCode)
            .orElseThrow(() -> new ResourceNotFoundException("Ticket not found"));
        
        return ticket.getOrderItem().getTicketType().getEvent().getOrganizer().getUsername().equals(username);
    }
} 