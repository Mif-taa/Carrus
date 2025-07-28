package com.example.carrus.service;

import com.example.carrus.model.Payment;
import com.example.carrus.model.User;
import com.example.carrus.repository.PaymentRepository;
import com.example.carrus.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private UserRepository userRepository;

    // Save a payment to the database
    public Payment savePayment(Long userId, String paymentMethod, Double amount, String transactionId, String paymentDate) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Payment payment = new Payment(paymentMethod, amount, transactionId, paymentDate, user);
        return paymentRepository.save(payment);
    }

    // Get payments by userId
    public List<Payment> getPaymentsByUserId(Long userId) {
        return paymentRepository.findByUserId(userId);
    }
}
