document.addEventListener('DOMContentLoaded', () => {
    // הקוד עבור כפתור ה-menu
    const menuButton = document.getElementById('menuButton');
    if (menuButton) {
        menuButton.addEventListener('click', function() {
            let menu = document.getElementById('menu');
            if (menu.style.display === 'block') {
                menu.style.display = 'none';
            } else {
                menu.style.display = 'block';
            }
        });
    }

    // הקוד עבור כפתור ה-logIn
    const logInBtn = document.getElementById('logInBtn');
    if (logInBtn) {
        logInBtn.addEventListener('click', function(event) {
            event.stopPropagation(); // למנוע סגירה בעת קליק מחוץ לתיבה
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

    // הקוד עבור כפתור ה-cart
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', function(event) {
            event.stopPropagation(); // למנוע סגירה בעת קליק מחוץ לתיבה
            let cartCard = document.getElementById('cartCard');
            let logInCard = document.getElementById('logInCard');
            cartCard.style.display = cartCard.style.display === 'block' ? 'none' : 'block';
            if (logInCard.style.display === 'block') {
                logInCard.style.display = 'none';
            }
        });
    }

    // הקוד לסגירת תיבות בעת לחיצה מחוץ להן
    document.addEventListener('click', function(event) {
        let logInCard = document.getElementById('logInCard');
        let cartCard = document.getElementById('cartCard');
        if (logInCard && !logInCard.contains(event.target) && event.target !== logInBtn) {
            logInCard.style.display = 'none';
        }
        if (cartCard && !cartCard.contains(event.target) && event.target !== cartBtn) {
            cartCard.style.display = 'none';
        }
    });

    function isLoggedIn() {
        return username && username !== 'Guest';
    }
    
    function showLoginPrompt() {
        alert('Please log in to add items to your cart.');
    }
    
    function showSizePrompt() {
        alert('Please select a size before adding to cart.');
    }
    
    // קוד לבחירת מידה
    const sizeDropdownItems = document.querySelectorAll('#size .dropdown-item');
    sizeDropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            let sizeButton = document.querySelector('#size .btn-secondary.dropdown-toggle');
            sizeButton.textContent = this.textContent;
            sizeDropdownItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    let addToCartButtons = document.querySelectorAll('#Productinfo #addto');

addToCartButtons.forEach(button => {
    button.addEventListener('click', async function() {
        if (!isLoggedIn()) {
            showLoginPrompt();
            return;
        }

        let selectedSizeElement = document.querySelector('#size .dropdown-item.active');

        if (!selectedSizeElement) {
            showSizePrompt();
            return;
        }

        // let selectedSize = selectedSizeElement.dataset.size;
        // let productName = document.querySelector('#Productinfo #name').textContent;
        // let productPriceText = document.querySelector('#Productinfo #price').textContent;
        // let productImg = document.querySelector('#productimg #img').src;
        // let productPrice = parseFloat(productPriceText.replace(' ₪', ''));

        // const response = await fetch('/order/add-to-cart', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         productName,
        //         productSize: selectedSize,
        //         productPrice,
        //         productImg,
        //         username
        //     })
        // });

        // if (response.ok) {
        //     alert('Item added to cart');
        // } else {
        //     alert('Error adding item to cart');
        // }
    });
});
    
    // // פונקציה לטעינת העגלה
    // async function loadCart() {
    //     const response = await fetch(`/orders/user-orders`);
    //     const savedCartItems = await response.json();
    //     const cartItemsList = document.getElementById('cartItems');
    //     const emptyCartMessage = document.getElementById('emptyCartMessage');
    
    //     cartItemsList.innerHTML = ''; // Clear existing items
    
    //     if (!isLoggedIn()) {
    //         emptyCartMessage.style.display = 'block';
    //         emptyCartMessage.textContent = 'Your cart is empty. Please log in to add items to your cart.';
    //     } else {
    //         if (savedCartItems.length === 0) {
    //             emptyCartMessage.style.display = 'block';
    //             emptyCartMessage.textContent = 'Your cart is empty.';
    //         } else {
    //             emptyCartMessage.style.display = 'none';
    
    //             savedCartItems.forEach(item => {
    //                 const cartItem = document.createElement('li');
    //                 cartItem.classList.add('cart-item');
    
    //                 const imgElement = document.createElement('img');
    //                 imgElement.src = item.productImg;
    //                 imgElement.alt = item.productName;
    //                 imgElement.classList.add('cart-item-img');
    //                 cartItem.appendChild(imgElement);
    
    //                 const productDetails = document.createElement('div');
    //                 productDetails.classList.add('cart-item-details');
    //                 productDetails.innerHTML = `
    //                     <div class="cart-item-info">
    //                         <p>${item.productName}</p>
    //                         <p>Size: ${item.productSize}</p>
    //                     </div>
    //                     <div class="cart-item-price">
    //                         <p>${item.productPrice} ₪</p>
    //                     </div>`;
    //                 cartItem.appendChild(productDetails);
    
    //                 const removeButton = document.createElement('button');
    //                 removeButton.textContent = 'Remove';
    //                 removeButton.classList.add('remove-button');
    //                 cartItem.appendChild(removeButton);
    
    //                 removeButton.addEventListener('click', async function() {
    //                     const removeResponse = await fetch(`/orders/${item._id}`, {
    //                         method: 'DELETE'
    //                     });
    
    //                     if (removeResponse.ok) {
    //                         cartItem.remove();
    //                         totalAmount -= item.productPrice;
    //                         document.getElementById('totalAmount').textContent = `Total: ${totalAmount.toFixed(2)} ₪`;
    
    //                         if (cartItemsList.children.length === 0) {
    //                             emptyCartMessage.style.display = 'block';
    //                             emptyCartMessage.textContent = 'Your cart is empty.';
    //                             document.getElementById('totalAmount').textContent = 'Total: 0 ₪';
    //                         }
    //                     } else {
    //                         alert('Error removing item from cart');
    //                     }
    //                 });
    
    //                 cartItemsList.appendChild(cartItem);
    //             });
    
    //             document.getElementById('totalAmount').textContent = `Total: ${totalAmount.toFixed(2)} ₪`;
    //         }
    //     }
    // }
    
    // let totalAmount = 0;
    // document.addEventListener('DOMContentLoaded', loadCart);
    
    // let addToCartButtons = document.querySelectorAll('#Productinfo #addto');
    
    // addToCartButtons.forEach(button => {
    //     button.addEventListener('click', async function() {
    //         if (!isLoggedIn()) {
    //             showLoginPrompt();
    //             return;
    //         }
    
    //         let selectedSizeElement = document.querySelector('#size .dropdown-item.active');
    
    //         if (!selectedSizeElement) {
    //             showSizePrompt();
    //             return;
    //         }
    
    //         let selectedSize = selectedSizeElement.dataset.size;
    //         let productName = document.querySelector('#Productinfo #name').textContent;
    //         let productPriceText = document.querySelector('#Productinfo #price').textContent;
    //         let productImg = document.querySelector('#productimg #img').src;
    //         let productPrice = parseFloat(productPriceText.replace(' ₪', ''));
    
    //         const response = await fetch('/orders/add-to-cart', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 productName,
    //                 productSize: selectedSize,
    //                 productPrice,
    //                 productImg,
    //                 username
    //             })
    //         });
    
    //         if (response.ok) {
    //             loadCart(); // Reload the cart to show the new item
    //         } else {
    //             alert('Error adding item to cart');
    //         }
    //     });
    // });

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

    // פונקציה לנווט לקטגוריות
    function navigateToCategory(selectedCategory) {
        window.location.href = `/products?category=${selectedCategory}`;
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

    
});
