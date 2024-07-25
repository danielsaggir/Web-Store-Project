document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
        const dropdownToggle = this.closest('.dropdown').querySelector('.dropdown-toggle');
        dropdownToggle.textContent = this.textContent.trim();
    });
});


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
});