package com.example.carrus.controller;

import com.example.carrus.model.Review;
import com.example.carrus.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin("*")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    // Endpoint to get reviews by userId
    @GetMapping("/user/{userId}")
    public List<Review> getReviewsByUserId(@PathVariable Long userId) {
        return reviewService.getReviewsByUserId(userId);
    }

    // Endpoint to submit a review
    @PostMapping("/submit")
    public Review submitReview(@RequestBody Review review) {
        return reviewService.saveReview(review.getUserId(), review.getReviewText(), review.getRating());
    }
    @GetMapping("/all")
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }

}

