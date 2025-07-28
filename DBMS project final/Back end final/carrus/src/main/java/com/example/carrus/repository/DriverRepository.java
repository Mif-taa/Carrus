package com.example.carrus.repository;

import com.example.carrus.model.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DriverRepository extends JpaRepository<Driver, Long> {

    // Query to fetch all drivers with user details
    @Query("SELECT d FROM Driver d JOIN FETCH d.user")
    List<Driver> findAllDriversWithUsers();
}
