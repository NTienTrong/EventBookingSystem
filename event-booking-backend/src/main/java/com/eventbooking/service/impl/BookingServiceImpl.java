package com.eventbooking.service.impl;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eventbooking.dto.BookingDTO;
import com.eventbooking.dto.BookingRequestDTO;
import com.eventbooking.entity.Booking;
import com.eventbooking.entity.Order;
import com.eventbooking.entity.OrderItem;
import com.eventbooking.entity.TicketType;
import com.eventbooking.entity.User;
import com.eventbooking.enums.BookingStatus;
import com.eventbooking.enums.OrderStatus;
import com.eventbooking.enums.PaymentStatus;
import com.eventbooking.exception.ResourceNotFoundException;
import com.eventbooking.factory.BookingFactory;
import com.eventbooking.observer.BookingObserver;
import com.eventbooking.observer.BookingSubject;
import com.eventbooking.repository.BookingRepository;
import com.eventbooking.repository.EventRepository;
import com.eventbooking.repository.OrderItemRepository;
import com.eventbooking.repository.OrderRepository;
import com.eventbooking.repository.TicketRepository;
import com.eventbooking.repository.TicketTypeRepository;
import com.eventbooking.repository.UserRepository;
import com.eventbooking.service.BookingService;
import com.eventbooking.template.StandardEventBookingProcess;
import com.eventbooking.template.VipEventBookingProcess;

@Service
@Transactional
public class BookingServiceImpl implements BookingService, BookingSubject {

    private final BookingRepository bookingRepository;
    private final EventRepository eventRepository;
    private final TicketTypeRepository ticketTypeRepository;
    private final TicketRepository ticketRepository;
    private final BookingFactory bookingFactory;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;
    private final List<BookingObserver> observers = new java.util.ArrayList<>();
    private final StandardEventBookingProcess standardBookingProcess;
    private final VipEventBookingProcess vipBookingProcess;

    @Autowired
    public BookingServiceImpl(
            BookingRepository bookingRepository,
            EventRepository eventRepository,
            TicketTypeRepository ticketTypeRepository,
            TicketRepository ticketRepository,
            BookingFactory bookingFactory,
            OrderRepository orderRepository,
            OrderItemRepository orderItemRepository,
            UserRepository userRepository,
            List<BookingObserver> injectedObservers,
            StandardEventBookingProcess standardBookingProcess,
            VipEventBookingProcess vipBookingProcess) {
        this.bookingRepository = bookingRepository;
        this.eventRepository = eventRepository;
        this.ticketTypeRepository = ticketTypeRepository;
        this.ticketRepository = ticketRepository;
        this.bookingFactory = bookingFactory;
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.userRepository = userRepository;
        this.standardBookingProcess = standardBookingProcess;
        this.vipBookingProcess = vipBookingProcess;
        if (injectedObservers != null) {
            this.observers.addAll(injectedObservers);
        }
    }

    @Override
    public void registerObserver(BookingObserver observer) {
        observers.add(observer);
    }

    @Override
    public void removeObserver(BookingObserver observer) {
        observers.remove(observer);
    }

    @Override
    public void notifyObservers(Booking booking, String eventType) {
        for (BookingObserver observer : observers) {
            observer.update(booking, eventType);
        }
    }

    @Override
    public BookingDTO createBooking(BookingRequestDTO request) {
        Booking booking = new Booking();
        booking.setEventId(request.getEventId());
        booking.setUserId(request.getUserId());
        booking.setNumberOfTickets(request.getNumberOfTickets());
        booking.setTotalAmount(request.getTotalAmount());
        booking.setStatus(BookingStatus.PENDING);
        booking.setPaymentStatus(PaymentStatus.PENDING);
        booking.setPaymentMethod(request.getPaymentMethod());
        booking.setBookingTime(LocalDateTime.now());
        booking.setCreatedAt(LocalDateTime.now());
        booking.setUpdatedAt(LocalDateTime.now());
        
        Booking savedBooking = bookingRepository.save(booking);

        // Tạo Order và OrderItem
        User user = userRepository.findById(request.getUserId())
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Order order = new Order();
        order.setUser(user);
        order.setOrderNumber("ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        order.setTotalAmount(request.getTotalAmount());
        order.setStatus(OrderStatus.PENDING);
        order.setPaymentStatus(PaymentStatus.PENDING);
        order.setPaymentMethod(request.getPaymentMethod());
        order.setCreatedAt(LocalDateTime.now());
        order.setUpdatedAt(LocalDateTime.now());
        order.setCustomerEmail(user.getEmail());
        order.setCustomerPhone(user.getPhoneNumber());
        Order savedOrder = orderRepository.save(order);

        // Tạo OrderItem cho từng loại vé
        for (BookingRequestDTO.BookingTicketDTO ticket : request.getTickets()) {
            TicketType ticketType = ticketTypeRepository.findById(ticket.getTicketTypeId())
                .orElseThrow(() -> new ResourceNotFoundException("TicketType not found"));
            OrderItem item = new OrderItem();
            item.setOrder(savedOrder);
            item.setTicketType(ticketType);
            item.setQuantity(ticket.getQuantity());
            item.setUnitPrice(ticketType.getPrice());
            item.setSubtotal(ticketType.getPrice().multiply(BigDecimal.valueOf(ticket.getQuantity())));
            orderItemRepository.save(item);
        }

        // Gọi observer sau khi tạo booking
        notifyObservers(savedBooking, "BOOKING_CREATED");
        return bookingFactory.createBookingDTO(savedBooking);
    }

    @Override
    public BookingDTO getBookingById(Long id) throws ResourceNotFoundException {
        Booking booking = bookingRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        return bookingFactory.createBookingDTO(booking);
    }

    @Override
    public BookingDTO getBookingByOrderNumber(String orderNumber) throws ResourceNotFoundException {
        Booking booking = bookingRepository.findByOrderNumber(orderNumber)
            .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        return bookingFactory.createBookingDTO(booking);
    }

    @Override
    public List<BookingDTO> getAllBookings() {
        return bookingRepository.findAll().stream()
            .map(bookingFactory::createBookingDTO)
            .collect(Collectors.toList());
    }

    @Override
    public void processPayment(Long bookingId, String paymentMethod, String transactionId) {
        Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        
        booking.setPaymentMethod(paymentMethod);
        booking.setTransactionId(transactionId);
        booking.setPaymentStatus(PaymentStatus.COMPLETED);
        booking.setStatus(BookingStatus.CONFIRMED);
        booking.setUpdatedAt(LocalDateTime.now());
        
        bookingRepository.save(booking);

        // Cập nhật trạng thái cho Order liên quan
        Optional<Order> orderOpt = orderRepository.findByOrderNumber(booking.getOrderNumber());
        if (orderOpt.isPresent()) {
            Order order = orderOpt.get();
            order.setPaymentStatus(com.eventbooking.enums.PaymentStatus.COMPLETED);
            order.setStatus(com.eventbooking.enums.OrderStatus.CONFIRMED);
            order.setUpdatedAt(LocalDateTime.now());
            orderRepository.save(order);
        }

        // Gọi observer sau khi thanh toán
        notifyObservers(booking, "PAYMENT_RECEIVED");
    }

    // Sử dụng Template Method Pattern cho booking
    public void processBookingTemplate(BookingRequestDTO request, boolean isVip) {
        if (isVip) {
            vipBookingProcess.processBooking(request);
        } else {
            standardBookingProcess.processBooking(request);
        }
    }
}