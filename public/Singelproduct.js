document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
        const dropdownToggle = this.closest('.dropdown').querySelector('.dropdown-toggle');
        dropdownToggle.textContent = this.textContent.trim();
    });
});
    document.addEventListener("DOMContentLoaded", function() {
        var addToCartButton = document.getElementById('addto');
        var dropdownItems = document.querySelectorAll('.dropdown-item');

        addToCartButton.addEventListener('click', function() {
            var selectedSize = '';

            // Check if any size is selected
            dropdownItems.forEach(function(item) {
                if (item.classList.contains('active')) {
                    selectedSize = item.dataset.size;
                }
            });

            // If no size is selected, alert the user and prevent adding to cart
            if (selectedSize === '') {
                alert('Please select a size before adding to cart.');
            } else {
                // Call your add to cart function here
                addToCart(selectedSize);
            }
        });

        // Example function to add to cart (replace with your actual implementation)
        function addToCart(size) {
            console.log('Adding ' + size + ' to cart...');
            // Add your actual add to cart logic here
        }

        // Toggle active class on dropdown items when clicked
        dropdownItems.forEach(function(item) {
            item.addEventListener('click', function() {
                dropdownItems.forEach(function(el) {
                    el.classList.remove('active');
                });
                item.classList.add('active');
            });
        });
    });

