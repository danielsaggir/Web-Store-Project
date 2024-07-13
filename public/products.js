
document.querySelector('.filtering').addEventListener('click', function() {
    document.querySelector('.filter-box').classList.toggle('active');
});

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