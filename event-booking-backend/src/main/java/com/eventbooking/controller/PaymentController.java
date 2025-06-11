package com.eventbooking.controller;

import com.eventbooking.dto.PaymentRequest;
import com.eventbooking.dto.BookingDTO;
import com.eventbooking.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    private final PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/process")
    public ResponseEntity<BookingDTO> processPayment(@RequestBody PaymentRequest paymentRequest) {
        return ResponseEntity.ok(paymentService.processPayment(paymentRequest));
    }

    @PostMapping("/{bookingId}/refund")
    public ResponseEntity<BookingDTO> refundPayment(@PathVariable Long bookingId) {
        return ResponseEntity.ok(paymentService.refundPayment(bookingId));
    }
} 