
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




/////////////////////////////////filter by price range////////////////////////////////////


document.addEventListener('DOMContentLoaded', function() {
    const priceRange = document.getElementById('price-filter');

    if (priceRange) {
        // Set the initial value of the select box based on the URL parameter
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
                // Remove the price parameter if "All Prices" is selected
                urlParams.delete('price');
            } else {
                // Set the price parameter to the selected value
                urlParams.set('price', selectedPriceFilter);
            }

            // Redirect to the new URL with updated parameters
            window.location.href = `/products?${urlParams.toString()}`;
        });
    } else {
        console.error('Price range element not found.');
    }
});


/////////////////////////////////filter by price range////////////////////////////////////







/////////////////////////////////filter by size////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    const sizeCheckboxes = document.querySelectorAll('input[name="size"]');
    const urlParams = new URLSearchParams(window.location.search);
    const checkedSizes = urlParams.get('size') ? urlParams.get('size').split(',') : [];

    // Set the checkboxes based on URL parameters
    sizeCheckboxes.forEach(checkbox => {
        if (checkedSizes.includes(checkbox.value.charAt(0).toUpperCase() + checkbox.value.slice(1).toLowerCase())) {
            checkbox.checked = true;
        }
    });

    // Add event listener to update URL parameters on checkbox change
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


/////////////////////////////////filter by size////////////////////////////////////


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

            // If no colors are selected, remove the color parameter
            if (updatedCheckedColors.length === 0) {
                urlParams.delete('color');
            }
            window.location.href = `/products?${urlParams.toString()}`;
        });
    });
});
