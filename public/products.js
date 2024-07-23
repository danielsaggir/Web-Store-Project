
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


