document.addEventListener("DOMContentLoaded", () => {
    const userId = 1; // Replace with the logged-in user's ID (can come from session/local storage)
    const reviewsContainer = document.getElementById("reviews-container");

    // Fetch reviews from the backend
    fetch(`http://localhost:8080/api/reviews/user/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch reviews");
            }
            return response.json();
        })
        .then(reviews => {
            // Dynamically populate reviews
            if (reviews.length > 0) {
                reviews.forEach(review => {
                    const reviewElement = document.createElement("div");
                    reviewElement.className = "review";

                    reviewElement.innerHTML = `
                        <h3>${review.title}</h3>
                        <p>${review.content}</p>
                        <span>Rating: ${review.rating}</span>
                        <span>Posted by: ${review.user.name}</span>
                    `;

                    reviewsContainer.appendChild(reviewElement);
                });
            } else {
                reviewsContainer.innerHTML = "<p>No reviews found for this user.</p>";
            }
        })
        .catch(error => {
            console.error("Error fetching reviews:", error);
            reviewsContainer.innerHTML = "<p>Failed to load reviews.</p>";
        });
});
