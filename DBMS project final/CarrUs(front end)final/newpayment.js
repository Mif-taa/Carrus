document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();

    const paymentMethod = document.getElementById("paymentMethod").value;
    const amount = document.getElementById("amount").value;
    const transactionId = document.getElementById("transactionId").value;
    const paymentDate = document.getElementById("paymentDate").value;

    const userId = localStorage.getItem("userId");

    if (!userId) {
        alert("You need to log in to submit a payment!");
        return;
    }

    const paymentData = {
        user: {
            id: userId, // Send the userId inside a 'user' object
        },
        paymentMethod: paymentMethod,
        amount: amount,
        transactionId: transactionId,
        paymentDate: paymentDate,
    };

    fetch("http://localhost:8080/api/payments/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
    })
        .then(async (response) => {
            const responseBody = await response.json();
            console.log("Response Body:", responseBody); // Debugging purpose
            if (response.ok) {
                alert("Payment submitted successfully!");
                document.querySelector("form").reset();
            } else {
                alert("Error: " + responseBody.message);
            }
        })
        .catch((error) => {
            console.error("Error submitting payment:", error);
            alert("An error occurred while submitting your payment.");
        });
});
// Fetch and display the payment history
document.addEventListener("DOMContentLoaded", function () {
    const userId = localStorage.getItem("userId");

    if (!userId) {
        alert("You need to log in to view your payment history!");
        return;
    }

    fetch(`http://localhost:8080/api/payments/user/${userId}`)
        .then(response => response.json())
        .then(payments => {
            let paymentListHtml = '';
            let totalAmount = 0;

            // Iterate through the payments and create HTML table rows
            payments.forEach(payment => {
                paymentListHtml += `
                    <tr>
                        <td>${payment.paymentMethod}</td>
                        <td>${payment.amount}</td>
                        <td>${payment.transactionId}</td>
                        <td>${payment.paymentDate}</td>
                    </tr>
                `;
                totalAmount += payment.amount;
            });

            // Insert payment data into the table
            document.getElementById("payment-list").innerHTML = paymentListHtml;

            // Display total paid amount
            document.getElementById("total-amount").textContent = totalAmount.toFixed(2);
        })
        .catch(error => {
            console.error("Error fetching payment history:", error);
            alert("An error occurred while fetching your payment history.");
        });
});
