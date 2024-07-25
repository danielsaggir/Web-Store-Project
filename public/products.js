
document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
        const dropdownToggle = this.closest('.dropdown').querySelector('.dropdown-toggle');
        dropdownToggle.textContent = this.textContent.trim();
    });
});

document.querySelectorAll('.product-link').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const myId = this.getAttribute('data-id');
        const category = this.getAttribute('data-category');
        window.location.href = `/singleproduct?MyId=${myId}&selectedCategory=${category}`;
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const priceRange = document.getElementById('price-filter');

    if (priceRange) {
        priceRange.addEventListener('change', function() {
            const selectedPriceFilter = priceRange.value;
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set('price', selectedPriceFilter);
            window.location.href = `/products?${urlParams.toString()}`;
        });
    } else {
        console.error('Price range element not found.');
    }

    // Other event listeners and functionality
});

document.addEventListener('DOMContentLoaded', function() {
    const sizeCheckboxes = document.querySelectorAll('input[name="size"]');
    
    sizeCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkedSizes = Array.from(document.querySelectorAll('input[name="size"]:checked'))
                                   .map(el => el.value.charAt(0).toUpperCase() + el.value.slice(1).toLowerCase());
            
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set('size', checkedSizes.join(','));
            
            // Optionally, remove size parameter if no sizes are selected
            if (checkedSizes.length === 0) {
                urlParams.delete('size');
            }
            
            window.location.href = `/products?${urlParams.toString()}`;
        });
    });
});





