package com.example.carrus.controller;

import com.example.carrus.dto.BookingRequest;
import com.example.carrus.model.CarBooking;
import com.example.carrus.service.CarBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin("*")
public class CarBookingController {

    @Autowired
    private CarBookingService carBookingService;

    @PostMapping("/create")
    public CarBooking createBooking(@RequestBody BookingRequest request) {
        return carBookingService.createBooking(
                request.getUserId(),
                request.getCarId(),
                request.getPickUpLocation(),
                request.getPickUpDate(),
                request.getPickUpTime(),
                request.getTotalDays()
        );
    }
}
