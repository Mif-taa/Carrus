package com.example.carrus.controller;

import com.example.carrus.model.Car;
import com.example.carrus.repository.CarRepository;
import com.example.carrus.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin("*")
public class CarController {

    @Autowired
    private CarService carService;

    @Autowired
    private CarRepository carRepository;

    @PostMapping("/register")
    public ResponseEntity<Car> registerCar(@RequestBody Car car, @RequestParam Long userId) {
        Car registeredCar = carService.registerCar(car, userId);

        // If the user doesn't exist, return a BAD_REQUEST response
        if (registeredCar == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        // Otherwise, return the registered car with CREATED status
        return ResponseEntity.status(HttpStatus.CREATED).body(registeredCar);
    }

    @GetMapping("/getRegisteredCars")
    public ResponseEntity<List<Car>> getRegisteredCars(@RequestParam Long userId) {
        List<Car> cars = carService.getCarsByUser(userId);

        // If no cars found, return NO_CONTENT status
        if (cars.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(cars);
        }

        return ResponseEntity.ok(cars);
    }

    @GetMapping("/available")
    public List<Car> getAvailableCars() {
        return carRepository.findAll(); // You can also filter based on availability
    }

}

