package com.example.carrus.controller;

import com.example.carrus.model.Contact;
import com.example.carrus.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin("*")
public class ContactController {

    @Autowired
    private ContactService contactService;

    // Submit a contact message
    @PostMapping("/submit")
    public Contact submitContact(@RequestBody Contact contact) {
        Long userId = contact.getUser().getId(); // Extract userId from user object
        return contactService.saveContact(userId, contact.getMessage());
    }

    // Get contacts by userId
    @GetMapping("/user/{userId}")
    public List<Contact> getContactsByUserId(@PathVariable Long userId) {
        return contactService.getContactsByUserId(userId);
    }
}
