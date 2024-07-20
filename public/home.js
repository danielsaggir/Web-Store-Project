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




