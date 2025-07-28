document.addEventListener("DOMContentLoaded", () => {
  const carCategorySelect = document.getElementById("car-category");
  const carMakeSelect = document.getElementById("car-make");
  const carModelSelect = document.getElementById("car-model");
  const carPhoto = document.getElementById("car-photo");
  const carPriceElement = document.getElementById("car-price");
  const subscriptionDurationInput = document.getElementById("subscription-duration");
  const discountElement = document.getElementById("discount");
  const totalPriceElement = document.getElementById("total-price");
  const calculatePriceButton = document.getElementById("calculate-price");
  const subscribeNowButton = document.getElementById("subscribe-now");
  const clientLocation = document.getElementById("client-location");

  const fixedPricePerMonth = 10000; // Fixed price for all cars
  carPriceElement.textContent = `${fixedPricePerMonth}tk/month`;
  let carData = [];

  // Fetch userId from localStorage
  const userId = localStorage.getItem("userId");

  // Fetch car data from backend
  const fetchCarData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/cars/available");
      if (response.ok) {
        carData = await response.json();
        populateCarCategories();
      } else {
        console.error("Failed to fetch car data.");
      }
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  const populateCarCategories = () => {
    const categories = [...new Set(carData.map(car => car.category))];
    carCategorySelect.innerHTML = "<option value=''>Select Category</option>";

    categories.forEach(category => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      carCategorySelect.appendChild(option);
    });

    updateCarMakesAndModels(); // Update makes and models when categories are populated
  };

  const updateCarMakesAndModels = () => {
    const selectedCategory = carCategorySelect.value;
    const filteredCars = carData.filter(car => car.category === selectedCategory);

    const uniqueMakes = [...new Set(filteredCars.map(car => car.make))];
    carMakeSelect.innerHTML = "<option value=''>Select Make</option>";
    uniqueMakes.forEach(make => {
      const option = document.createElement("option");
      option.value = make;
      option.textContent = make;
      carMakeSelect.appendChild(option);
    });

    updateCarModels(); // Update models when makes are populated
  };

  const updateCarModels = () => {
    const selectedCategory = carCategorySelect.value;
    const selectedMake = carMakeSelect.value;
    const filteredCars = carData.filter(
      car => car.category === selectedCategory && car.make === selectedMake
    );

    carModelSelect.innerHTML = "<option value=''>Select Model</option>";
    filteredCars.forEach(car => {
      const option = document.createElement("option");
      option.value = car.id; // Assuming car.id is the unique identifier
      option.textContent = car.model;
      option.setAttribute("data-photo", car.photo || "default-car.jpg");
      carModelSelect.appendChild(option);
    });

    updateCarPhoto(); // Update car photo when models are populated
  };

// Update car photo based on selected model
const updateCarPhoto = () => {
  const selectedOption = carModelSelect.options[carModelSelect.selectedIndex];
  const model = selectedOption ? selectedOption.textContent : null; // Get model name from the option text
  if (model) {
    carPhoto.src = `${model.replace(/\s+/g, "-").toLowerCase()}.jpg`; // Convert model name to a sanitized file name
  } else {
    carPhoto.src = "default-car.jpg"; // Reset to default if no model is selected
  }
};


  const calculateTotalPrice = () => {
    const duration = parseInt(subscriptionDurationInput.value, 10) || 1;

    let discount = 0;
    if (duration > 6) {
      discount = 0.1;
    }

    const totalPrice = fixedPricePerMonth * duration * (1 - discount);
    discountElement.textContent = `${discount * 100}%`;
    totalPriceElement.textContent = `${totalPrice.toFixed(2)}tk`;
  };

  const subscribeNow = async () => {
    if (!userId) {
      alert("Please log in first!");
      return;
    }

    const payload = {
      user: { id: userId },
      car: { id: carModelSelect.value },
      duration: parseInt(subscriptionDurationInput.value, 10),
      totalPrice: parseFloat(totalPriceElement.textContent),
      location: clientLocation.value,
    };

    try {
      const response = await fetch("http://localhost:8080/api/subscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Subscription successful!");
      } else {
        alert("Failed to subscribe.");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  // Event Listeners
  carCategorySelect.addEventListener("change", updateCarMakesAndModels);
  carMakeSelect.addEventListener("change", updateCarModels);
  carModelSelect.addEventListener("change", updateCarPhoto);
  calculatePriceButton.addEventListener("click", calculateTotalPrice);
  subscribeNowButton.addEventListener("click", subscribeNow);

  // Initial fetch
  fetchCarData();
});
