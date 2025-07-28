package com.example.carrus.repository;

import com.example.carrus.model.CarBooking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarBookingRepository extends JpaRepository<CarBooking, Integer> {
    // Custom queries can go here if needed
}
