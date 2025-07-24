// Contact Page JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
    initializeFAQ();
    initializeMapInteractions();
    initializeContactAnimations();
});

// Contact Form Functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (validateContactForm(data)) {
        // Show loading state
        const submitBtn = e.target.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> भेजा जा रहा है...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            showNotification('आपका संदेश सफलतापूर्वक भेज दिया गया है! हम जल्दी ही आपसे संपर्क करेंगे।', 'success');
            
            // Reset form
            e.target.reset();
            
            // Send confirmation email (simulation)
            if (data.newsletter) {
                setTimeout(() => {
                    showNotification('आपको न्यूजलेटर के लिए भी सब्सक्राइब कर दिया गया है।', 'info');
                }, 2000);
            }
            
        }, 2000);
    }
}

function validateContactForm(data) {
    let isValid = true;
    
    // Required fields validation
    const requiredFields = ['firstName', 'lastName', 'email', 'subject', 'message'];
    
    requiredFields.forEach(field => {
        if (!data[field] || data[field].trim() === '') {
            showFieldError(field, 'यह फील्ड आवश्यक है');
            isValid = false;
        }
    });
    
    // Email validation
    if (data.email && !validateEmail(data.email)) {
        showFieldError('email', 'कृपया एक वैध ईमेल एड्रेस डालें');
        isValid = false;
    }
    
    // Phone validation (if provided)
    if (data.phone && !validatePhone(data.phone)) {
        showFieldError('phone', 'कृपया एक वैध फोन नंबर डालें');
        isValid = false;
    }
    
    // Message length validation
    if (data.message && data.message.length < 10) {
        showFieldError('message', 'संदेश कम से कम 10 अक्षर का होना चाहिए');
        isValid = false;
    }
    
    return isValid;
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    clearFieldError(field.name);
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field.name, 'यह फील्ड आवश्यक है');
        return false;
    }
    
    switch (field.type) {
        case 'email':
            if (value && !validateEmail(value)) {
                showFieldError(field.name, 'कृपया एक वैध ईमेल एड्रेस डालें');
                return false;
            }
            break;
        case 'tel':
            if (value && !validatePhone(value)) {
                showFieldError(field.name, 'कृपया एक वैध फोन नंबर डालें');
                return false;
            }
            break;
    }
    
    if (field.name === 'message' && value && value.length < 10) {
        showFieldError(field.name, 'संदेश कम से कम 10 अक्षर का होना चाहिए');
        return false;
    }
    
    return true;
}

function showFieldError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (!field) return;
    
    const formGroup = field.closest('.form-group');
    const existingError = formGroup.querySelector('.field-error');
    
    if (existingError) {
        existingError.textContent = message;
    } else {
        const errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        formGroup.appendChild(errorElement);
    }
    
    field.classList.add('error');
    formGroup.classList.add('has-error');
}

function clearFieldError(fieldName) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (!field) return;
    
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.field-error');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    field.classList.remove('error');
    formGroup.classList.remove('has-error');
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return re.test(phone);
}

// FAQ Functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherIcon = otherItem.querySelector('.faq-question i');
                    otherIcon.classList.remove('fa-minus');
                    otherIcon.classList.add('fa-plus');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            } else {
                item.classList.add('active');
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            }
        });
    });
}

// Map Interactions
function initializeMapInteractions() {
    const directionsBtn = document.querySelector('.directions-btn');
    const mapPlaceholder = document.querySelector('.map-placeholder');
    
    if (directionsBtn) {
        directionsBtn.addEventListener('click', openDirections);
    }
    
    if (mapPlaceholder) {
        mapPlaceholder.addEventListener('click', openMap);
    }
}

function openDirections() {
    const address = "123 Fashion Street, Connaught Place, New Delhi, 110001";
    const encodedAddress = encodeURIComponent(address);
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
    
    window.open(googleMapsUrl, '_blank');
    showNotification('Google Maps में दिशा निर्देश खोले जा रहे हैं...', 'info');
}

function openMap() {
    const address = "123 Fashion Street, Connaught Place, New Delhi, 110001";
    const encodedAddress = encodeURIComponent(address);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    
    window.open(googleMapsUrl, '_blank');
}

// Contact Page Animations
function initializeContactAnimations() {
    // Animate contact info cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.info-card, .faq-item, .contact-form-section, .map-container'
    );
    
    animateElements.forEach(el => observer.observe(el));
    
    // Stagger animation for info cards
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Social Media Link Interactions
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const platform = this.classList[1]; // facebook, instagram, etc.
        showNotification(`${platform} पर जा रहे हैं...`, 'info');
        
        // In a real application, you would have actual social media URLs
        setTimeout(() => {
            // window.open(actualUrl, '_blank');
        }, 1000);
    });
});

// Store Hours Highlight
function highlightCurrentDay() {
    const now = new Date();
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const hourItems = document.querySelectorAll('.hour-item');
    
    hourItems.forEach((item, index) => {
        if (
            (currentDay >= 1 && currentDay <= 5 && index === 0) || // Monday-Friday
            (currentDay === 6 && index === 1) || // Saturday
            (currentDay === 0 && index === 2)    // Sunday
        ) {
            item.classList.add('current-day');
        }
    });
}

// Initialize store hours highlighting
highlightCurrentDay();

// Contact Info Click Handlers
document.querySelectorAll('.info-card').forEach(card => {
    card.addEventListener('click', function() {
        const icon = this.querySelector('i');
        
        if (icon.classList.contains('fa-phone')) {
            const phone = this.querySelector('p').textContent.split('\n')[0];
            window.location.href = `tel:${phone}`;
        } else if (icon.classList.contains('fa-envelope')) {
            const email = this.querySelector('p').textContent.split('\n')[0];
            window.location.href = `mailto:${email}`;
        } else if (icon.classList.contains('fa-whatsapp')) {
            const phone = this.querySelector('p').textContent;
            const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}`;
            window.open(whatsappUrl, '_blank');
        } else if (icon.classList.contains('fa-map-marker-alt')) {
            openMap();
        }
    });
});

// Form Field Focus Effects
document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select').forEach(field => {
    field.addEventListener('focus', function() {
        this.closest('.form-group').classList.add('focused');
    });
    
    field.addEventListener('blur', function() {
        if (!this.value) {
            this.closest('.form-group').classList.remove('focused');
        }
    });
    
    // Check if field has value on page load
    if (field.value) {
        field.closest('.form-group').classList.add('focused');
    }
});

// Custom Select Styling
document.querySelectorAll('select').forEach(select => {
    select.addEventListener('change', function() {
        if (this.value) {
            this.classList.add('has-value');
        } else {
            this.classList.remove('has-value');
        }
    });
});

// Add CSS for contact page specific styles
const contactPageStyles = `
<style>
/* Page Header Styles */
.page-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 120px 0 60px;
    color: #fff;
    text-align: center;
    margin-top: 120px;
}

.page-header h1 {
    font-size: 48px;
    font-weight: 700;
    margin-bottom: 15px;
}

.breadcrumb {
    font-size: 16px;
    opacity: 0.9;
}

.breadcrumb a {
    color: #fff;
    text-decoration: none;
}

.breadcrumb span {
    margin: 0 10px;
}

/* Contact Section Styles */
.contact-section {
    padding: 80px 0;
}

.contact-intro {
    text-align: center;
    margin-bottom: 60px;
}

.contact-intro h2 {
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 15px;
    color: #2c3e50;
}

.contact-intro p {
    font-size: 18px;
    color: #666;
    max-width: 600px;
    margin: 0 auto;
}

.contact-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: start;
}

/* Contact Form Styles */
.contact-form-section h3,
.contact-info-section h3 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 30px;
    color: #2c3e50;
}

.contact-form {
    background: #fff;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 25px;
    position: relative;
}

.form-group label {
    display: block;
    font-weight: 500;
    margin-bottom: 8px;
    color: #333;
    transition: all 0.3s;
}

.form-group.focused label {
    color: #e74c3c;
}

.form-group input,
.form-group textarea,
.form-group select {
    width: 100%;
    padding: 12px 15px;
    border: 2px solid #e1e8ed;
    border-radius: 8px;
    font-size: 16px;
    transition: all 0.3s;
    background: #fff;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
    outline: none;
    border-color: #e74c3c;
    box-shadow: 0 0 10px rgba(231, 76, 60, 0.1);
}

.form-group.has-error input,
.form-group.has-error textarea,
.form-group.has-error select {
    border-color: #e74c3c;
}

.field-error {
    color: #e74c3c;
    font-size: 14px;
    margin-top: 5px;
    display: block;
}

.checkbox-group {
    display: flex;
    align-items: center;
    margin: 20px 0;
}

.checkbox-label {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    color: #666;
}

.checkbox-label input[type="checkbox"] {
    width: auto;
    margin-right: 10px;
}

.submit-btn {
    background: #e74c3c;
    color: #fff;
    border: none;
    padding: 15px 40px;
    border-radius: 50px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    justify-content: center;
}

.submit-btn:hover:not(:disabled) {
    background: #c0392b;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(231, 76, 60, 0.4);
}

.submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

/* Contact Info Styles */
.contact-info-cards {
    display: grid;
    gap: 20px;
    margin-bottom: 40px;
}

.info-card {
    display: flex;
    align-items: flex-start;
    gap: 15px;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: all 0.3s;
    cursor: pointer;
    opacity: 0;
    transform: translateY(30px);
}

.info-card.animate-in {
    opacity: 1;
    transform: translateY(0);
    animation: slideInUp 0.6s ease-out forwards;
}

.info-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}

.info-icon {
    width: 50px;
    height: 50px;
    background: #e74c3c;
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
}

.info-content h4 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
    color: #2c3e50;
}

.info-content p {
    color: #666;
    line-height: 1.6;
    margin-bottom: 5px;
}

.info-content small {
    color: #999;
    font-size: 12px;
}

/* Store Hours */
.store-hours {
    background: #f8f9fa;
    padding: 25px;
    border-radius: 10px;
    margin-bottom: 30px;
}

.store-hours h4 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
    color: #2c3e50;
    display: flex;
    align-items: center;
    gap: 10px;
}

.hours-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.hour-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid #e1e8ed;
}

.hour-item:last-child {
    border-bottom: none;
}

.hour-item.current-day {
    background: #e8f5e8;
    padding: 8px 15px;
    border-radius: 5px;
    font-weight: 600;
    color: #27ae60;
}

/* Social Links */
.social-section h4 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
    color: #2c3e50;
}

.social-links-large {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
}

.social-link {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 15px;
    border-radius: 8px;
    text-decoration: none;
    color: #fff;
    font-weight: 500;
    transition: all 0.3s;
}

.social-link.facebook { background: #3b5998; }
.social-link.instagram { background: #e4405f; }
.social-link.twitter { background: #1da1f2; }
.social-link.youtube { background: #ff0000; }

.social-link:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

/* Map Section */
.map-section {
    padding: 60px 0;
    background: #f8f9fa;
}

.map-section h3 {
    text-align: center;
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 40px;
    color: #2c3e50;
}

.map-container {
    max-width: 800px;
    margin: 0 auto;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.map-placeholder {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    padding: 80px 40px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
}

.map-placeholder:hover {
    transform: scale(1.02);
}

.map-placeholder i {
    font-size: 48px;
    margin-bottom: 20px;
    opacity: 0.9;
}

.map-placeholder h4 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 10px;
}

.map-placeholder p {
    font-size: 16px;
    margin-bottom: 25px;
    opacity: 0.9;
}

.directions-btn {
    background: rgba(255,255,255,0.2);
    color: #fff;
    border: 2px solid rgba(255,255,255,0.3);
    padding: 12px 25px;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

.directions-btn:hover {
    background: rgba(255,255,255,0.3);
    border-color: rgba(255,255,255,0.5);
}

/* FAQ Section */
.faq-section {
    padding: 80px 0;
}

.faq-section h3 {
    text-align: center;
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 50px;
    color: #2c3e50;
}

.faq-grid {
    max-width: 800px;
    margin: 0 auto;
}

.faq-item {
    background: #fff;
    border-radius: 10px;
    margin-bottom: 15px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    overflow: hidden;
    transition: all 0.3s;
}

.faq-question {
    padding: 20px 25px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    transition: all 0.3s;
}

.faq-question:hover {
    background: #f8f9fa;
}

.faq-question h4 {
    font-size: 16px;
    font-weight: 600;
    color: #2c3e50;
    margin: 0;
}

.faq-question i {
    color: #e74c3c;
    font-size: 16px;
    transition: transform 0.3s;
}

.faq-item.active .faq-question i {
    transform: rotate(45deg);
}

.faq-answer {
    padding: 0 25px;
    max-height: 0;
    overflow: hidden;
    transition: all 0.3s ease-out;
    background: #f8f9fa;
}

.faq-item.active .faq-answer {
    padding: 20px 25px;
    max-height: 200px;
}

.faq-answer p {
    color: #666;
    line-height: 1.6;
    margin: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
    .page-header {
        padding: 100px 0 40px;
        margin-top: 80px;
    }
    
    .page-header h1 {
        font-size: 32px;
    }
    
    .contact-content {
        grid-template-columns: 1fr;
        gap: 40px;
    }
    
    .contact-form {
        padding: 30px 20px;
    }
    
    .form-row {
        grid-template-columns: 1fr;
        gap: 0;
    }
    
    .social-links-large {
        grid-template-columns: 1fr;
    }
    
    .map-placeholder {
        padding: 60px 30px;
    }
    
    .map-placeholder i {
        font-size: 36px;
    }
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
`;

// Add the styles to the document
document.head.insertAdjacentHTML('beforeend', contactPageStyles);