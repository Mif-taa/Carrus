// Fetch drivers from the backend and display them
async function fetchDrivers() {
    try {
        const response = await fetch('http://localhost:8080/api/drivers');
        if (!response.ok) {
            throw new Error('Failed to fetch drivers.');
        }

        const drivers = await response.json();
        const driversContainer = document.getElementById('drivers-container');

        // Clear the existing content
        driversContainer.innerHTML = '';

        // Render each driver
        drivers.forEach(driver => {
            const driverElement = document.createElement('div');
            driverElement.className = 'driver-card';
            driverElement.innerHTML = `
                <h3>Driver: ${driver.user.name}</h3>
                <p><strong>License Number:</strong> ${driver.licenseNumber}</p>
                <p><strong>License Class:</strong> ${driver.licenseClass}</p>
                <p><strong>Registered By User ID:</strong> ${driver.user.id}</p>
                ${driver.photoPath ? `<img src="${driver.photoPath}" alt="Driver Photo" style="width:100px;height:100px;">` : ''}
            `;
            driversContainer.appendChild(driverElement);
        });
    } catch (error) {
        console.error('Error fetching drivers:', error);
        alert('Failed to fetch drivers.');
    }
}

// Handle form submission
async function submitDriverRegistration() {
    const licenseNumber = document.getElementById('license-number').value;
    const licenseClass = document.getElementById('license-class').value;

    // Get userId from localStorage
    const userId = localStorage.getItem('userId');
    if (!userId) {
        alert('User is not logged in. Please log in first.');
        return;
    }

    const formData = new FormData();
    formData.append('licenseNumber', licenseNumber);
    formData.append('licenseClass', licenseClass);
    formData.append('userId', userId);

    try {
        const response = await fetch('http://localhost:8080/api/drivers', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            alert('Driver registered successfully!');
            fetchDrivers(); // Fetch and update drivers list after successful registration
        } else {
            const error = await response.text();
            alert('Failed to register driver: ' + error);
        }
    } catch (error) {
        console.error('Error submitting driver registration:', error);
        alert('An error occurred. Please try again later.');
    }
}

// Attach event listener to the form
document.getElementById('driver-registration-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission
    submitDriverRegistration(); // Handle form submission
});

// Fetch drivers on page load
window.onload = fetchDrivers;
