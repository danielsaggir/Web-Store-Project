document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.querySelector('.btn-search');
    const searchInput = document.querySelector('.input-search');

    searchButton.addEventListener('click', function () {
        const query = searchInput.value;
        if (query) {
            window.location.href = `/search?query=${query}`;
        }
    });

    searchInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const query = searchInput.value;
            if (query) {
                window.location.href = `/search?query=${query}`;
            }
        }
    });
});


// Function to check if the user is logged in
function isLoggedIn() {
  return typeof username !== 'undefined' && username && username !== 'Guest';
}

// Function to fetch and display cart items
async function updateCartDisplay() {
  if (!isLoggedIn()) return; // Ensure user is logged in

  try {
      const response = await fetch(`/getCartItems?username=${username}`);
      if (!response.ok) throw new Error('Failed to fetch cart items');
      
      const cartItems = await response.json();
      
      const cartBody = document.querySelector('#cartCard .card-body');
      if (!cartBody) {
          console.error('Cart body not found');
          return;
      }

      let cartHTML = '';

      cartItems.forEach(item => {
          cartHTML += `
              <div class="order-details" data-item-id="${item._id}">
                  <img src="${item.productImage}" class="product-image">
                  <div class="order-info">
                      <p class="card-text">Name Product: ${item.productName}</p>
                      <p class="card-text">Description: ${item.productDescription}</p>
                      <p class="card-text">Size: ${item.selectedSize}</p>
                      <p class="card-text">Quantity: ${item.quantity}</p>
                      <p class="card-text">Price Order: ${item.productPrice} ₪</p>
                      <button class="btn btn-danger remove-item">Remove</button>
                  </div>
              </div>
          `;
      });

      const totalAmount = cartItems.reduce((acc, item) => acc + parseFloat(item.totalPrice), 0).toFixed(2);

      cartBody.innerHTML = `
          <h5 class="card-title">YOUR SHOPPING CART</h5>
          ${cartHTML}
          <p id="totalAmount" class="total-amount">Total: ${totalAmount} ₪</p>
      `;

      const emptyCartMessage = document.getElementById('emptyCartMessage');
      if (emptyCartMessage) {
          emptyCartMessage.style.display = cartItems.length === 0 ? 'block' : 'none';
      } else {
          console.error('Empty cart message element not found');
      }

      // Add event listeners for remove buttons
      document.querySelectorAll('.remove-item').forEach(button => {
          button.addEventListener('click', async function() {
              const itemId = this.closest('.order-details').dataset.itemId;
              await removeCartItem(itemId);
          });
      });
  } catch (error) {
      console.error('Failed to fetch cart items:', error);
  }
}

// Define the removeCartItem function
async function removeCartItem(itemId) {
  try {
      const response = await fetch('/removeCartItem', {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, itemId })
      });

      if (!response.ok) {
          throw new Error('Failed to remove item from cart');
      }

      // Update the cart display after removing the item
      updateCartDisplay();
  } catch (error) {
      console.error('Failed to remove item from cart:', error);
  }
}

// Run `updateCartDisplay` on page load
document.addEventListener('DOMContentLoaded', () => {
  if (isLoggedIn()) {
      updateCartDisplay();
  }
});

// Add event listener for cart button
const cartBtn = document.getElementById('cartBtn');
if (cartBtn) {
  cartBtn.addEventListener('click', function() {
      const cartCard = document.getElementById('cartCard');
      const loginCard = document.getElementById('logInCard');

      // סגור את כרטיס ההתחברות אם הוא פתוח
      if (loginCard.style.display === 'block') {
          loginCard.style.display = 'none';
      }

      // החלף את מצב התצוגה של כרטיס העגלה
      if (cartBtn.style.display === 'none' || cartCard.style.display === '') {
          cartCard.style.display = 'block';
      } else {
          cartCard.style.display = 'none';
      }
  });
}

// Add other event listeners for the login and form buttons
const logInBtn = document.getElementById('logInBtn');
if (logInBtn) {
  logInBtn.addEventListener('click', function() {
      let loginCard = document.getElementById('logInCard');
      let logoutCard = document.getElementById('logoutCard');
      let changePassCard = document.getElementById('changePassCard');
      let changeUserNameCard = document.getElementById('changeUserNameCard');
      let cartCard = document.getElementById('cartCard');

      // Close any open cards
      if (changePassCard && changePassCard.style.display === 'block') {
          changePassCard.style.display = 'none';
      }
      if (changeUserNameCard && changeUserNameCard.style.display === 'block') {
          changeUserNameCard.style.display = 'none';
      }
      if(cartCard.style.display==='block')
        cartCard.style.display = 'none';


      if (username && username !== 'Guest') {
          // User is logged in
          if (logoutCard.style.display === 'block') {
              logoutCard.style.display = 'none';
          } else {
              logoutCard.style.display = 'block';
          }
      } else {
          // User is not logged in
          if (loginCard.style.display === 'block') {
              loginCard.style.display = 'none';
          } else {
              loginCard.style.display = 'block';
          }
      }
  });
}

const showRegisterForm = document.getElementById('showRegisterForm');
if (showRegisterForm) {
    showRegisterForm.addEventListener('click', function () {
        let registerForm = document.getElementById('registerCard');
        let loginForm = document.getElementById('logInCard');
        
        if (registerForm.style.display === 'block') {
            registerForm.style.display = 'none';
            loginForm.style.display = 'block';
        } else {
            registerForm.style.display = 'block';
            loginForm.style.display = 'none';
        }
    });
}

const backToLoginForm = document.getElementById('backToLoginForm');
if (backToLoginForm) {
    backToLoginForm.addEventListener('click', function () {
        let registerForm = document.getElementById('registerCard');
        let loginForm = document.getElementById('logInCard');
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    });
}


// הקוד עבור כפתור ה-showChangePassForm
const showChangePassForm = document.getElementById('showChangePassForm');
if (showChangePassForm) {
  showChangePassForm.addEventListener('click', function() {
      let changePassForm = document.getElementById('changePassCard');
      let logoutCard = document.getElementById('logoutCard');
      
      if (changePassForm.style.display === 'block') {
          changePassForm.style.display = 'none';
          logoutCard.style.display = 'block';
      } else {
          changePassForm.style.display = 'block';
          logoutCard.style.display = 'none';
      }
  });
}

// הקוד עבור כפתור ה-showChangeUserNameForm
const showChangeUserNameForm = document.getElementById('showChangeUserNameForm');
if (showChangeUserNameForm) {
  showChangeUserNameForm.addEventListener('click', function() {
      let changeUserNameForm = document.getElementById('changeUserNameCard');
      let logoutCard = document.getElementById('logoutCard');
      
      if (changeUserNameForm.style.display === 'block') {
          changeUserNameForm.style.display = 'none';
          logoutCard.style.display = 'block';
      } else {
          changeUserNameForm.style.display = 'block';
          logoutCard.style.display = 'none';
      }
  });
}

// הקוד עבור כפתור ה-backToLogoutFromPass
const backToLogoutFromPass = document.getElementById('backToLogoutFromPass');
if (backToLogoutFromPass) {
  backToLogoutFromPass.addEventListener('click', function() {
      let changePassForm = document.getElementById('changePassCard');
      let logoutCard = document.getElementById('logoutCard');
      changePassForm.style.display = 'none';
      logoutCard.style.display = 'block';
  });
}

const backToLogoutFromUser = document.getElementById('backToLogoutFromUser');
if (backToLogoutFromUser) {
  backToLogoutFromUser.addEventListener('click', function() {
      let changeUserNameForm = document.getElementById('changeUserNameCard');
      let logoutCard = document.getElementById('logoutCard');
      changeUserNameForm.style.display = 'none';
      logoutCard.style.display = 'block';
  });
}

const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(loginForm);
      const data = {
          username: formData.get('username'),
          password: formData.get('password')
      };

      try {
          const response = await fetch('/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          });

          if (response.ok) {
              window.location.href = `/?username=${data.username}`;
          } else {
              const result = await response.json();
              const loginError = document.getElementById('loginError');
              loginError.textContent = result.error;
              loginError.style.display = 'block';
          }
      } catch (error) {
          console.error('Error:', error);
      }
  });
}

const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(registerForm);
      const data = {
          firstName: formData.get('firstName'),
          lastName: formData.get('lastName'),
          username: formData.get('username'),
          password: formData.get('password')
      };

      try {
          const response = await fetch('/register', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          });

          if (response.ok) {
              const result = await response.json();
              window.location.href = `/?username=${result.username}`;
          } else {
              const result = await response.json();
              const registerError = document.getElementById('registerError');
              registerError.textContent = result.error;
              registerError.style.display = 'block';
          }
      } catch (error) {
          console.error('Error:', error);
      }
  });
}

// הוספת טיפול בטופס שינוי סיסמא
const changePassForm = document.getElementById('changePassForm');
if (changePassForm) {
  changePassForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(changePassForm);
      const data = {
          username: formData.get('username'),
          newPassword: formData.get('newPassword')
      };

      try {
          const response = await fetch('/changePass', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          });

          if (response.ok) {
              const result = await response.json();
              alert('Password changed successfully');
              window.location.href = `/?username=${result.username}`;
          } else {
              const result = await response.json();
              const changePassError = document.getElementById('changePassError');
              changePassError.textContent = result.error;
              changePassError.style.display = 'block';
          }
      } catch (error) {
          console.error('Error:', error);
      }
  });
}

// הוספת טיפול בטופס שינוי שם משתמש
const changeUserNameForm = document.getElementById('changeUserNameForm');
if (changeUserNameForm) {
  changeUserNameForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(changeUserNameForm);
      const data = {
          username: formData.get('username'),
          newUserName: formData.get('newUserName')
      };

      try {
          const response = await fetch('/changeUserName', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          });

          if (response.ok) {
              const result = await response.json();
              alert('User name changed successfully');
              window.location.href = `/?username=${result.username}`;
          } else {
              const result = await response.json();
              const changeUserNameError = document.getElementById('changeUserNameError');
              changeUserNameError.textContent = result.error;
              changeUserNameError.style.display = 'block';
          }
      } catch (error) {
          console.error('Error:', error);
      }
  });
}

document.getElementById('ski-products-link').addEventListener('click', () => {
  navigateToCategory('Ski Products');
});

document.getElementById('clothes-link').addEventListener('click', () => {
  navigateToCategory('Clothes');
});

document.getElementById('accessories-link').addEventListener('click', () => {
  navigateToCategory('Accessories');
});

function navigateToCategory(selectedCategory) {
  window.location.href = `/products?category=${selectedCategory}`;
}

// Replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual Google Maps API key
const googleMapsApiKey = 'AIzaSyB6RNA9mZmst46xbC-wuiIEA7xIQAjO-Pw';

// Replace 'YOUR_API_KEY' with your actual OpenWeather API key
const apiKey = 'e9b3b2b154c9598738e429ab2b39f9ce';
const cities = [
  { name: 'Chamonix', country: 'FR' },
  { name: 'Bansko', country: 'BG' },
  { name: 'Val Thorens', country: 'FR' }
];

let map;
let markers = [];
let weatherData = [];
let currentIndex = 0;

function initMap() {
    const mapDivElement= document.getElementById('map');
    console.log(`map div element is: ${mapDivElement}`)
  map = new google.maps.Map(mapDivElement, {
      zoom: 5,
      center: { lat: 45.0, lng: 10.0 }
  });

  // Fetch branches data from the API
  fetch('/api/branches')
      .then(response => response.json())
      .then(branches => {
          branches.forEach(branch => {
              let marker = new google.maps.Marker({
                  position: { lat: branch.lat, lng: branch.lng },
                  map: map,
                  title: branch.city
              });
              markers.push(marker);
          });
      })
      .catch(error => console.error('Error fetching branches data:', error));
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Google Maps
  initMap();

  const weatherDiv = document.getElementById('weather');

  // Fetch weather data for each city
  cities.forEach(city => {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.name},${city.country}&appid=${apiKey}&units=metric`)
          .then(response => response.json())
          .then(data => {
              console.log(`Weather in ${city.name}:`, data);
              weatherData.push({ city: city.name, data });
              
              // Display the first city's weather data once it's fetched
              if (weatherData.length === 1) {
                  displayWeather(weatherData[0]);
              }
          })
          .catch(error => console.error('Error fetching weather data:', error));
  });

  // Function to display weather data
  function displayWeather(weather) {
      weatherDiv.innerHTML = `
          <p>${weather.city} : Temperature ${weather.data.main.temp}°C ,  ${weather.data.weather[0].description} , Wind Speed: ${weather.data.wind.speed} m/s</p>
      `;
  }

  // Function to cycle through weather data every 5 seconds
  setInterval(() => {
      if (weatherData.length > 0) {
          currentIndex = (currentIndex + 1) % weatherData.length;
          displayWeather(weatherData[currentIndex]);
      }
  }, 5000);
  
  document.addEventListener('DOMContentLoaded', function () {
    // Add event listener to the search button
    document.querySelector('.btn-search').addEventListener('click', function () {
        const searchQuery = document.querySelector('.input-search').value;
        if (searchQuery) {
            window.location.href = `/SingleProduct?name=${encodeURIComponent(searchQuery)}`;
        }
    });

    // Change the color of the search button when the input is focused and when typing
    const inputSearch = document.querySelector('.input-search');
    const btnSearch = document.querySelector('.btn-search');

    const changeButtonColor = function() {
        btnSearch.style.color = '#4a5d6a';
    };

    inputSearch.addEventListener('focus', changeButtonColor);
    inputSearch.addEventListener('input', changeButtonColor);

    inputSearch.addEventListener('blur', function () {
        // Reset the color if needed when input loses focus
        if (!inputSearch.value) {
            btnSearch.style.color = '#ffffff'; // or any other default color
        }
    });
});

});
  

