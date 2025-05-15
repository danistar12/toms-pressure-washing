// Dynamically load the navigation bar
document.addEventListener("DOMContentLoaded", () => {
    fetch('navigation.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
        });
});

// Toggle menu for smaller screens
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}