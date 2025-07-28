package com.example.carrus.service;

import com.example.carrus.model.User;
import com.example.carrus.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Register user
    public User registerUser(User user) {
        // Check if email already exists
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email is already in use");
        }

        // Save and return the newly created user
        return userRepository.save(user);
    }

    // Authenticate user (login)
    public User authenticateUser(String email, String password) {
        // Retrieve the user based on email and password
        User user = userRepository.findByEmailAndPassword(email, password);

        if (user == null) {
            throw new RuntimeException("Invalid email or password");
        }

        return user;  // Return the authenticated user
    }
    // Fetch user by userId
    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }
}
