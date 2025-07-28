async function registerUser() {
    const user = {
        name: document.getElementById('signup-name').value,
        phone: document.getElementById('signup-phone').value,
        email: document.getElementById('signup-email').value,
        address: document.getElementById('signup-address').value,
        nid: document.getElementById('signup-nid').value,
        dob: document.getElementById('signup-dob').value,
        gender: document.getElementById('signup-gender').value.toUpperCase(),
        password: document.getElementById('signup-password').value,
    };

    try {
        const response = await fetch('http://localhost:8080/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            const result = await response.json();
            alert('Registration successful!');

            // Store the userId in localStorage for later use
            localStorage.setItem('userId', result.id);

            // Redirect to login page
            window.location.href = './login.html';
        } else {
            const error = await response.text();
            alert('Error: ' + error);
        }
    } catch (error) {
        console.error('An error occurred:', error);
        alert('An error occurred during registration.');
    }
}
