package com.example.carrus.controller;

import com.example.carrus.model.Payment;
import com.example.carrus.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin("*") // Allow cross-origin requests
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    // Endpoint to submit a payment
    @PostMapping("/submit")
    public Payment submitPayment(@RequestBody Payment payment) {
        Long userId = payment.getUser().getId(); // Extract userId from user object
        return paymentService.savePayment(
                userId,
                payment.getPaymentMethod(),
                payment.getAmount(),
                payment.getTransactionId(),
                payment.getPaymentDate()
        );
    }

    // Endpoint to get payments by userId
    @GetMapping("/user/{userId}")
    public List<Payment> getPaymentsByUserId(@PathVariable Long userId) {
        return paymentService.getPaymentsByUserId(userId);
    }
}
