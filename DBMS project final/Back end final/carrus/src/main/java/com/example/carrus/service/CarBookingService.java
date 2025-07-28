package com.example.carrus.service;

import com.example.carrus.model.Car;
import com.example.carrus.model.CarBooking;
import com.example.carrus.model.User;
import com.example.carrus.repository.CarBookingRepository;
import com.example.carrus.repository.CarRepository;
import com.example.carrus.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CarBookingService {

    @Autowired
    private CarBookingRepository carBookingRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private UserRepository userRepository;

    public CarBooking createBooking(
            int userId, int carId, String pickUpLocation,
            String pickUpDate, String pickUpTime, int totalDays) {

        System.out.println("Creating booking with:");
        System.out.println("User ID: " + userId);
        System.out.println("Car ID: " + carId);
        System.out.println("Pick-Up Location: " + pickUpLocation);
        System.out.println("Pick-Up Date: " + pickUpDate);
        System.out.println("Pick-Up Time: " + pickUpTime);
        System.out.println("Total Days: " + totalDays);

        Optional<User> userOptional = userRepository.findById((long) userId);
        if (userOptional.isEmpty()) {
            System.out.println("User not found.");
            throw new IllegalArgumentException("User not found.");
        }

        Optional<Car> carOptional = carRepository.findById((long) carId);
        if (carOptional.isEmpty()) {
            System.out.println("Car not found.");
            throw new IllegalArgumentException("Car not found.");
        }

        User user = userOptional.get();
        Car car = carOptional.get();
        double totalPrice = car.getPricePerDay() * totalDays * 0.8;

        CarBooking carBooking = new CarBooking();
        carBooking.setUser(user);
        carBooking.setCar(car);
        carBooking.setPickUpLocation(pickUpLocation);
        carBooking.setPickUpDate(pickUpDate);
        carBooking.setPickUpTime(pickUpTime);
        carBooking.setTotalDays(totalDays);
        carBooking.setTotalPrice(totalPrice);

        System.out.println("Booking created successfully.");
        return carBookingRepository.save(carBooking);
    }


}
