// Add event listener for car registration form submission
document.getElementById('car-registration-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Retrieve userId from localStorage
    const userId = localStorage.getItem('userId'); // Assuming userId is saved in localStorage
    if (!userId) {
        alert('User ID is missing. Please log in again.');
        return;
    }

    // Gather form data
    const formData = new FormData(this);
    const carData = {
        registrationNumber: formData.get('registrationNumber'),
        category: formData.get('category'),
        seatCapacity: formData.get('seatCapacity'),
        make: formData.get('make'),
        year: formData.get('year'),
        model: formData.get('model'),
    };

    // Send registration request to the backend
    fetch(`http://localhost:8080/api/cars/register?userId=${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(carData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Car registration failed. Please check your inputs.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Car registered:', data);
        alert('Car successfully registered!');
        document.getElementById('load-cars').click(); // Reload the registered cars list
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to register car. Please try again.');
    });
});

// Add event listener for loading registered cars
document.getElementById('load-cars').addEventListener('click', function() {
    const userId = localStorage.getItem('userId'); // Assuming userId is saved in localStorage
    if (!userId) {
        alert('User ID is missing. Please log in again.');
        return;
    }

    // Fetch registered cars for the user
    fetch(`http://localhost:8080/api/cars/getRegisteredCars?userId=${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load registered cars.');
            }
            return response.json();
        })
        .then(cars => {
            const carsList = document.getElementById('cars-list');
            carsList.innerHTML = ''; // Clear previous content

            if (cars.length === 0) {
                carsList.textContent = 'No cars registered yet.';
                return;
            }

            // Populate the list of registered cars
            cars.forEach(car => {
                const carDiv = document.createElement('div');
                carDiv.textContent = `Registration Number: ${car.registrationNumber}, Make: ${car.make}, Model: ${car.model}`;
                carsList.appendChild(carDiv);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to load registered cars. Please try again.');
        });
});
