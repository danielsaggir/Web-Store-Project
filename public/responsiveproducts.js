// Dropdown handling
document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
        const dropdownToggle = this.closest('.dropdown').querySelector('.dropdown-toggle');
        dropdownToggle.textContent = this.textContent.trim();
    });
});

// Product link handling
document.querySelectorAll('.product-link').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const myId = this.getAttribute('data-id');
        const category = this.getAttribute('data-category');
        window.location.href = `/singleproduct?MyId=${myId}&selectedCategory=${category}`;
    });
});

// Filter by price range
document.addEventListener('DOMContentLoaded', function() {
    const priceRange = document.getElementById('price-filter');

    if (priceRange) {
        const urlParams = new URLSearchParams(window.location.search);
        const priceFilter = urlParams.get('price');
        if (priceFilter) {
            priceRange.value = priceFilter;
        } else {
            priceRange.value = 'allprices'; // Default to 'allprices' if no filter is set
        }

        priceRange.addEventListener('change', function() {
            const selectedPriceFilter = priceRange.value;
            const urlParams = new URLSearchParams(window.location.search);

            if (selectedPriceFilter === 'allprices') {
                urlParams.delete('price');
            } else {
                urlParams.set('price', selectedPriceFilter);
            }

            window.location.href = `/products?${urlParams.toString()}`;
        });
    } else {
        console.error('Price range element not found.');
    }
});

// Filter by size
document.addEventListener('DOMContentLoaded', () => {
    const sizeCheckboxes = document.querySelectorAll('input[name="size"]');
    const urlParams = new URLSearchParams(window.location.search);
    const checkedSizes = urlParams.get('size') ? urlParams.get('size').split(',') : [];

    sizeCheckboxes.forEach(checkbox => {
        if (checkedSizes.includes(checkbox.value.charAt(0).toUpperCase() + checkbox.value.slice(1).toLowerCase())) {
            checkbox.checked = true;
        }
    });

    sizeCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const updatedCheckedSizes = Array.from(sizeCheckboxes)
                                             .filter(el => el.checked)
                                             .map(el => el.value.charAt(0).toUpperCase() + el.value.slice(1).toLowerCase());

            urlParams.set('size', updatedCheckedSizes.join(','));
            window.location.href = `/products?${urlParams.toString()}`;
        });
    });
});

// Filter by color
document.addEventListener('DOMContentLoaded', () => {
    const colorCheckboxes = document.querySelectorAll('input[name="color"]');
    const urlParams = new URLSearchParams(window.location.search);
    const checkedColors = urlParams.get('color') ? urlParams.get('color').split(',') : [];
    colorCheckboxes.forEach(checkbox => {
        checkbox.checked = checkedColors.includes(checkbox.value);
    });
    colorCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const updatedCheckedColors = Array.from(colorCheckboxes)
                                             .filter(el => el.checked)
                                             .map(el => el.value);

            urlParams.set('color', updatedCheckedColors.join(','));

            if (updatedCheckedColors.length === 0) {
                urlParams.delete('color');
            }
            window.location.href = `/products?${urlParams.toString()}`;
        });
    });
});

// Filter by ski category
document.addEventListener('DOMContentLoaded', () => {
    const categoryCheckboxes = document.querySelectorAll('input[name="skiCategory"]');
    const urlParams = new URLSearchParams(window.location.search);
    const checkedCategories = urlParams.get('skiCategory') ? urlParams.get('skiCategory').split(',') : [];

    // Set the checkboxes based on URL parameters
    categoryCheckboxes.forEach(checkbox => {
        checkbox.checked = checkedCategories.includes(checkbox.value);
    });

    // Add event listener to update URL parameters on checkbox change
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const updatedCheckedCategories = Array.from(categoryCheckboxes)
                .filter(el => el.checked)
                .map(el => el.value);

            urlParams.set('skiCategory', updatedCheckedCategories.join(','));

            if (updatedCheckedCategories.length === 0) {
                urlParams.delete('skiCategory');
            }

            window.location.href = `/products?${urlParams.toString()}`;
        });
    });
});