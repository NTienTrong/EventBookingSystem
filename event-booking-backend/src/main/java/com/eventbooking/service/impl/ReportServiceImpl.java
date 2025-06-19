package com.eventbooking.service.impl;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eventbooking.dto.ReportDTO;
import com.eventbooking.entity.Order;
import com.eventbooking.entity.OrderItem;
import com.eventbooking.entity.TicketType;
import com.eventbooking.entity.User;
import com.eventbooking.enums.OrderStatus;
import com.eventbooking.repository.EventRepository;
import com.eventbooking.repository.OrderRepository;
import com.eventbooking.repository.TicketRepository;
import com.eventbooking.repository.TicketTypeRepository;
import com.eventbooking.repository.UserRepository;
import com.eventbooking.service.ReportService;

@Service
@Transactional
public class ReportServiceImpl implements ReportService {

    private final OrderRepository orderRepository;
    private final TicketRepository ticketRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final TicketTypeRepository ticketTypeRepository;

    @Autowired
    public ReportServiceImpl(
            OrderRepository orderRepository,
            TicketRepository ticketRepository,
            EventRepository eventRepository,
            UserRepository userRepository,
            TicketTypeRepository ticketTypeRepository) {
        this.orderRepository = orderRepository;
        this.ticketRepository = ticketRepository;
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
        this.ticketTypeRepository = ticketTypeRepository;
    }

    @Override
    public ReportDTO getRevenueReport(LocalDateTime startDate, LocalDateTime endDate) {
        ReportDTO report = new ReportDTO();
        report.setStartDate(startDate);
        report.setEndDate(endDate);

        // Get all confirmed orders
        List<Order> orders = orderRepository.findAll().stream()
            .filter(order -> order.getStatus() == OrderStatus.CONFIRMED)
            .collect(Collectors.toList());

        // Group orders by month and calculate revenue
        Map<String, BigDecimal> monthlyRevenue = orders.stream()
            .collect(Collectors.groupingBy(
                order -> order.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM")),
                Collectors.mapping(
                    Order::getTotalAmount,
                    Collectors.reducing(BigDecimal.ZERO, BigDecimal::add)
                )
            ));

        // Convert to list format for chart
        List<Map<String, Object>> revenueData = monthlyRevenue.entrySet().stream()
            .map(entry -> {
                Map<String, Object> data = new HashMap<>();
                data.put("month", entry.getKey());
                data.put("revenue", entry.getValue());
                return data;
            })
            .sorted(Comparator.comparing(data -> (String) data.get("month")))
            .collect(Collectors.toList());

        report.setRevenueData(revenueData);
        return report;
    }

    @Override
    public ReportDTO getTicketTypeReport(LocalDateTime startDate, LocalDateTime endDate) {
        ReportDTO report = new ReportDTO();
        report.setStartDate(startDate);
        report.setEndDate(endDate);

        // Get all ticket types and their sold quantities
        List<TicketType> ticketTypes = ticketTypeRepository.findAll();
        List<Map<String, Object>> ticketTypeData = ticketTypes.stream()
            .map(type -> {
                Map<String, Object> data = new HashMap<>();
                data.put("name", type.getName());
                data.put("value", type.getQuantity() - type.getAvailableQuantity());
                return data;
            })
            .collect(Collectors.toList());

        report.setTicketTypeData(ticketTypeData);
        return report;
    }

    @Override
    public ReportDTO getTicketTypeRevenueReport(LocalDateTime startDate, LocalDateTime endDate) {
        ReportDTO report = new ReportDTO();
        report.setStartDate(startDate);
        report.setEndDate(endDate);

        // Lấy tất cả đơn hàng đã xác nhận
        List<Order> confirmedOrders = orderRepository.findAll().stream()
            .filter(order -> order.getStatus() == OrderStatus.CONFIRMED)
            .collect(Collectors.toList());

        // Nhóm doanh thu theo loại vé
        Map<TicketType, BigDecimal> ticketTypeRevenue = confirmedOrders.stream()
            .flatMap(order -> order.getOrderItems().stream())
            .collect(Collectors.groupingBy(
                OrderItem::getTicketType,
                Collectors.reducing(
                    BigDecimal.ZERO,
                    OrderItem::getSubtotal,
                    BigDecimal::add
                )
            ));

        // Chuyển đổi thành danh sách doanh thu theo loại vé
        List<Map<String, Object>> ticketTypeData = ticketTypeRevenue.entrySet().stream()
            .map(entry -> {
                Map<String, Object> data = new HashMap<>();
                data.put("name", entry.getKey().getName());
                data.put("revenue", entry.getValue());
                data.put("eventName", entry.getKey().getEvent().getName());
                data.put("price", entry.getKey().getPrice());
                // Tính tổng quantity đã bán cho từng loại vé
                long soldQuantity = confirmedOrders.stream()
                    .flatMap(order -> order.getOrderItems().stream())
                    .filter(item -> item.getTicketType().getId().equals(entry.getKey().getId()))
                    .mapToLong(OrderItem::getQuantity)
                    .sum();
                data.put("quantity", soldQuantity);
                return data;
            })
            .sorted((a, b) -> ((BigDecimal) b.get("revenue")).compareTo((BigDecimal) a.get("revenue")))
            .collect(Collectors.toList());

        report.setTicketTypeData(ticketTypeData);
        return report;
    }

    @Override
    public ReportDTO getSummaryReport(LocalDateTime startDate, LocalDateTime endDate) {
        ReportDTO report = new ReportDTO();
        report.setStartDate(startDate);
        report.setEndDate(endDate);

        // Get all confirmed orders
        List<Order> confirmedOrders = orderRepository.findAll().stream()
            .filter(order -> order.getStatus() == OrderStatus.CONFIRMED)
            .collect(Collectors.toList());

        // Calculate summary statistics
        Map<String, Object> summary = new HashMap<>();
        BigDecimal totalRevenue = confirmedOrders.stream()
            .map(Order::getTotalAmount)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        int totalTickets = confirmedOrders.stream()
            .mapToInt(order -> order.getOrderItems().stream()
                .mapToInt(OrderItem::getQuantity)
                .sum())
            .sum();

        int totalEvents = (int) eventRepository.count();
        
        BigDecimal averageTicketPrice = totalTickets > 0
            ? totalRevenue.divide(BigDecimal.valueOf(totalTickets), 2, RoundingMode.HALF_UP)
            : BigDecimal.ZERO;

        summary.put("totalRevenue", totalRevenue);
        summary.put("totalTickets", totalTickets);
        summary.put("totalEvents", totalEvents);
        summary.put("averageTicketPrice", averageTicketPrice);

        report.setSummary(summary);
        return report;
    }

    @Override
    public ReportDTO getUserActivityReport(LocalDateTime startDate, LocalDateTime endDate) {
        ReportDTO report = new ReportDTO();
        report.setStartDate(startDate);
        report.setEndDate(endDate);

        // Get user activity data
        List<User> users = userRepository.findAll();
        Map<String, Object> userActivity = new HashMap<>();
        
        userActivity.put("totalUsers", users.size());
        userActivity.put("activeUsers", users.stream()
            .filter(User::isActive)
            .count());
        userActivity.put("newUsers", users.stream()
            .filter(user -> user.getCreatedAt().isAfter(LocalDateTime.MIN))
            .count());

        List<Map<String, Object>> userActivityData = new ArrayList<>();
        userActivity.put("userActivityData", userActivityData);
        report.setUserActivity(userActivity);
        return report;
    }

    @Override
    public ReportDTO getUserTicketHistoryReport(LocalDateTime startDate, LocalDateTime endDate) {
        ReportDTO report = new ReportDTO();
        report.setStartDate(startDate);
        report.setEndDate(endDate);

        // Get user ticket purchase history from all confirmed orders
        List<Order> orders = orderRepository.findAll().stream()
            .filter(order -> order.getStatus() == OrderStatus.CONFIRMED)
            .collect(Collectors.toList());
        List<Map<String, Object>> userTicketHistory = orders.stream()
            .filter(order -> order.getUser() != null)
            .collect(Collectors.groupingBy(
                Order::getUser,
                Collectors.collectingAndThen(
                    Collectors.toList(),
                    userOrders -> {
                        Map<String, Object> history = new HashMap<>();
                        User user = userOrders.get(0).getUser();
                        history.put("userId", user.getId());
                        history.put("userName", user.getFullName());
                        history.put("email", user.getEmail());
                        history.put("totalTickets", userOrders.stream()
                            .mapToInt(order -> order.getOrderItems().stream()
                                .mapToInt(OrderItem::getQuantity)
                                .sum())
                            .sum());
                        history.put("totalSpent", userOrders.stream()
                            .map(Order::getTotalAmount)
                            .reduce(BigDecimal.ZERO, BigDecimal::add));
                        return history;
                    }
                )
            ))
            .values().stream()
            .collect(Collectors.toList());

        report.setUserTicketHistory(userTicketHistory);
        return report;
    }

    @Override
    public ReportDTO getUserEventHistoryReport(LocalDateTime startDate, LocalDateTime endDate) {
        ReportDTO report = new ReportDTO();
        report.setStartDate(startDate);
        report.setEndDate(endDate);

        // Get user event history from all confirmed orders
        List<Order> orders = orderRepository.findAll().stream()
            .filter(order -> order.getStatus() == OrderStatus.CONFIRMED)
            .collect(Collectors.toList());
        List<Map<String, Object>> userEventHistory = orders.stream()
            .filter(order -> order.getUser() != null)
            .collect(Collectors.groupingBy(
                Order::getUser,
                Collectors.collectingAndThen(
                    Collectors.toList(),
                    userOrders -> {
                        Map<String, Object> history = new HashMap<>();
                        User user = userOrders.get(0).getUser();
                        history.put("userId", user.getId());
                        history.put("userName", user.getFullName());
                        history.put("email", user.getEmail());
                        
                        // Count unique events purchased by the user
                        long totalEvents = userOrders.stream()
                            .flatMap(order -> order.getOrderItems().stream())
                            .map(orderItem -> orderItem.getTicketType().getEvent().getId())
                            .distinct()
                            .count();
                        history.put("totalEvents", totalEvents);

                        // Get a list of unique event names (for display)
                        List<String> eventNames = userOrders.stream()
                            .flatMap(order -> order.getOrderItems().stream())
                            .map(orderItem -> orderItem.getTicketType().getEvent().getName())
                            .distinct()
                            .collect(Collectors.toList());
                        history.put("eventNames", eventNames);

                        return history;
                    }
                )
            ))
            .values().stream()
            .collect(Collectors.toList());

        report.setUserEventHistory(userEventHistory);
        return report;
    }
} 