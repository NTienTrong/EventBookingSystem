package com.eventbooking.service.impl;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.eventbooking.entity.Event;
import com.eventbooking.entity.Ticket;
import com.eventbooking.entity.User;
import com.eventbooking.exception.ResourceNotFoundException;
import com.eventbooking.repository.EventRepository;
import com.eventbooking.repository.OrderRepository;
import com.eventbooking.repository.TicketRepository;
import com.eventbooking.repository.UserRepository;
import com.eventbooking.service.SecurityService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service("securityService")
@RequiredArgsConstructor
@Slf4j
public class SecurityServiceImpl implements SecurityService {

    private final TicketRepository ticketRepository;
    private final OrderRepository orderRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    @Override
    public boolean isTicketOwner(Long ticketId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return false;
        }
        String username = authentication.getName();
        // TODO: Implement ticket ownership check
        return false;
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
        
        return ticket.getOrderItem().getOrder().getUser().getUsername().equals(username);
    }

    @Override
    public boolean isOrderOwner(Long orderId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return false;
        }
        String username = authentication.getName();
        // TODO: Implement order ownership check
        return false;
    }

    @Override
    public boolean isCurrentUser(Long userId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            log.debug("No authentication found");
            return false;
        }

        String username = authentication.getName();
        log.debug("Current authenticated user: {} (checking for userId: {})", username, userId);

        try {
            User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
            log.debug("Username in DB for userId {}: {}", userId, user.getUsername());
            boolean isCurrentUser = user.getUsername().equals(username);
            log.debug("Is current user check: {} for user id: {} (token username: {}, db username: {})", isCurrentUser, userId, username, user.getUsername());
            return isCurrentUser;
        } catch (Exception e) {
            log.error("Error checking if current user: {}", e.getMessage());
            return false;
        }
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

    @Override
    public boolean isEventOwner(Long eventId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return false;
        }
        String username = authentication.getName();
        // TODO: Implement event ownership check
        return false;
    }

    @Override
    public boolean isCurrentUserByUsername(String username) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            log.debug("No authentication found");
            return false;
        }

        String authenticatedUsername = authentication.getName();
        log.debug("Current authenticated user: {}", authenticatedUsername);
        log.debug("Checking if authenticated user matches provided username: {}", username);
        return authenticatedUsername.equals(username);
    }
} 