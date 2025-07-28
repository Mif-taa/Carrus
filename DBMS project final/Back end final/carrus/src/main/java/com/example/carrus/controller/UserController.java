package com.example.carrus.controller;

import com.example.carrus.model.User;
import com.example.carrus.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    // Register user
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User savedUser = userService.registerUser(user);
        return ResponseEntity.ok(savedUser);  // Respond with the saved user
    }

    // Login user
    @PostMapping("/login")
    public User login(@RequestParam String email, @RequestParam String password) {
        User user = userService.authenticateUser(email, password);
        if (user == null) {
            throw new RuntimeException("Invalid credentials");
        }
        return user; // Return user details along with the ID for login purposes
    }
    // Endpoint to get user by userId
    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
