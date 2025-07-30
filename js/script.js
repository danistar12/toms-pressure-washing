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
    
    // Contact Form Validation and Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // We don't prevent default anymore to allow the form to submit to FormSubmit
            // But we still do validation before submission
            
            // Basic validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    e.preventDefault(); // Prevent submission if validation fails
                    isValid = false;
                    field.classList.add('error');
                    
                    // Add error message if it doesn't exist
                    let errorMsg = field.parentElement.querySelector('.error-message');
                    if (!errorMsg) {
                        errorMsg = document.createElement('span');
                        errorMsg.className = 'error-message';
                        errorMsg.textContent = 'This field is required';
                        field.parentElement.appendChild(errorMsg);
                    }
                } else {
                    field.classList.remove('error');
                    const errorMsg = field.parentElement.querySelector('.error-message');
                    if (errorMsg) {
                        errorMsg.remove();
                    }
                    
                    // Email validation
                    if (field.type === 'email') {
                        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailPattern.test(field.value)) {
                            e.preventDefault(); // Prevent submission if validation fails
                            isValid = false;
                            field.classList.add('error');
                            let errorMsg = field.parentElement.querySelector('.error-message');
                            if (!errorMsg) {
                                errorMsg = document.createElement('span');
                                errorMsg.className = 'error-message';
                                errorMsg.textContent = 'Please enter a valid email';
                                field.parentElement.appendChild(errorMsg);
                            } else {
                                errorMsg.textContent = 'Please enter a valid email';
                            }
                        }
                    }
                    
                    // Phone validation
                    if (field.id === 'phone') {
                        const phonePattern = /^[\d\s\-\(\)]+$/;
                        if (!phonePattern.test(field.value)) {
                            e.preventDefault(); // Prevent submission if validation fails
                            isValid = false;
                            field.classList.add('error');
                            let errorMsg = field.parentElement.querySelector('.error-message');
                            if (!errorMsg) {
                                errorMsg = document.createElement('span');
                                errorMsg.className = 'error-message';
                                errorMsg.textContent = 'Please enter a valid phone number';
                                field.parentElement.appendChild(errorMsg);
                            } else {
                                errorMsg.textContent = 'Please enter a valid phone number';
                            }
                        }
                    }
                }
            });
            
            if (isValid) {
                // In a real implementation, you would send the form data to a server
                // For now, we'll just show a success message
                const formData = new FormData(contactForm);
                let formValues = {};
                
                formData.forEach((value, key) => {
                    formValues[key] = value;
                });
                
                // Replace form with success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.innerHTML = `
                    <h3>Thank you for contacting us!</h3>
                    <p>We've received your request and will get back to you soon.</p>
                    <p>Request details:</p>
                    <ul>
                        <li><strong>Name:</strong> ${formValues.name}</li>
                        <li><strong>Service:</strong> ${formValues.service}</li>
                        <li><strong>Email:</strong> ${formValues.email}</li>
                    </ul>
                `;
                
                contactForm.innerHTML = '';
                contactForm.appendChild(successMessage);
                
                // Scroll to the success message
                successMessage.scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        // Remove error styling on input
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error');
                const errorMsg = this.parentElement.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.remove();
                }
            });
        });
    }
});