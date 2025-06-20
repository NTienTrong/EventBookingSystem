package com.eventbooking.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class BookingServiceLoggingAspect {
    @Around("execution(* com.eventbooking.service.BookingService.createBooking(..))")
    public Object logCreateBooking(ProceedingJoinPoint joinPoint) throws Throwable {
        System.out.println("[LOG] Before createBooking: args=" + java.util.Arrays.toString(joinPoint.getArgs()));
        Object result = joinPoint.proceed();
        System.out.println("[LOG] After createBooking: result=" + result);
        return result;
    }
} 