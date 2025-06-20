package com.eventbooking.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eventbooking.dto.BookingDTO;
import com.eventbooking.dto.PaymentRequest;
import com.eventbooking.entity.Booking;
import com.eventbooking.enums.PaymentStatus;
import com.eventbooking.exception.PaymentException;
import com.eventbooking.exception.ResourceNotFoundException;
import com.eventbooking.repository.BookingRepository;
import com.eventbooking.service.BookingService;
import com.eventbooking.service.PaymentService;
import com.eventbooking.strategy.PaymentContext;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {

    private final BookingRepository bookingRepository;
    private final BookingService bookingService;
    private final PaymentContext paymentContext;

    @Autowired
    public PaymentServiceImpl(BookingRepository bookingRepository,
                            BookingService bookingService,
                            PaymentContext paymentContext) {
        this.bookingRepository = bookingRepository;
        this.bookingService = bookingService;
        this.paymentContext = paymentContext;
    }

    @Override
    public BookingDTO processPayment(PaymentRequest paymentRequest) {
        Booking booking = bookingRepository.findById(paymentRequest.getBookingId())
            .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        if (booking.getPaymentStatus().equals("COMPLETED")) {
            throw new PaymentException("Booking is already paid");
        }

        // Validate payment amount
        if (booking.getTotalAmount().compareTo(paymentRequest.getAmount()) != 0) {
            throw new PaymentException("Invalid payment amount");
        }

        // Gọi strategy phù hợp
        paymentContext.pay(paymentRequest.getPaymentMethod(), booking.getId(), paymentRequest.getAmount());

        // Xử lý tiếp như cũ
        String transactionId = java.util.UUID.randomUUID().toString();
        bookingService.processPayment(booking.getId(), paymentRequest.getPaymentMethod(), transactionId);

        return bookingService.getBookingById(booking.getId());
    }

    @Override
    public BookingDTO refundPayment(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        if (!booking.getPaymentStatus().equals("COMPLETED")) {
            throw new PaymentException("Booking is not completed");
        }

        // Process refund (in a real application, this would integrate with a payment gateway)
        booking.setPaymentStatus(PaymentStatus.REFUNDED);
        bookingRepository.save(booking);

        return bookingService.getBookingById(bookingId);
    }
} 