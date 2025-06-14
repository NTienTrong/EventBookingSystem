package com.eventbooking.service;

public interface SecurityService {
    boolean isTicketOwner(Long ticketId);
    boolean isTicketOwnerByCode(String ticketCode);
    boolean isOrderOwner(Long orderId);
    boolean isCurrentUser(Long userId);
    boolean isEventOrganizer(Long eventId);
    boolean isEventOrganizerForTicket(Long ticketId);
    boolean isEventOrganizerForTicketByCode(String ticketCode);
} 