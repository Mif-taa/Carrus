package com.example.carrus.controller;

import com.example.carrus.model.Driver;
import com.example.carrus.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allow cross-origin requests
public class DriverController {

    @Autowired
    private DriverService driverService;

    // Register driver
    @PostMapping("/drivers")
    public ResponseEntity<String> registerDriver(
            @RequestParam("licenseNumber") String licenseNumber,
            @RequestParam("licenseClass") String licenseClass,
            @RequestParam("userId") Long userId) {
        try {
            driverService.registerDriver(licenseNumber, licenseClass, userId);
            return ResponseEntity.ok("Driver registered successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to register driver.");
        }
    }

    // Fetch all drivers with user details
    @GetMapping("/drivers")
    public ResponseEntity<List<Driver>> getAllDrivers() {
        try {
            List<Driver> drivers = driverService.getAllDriversWithUsers();
            return ResponseEntity.ok(drivers);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
