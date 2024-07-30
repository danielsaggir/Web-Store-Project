document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
        const dropdownToggle = this.closest('.dropdown').querySelector('.dropdown-toggle');
        dropdownToggle.textContent = this.textContent.trim();
    });
});

document.getElementById('increase').addEventListener('click', function() {
    const quantityInput = document.getElementById('quantity');
    quantityInput.value = parseInt(quantityInput.value) + 1;
});

document.getElementById('decrease').addEventListener('click', function() {
    const quantityInput = document.getElementById('quantity');
    if (parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
});

// take information of the specific product
// save this on the html i want to see
document.getElementById('addto').addEventListener('click', function() {
    const productName = document.getElementById('name').textContent;
    const productDescription = document.getElementById('info').textContent;
    const productPrice = parseFloat(document.getElementById('price').textContent.replace(' ₪', ''));
    const productImage = document.querySelector('#productimg img').src;
    const selectedSize = document.querySelector('.dropdown-toggle').textContent.trim();
    const quantity = parseInt(document.getElementById('quantity').value);

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
            alert('Selected size is not available.');
        }
    })
    .catch(error => console.error('Error:', error));
});

// Handle checkout
document.getElementById('checkOut').addEventListener('click', function() {
    const cartItems = document.querySelectorAll('.order-details');
    if (cartItems.length === 0) {
        alert('Your cart is empty');
        return;
    }

    const orderSummary = document.getElementById('orderSummary');
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



// document.addEventListener('DOMContentLoaded', function() {
//     // Function to toggle login card visibility
//     function toggleLogInCard() {
//         let logInCard = document.getElementById('logInCard');
//         let cartCard = document.getElementById('cartCard');
        
//         if (logInCard.style.display === 'block') {
//             logInCard.style.display = 'none';
//         } else {
//             logInCard.style.display = 'block';
//             // Close cartCard if it's open
//             if (cartCard.style.display === 'block') {
//                 cartCard.style.display = 'none';
//             }
//         }
//     }

//     // Function to toggle cart visibility
//     function toggleCart() {
//         let cartCard = document.getElementById('cartCard');
//         let logInCard = document.getElementById('logInCard');
        
//         if (cartCard.style.display === 'block') {
//             cartCard.style.display = 'none';
//         } else {
//             cartCard.style.display = 'block';
//             // Close logInCard if it's open
//             if (logInCard.style.display === 'block') {
//                 logInCard.style.display = 'none';
//             }
//         }
//     }

//     // Add event listener to toggle login card visibility when clicking logInBtn
//     let logInBtn = document.getElementById('logInBtn');
//     logInBtn.addEventListener('click', function(event) {
//         toggleLogInCard();
//         event.stopPropagation(); // Prevent the click event from bubbling up to document
//     });

//     // Add event listener to toggle cart visibility when clicking cartBtn
//     let cartBtn = document.getElementById('cartBtn');
//     cartBtn.addEventListener('click', function(event) {
//         toggleCart();
//         event.stopPropagation(); // Prevent the click event from bubbling up to document
//     });

//     // Close logInCard and cartCard when clicking outside of them
//     document.addEventListener('click', function(event) {
//         let logInCard = document.getElementById('logInCard');
//         let cartCard = document.getElementById('cartCard');
//         let logInBtn = document.getElementById('logInBtn');
//         let cartBtn = document.getElementById('cartBtn');
        
//         // Check if clicked element is outside logInCard and logInBtn
//         if (!logInCard.contains(event.target) && event.target !== logInBtn) {
//             logInCard.style.display = 'none';
//         }
        
//         // Check if clicked element is outside cartCard and cartBtn
//         if (!cartCard.contains(event.target) && event.target !== cartBtn) {
//             cartCard.style.display = 'none';
//         }
//     });
// });
