package com.eventbooking.service.impl;

import com.eventbooking.dto.BookingDTO;
import com.eventbooking.model.Booking;
import com.eventbooking.model.Event;
import com.eventbooking.model.User;
import com.eventbooking.repository.BookingRepository;
import com.eventbooking.repository.EventRepository;
import com.eventbooking.repository.UserRepository;
import com.eventbooking.service.BookingService;
import com.eventbooking.exception.ResourceNotFoundException;
import com.eventbooking.exception.BookingException;
import com.eventbooking.factory.BookingFactory;
import com.eventbooking.observer.BookingObserver;
import com.eventbooking.observer.BookingSubject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class BookingServiceImpl implements BookingService, BookingSubject {
    
    private final BookingRepository bookingRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final BookingFactory bookingFactory;
    private final List<BookingObserver> observers = new ArrayList<>();

    @Autowired
    public BookingServiceImpl(BookingRepository bookingRepository,
                            EventRepository eventRepository,
                            UserRepository userRepository,
                            BookingFactory bookingFactory,
                            List<BookingObserver> observers) {
        this.bookingRepository = bookingRepository;
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
        this.bookingFactory = bookingFactory;
        this.observers.addAll(observers);
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
        observers.forEach(observer -> observer.update(booking, eventType));
    }

    @Override
    public BookingDTO createBooking(BookingDTO bookingDTO) {
        validateBooking(bookingDTO);
        
        Event event = eventRepository.findById(bookingDTO.getEventId())
            .orElseThrow(() -> new ResourceNotFoundException("Event not found"));
        User user = userRepository.findById(bookingDTO.getUserId())
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        Booking booking = bookingFactory.createBooking(bookingDTO, event, user);
        Booking savedBooking = bookingRepository.save(booking);
        
        notifyObservers(savedBooking, "BOOKING_CREATED");
        return bookingFactory.createBookingDTO(savedBooking);
    }

    @Override
    public BookingDTO updateBooking(Long id, BookingDTO bookingDTO) {
        Booking booking = bookingRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
        
        validateBooking(bookingDTO);
        
        booking.setNumberOfTickets(bookingDTO.getNumberOfTickets());
        booking.setTotalAmount(bookingDTO.getTotalAmount());
        booking.setPaymentMethod(bookingDTO.getPaymentMethod());
        booking.setPaymentStatus(bookingDTO.getPaymentStatus());
        
        Booking updatedBooking = bookingRepository.save(booking);
        notifyObservers(updatedBooking, "BOOKING_UPDATED");
        return bookingFactory.createBookingDTO(updatedBooking);
    }

    @Override
    public void cancelBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
        
        if ("CANCELLED".equals(booking.getStatus())) {
            throw new BookingException("Booking is already cancelled");
        }
        
        booking.setStatus("CANCELLED");
        Booking cancelledBooking = bookingRepository.save(booking);
        notifyObservers(cancelledBooking, "BOOKING_CANCELLED");
    }

    @Override
    public void processPayment(Long id, String paymentMethod, String transactionId) {
        Booking booking = bookingRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
        
        booking.setPaymentMethod(paymentMethod);
        booking.setPaymentStatus("PAID");
        booking.setTransactionId(transactionId);
        
        Booking paidBooking = bookingRepository.save(booking);
        notifyObservers(paidBooking, "PAYMENT_RECEIVED");
    }

    @Override
    public BookingDTO getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
        return bookingFactory.createBookingDTO(booking);
    }

    @Override
    public List<BookingDTO> getBookingsByUserId(Long userId) {
        return bookingRepository.findByUserId(userId).stream()
            .map(bookingFactory::createBookingDTO)
            .collect(Collectors.toList());
    }

    @Override
    public List<BookingDTO> getBookingsByEventId(Long eventId) {
        return bookingRepository.findByEventId(eventId).stream()
            .map(bookingFactory::createBookingDTO)
            .collect(Collectors.toList());
    }

    @Override
    public List<BookingDTO> getAllBookings() {
        return bookingRepository.findAll().stream()
            .map(bookingFactory::createBookingDTO)
            .collect(Collectors.toList());
    }

    private void validateBooking(BookingDTO bookingDTO) {
        Event event = eventRepository.findById(bookingDTO.getEventId())
            .orElseThrow(() -> new ResourceNotFoundException("Event not found"));
        
        if (event.getStartTime().isBefore(LocalDateTime.now())) {
            throw new BookingException("Cannot book for past events");
        }
        
        if (bookingDTO.getNumberOfTickets() <= 0) {
            throw new BookingException("Number of tickets must be greater than 0");
        }
        
        int bookedTickets = bookingRepository.findByEventId(event.getId()).stream()
            .mapToInt(Booking::getNumberOfTickets)
            .sum();
        
        if (bookedTickets + bookingDTO.getNumberOfTickets() > event.getCapacity()) {
            throw new BookingException("Not enough tickets available");
        }
    }
} 