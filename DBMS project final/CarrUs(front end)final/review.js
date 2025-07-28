// Function to handle form submission
document.getElementById("review-form").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent the default form submission behavior
    
    // Capture the review text and rating
    const reviewText = document.getElementById("review-text").value;
    const rating = document.getElementById("rating").value;

    // Get the userId from localStorage
    const userId = localStorage.getItem("userId");

    if (!userId) {
        alert("You need to log in to submit a review!");
        return;
    }

    // Prepare the review data
    const reviewData = {
        reviewText: reviewText,
        rating: rating,
        userId: userId // Including userId in the data
    };

    // Send the data to the backend
    fetch("http://localhost:8080/api/reviews/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reviewData)
    })
    .then(response => response.json())
    .then(data => {
        if (data) {
            alert("Review submitted successfully!");
            // Optionally, clear the form or perform other actions
            document.getElementById("review-form").reset();
        } else {
            alert("Failed to submit review. Please try again.");
        }
    })
    .catch(error => {
        console.error("Error submitting review:", error);
        alert("An error occurred while submitting your review.");
    });
});
function loadReviews() {
    fetch("http://localhost:8080/api/reviews/all")
        .then(response => response.json())
        .then(reviews => {
            const reviewsContainer = document.createElement("div");
            reviewsContainer.id = "reviews-container";
            document.body.appendChild(reviewsContainer);

            reviewsContainer.innerHTML = ""; // Clear existing reviews
            reviews.forEach(review => {
                const reviewElement = document.createElement("div");
                reviewElement.className = "review";
                reviewElement.innerHTML = `
                    <p><strong>Reviewer ID:</strong> ${review.userId}</p>
                    <p><strong>Rating:</strong> ${review.rating}</p>
                    <p><strong>Review:</strong> ${review.reviewText}</p>
                    <hr>
                `;
                reviewsContainer.appendChild(reviewElement);
            });
        })
        .catch(error => {
            console.error("Error loading reviews:", error);
        });
}

// Call the loadReviews function when the page loads
// document.addEventListener("DOMContentLoaded", loadReviews);
