package com.example.carrus.repository;

import com.example.carrus.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    // Custom SQL query to find reviews by userId
    @Query("SELECT r FROM Review r WHERE r.userId = :userId")
    List<Review> findByUserId(Long userId);

    // Example of a more complex SQL query with JOIN (e.g., fetching reviews along with user details)
    @Query("SELECT r FROM Review r JOIN User u ON r.userId = u.id WHERE u.id = :userId")
    List<Review> findReviewsWithUserDetails(Long userId);
}
