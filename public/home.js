
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

document.getElementById('logInBtn').addEventListener('click', function() {
    let menu = document.getElementById('logInCard');
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
});
// document.getElementById('logInBtn').addEventListener('click', function() {
//     let loginCard = document.getElementById('logInCard');
//     let registerCard = document.getElementById('registerCard');
//     if (loginCard.style.display === 'none' && registerCard.style.display === 'none') {
//         loginCard.style.display = 'block';
//     } else {
//         loginCard.style.display = 'none';
//         registerCard.style.display = 'none';
//     }
// });

// document.getElementById('showRegisterForm').addEventListener('click', function() {
//     let loginCard = document.getElementById('logInCard');
//     let registerCard = document.getElementById('registerCard');
//     loginCard.style.display = 'none';
//     registerCard.style.display = 'block';
// });

// document.getElementById('backToLogin').addEventListener('click', function() {
//     let loginCard = document.getElementById('logInCard');
//     let registerCard = document.getElementById('registerCard');
//     loginCard.style.display = 'block';
//     registerCard.style.display = 'none';
// });


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