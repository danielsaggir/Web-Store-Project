

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

    // הקוד עבור גלילת הדף
    window.addEventListener('scroll', function() {
        let topLine = document.getElementById('topLine');
        let top = document.getElementById('top');
        let topHeight = top.offsetHeight;
        if (window.scrollY > topHeight) {
            topLine.style.backgroundColor = 'rgba(250, 253, 255)';
        } else {
            topLine.style.backgroundColor = 'transparent';
        }
    });

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
    // const logInBtn = document.getElementById('logInBtn');
    // if (logInBtn) {
    //     logInBtn.addEventListener('click', function() {
    //         let loginCard = document.getElementById('logInCard');
    //         let logoutCard = document.getElementById('logoutCard');

    //         if (username && username !== 'Guest') {
    //             // המשתמש מחובר
    //             if (logoutCard.style.display === 'block') {
    //                 logoutCard.style.display = 'none';
    //             } else {
    //                 logoutCard.style.display = 'block';
    //             }
    //         } else {
    //             // המשתמש לא מחובר
    //             if (loginCard.style.display === 'block') {
    //                 loginCard.style.display = 'none';
    //             } else {
    //                 loginCard.style.display = 'block';
    //             }
    //         }
    //     });
    // }

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
});




