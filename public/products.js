document.querySelector('.filtering').addEventListener('click', function() {
    document.querySelector('.filter-box').classList.toggle('active');
});

document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
        const dropdownToggle = this.closest('.dropdown').querySelector('.dropdown-toggle');
        dropdownToggle.textContent = this.textContent.trim();
    });
});
