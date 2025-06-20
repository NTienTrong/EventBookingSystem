package com.eventbooking.strategy;

import java.math.BigDecimal;

import org.springframework.stereotype.Component;

@Component
public class MBPaymentStrategy implements PaymentStrategy {
    @Override
    public void pay(Long bookingId, BigDecimal amount) {
        // Logic thanh toán qua MB Bank
        System.out.println("Thanh toán qua MB Bank cho booking " + bookingId + ", số tiền: " + amount);
        // TODO: Tích hợp API MB Bank thực tế ở đây
    }

    @Override
    public String getType() {
        return "mb";
    }
}