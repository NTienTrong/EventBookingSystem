// event-booking-backend/src/main/java/com/eventbooking/strategy/PaymentContext.java
package com.eventbooking.strategy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PaymentContext {
    private final Map<String, PaymentStrategy> strategies = new HashMap<>();

    @Autowired
    public PaymentContext(List<PaymentStrategy> strategyList) {
        for (PaymentStrategy strategy : strategyList) {
            strategies.put(strategy.getType(), strategy);
        }
    }

    public void pay(String method, Long bookingId, BigDecimal amount) {
        PaymentStrategy strategy = strategies.get(method.toLowerCase());
        if (strategy == null) throw new IllegalArgumentException("Unknown payment method: " + method);
        strategy.pay(bookingId, amount);
    }
}