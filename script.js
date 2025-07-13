// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(26, 26, 26, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#1a1a1a';
        header.style.backdropFilter = 'none';
    }
});

// Filter functionality for bike types
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        // Filter logic would go here
        console.log('Filter applied:', this.textContent);
        
        // Add animation effect to bike cards
        const bikeCards = document.querySelectorAll('.bike-card');
        bikeCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    });
});

// Search functionality
document.querySelector('.search-btn-main').addEventListener('click', function() {
    const brand = document.querySelectorAll('.search-select')[0].value;
    const model = document.querySelectorAll('.search-select')[1].value;
    const price = document.querySelectorAll('.search-select')[2].value;
    
    if (brand === 'Select Bike Brand' || model === 'Select Model' || price === 'Price Range') {
        alert('Please select all search criteria');
        return;
    }
    
    // Simulate search
    console.log('Searching for:', { brand, model, price });
    alert(`Searching for ${brand} ${model} in ${price} range...`);
});

// Brand item hover effects
document.querySelectorAll('.brand-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Bike card interactions
document.querySelectorAll('.bike-card').forEach(card => {
    card.addEventListener('click', function() {
        const bikeName = this.querySelector('h3').textContent;
        const price = this.querySelector('.price').textContent;
        alert(`You clicked on ${bikeName} - ${price}`);
    });
});

// Hero CTA button
document.querySelector('.hero-cta').addEventListener('click', function() {
    // Scroll to featured section
    document.querySelector('.featured-section').scrollIntoView({
        behavior: 'smooth'
    });
});

// View Details buttons
document.querySelectorAll('.view-details').forEach(btn => {
    btn.addEventListener('click', function() {
        alert('Redirecting to bike details page...');
    });
});

// Promo CTA button
document.querySelector('.promo-cta').addEventListener('click', function() {
    alert('Contact form would open here');
});

// View Collection button
document.querySelector('.view-collection').addEventListener('click', function() {
    alert('Redirecting to full collection...');
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease';
    observer.observe(section);
});

// Initialize hero section immediately
document.querySelector('.hero').style.opacity = '1';
document.querySelector('.hero').style.transform = 'translateY(0)';

// Mobile menu toggle (for smaller screens)
const mobileMenuBtn = document.createElement('button');
mobileMenuBtn.innerHTML = '☰';
mobileMenuBtn.className = 'mobile-menu-btn';
mobileMenuBtn.style.cssText = `
    display: none;
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    @media (max-width: 768px) {
        display: block;
    }
`;

// Add mobile menu functionality
document.querySelector('.nav-actions').prepend(mobileMenuBtn);

mobileMenuBtn.addEventListener('click', function() {
    const nav = document.querySelector('.nav');
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});

console.log('Motodeal website loaded successfully!');
