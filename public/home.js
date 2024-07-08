
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

