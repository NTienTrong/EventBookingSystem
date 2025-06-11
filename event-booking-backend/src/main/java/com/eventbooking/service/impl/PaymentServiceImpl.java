package com.eventbooking.service.impl;

import com.eventbooking.dto.PaymentRequest;
import com.eventbooking.dto.BookingDTO;
import com.eventbooking.model.Booking;
import com.eventbooking.repository.BookingRepository;
import com.eventbooking.service.PaymentService;
import com.eventbooking.service.BookingService;
import com.eventbooking.exception.ResourceNotFoundException;
import com.eventbooking.exception.PaymentException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {

    private final BookingRepository bookingRepository;
    private final BookingService bookingService;

    @Autowired
    public PaymentServiceImpl(BookingRepository bookingRepository,
                            BookingService bookingService) {
        this.bookingRepository = bookingRepository;
        this.bookingService = bookingService;
    }

    @Override
    public BookingDTO processPayment(PaymentRequest paymentRequest) {
        Booking booking = bookingRepository.findById(paymentRequest.getBookingId())
            .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        if (booking.getPaymentStatus().equals("PAID")) {
            throw new PaymentException("Booking is already paid");
        }

        // Validate payment amount
        if (booking.getTotalAmount().compareTo(paymentRequest.getAmount()) != 0) {
            throw new PaymentException("Invalid payment amount");
        }

        // Process payment (in a real application, this would integrate with a payment gateway)
        String transactionId = UUID.randomUUID().toString();
        bookingService.processPayment(booking.getId(), paymentRequest.getPaymentMethod(), transactionId);

        return bookingService.getBookingById(booking.getId());
    }

    @Override
    public BookingDTO refundPayment(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        if (!booking.getPaymentStatus().equals("PAID")) {
            throw new PaymentException("Booking is not paid");
        }

        // Process refund (in a real application, this would integrate with a payment gateway)
        booking.setPaymentStatus("REFUNDED");
        bookingRepository.save(booking);

        return bookingService.getBookingById(bookingId);
    }
} 