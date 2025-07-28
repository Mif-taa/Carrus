// Function to handle the login request
async function loginUser() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('http://localhost:8080/api/users/login?email=' + email + '&password=' + password, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            const user = await response.json();
            alert('Login successful!');

            // Store the userId in localStorage
            localStorage.setItem('userId', user.id);

            // Redirect to home page or any other page
            window.location.href = './home.html';
        } else {
            const error = await response.text();
            alert('Login failed: ' + error);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again later.');
    }
}
