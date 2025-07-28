package com.example.carrus.repository;

import com.example.carrus.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {

    // Custom query using @Query to find cars by userId
    @Query("SELECT c FROM Car c WHERE c.user.id = :userId")
    List<Car> findCarsByUserId(Long userId);
}
