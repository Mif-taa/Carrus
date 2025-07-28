package com.example.carrus.service;

import com.example.carrus.model.Contact;
import com.example.carrus.model.User;
import com.example.carrus.repository.ContactRepository;
import com.example.carrus.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private UserRepository userRepository;

    // Save a contact message
    public Contact saveContact(Long userId, String message) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Contact contact = new Contact(message, user);
        return contactRepository.save(contact);
    }

    // Get contacts by userId
    public List<Contact> getContactsByUserId(Long userId) {
        return contactRepository.findByUserId(userId);
    }
}
