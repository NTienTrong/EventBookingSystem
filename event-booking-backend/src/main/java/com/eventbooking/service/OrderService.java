package com.eventbooking.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.eventbooking.dto.OrderDTO;
import com.eventbooking.entity.Order;
import com.eventbooking.enums.OrderStatus;
import com.eventbooking.enums.PaymentStatus;

public interface OrderService {
    List<Order> getAllOrders();
    Page<Order> getAllOrders(Pageable pageable);
    Order getOrderById(Long id);
    Order createOrder(Order order);
    Order updateOrder(Long id, Order order);
    void deleteOrder(Long id);
    Order createOrder(OrderDTO orderDTO);
    Order updateOrderStatus(Long id, OrderStatus status);
    Order updatePaymentStatus(Long id, PaymentStatus status);
    List<Order> getOrdersByUserId(Long userId);
    List<Order> getOrdersByEventId(Long eventId);
    Optional<Order> getOrderByOrderNumber(String orderNumber);
    OrderDTO getOrderDetails(Long id);
    int getTotalTicketsByCustomerId(Long customerId);
    List<Order> getOrdersByCustomerId(Long customerId);
    Page<OrderDTO> searchOrders(String search, OrderStatus status, PaymentStatus paymentStatus, 
                              String startDate, String endDate, Pageable pageable);
    Order cancelOrder(Long id);
    Order refundOrder(Long id);
} 