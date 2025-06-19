package com.eventbooking.service;

import org.springframework.stereotype.Service;

@Service
public interface SecurityService {
    boolean isCurrentUser(Long userId);
    boolean isEventOwner(Long eventId);
    boolean isTicketOwner(Long ticketId);
    boolean isOrderOwner(Long orderId);
    boolean isTicketOwnerByCode(String ticketCode);
    boolean isEventOrganizer(Long eventId);
    boolean isEventOrganizerForTicket(Long ticketId);
    boolean isEventOrganizerForTicketByCode(String ticketCode);
    boolean isCurrentUserByUsername(String username);
} 