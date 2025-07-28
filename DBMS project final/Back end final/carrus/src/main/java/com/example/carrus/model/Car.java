package com.example.carrus.model;

import jakarta.persistence.*;

@Entity
@Table(name = "cars")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // Unique ID for the car

    private String registrationNumber;
    private String category;
    private int seatCapacity;
    private String make;
    private String year;
    private String model;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")  // Foreign key reference to User's ID
    private User user;

    // Default constructor
    public Car() {
    }

    // Parameterized constructor
    public Car(String registrationNumber, String category, int seatCapacity, String make, String year, String model, User user) {
        this.registrationNumber = registrationNumber;
        this.category = category;
        this.seatCapacity = seatCapacity;
        this.make = make;
        this.year = year;
        this.model = model;
        this.user = user;
    }

    // Getter and Setter methods for all fields

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getSeatCapacity() {
        return seatCapacity;
    }

    public void setSeatCapacity(int seatCapacity) {
        this.seatCapacity = seatCapacity;
    }

    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public double getPricePerDay() {
        double pricePerDay = 5000;
        return pricePerDay;
    }
}
