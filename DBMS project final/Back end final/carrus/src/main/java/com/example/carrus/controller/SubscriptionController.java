package com.example.carrus.controller;

import com.example.carrus.model.Subscription;
import com.example.carrus.service.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/subscriptions")
@CrossOrigin("*")
public class SubscriptionController {
    @Autowired
    private SubscriptionService subscriptionService;

    @PostMapping
    public ResponseEntity<?> createSubscription(@RequestBody Subscription request) {
        try {
            if (request.getUser() == null || request.getCar() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("User or Car information is missing.");
            }

            Subscription subscription = subscriptionService.createSubscription(
                    request.getUser().getId(),
                    request.getCar().getId(),
                    request.getDuration(),
                    request.getTotalPrice(),
                    request.getLocation()
            );
            return ResponseEntity.ok(subscription);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Internal Server Error: " + e.getMessage());
        }
    }


}
