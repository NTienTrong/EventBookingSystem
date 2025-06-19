package com.eventbooking.factory;

import org.springframework.stereotype.Component;

import com.eventbooking.dto.BookingDTO;
import com.eventbooking.entity.Booking;
import com.eventbooking.enums.BookingStatus;
import com.eventbooking.enums.PaymentStatus;

// Factory Pattern: Tách biệt logic tạo đối tượng
@Component
public class BookingFactory {
    
    public Booking createBooking(BookingDTO bookingDTO) {
        Booking booking = new Booking();
        booking.setEventId(bookingDTO.getEventId());
        booking.setUserId(bookingDTO.getUserId());
        booking.setNumberOfTickets(bookingDTO.getNumberOfTickets());
        booking.setTotalAmount(bookingDTO.getTotalAmount());
        booking.setStatus(bookingDTO.getStatus());
        booking.setPaymentStatus(bookingDTO.getPaymentStatus());
        booking.setPaymentMethod(bookingDTO.getPaymentMethod());
        booking.setTransactionId(bookingDTO.getTransactionId());
        return booking;
    }

    public BookingDTO createBookingDTO(Booking booking) {
        BookingDTO dto = new BookingDTO();
        dto.setId(booking.getId());
        dto.setOrderNumber(booking.getOrderNumber());
        dto.setEventId(booking.getEventId());
        dto.setUserId(booking.getUserId());
        dto.setNumberOfTickets(booking.getNumberOfTickets());
        dto.setTotalAmount(booking.getTotalAmount());
        dto.setStatus(booking.getStatus());
        dto.setPaymentStatus(booking.getPaymentStatus());
        dto.setPaymentMethod(booking.getPaymentMethod());
        dto.setTransactionId(booking.getTransactionId());
        dto.setBookingTime(booking.getBookingTime());
        dto.setCreatedAt(booking.getCreatedAt());
        dto.setUpdatedAt(booking.getUpdatedAt());
        return dto;
    }
} 