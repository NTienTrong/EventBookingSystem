// event-booking-backend/src/main/java/com/eventbooking/strategy/PVPaymentStrategy.java
package com.eventbooking.strategy;

import java.math.BigDecimal;

import org.springframework.stereotype.Component;

@Component
public class PVPaymentStrategy implements PaymentStrategy {
    @Override
    public void pay(Long bookingId, BigDecimal amount) {
        // Logic thanh toán qua PVcomBank
        System.out.println("Thanh toán qua PVcomBank cho booking " + bookingId + ", số tiền: " + amount);
        // TODO: Tích hợp API PVcomBank thực tế ở đây
    }

    @Override
    public String getType() {
        return "pv";
    }
}