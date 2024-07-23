document.getElementById('menuButton').addEventListener('click', function() {
    let menu = document.getElementById('menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});

window.addEventListener('scroll', function() {
    let topLine = document.getElementById('topLine');
    let top = document.getElementById('top');
    let topHeight = top.offsetHeight;
    topLine.style.backgroundColor = window.scrollY > topHeight ? 'rgba(250, 253, 255)' : 'transparent';
});

document.addEventListener('DOMContentLoaded', function() {
    function isLoggedIn() {
        return !!localStorage.getItem('userToken'); // Assuming userToken indicates logged-in state
    }

    function showLoginPrompt() {
        alert('Please log in to add items to your cart.');
        // Optionally, redirect to login page
        // window.location.href = '/login';
    }

    function toggleLogInCard() {
        let logInCard = document.getElementById('logInCard');
        let cartCard = document.getElementById('cartCard');
        logInCard.style.display = logInCard.style.display === 'block' ? 'none' : 'block';
        if (cartCard.style.display === 'block') {
            cartCard.style.display = 'none';
        }
    }

    function toggleCart() {
        let cartCard = document.getElementById('cartCard');
        let logInCard = document.getElementById('logInCard');
        cartCard.style.display = cartCard.style.display === 'block' ? 'none' : 'block';
        if (logInCard.style.display === 'block') {
            logInCard.style.display = 'none';
        }
    }

    let logInBtn = document.getElementById('logInBtn');
    logInBtn.addEventListener('click', function(event) {
        toggleLogInCard();
        event.stopPropagation();
    });

    let cartBtn = document.getElementById('cartBtn');
    cartBtn.addEventListener('click', function(event) {
        toggleCart();
        event.stopPropagation();
    });

    document.addEventListener('click', function(event) {
        let logInCard = document.getElementById('logInCard');
        let cartCard = document.getElementById('cartCard');
        if (!logInCard.contains(event.target) && event.target !== logInBtn) {
            logInCard.style.display = 'none';
        }
        if (!cartCard.contains(event.target) && event.target !== cartBtn) {
            cartCard.style.display = 'none';
        }
    });

    async function loadCart() {
        let username = localStorage.getItem('username'); // Replace with actual method of retrieving username
        const response = await fetch(`/cart/${username}`);
        const savedCartItems = await response.json();
        const cartItemsList = document.getElementById('cartItems');
        const emptyCartMessage = document.getElementById('emptyCartMessage');

        cartItemsList.innerHTML = ''; // Clear existing items

        if (!isLoggedIn()) {
            emptyCartMessage.style.display = 'block';
            emptyCartMessage.textContent = 'Your cart is empty. Please log in to add items to your cart.';
        } else {
            if (savedCartItems.length === 0) {
                emptyCartMessage.style.display = 'block';
                emptyCartMessage.textContent = 'Your cart is empty.';
            } else {
                emptyCartMessage.style.display = 'none';

                savedCartItems.forEach(item => {
                    const cartItem = document.createElement('li');
                    cartItem.classList.add('cart-item');

                    const imgElement = document.createElement('img');
                    imgElement.src = item.productImg;
                    imgElement.alt = item.productName;
                    imgElement.classList.add('cart-item-img');
                    cartItem.appendChild(imgElement);

                    const productDetails = document.createElement('div');
                    productDetails.classList.add('cart-item-details');
                    productDetails.innerHTML = `
                        <div class="cart-item-info">
                            <p>${item.productName}</p>
                            <p>Size: ${item.productSize}</p>
                        </div>
                        <div class="cart-item-price">
                            <p>${item.productPrice} ₪</p>
                        </div>`;
                    cartItem.appendChild(productDetails);

                    const removeButton = document.createElement('button');
                    removeButton.textContent = 'Remove';
                    removeButton.classList.add('remove-button');
                    cartItem.appendChild(removeButton);

                    removeButton.addEventListener('click', async function() {
                        await fetch(`/cart/${item._id}`, {
                            method: 'DELETE'
                        });
                        cartItem.remove();
                        totalAmount -= item.productPrice;
                        document.getElementById('totalAmount').textContent = `Total: ${totalAmount.toFixed(2)} ₪`;

                        if (cartItemsList.children.length === 0) {
                            emptyCartMessage.style.display = 'block';
                            emptyCartMessage.textContent = 'Your cart is empty.';
                            document.getElementById('totalAmount').textContent = 'Total: 0 ₪';
                        }
                    });

                    cartItemsList.appendChild(cartItem);
                });

                document.getElementById('totalAmount').textContent = `Total: ${totalAmount.toFixed(2)} ₪`;
            }
        }
    }

    let totalAmount = 0;
    document.addEventListener('DOMContentLoaded', loadCart);

    let addToCartButtons = document.querySelectorAll('#Productinfo #addto');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', async function() {
            if (!isLoggedIn()) {
                showLoginPrompt();
                return;
            }

            let selectedSizeElement = document.querySelector('#size .dropdown-item.active');

            if (!selectedSizeElement) {
                alert('Please select a size before adding to cart.');
                return;
            }

            let selectedSize = selectedSizeElement.dataset.size;
            let productName = document.querySelector('#Productinfo #name').textContent;
            let productPriceText = document.querySelector('#Productinfo #price').textContent;
            let productImg = document.querySelector('#productimg #img').src;
            let productPrice = parseFloat(productPriceText.replace(' ₪', ''));

            const response = await fetch('/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productName,
                    productSize: selectedSize,
                    productPrice,
                    productImg,
                    username: localStorage.getItem('username') // Replace with actual method of retrieving username
                })
            });

            const newItem = await response.json();
            const cartItem = document.createElement('li');
            cartItem.classList.add('cart-item');

            const imgElement = document.createElement('img');
            imgElement.src = productImg;
            imgElement.alt = productName;
            imgElement.classList.add('cart-item-img');
            cartItem.appendChild(imgElement);

            const productDetails = document.createElement('div');
            productDetails.classList.add('cart-item-details');
            productDetails.innerHTML = `
                <div class="cart-item-info">
                    <p>${productName}</p>
                    <p>Size: ${selectedSize}</p>
                </div>
                <div class="cart-item-price">
                    <p>${productPrice} ₪</p>
                </div>`;
            cartItem.appendChild(productDetails);

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-button');
            cartItem.appendChild(removeButton);

            let cartItemsList = document.getElementById('cartItems');
            cartItemsList.appendChild(cartItem);

            totalAmount += productPrice;
            document.getElementById('totalAmount').textContent = `Total: ${totalAmount.toFixed(2)} ₪`;

            document.getElementById('cartCard').style.display = 'block';
            document.getElementById('emptyCartMessage').style.display = 'none';

            let logInCard = document.getElementById('logInCard');
            if (logInCard.style.display === 'block') {
                logInCard.style.display = 'none';
            }

            removeButton.addEventListener('click', async function() {
                await fetch(`/cart/${newItem._id}`, {
                    method: 'DELETE'
                });
                cartItem.remove();
                totalAmount -= productPrice;
                document.getElementById('totalAmount').textContent = `Total: ${totalAmount.toFixed(2)} ₪`;

                if (cartItemsList.children.length === 0) {
                    document.getElementById('emptyCartMessage').style.display = 'block';
                    document.getElementById('emptyCartMessage').textContent = 'Your cart is empty.';
                    document.getElementById('totalAmount').textContent = 'Total: 0 ₪';
                }
            });
        });
    });

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