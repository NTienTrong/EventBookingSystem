package com.eventbooking.factory;

import com.eventbooking.dto.BookingDTO;
import com.eventbooking.model.Booking;
import com.eventbooking.model.Event;
import com.eventbooking.model.User;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;

// Factory Pattern: Tách biệt logic tạo đối tượng
@Component
public class BookingFactory {
    
    public Booking createBooking(BookingDTO dto, Event event, User user) {
        Booking booking = new Booking();
        booking.setEvent(event);
        booking.setUser(user);
        booking.setNumberOfTickets(dto.getNumberOfTickets());
        booking.setTotalAmount(dto.getTotalAmount());
        booking.setBookingTime(LocalDateTime.now());
        booking.setStatus("PENDING");
        booking.setPaymentStatus("PENDING");
        booking.setPaymentMethod(dto.getPaymentMethod());
        return booking;
    }

    public BookingDTO createBookingDTO(Booking booking) {
        BookingDTO dto = new BookingDTO();
        dto.setId(booking.getId());
        dto.setEventId(booking.getEvent().getId());
        dto.setUserId(booking.getUser().getId());
        dto.setNumberOfTickets(booking.getNumberOfTickets());
        dto.setTotalAmount(booking.getTotalAmount());
        dto.setBookingTime(booking.getBookingTime());
        dto.setStatus(booking.getStatus());
        dto.setPaymentStatus(booking.getPaymentStatus());
        dto.setPaymentMethod(booking.getPaymentMethod());
        dto.setTransactionId(booking.getTransactionId());
        return dto;
    }
} 