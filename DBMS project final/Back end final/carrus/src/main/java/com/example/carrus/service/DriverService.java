package com.example.carrus.service;

import com.example.carrus.model.Driver;
import com.example.carrus.model.User;
import com.example.carrus.repository.DriverRepository;
import com.example.carrus.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DriverService {

    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private UserRepository userRepository;

    // Register a new driver
    public void registerDriver(String licenseNumber, String licenseClass, Long userId) {
        // Find user by ID
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Create and save the driver
        Driver driver = new Driver();
        driver.setLicenseNumber(licenseNumber);
        driver.setLicenseClass(licenseClass);
        driver.setUser(user);

        driverRepository.save(driver);
    }

    // Fetch all drivers with their user details
    public List<Driver> getAllDriversWithUsers() {
        return driverRepository.findAllDriversWithUsers();
    }
}
