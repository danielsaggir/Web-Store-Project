
// Function to check if the user is logged in
function isLoggedIn() {
    // Example logic to check if the user is logged in
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
                <div class="order-details">
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

// Run `updateCartDisplay` on page load
document.addEventListener('DOMContentLoaded', () => {
    if (isLoggedIn()) {
        updateCartDisplay();
    }
});

// Define the isLoggedIn function
function isLoggedIn() {
    // Implement the logic to check if the user is logged in
    // This could be a check for a session, token, or cookie, etc.
    return username && username !== 'Guest';  // Example logic
}
   
   // Add event listener for cart button
   const cartBtn = document.getElementById('cartBtn');
   if (cartBtn) {
       cartBtn.addEventListener('click', function() {
           const cartCard = document.getElementById('cartCard');
           if (cartCard.style.display === 'none' || cartCard.style.display === '') {
               cartCard.style.display = 'block';
           } else {
               cartCard.style.display = 'none';
           }
       });
   }

   
   // הקוד עבור כפתור ה-logIn
    const logInBtn = document.getElementById('logInBtn');
    if (logInBtn) {
        logInBtn.addEventListener('click', function() {
            let loginCard = document.getElementById('logInCard');
            let logoutCard = document.getElementById('logoutCard');
            let changePassCard = document.getElementById('changePassCard');
            let changeUserNameCard = document.getElementById('changeUserNameCard');

            // סגירת כל התיבות הפתוחות
            if (changePassCard && changePassCard.style.display === 'block') {
                changePassCard.style.display = 'none';
            }
            if (changeUserNameCard && changeUserNameCard.style.display === 'block') {
                changeUserNameCard.style.display = 'none';
            }

            if (username && username !== 'Guest') {
                // המשתמש מחובר
                if (logoutCard.style.display === 'block') {
                    logoutCard.style.display = 'none';
                } else {
                    logoutCard.style.display = 'block';
                }
            } else {
                // המשתמש לא מחובר
                if (loginCard.style.display === 'block') {
                    loginCard.style.display = 'none';
                } else {
                    loginCard.style.display = 'block';
                }
            }
        });
    }
   
    // הקוד עבור כפתור ה-showRegisterForm
    const showRegisterForm = document.getElementById('showRegisterForm');
    if (showRegisterForm) {
        showRegisterForm.addEventListener('click', function() {
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

    // הקוד עבור כפתור ה-backToLogin
    const backToLogin = document.getElementById('backToLogin');
    if (backToLogin) {
        backToLogin.addEventListener('click', function() {
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

    // הקוד עבור כפתור ה-backToLogoutFromUser
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
  { name: 'Chamonix', country: 'FR', lat: 45.9237, lng: 6.8694 },
  { name: 'Bansko', country: 'BG', lat: 41.8262, lng: 23.4857 },
  { name: 'Val Thorens', country: 'FR', lat: 45.2970, lng: 6.5800 }
];

let map;
let markers = [];
let weatherData = [];
let currentIndex = 0;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: { lat: 45.0, lng: 10.0 }
  });

  cities.forEach(city => {
    let marker = new google.maps.Marker({
      position: { lat: city.lat, lng: city.lng },
      map: map,
      title: city.name
    });
    markers.push(marker);
  });
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
  
  // Add event listener to the search button
  document.getElementById('searchButton').addEventListener('click', function () {
    const searchQuery = document.getElementById('searchBox').value;
    if (searchQuery) {
      window.location.href = `/SingleProduct?name=${encodeURIComponent(searchQuery)}`;
    }
  });
});
