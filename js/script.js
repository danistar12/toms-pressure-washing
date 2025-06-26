// Toggle menu for smaller screens
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}
// Carousel functionality
document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.carousel-track');
    const images = document.querySelectorAll('.carousel-track img');
    const prevBtn = document.querySelector('.carousel-arrow.left');
    const nextBtn = document.querySelector('.carousel-arrow.right');
    if (!track || images.length === 0 || !prevBtn || !nextBtn) return;

    let currentIndex = 0;

    function updateCarousel() {
        const imgWidth = images[0].clientWidth + 20; // image width + margin
        track.style.transform = `translateX(-${currentIndex * imgWidth}px)`;
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateCarousel();
    });
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
    });

    // Optional: swipe support for mobile
    let startX = 0;
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    track.addEventListener('touchend', (e) => {
        let endX = e.changedTouches[0].clientX;
        if (endX < startX - 30) nextBtn.click();
        if (endX > startX + 30) prevBtn.click();
    });

    window.addEventListener('resize', updateCarousel);
    updateCarousel();
});