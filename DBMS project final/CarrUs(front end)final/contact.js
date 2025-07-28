document.querySelector("#contact-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const message = document.querySelector("textarea[name='message']").value;
    const userId = localStorage.getItem("userId");

    if (!userId) {
        alert("You need to log in to submit a contact message!");
        return;
    }

    const contactData = {
        user: {
            id: userId, // Send the userId inside the 'user' object
        },
        message: message,
    };

    fetch("http://localhost:8080/api/contacts/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
    })
        .then(async (response) => {
            const responseBody = await response.json();
            if (response.ok) {
                alert("Message sent successfully!");
                document.querySelector("#contact-form").reset();
            } else {
                alert("Error: " + responseBody.message);
            }
        })
        .catch((error) => {
            console.error("Error submitting contact message:", error);
            alert("An error occurred while submitting your message.");
        });
});
