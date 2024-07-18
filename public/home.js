
document.getElementById('menuButton').addEventListener('click', function() {
    let menu = document.getElementById('menu');
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
});


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