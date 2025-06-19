package com.eventbooking.factory;

import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.eventbooking.dto.OrderDTO;
import com.eventbooking.dto.OrderItemDTO;
import com.eventbooking.entity.Order;
import com.eventbooking.entity.OrderItem;

@Component
public class OrderFactory {
    
    public OrderDTO createOrderDTO(Order order) {
        OrderDTO dto = new OrderDTO();
        dto.setId(order.getId());
        dto.setCustomerId(order.getUser().getId());
        dto.setCustomerFullName(order.getUser().getFullName());
        dto.setCustomerEmail(order.getUser().getEmail());
        dto.setCustomerPhone(order.getUser().getPhone());
        dto.setOrderNumber(order.getOrderNumber());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setStatus(order.getStatus());
        dto.setPaymentStatus(order.getPaymentStatus());
        dto.setPaymentMethod(order.getPaymentMethod());
        dto.setTransactionId(order.getTransactionId());
        dto.setNotes(order.getNotes());
        // Lấy tên sự kiện từ orderItems nếu có
        if (order.getOrderItems() != null && !order.getOrderItems().isEmpty()) {
            OrderItem firstItem = order.getOrderItems().get(0);
            if (firstItem.getTicketType() != null && firstItem.getTicketType().getEvent() != null) {
                dto.setEventName(firstItem.getTicketType().getEvent().getName());
                dto.setEventImage(firstItem.getTicketType().getEvent().getImageUrl());
                dto.setEventDate(firstItem.getTicketType().getEvent().getStartTime());
                dto.setEventLocation(firstItem.getTicketType().getEvent().getLocation());
                dto.setTicketType(firstItem.getTicketType().getName());
            }
            dto.setQuantity(firstItem.getQuantity());
            dto.setAmount(firstItem.getSubtotal());
        }
        dto.setOrderItems(
            order.getOrderItems() == null ? new java.util.ArrayList<>() :
            order.getOrderItems().stream()
                .map(this::createOrderItemDTO)
                .collect(Collectors.toList())
        );
        dto.setCreatedAt(order.getCreatedAt());
        dto.setUpdatedAt(order.getUpdatedAt());
        return dto;
    }
    
    private OrderItemDTO createOrderItemDTO(OrderItem orderItem) {
        OrderItemDTO dto = new OrderItemDTO();
        dto.setId(orderItem.getId());
        dto.setOrderId(orderItem.getOrder().getId());
        dto.setTicketTypeId(orderItem.getTicketType().getId());
        dto.setTicketTypeName(orderItem.getTicketType().getName());
        dto.setQuantity(orderItem.getQuantity());
        dto.setUnitPrice(orderItem.getUnitPrice());
        dto.setSubtotal(orderItem.getSubtotal());
        // Lấy thông tin sự kiện
        if (orderItem.getTicketType() != null && orderItem.getTicketType().getEvent() != null) {
            dto.setEventName(orderItem.getTicketType().getEvent().getName());
            dto.setEventImage(orderItem.getTicketType().getEvent().getImageUrl());
            dto.setEventDate(orderItem.getTicketType().getEvent().getStartTime());
            dto.setEventLocation(orderItem.getTicketType().getEvent().getLocation());
        }
        return dto;
    }
} 