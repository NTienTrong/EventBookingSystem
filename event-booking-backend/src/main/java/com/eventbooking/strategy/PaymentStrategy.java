package com.eventbooking.strategy;
import java.math.BigDecimal;

public interface  PaymentStrategy {
    void pay(Long bookingId, BigDecimal amount);
    String getType();
}
