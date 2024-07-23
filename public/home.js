
// document.getElementById('menuButton').addEventListener('click', function() {
//     let menu = document.getElementById('menu');
//     if (menu.style.display === 'block') {
//         menu.style.display = 'none';
//     } else {
//         menu.style.display = 'block';
//     }
// });


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

// Add event listener to the search button
document.getElementById('searchButton').addEventListener('click', function () {
    const searchQuery = document.getElementById('searchBox').value;
    if (searchQuery) {
        window.location.href = `/SingleProduct?name=${encodeURIComponent(searchQuery)}`;
    }
});