document.addEventListener('DOMContentLoaded', function() {
    // Function to toggle login card visibility
    function toggleLogInCard() {
        let logInCard = document.getElementById('logInCard');
        let cartCard = document.getElementById('cartCard');
        
        if (logInCard.style.display === 'block') {
            logInCard.style.display = 'none';
        } else {
            logInCard.style.display = 'block';
            // Close cartCard if it's open
            if (cartCard.style.display === 'block') {
                cartCard.style.display = 'none';
            }
        }
    }

    // Function to toggle cart visibility
    function toggleCart() {
        let cartCard = document.getElementById('cartCard');
        let logInCard = document.getElementById('logInCard');
        
        if (cartCard.style.display === 'block') {
            cartCard.style.display = 'none';
        } else {
            cartCard.style.display = 'block';
            // Close logInCard if it's open
            if (logInCard.style.display === 'block') {
                logInCard.style.display = 'none';
            }
        }
    }

    // Add event listener to toggle login card visibility when clicking logInBtn
    let logInBtn = document.getElementById('logInBtn');
    logInBtn.addEventListener('click', function(event) {
        toggleLogInCard();
        event.stopPropagation(); // Prevent the click event from bubbling up to document
    });

    // Add event listener to toggle cart visibility when clicking cartBtn
    let cartBtn = document.getElementById('cartBtn');
    cartBtn.addEventListener('click', function(event) {
        toggleCart();
        event.stopPropagation(); // Prevent the click event from bubbling up to document
    });

    // Close logInCard and cartCard when clicking outside of them
    document.addEventListener('click', function(event) {
        let logInCard = document.getElementById('logInCard');
        let cartCard = document.getElementById('cartCard');
        let logInBtn = document.getElementById('logInBtn');
        let cartBtn = document.getElementById('cartBtn');
        
        // Check if clicked element is outside logInCard and logInBtn
        if (!logInCard.contains(event.target) && event.target !== logInBtn) {
            logInCard.style.display = 'none';
        }
        
        // Check if clicked element is outside cartCard and cartBtn
        if (!cartCard.contains(event.target) && event.target !== cartBtn) {
            cartCard.style.display = 'none';
        }
    });

    // Add event listener to all 'Add to Cart' buttons
    let addToCartButtons = document.querySelectorAll('.addto');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get product details
            let productName = this.parentNode.querySelector('.card-title').textContent;
            let productPrice = parseFloat(this.parentNode.querySelector('.card-text').textContent.replace('Price: $', ''));
            
            // Create a new list item for the cart
            let cartItem = document.createElement('li');
            cartItem.textContent = `${productName} - $${productPrice.toFixed(2)}`;
            
            // Add item to the cart
            let cartItemsList = document.getElementById('cartItems');
            cartItemsList.appendChild(cartItem);
            
            // Show the cart if it's hidden
            document.getElementById('cartCard').style.display = 'block';
            
            // Hide empty cart message
            document.getElementById('emptyCartMessage').style.display = 'none';
            
            // Close logInCard if it's open
            let logInCard = document.getElementById('logInCard');
            if (logInCard.style.display === 'block') {
                logInCard.style.display = 'none';
            }
        });
    });

    // Check if cart is empty and show empty cart message initially
    let cartItemsList = document.getElementById('cartItems');
    if (cartItemsList.children.length === 0) {
        document.getElementById('emptyCartMessage').style.display = 'block';
    }
});

// window.addEventListener('scroll', function() {
//     let topLine = document.getElementById('topLine');
//     let top = document.getElementById('top');
//     let topHeight = top.offsetHeight;
//     if (window.scrollY > topHeight) {
//         topLine.style.backgroundColor = 'rgba(250, 253, 255)';
//     } else {
//         topLine.style.backgroundColor = 'transparent';
//     }
// });

// document.getElementById('logInBtn').addEventListener('click', function() {
//     let menu = document.getElementById('logInCard');
//     if (menu.style.display === 'block') {
//         menu.style.display = 'none';
//     } else {
//         menu.style.display = 'block';
//     }
// });

// document.getElementById('logInBtn').addEventListener('click', function() {
//     let username = '<%= username %>';
//     let loginCard = document.getElementById('logInCard');
//     let logoutCard = document.getElementById('logoutCard');

//     if (username && username !== 'Guest') {
//         // המשתמש מחובר
//         if (logoutCard.style.display === 'block') {
//             logoutCard.style.display = 'none';
//         } else {
//             logoutCard.style.display = 'block';
//         }
//     } else {
//         // המשתמש לא מחובר
//         if (loginCard.style.display === 'block') {
//             loginCard.style.display = 'none';
//         } else {
//             loginCard.style.display = 'block';
//         }
//     }
// });



// document.getElementById('showRegisterForm').addEventListener('click', function() {
//     let registerForm = document.getElementById('registerCard');
//     let loginForm = document.getElementById('logInCard');
    
//     if (registerForm.style.display === 'block') {
//         registerForm.style.display = 'none';
//         loginForm.style.display = 'block';
//     } else {
//         registerForm.style.display = 'block';
//         loginForm.style.display = 'none';
//     }
// });

// document.getElementById('backToLogin').addEventListener('click', function() {
//     let registerForm = document.getElementById('registerCard');
//     let loginForm = document.getElementById('logInCard');
    
//     registerForm.style.display = 'none';
//     loginForm.style.display = 'block';
// });

document.getElementById('logInBtn').addEventListener('click', function() {
    let loginCard = document.getElementById('logInCard');
    let logoutCard = document.getElementById('logoutCard');

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

document.getElementById('showRegisterForm').addEventListener('click', function() {
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

document.getElementById('backToLogin').addEventListener('click', function() {
    let registerForm = document.getElementById('registerCard');
    let loginForm = document.getElementById('logInCard');
    
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
});


document.addEventListener('DOMContentLoaded', () => {
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
});

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
