// nececery for chose a size
document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
        const dropdownToggle = this.closest('.dropdown').querySelector('.dropdown-toggle');
        dropdownToggle.textContent = this.textContent.trim();
    });
});
<<<<<<< HEAD

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

    const totalPrice = (productPrice * quantity).toFixed(2);

    const cartItemHTML = `
        <div class="order-details">
            <img src="${productImage}" class="product-image">
            <div class="order-info">
                <p class="card-text">Name Product: ${productName}</p>
                <p class="card-text">Description: ${productDescription}</p>
                <p class="card-text">Size: ${selectedSize}</p>
                <p class="card-text">Quantity: ${quantity}</p>
                <p class="card-text">Price Order: ${productPrice} ₪</p>
            </div>
        </div>
    `;

    const cartBody = document.querySelector('#cartCard .card-body');
    cartBody.innerHTML = `
        <h5 class="card-title">YOUR SHOPPING CART</h5>
        ${cartItemHTML}
        <p id="totalAmount" class="total-amount">Total: ${totalPrice} ₪</p>
    `;

    document.getElementById('emptyCartMessage').style.display = 'none';
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
=======
document.addEventListener('DOMContentLoaded', function() {
    // Function to toggle cart visibility
    function toggleCart() {
        let cartCard = document.getElementById('cartCard');
        
        if (cartCard.style.display === 'block') {
            cartCard.style.display = 'none';
        } else {
            cartCard.style.display = 'block';
        }
    }

    // Add event listener to toggle cart visibility when clicking cartBtn
    let cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', function(event) {
            toggleCart();
            event.stopPropagation(); // Prevent the click event from bubbling up to document
        });
    }

    // Close cartCard when clicking outside of it
    document.addEventListener('click', function(event) {
        let cartCard = document.getElementById('cartCard');
        let cartBtn = document.getElementById('cartBtn');
        
        // Check if clicked element is outside cartCard and cartBtn
        if (!cartCard.contains(event.target) && event.target !== cartBtn) {
            cartCard.style.display = 'none';
        }
    });

    // Add event listener to add product to cart when clicking addToCartBtn
    let addToCartBtn = document.getElementById('addto');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function(event) {
            let product = {
                name: document.getElementById('name').innerText,
                size: document.querySelector('.dropdown-toggle').innerText.trim(),
                color: document.getElementById('productColor') ? document.getElementById('productColor').innerText : '',
                oldPrice: parseFloat(document.getElementById('oldPrice') ? document.getElementById('oldPrice').innerText.replace('₪', '') : '0'),
                newPrice: parseFloat(document.getElementById('price').innerText.replace('₪', '')),
                imageUrl: document.querySelector('#productimg img').src
            };

            fetch('/add-to-cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Product added to cart successfully');
                } else {
                    alert('Failed to add product to cart');
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }
});
>>>>>>> c9e2e81 (get changes from tomer)
