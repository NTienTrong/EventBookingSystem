package com.eventbooking.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eventbooking.dto.OrderDTO;
import com.eventbooking.entity.Order;
import com.eventbooking.enums.OrderStatus;
import com.eventbooking.enums.PaymentStatus;
import com.eventbooking.factory.OrderFactory;
import com.eventbooking.service.OrderService;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderService orderService;
    private final OrderFactory orderFactory;

    @Autowired
    public OrderController(OrderService orderService, OrderFactory orderFactory) {
        this.orderService = orderService;
        this.orderFactory = orderFactory;
    }

    @PostMapping
    public ResponseEntity<OrderDTO> createOrder(@RequestBody OrderDTO orderDTO) {
        Order order = orderService.createOrder(orderDTO);
        return ResponseEntity.ok(orderFactory.createOrderDTO(order));
    }

    @GetMapping
    public ResponseEntity<List<OrderDTO>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        List<OrderDTO> orderDTOs = orders.stream()
            .map(orderFactory::createOrderDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(orderDTOs);
    }

    @GetMapping("/page")
    public ResponseEntity<Page<OrderDTO>> getAllOrdersWithPagination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {
        Sort.Direction sortDirection = Sort.Direction.fromString(direction.toUpperCase());
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));
        Page<Order> orders = orderService.getAllOrders(pageable);
        Page<OrderDTO> orderDTOs = orders.map(orderFactory::createOrderDTO);
        return ResponseEntity.ok(orderDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable Long id) {
        Order order = orderService.getOrderById(id);
        return ResponseEntity.ok(orderFactory.createOrderDTO(order));
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<OrderDTO>> getOrdersByCustomerId(@PathVariable Long customerId) {
        List<Order> orders = orderService.getOrdersByCustomerId(customerId);
        List<OrderDTO> orderDTOs = orders.stream()
            .map(orderFactory::createOrderDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(orderDTOs);
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<OrderDTO>> getOrdersByEventId(@PathVariable Long eventId) {
        List<Order> orders = orderService.getOrdersByEventId(eventId);
        List<OrderDTO> orderDTOs = orders.stream()
            .map(orderFactory::createOrderDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(orderDTOs);
    }

    @GetMapping("/customer/{customerId}/total-tickets")
    public ResponseEntity<Integer> getTotalTicketsByCustomerId(@PathVariable Long customerId) {
        int totalTickets = orderService.getTotalTicketsByCustomerId(customerId);
        return ResponseEntity.ok(totalTickets);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<OrderDTO> updateOrderStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        String status = body.get("status");
        Order order = orderService.updateOrderStatus(id, OrderStatus.valueOf(status));
        return ResponseEntity.ok(orderFactory.createOrderDTO(order));
    }

    @PutMapping("/{id}/payment-status")
    public ResponseEntity<OrderDTO> updatePaymentStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        String paymentStatus = body.get("paymentStatus");
        Order order = orderService.updatePaymentStatus(id, PaymentStatus.valueOf(paymentStatus));
        return ResponseEntity.ok(orderFactory.createOrderDTO(order));
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<OrderDTO> cancelOrder(@PathVariable Long id) {
        Order order = orderService.cancelOrder(id);
        return ResponseEntity.ok(orderFactory.createOrderDTO(order));
    }

    @PostMapping("/{id}/refund")
    public ResponseEntity<OrderDTO> refundOrder(@PathVariable Long id) {
        Order order = orderService.refundOrder(id);
        return ResponseEntity.ok(orderFactory.createOrderDTO(order));
    }

    @GetMapping("/search")
    public ResponseEntity<Page<OrderDTO>> searchOrders(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) OrderStatus status,
            @RequestParam(required = false) PaymentStatus paymentStatus,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {

        Sort.Direction sortDirection = Sort.Direction.fromString(direction);
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));
        Page<OrderDTO> result = orderService.searchOrders(
            search, status, paymentStatus, startDate, endDate, pageable
        );
        return ResponseEntity.ok(result);
    }
} 