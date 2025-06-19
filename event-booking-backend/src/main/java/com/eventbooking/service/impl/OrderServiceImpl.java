package com.eventbooking.service.impl;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eventbooking.dto.OrderDTO;
import com.eventbooking.dto.OrderItemDTO;
import com.eventbooking.entity.Order;
import com.eventbooking.entity.OrderItem;
import com.eventbooking.entity.TicketType;
import com.eventbooking.entity.User;
import com.eventbooking.enums.OrderStatus;
import com.eventbooking.enums.PaymentStatus;
import com.eventbooking.exception.ResourceNotFoundException;
import com.eventbooking.factory.OrderFactory;
import com.eventbooking.repository.OrderItemRepository;
import com.eventbooking.repository.OrderRepository;
import com.eventbooking.repository.TicketTypeRepository;
import com.eventbooking.repository.UserRepository;
import com.eventbooking.service.OrderService;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;
    private final TicketTypeRepository ticketTypeRepository;
    private final OrderFactory orderFactory;

    @Autowired
    public OrderServiceImpl(
            OrderRepository orderRepository,
            OrderItemRepository orderItemRepository,
            UserRepository userRepository,
            TicketTypeRepository ticketTypeRepository,
            OrderFactory orderFactory) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.userRepository = userRepository;
        this.ticketTypeRepository = ticketTypeRepository;
        this.orderFactory = orderFactory;
    }

    @Override
    public Order createOrder(OrderDTO orderDTO) {
        User user = userRepository.findById(orderDTO.getCustomerId())
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Order order = new Order();
        order.setUser(user);
        order.setOrderNumber("ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        order.setTotalAmount(orderDTO.getTotalAmount());
        order.setStatus(OrderStatus.PENDING);
        order.setPaymentStatus(PaymentStatus.PENDING);
        order.setPaymentMethod(orderDTO.getPaymentMethod());
        order.setCustomerEmail(orderDTO.getCustomerEmail());
        order.setCustomerPhone(orderDTO.getCustomerPhone());
        order.setCreatedAt(LocalDateTime.now());
        order.setUpdatedAt(LocalDateTime.now());

        Order savedOrder = orderRepository.save(order);

        // Create order items
        List<OrderItemDTO> items = orderDTO.getOrderItems();
        if (items == null || items.isEmpty()) {
            items = orderDTO.getTickets();
        }
        if (items != null) {
            for (OrderItemDTO itemDTO : items) {
                TicketType ticketType = ticketTypeRepository.findById(itemDTO.getTicketTypeId())
                    .orElseThrow(() -> new ResourceNotFoundException("TicketType not found"));

                OrderItem orderItem = new OrderItem();
                orderItem.setOrder(savedOrder);
                orderItem.setTicketType(ticketType);
                orderItem.setQuantity(itemDTO.getQuantity());
                orderItem.setUnitPrice(ticketType.getPrice());
                orderItem.setSubtotal(ticketType.getPrice().multiply(BigDecimal.valueOf(itemDTO.getQuantity())));
                orderItemRepository.save(orderItem);
                savedOrder.getOrderItems().add(orderItem);
            }
        }

        return orderRepository.save(savedOrder);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Page<Order> getAllOrders(Pageable pageable) {
        return orderRepository.findAll(pageable);
    }

    @Override
    public Order getOrderById(Long id) {
        return orderRepository.findByIdWithDetails(id)
            .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
    }

    @Override
    public List<Order> getOrdersByCustomerId(Long customerId) {
        return orderRepository.findByUserId(customerId);
    }

    @Override
    public List<Order> getOrdersByEventId(Long eventId) {
        return orderRepository.findByOrderItemsTicketTypeEventId(eventId);
    }

    @Override
    public Order updateOrderStatus(Long id, OrderStatus status) {
        Order order = getOrderById(id);
        order.setStatus(status);
        order.setUpdatedAt(LocalDateTime.now());
        return orderRepository.save(order);
    }

    @Override
    public Order updatePaymentStatus(Long id, PaymentStatus status) {
        Order order = getOrderById(id);
        order.setPaymentStatus(status);
        order.setUpdatedAt(LocalDateTime.now());
        return orderRepository.save(order);
    }

    @Override
    public Order cancelOrder(Long id) {
        Order order = getOrderById(id);
        if (order.getStatus() == OrderStatus.CANCELLED) {
            throw new IllegalStateException("Order is already cancelled");
        }
        order.setStatus(OrderStatus.CANCELLED);
        order.setUpdatedAt(LocalDateTime.now());
        return orderRepository.save(order);
    }

    @Override
    public Order refundOrder(Long id) {
        Order order = getOrderById(id);
        if (order.getStatus() != OrderStatus.CANCELLED) {
            throw new IllegalStateException("Order must be cancelled before refund");
        }
        order.setStatus(OrderStatus.REFUNDED);
        order.setPaymentStatus(PaymentStatus.REFUNDED);
        order.setUpdatedAt(LocalDateTime.now());
        return orderRepository.save(order);
    }

    @Override
    public int getTotalTicketsByCustomerId(Long customerId) {
        List<Order> orders = orderRepository.findByUserId(customerId);
        int total = 0;
        for (Order order : orders) {
            if (order.getOrderItems() != null) {
                for (var item : order.getOrderItems()) {
                    total += (item.getQuantity() != null ? item.getQuantity() : 0);
                }
            }
        }
        return total;
    }

    @Override
    public Page<OrderDTO> searchOrders(String search, OrderStatus status, PaymentStatus paymentStatus,
                                     String startDate, String endDate, Pageable pageable) {
        LocalDateTime start = null;
        LocalDateTime end = null;
        
        if (startDate != null && !startDate.isEmpty()) {
            start = LocalDateTime.parse(startDate + "T00:00:00");
        }
        if (endDate != null && !endDate.isEmpty()) {
            end = LocalDateTime.parse(endDate + "T23:59:59");
        }

        Page<Order> orders = orderRepository.searchOrders(
            search, status, paymentStatus, start, end, pageable
        );

        return orders.map(orderFactory::createOrderDTO);
    }

    @Override
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }

    @Override
    public Order createOrder(Order order) {
        // TODO: implement if needed
        throw new UnsupportedOperationException("Not implemented");
    }

    @Override
    public Order updateOrder(Long id, Order order) {
        // TODO: implement if needed
        throw new UnsupportedOperationException("Not implemented");
    }

    @Override
    public OrderDTO getOrderDetails(Long id) {
        // TODO: implement if needed
        throw new UnsupportedOperationException("Not implemented");
    }

    @Override
    public List<Order> getOrdersByUserId(Long userId) {
        // TODO: implement if needed
        throw new UnsupportedOperationException("Not implemented");
    }

    @Override
    public Optional<Order> getOrderByOrderNumber(String orderNumber) {
        // TODO: implement if needed
        throw new UnsupportedOperationException("Not implemented");
    }
} 