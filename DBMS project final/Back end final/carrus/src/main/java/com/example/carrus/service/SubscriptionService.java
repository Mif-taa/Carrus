package com.example.carrus.service;

import com.example.carrus.model.Car;
import com.example.carrus.model.Subscription;
import com.example.carrus.model.User;
import com.example.carrus.repository.CarRepository;
import com.example.carrus.repository.SubscriptionRepository;
import com.example.carrus.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SubscriptionService {
    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CarRepository carRepository;

    public Subscription createSubscription(Long userId, Long carId, int duration, double totalPrice, String location) {
        // Fetch user and car by their respective IDs
        Optional<User> userOptional = userRepository.findById(userId);
        Optional<Car> carOptional = carRepository.findById(carId);

        // Check if user and car are present
        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found for ID: " + userId);
        }
        if (carOptional.isEmpty()) {
            throw new RuntimeException("Car not found for ID: " + carId);
        }

        // Initialize Subscription object
        Subscription subscription = new Subscription();
        subscription.setUser(userOptional.get());  // Set user object
        subscription.setCar(carOptional.get());    // Set car object
        subscription.setDuration(duration);
        subscription.setTotalPrice(totalPrice);
        subscription.setLocation(location);

        // Save the Subscription to the database
        return subscriptionRepository.save(subscription);
    }
}
