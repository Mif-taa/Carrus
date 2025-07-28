package com.example.carrus.service;

import com.example.carrus.model.Review;
import com.example.carrus.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    // Save review to the database
    public Review saveReview(Long userId, String reviewText, Integer rating) {
        Review review = new Review(reviewText, rating, userId);
        return reviewRepository.save(review);
    }

    // Get reviews by userId
    public List<Review> getReviewsByUserId(Long userId) {
        return reviewRepository.findByUserId(userId);
    }

    public List<Review> findReviewsWithUserDetails(Long userId) {
        return reviewRepository.findReviewsWithUserDetails(userId);
    }
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

}
