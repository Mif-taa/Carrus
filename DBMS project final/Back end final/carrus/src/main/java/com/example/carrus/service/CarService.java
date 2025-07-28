package com.example.carrus.service;

import com.example.carrus.model.Car;
import com.example.carrus.model.User;
import com.example.carrus.repository.CarRepository;
import com.example.carrus.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private UserRepository userRepository;

    // Method to register a car for a specific user
    public Car registerCar(Car car, Long userId) {
        // Find the user by userId
        User user = userRepository.findById(userId).orElse(null); // Return null if user is not found

        // If user is found, associate the car with the user and save it
        if (user != null) {
            car.setUser(user);
            return carRepository.save(car); // Save the car and return the saved car
        }

        // If user is not found, return null (or you could return a default car or error message)
        return null;
    }

    // Method to get a list of cars registered by a specific user
    public List<Car> getCarsByUser(Long userId) {
        // Retrieve cars associated with the userId. If no cars are found, an empty list will be returned.
        return carRepository.findCarsByUserId(userId);
    }
}
