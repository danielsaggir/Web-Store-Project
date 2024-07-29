function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Global variable to store selected size
let selectedSize = 'Select Size'; // Default value
let category = ''; // Global variable for category

// Function to check if the user is logged in
function isLoggedIn() {
    return typeof username !== 'undefined' && username && username !== 'Guest';
}

// Handle size selection
document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
        const dropdownToggle = this.closest('.dropdown').querySelector('.dropdown-toggle');
        if (dropdownToggle) {
            dropdownToggle.textContent = this.textContent.trim();
        }
        selectedSize = this.textContent.trim();
    });
});

// Handle quantity increase
document.getElementById('increase').addEventListener('click', function() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    }
});

// Handle quantity decrease
document.getElementById('decrease').addEventListener('click', function() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput && parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
});

// Function to check availability of the item
async function checkAvailability(productId, quantity, size) {
    try {
        const response = await fetch('/checkAvailability', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId, quantity, size })
        });

        if (!response.ok) {
            throw new Error('Failed to check availability');
        }

        const data = await response.json();
        return data.available;
    } catch (error) {
        console.error('Failed to check availability:', error);
        return false;
    }
}

// Add item to cart
document.getElementById('addto').addEventListener('click', async function() {
    if (!isLoggedIn()) {
        alert('You need to log in to add items to your cart.');
        return;
    }

    const productId = getQueryParam('MyId');
    const productName = document.getElementById('name')?.textContent.trim();
    const productDescription = document.getElementById('info')?.textContent.trim();
    const productPrice = parseFloat(document.getElementById('price')?.textContent.replace(' ₪', ''));
    const productImage = document.querySelector('#productimg img')?.src;
    const quantity = parseInt(document.getElementById('quantity')?.value);

    // Retrieve category from DOM
    category = document.getElementById('category')?.textContent.trim();

    // Log values to check their presence and correctness
    console.log('Product ID:', productId);
    console.log('Product Name:', productName);
    console.log('Product Description:', productDescription);
    console.log('Product Price:', productPrice);
    console.log('Product Image:', productImage);
    console.log('Quantity:', quantity);
    console.log('Selected Size:', selectedSize);
    console.log('Category:', category);

    if (selectedSize === 'Select Size') {
        alert('You need to select a size.');
        return;
    }

    if (!productId || !productName || !productPrice || !productImage || isNaN(quantity)) {
        alert('Failed to retrieve product details.');
        return;
    }

    const isAvailable = await checkAvailability(productId, quantity, selectedSize);
    if (!isAvailable) {
        alert('The selected quantity is not available.');
        return;
    }

    const totalPrice = (productPrice * quantity).toFixed(2);

    try {
        const response = await fetch('/addCartItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username, // Assuming `username` is globally available
                cartItem: {
                    productName,
                    productDescription,
                    productPrice,
                    productImage,
                    selectedSize,
                    quantity,
                    totalPrice
                }
            })
        });

        if (response.ok) {
            alert('Item added to cart successfully!');
            updateCartDisplay();
        } else {
            throw new Error('Failed to add item to cart');
        }
    } catch (error) {
        alert(error.message);
    }
});

// Function to remove an item from the cart
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
        updateCartDisplay(); // Refresh the cart display after removal
    } catch (error) {
        console.error('Failed to remove item from cart:', error);
    }
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

// Function to clear the cart when logging out
async function clearCartOnLogout() {
    try {
        const response = await fetch('/logout', {
            method: 'GET',
        });

        if (response.ok) {
            alert('Logged out and cart cleared!');
            window.location.href = '/'; // Redirect to homepage or login page
        } else {
            throw new Error('Failed to log out');
        }
    } catch (error) {
        console.error('Failed to log out:', error);
    }
}

// Run `updateCartDisplay` on page load
document.addEventListener('DOMContentLoaded', updateCartDisplay);
