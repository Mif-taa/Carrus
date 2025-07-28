document.addEventListener("DOMContentLoaded", () => {
  const carMakeSelect = document.getElementById("car-make");
  const carModelSelect = document.getElementById("car-model");
  const carPhoto = document.getElementById("car-photo");
  const carPriceElement = document.getElementById("car-price");
  const totalDaysInput = document.getElementById("total-days");
  const totalPriceElement = document.getElementById("total-price");
  const calculatePriceButton = document.getElementById("calculate-price");
  const bookNowButton = document.getElementById("pay-now");

  const fixedPricePerDay = 5000; // 5000 tk/day
  carPriceElement.textContent = `${fixedPricePerDay}tk/day`;

  let cars = []; // Store fetched car data

  // Fetch car data from the backend
  const fetchCarData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/cars/available");
      if (response.ok) {
        cars = await response.json();
        populateCarMakeDropdown(cars);
      } else {
        alert("Failed to fetch car data.");
      }
    } catch (error) {
      console.error("Error fetching car data:", error);
      alert("Error while fetching car data.");
    }
  };

  // Populate the car make dropdown
  const populateCarMakeDropdown = (cars) => {
    const makes = [...new Set(cars.map((car) => car.make))]; // Unique car makes
    makes.forEach((make) => {
      const option = document.createElement("option");
      option.value = make;
      option.textContent = make;
      carMakeSelect.appendChild(option);
    });
  };

  // Populate the car model dropdown
  const populateCarModelDropdown = (make) => {
    carModelSelect.innerHTML = "<option value=''>Select a model</option>"; // Clear existing options

    // Filter cars by make
    const models = cars.filter((car) => car.make === make);

    models.forEach((car) => {
      const option = document.createElement("option");
      option.value = car.model;
      option.textContent = car.model; // Option shows model name
      carModelSelect.appendChild(option);
    });
  };

  // Update car photo based on selected model
  const updateCarPhoto = () => {
    const model = carModelSelect.value;
    if (model) {
      carPhoto.src = `${model.replace(/\s+/g, "-").toLowerCase()}.jpg`; // Example sanitization for file names
    } else {
      carPhoto.src = "default-car.jpg"; // Reset to default if no model is selected
    }
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    const totalDays = parseInt(totalDaysInput.value, 10);
    const selectedMake = carMakeSelect.value;
    const selectedModel = carModelSelect.value;

    if (!selectedMake || !selectedModel) {
      alert("Please select a car make and model.");
      return;
    }

    if (isNaN(totalDays) || totalDays <= 0) {
      alert("Please enter a valid number of days.");
      totalDaysInput.focus();
      return;
    }

    const discount = 0.2; // 20% discount
    const originalPrice = fixedPricePerDay * totalDays;
    const totalPrice = originalPrice * (1 - discount);

    totalPriceElement.textContent = `${totalPrice.toFixed(2)}tk (Discounted from ${originalPrice.toFixed(2)}tk)`;
    totalPriceElement.style.color = "green"; // Highlight total price
  };

  // Book Now functionality
  bookNowButton.addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent form submission

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User not logged in. Please log in to continue.");
      return;
    }

    const selectedMake = carMakeSelect.value;
    const selectedModel = carModelSelect.value;
    const pickUpLocation = document.getElementById("pick-up").value;
    const pickUpDate = document.getElementById("pick-up-date").value;
    const pickUpTime = document.getElementById("pick-up-time").value;
    const totalDays = parseInt(totalDaysInput.value, 10);

    if (!selectedMake || !selectedModel || !pickUpLocation || !pickUpDate || !pickUpTime || isNaN(totalDays)) {
      alert("Please fill in all fields.");
      return;
    }

    const selectedCar = cars.find((car) => car.make === selectedMake && car.model === selectedModel);
    if (!selectedCar) {
      alert("Invalid car selection.");
      return;
    }

    const bookingData = {
      userId: parseInt(userId),
      carId: selectedCar.id,
      pickUpLocation,
      dropOffLocation: "", // Optional
      pickUpDate,
      pickUpTime,
      totalDays,
    };

    try {
      const response = await fetch("http://localhost:8080/api/bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const booking = await response.json();
        alert(`Booking successful!`);
      } else {
        alert("Failed to create booking.");
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("An error occurred while creating the booking.");
    }
  });

  // Event listeners
  carMakeSelect.addEventListener("change", (event) => {
    const selectedMake = event.target.value;
    populateCarModelDropdown(selectedMake);
  });

  carModelSelect.addEventListener("change", updateCarPhoto);

  calculatePriceButton.addEventListener("click", calculateTotalPrice);

  // Initialize the page
  fetchCarData();
});
