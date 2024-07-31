// Function to get query parameter from URL
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
async function checkAvailability(productName, quantity, size) {
    try {
        const response = await fetch('/checkAvailability', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productName, quantity, size })
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

    // const productId = getQueryParam('MyId');
    const productName = document.getElementById('name')?.textContent.trim();
    const productDescription = document.getElementById('info')?.textContent.trim();
    const productPrice = parseFloat(document.getElementById('price')?.textContent.replace(' ₪', ''));
    const productImage = document.querySelector('#productimg img')?.src;
    const quantity = parseInt(document.getElementById('quantity')?.value);

    // Retrieve category from DOM or URL
    const category = getQueryParam('selectedCategory');

    // Log values to check their presence and correctness
    //console.log('Product ID:', productId);
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

    // Extract MyId and selectedCategory from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('MyId');
    const selectedCategory = urlParams.get('selectedCategory');
    console.log('productId:', productId);
    console.log('selectedCategory:', selectedCategory);

    fetch('/check-size', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId, selectedSize, selectedCategory })
    })
    .then(response => response.json())
    .then(data => {
        if (data.available) {
            const totalPrice = (productPrice * quantity).toFixed(2);

            const cartItemHTML = `
                <div class="order-details" data-product-id="${productId}" data-selected-category="${selectedCategory}">
                    <img src="${productImage}" class="product-image">
                    <div class="order-info">
                        <p class="card-text">Name Product: ${productName}</p>
                        <p class="card-text">Description: ${productDescription}</p>
                        <p class="card-text">Size: ${selectedSize}</p>
                        <p class="card-text">Quantity: ${quantity}</p>
                        <p class="card-text">Price Order: ${productPrice} ₪</p>
                        <p class="card-text">Total Price: ${totalPrice} ₪</p>
                    </div>
                </div>
            `;

            // Add the product to the cart
            const cart = document.getElementById('cartItems');
            cart.innerHTML += cartItemHTML;

            // Update the total amount in the cart
            const currentTotal = parseFloat(document.getElementById('totalAmount').textContent.replace('Total: ', '').replace(' ₪', '')) || 0;
            const newTotal = (currentTotal + parseFloat(totalPrice)).toFixed(2);
            document.getElementById('totalAmount').textContent = `Total: ${newTotal} ₪`;

            alert('Product added to cart successfully');
        } else {
           // alert('Selected size is not available.');
        }
    })
    .catch(error => console.error('Error:', error));
    if (!productId || !productName || !productPrice || !productImage || isNaN(quantity)) {
        alert('Failed to retrieve product details.');
        return;
    }

    let cartItems = [];
    try {
        const response = await fetch(`/getCartItems?username=${username}`);
        if (!response.ok) throw new Error('Failed to fetch cart items');
        cartItems = await response.json();
    } catch (error) {
        console.error('Failed to fetch cart items:', error);
    }

    // Check if the item already exists in the cart
    const existingItem = cartItems.find(item => item.productName === productName && item.selectedSize === selectedSize);
    if (existingItem) {
        existingItem.quantity += quantity;

        try {
            const response = await fetch('/updateCartItem', {
                method: 'PUT', // Use PUT to update an existing item
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username, // Assuming `username` is globally available
                    cartItem: {
                        productId: existingItem.productId, // Update item with existing productId
                        productName: existingItem.productName,
                        productDescription: existingItem.productDescription,
                        productPrice: existingItem.productPrice,
                        productImage: existingItem.productImage,
                        selectedSize: existingItem.selectedSize,
                        quantity: existingItem.quantity,
                        totalPrice: (existingItem.productPrice * existingItem.quantity).toFixed(2),
                        category: existingItem.category // Ensure to update the category as well
                    }
                })
            });

            if (response.ok) {
                alert('Item quantity updated in the cart');
                 updateCartDisplay();
            } else {
                throw new Error('Failed to update item in the cart');
            }
        } catch (error) {
            alert(error.message);
        }
        return;
    }

    const isAvailable = await checkAvailability(productName, quantity, selectedSize);
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
                    productId, // Add productId to cart item
                    productName,
                    productDescription,
                    productPrice,
                    productImage,
                    selectedSize,
                    quantity,
                    totalPrice,
                    category // Add category to cart item
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

// Handle checkout
document.getElementById('checkOut').addEventListener('click', function() {
    const cartItems = document.querySelectorAll('.order-details');
    if (cartItems.length === 0) {
        alert('Your cart is empty');
        return;
    }

    const orderSummary = document.getElementById('orderSummary');
    if (!orderSummary) {
        console.error('Order summary element not found');
        return;
    }

    orderSummary.innerHTML = '';
    cartItems.forEach(item => {
        orderSummary.innerHTML += item.outerHTML;
    });
    
    const totalAmount = document.getElementById('totalAmount').textContent;
    document.getElementById('totalAmountSummary').textContent = totalAmount;
});

document.getElementById('checkoutForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const cartItems = document.querySelectorAll('.order-details');

    const items = [];
    cartItems.forEach(item => {
        const productId = item.getAttribute('data-product-id');
        const selectedCategory = item.getAttribute('data-selected-category');
        const quantity = parseInt(item.querySelector('.order-info .card-text:nth-child(4)').textContent.split(': ')[1]);
        items.push({ productId, quantity, selectedCategory });
    });

    const checkoutData = { fullName, address, phone, email, items };
    console.log('Checkout data:', checkoutData);

    fetch('/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(checkoutData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Checkout successful');
            document.getElementById('cartItems').innerHTML = '';
            document.getElementById('totalAmount').textContent = 'Total: 0 ₪';
            const checkoutModal = bootstrap.Modal.getInstance(document.getElementById('checkoutModal'));
            checkoutModal.hide();
        } else {
            alert(`Checkout failed: ${data.error}`);
        }
    })
    .catch(error => console.error('Error:', error));
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

// Handle checkout process
document.getElementById('checkOut').addEventListener('click', async function() {
    if (!isLoggedIn()) {
        alert('You need to log in to proceed with checkout.');
        return;
    }

    try {
        // Get cart items
        const response = await fetch(`/getCartItems?username=${username}`);
        if (!response.ok) throw new Error('Failed to fetch cart items');
        
        const cartItems = await response.json();
        console.log(`cartitems is:${JSON.stringify(cartItems)}`);
        if (cartItems.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        // Check availability of each item
        for (const item of cartItems) {
            const Avail = await checkAvailability(item.productName, item.quantity, item.selectedSize);
            if (!Avail) {
                alert(`The item "${item.productName}" with size "${item.selectedSize}" is not available in the selected quantity.`);
                return; // Stop checkout if any item is not available
            }
        }

        const totalPrice = cartItems.reduce((acc, item) => acc + parseFloat(item.totalPrice), 0).toFixed(2);
        const orderNumber = new Date().getTime(); // Simple order number based on timestamp

        const orderResponse = await fetch('/createOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                orderNumber,
                totalPrice,
                products: cartItems.map(item => ({
                    productId: item.productId, // Include productId in the order
                    productName: item.productName,
                    productPrice: item.productPrice,
                    quantity: item.quantity,
                    selectedSize: item.selectedSize,
                    productImage: item.productImage,
                    category: item.category // Include category in the order
                }))
            })
        });

        if (!orderResponse.ok) throw new Error('Failed to create order');
        
        // Empty the cart
        await fetch('/emptyCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        });

        alert('Order placed successfully!');
        updateCartDisplay(); // Refresh the cart display
    } catch (error) {
        console.error('Failed to complete checkout:', error);
        alert('Failed to complete checkout. Please try again.');
    }
});

// Call updateCartDisplay() on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
});
