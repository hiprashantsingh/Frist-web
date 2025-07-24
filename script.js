// Medical Shop Website JavaScript

// DOM Elements
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const cartBtn = document.querySelector('.cart-btn');
const cartCount = document.querySelector('.cart-count');
const searchBars = document.querySelectorAll('.search-bar input, .search-bar-main input');
const addToCartBtns = document.querySelectorAll('.btn-cart');
const buyNowBtns = document.querySelectorAll('.btn-primary');

// Cart functionality
let cart = JSON.parse(localStorage.getItem('medicalShopCart')) || [];
let cartTotal = 0;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    setupMobileMenu();
    setupSearch();
    setupCart();
    setupAnimations();
    setupSmoothScrolling();
    updateCartDisplay();
    setupFormValidation();
    setupImageLazyLoading();
}

// Mobile Menu Functionality
function setupMobileMenu() {
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Change hamburger to X
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking on a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

// Search Functionality
function setupSearch() {
    searchBars.forEach(searchBar => {
        const searchButton = searchBar.nextElementSibling;
        
        // Search on Enter key
        searchBar.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });

        // Search on button click
        if (searchButton) {
            searchButton.addEventListener('click', function() {
                performSearch(searchBar.value);
            });
        }

        // Auto-complete suggestions (basic implementation)
        searchBar.addEventListener('input', function() {
            showSearchSuggestions(this.value);
        });
    });
}

function performSearch(query) {
    if (query.trim() === '') {
        showNotification('कृपया खोजने के लिए कुछ टाइप करें', 'warning');
        return;
    }

    // Simulate search functionality
    console.log('Searching for:', query);
    showNotification(`"${query}" के लिए खोज रहे हैं...`, 'info');
    
    // In a real application, this would make an API call
    setTimeout(() => {
        showNotification(`"${query}" के लिए परिणाम मिले`, 'success');
    }, 1500);
}

function showSearchSuggestions(query) {
    if (query.length < 2) return;

    // Sample medicine suggestions
    const suggestions = [
        'पैरासिटामोल',
        'एस्पिरिन',
        'सेटिरिजिन',
        'ओमेप्राजोल',
        'मेटफॉर्मिन',
        'च्यवनप्राश',
        'विटामिन डी',
        'कैल्शियम टैबलेट'
    ];

    const filteredSuggestions = suggestions.filter(item => 
        item.toLowerCase().includes(query.toLowerCase())
    );

    // Display suggestions (basic implementation)
    if (filteredSuggestions.length > 0) {
        console.log('Suggestions:', filteredSuggestions);
    }
}

// Cart Functionality
function setupCart() {
    // Add to cart buttons
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card, .offer-card, .ayurvedic-card');
            addToCart(productCard);
        });
    });

    // Buy now buttons
    buyNowBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card, .offer-card, .ayurvedic-card');
            if (productCard) {
                addToCart(productCard);
                // Redirect to checkout (simulate)
                showNotification('चेकआउट पेज पर भेजा जा रहा है...', 'info');
                setTimeout(() => {
                    window.location.href = '#checkout';
                }, 1000);
            } else {
                // Hero section buttons
                if (this.textContent.includes('ऑर्डर')) {
                    showNotification('कृपया कोई दवा चुनें', 'warning');
                } else if (this.textContent.includes('ऑफ़र्स')) {
                    document.querySelector('#offers').scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Cart button click
    if (cartBtn) {
        cartBtn.addEventListener('click', function() {
            showCartModal();
        });
    }
}

function addToCart(productCard) {
    if (!productCard) return;

    const product = {
        id: Date.now() + Math.random(),
        name: productCard.querySelector('h3').textContent,
        brand: productCard.querySelector('.brand')?.textContent || 'Generic',
        price: extractPrice(productCard.querySelector('.price, .discounted')?.textContent),
        image: productCard.querySelector('img')?.src || '',
        quantity: 1
    };

    // Check if product already exists in cart
    const existingProduct = cart.find(item => item.name === product.name);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
        showNotification(`${product.name} की मात्रा बढ़ाई गई`, 'success');
    } else {
        cart.push(product);
        showNotification(`${product.name} कार्ट में जोड़ा गया`, 'success');
    }

    updateCartDisplay();
    saveCartToStorage();
    
    // Add animation to cart button
    cartBtn.classList.add('pulse');
    setTimeout(() => cartBtn.classList.remove('pulse'), 1000);
}

function extractPrice(priceText) {
    if (!priceText) return 0;
    const match = priceText.match(/₹(\d+(?:\.\d+)?)/);
    return match ? parseFloat(match[1]) : 0;
}

function updateCartDisplay() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
    
    cartTotal = totalAmount;
}

function saveCartToStorage() {
    localStorage.setItem('medicalShopCart', JSON.stringify(cart));
}

function showCartModal() {
    if (cart.length === 0) {
        showNotification('आपका कार्ट खाली है', 'info');
        return;
    }

    // Create cart modal (basic implementation)
    const cartItems = cart.map(item => 
        `${item.name} - ₹${item.price} x ${item.quantity}`
    ).join('\n');
    
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    alert(`कार्ट में आइटम:\n${cartItems}\n\nकुल राशि: ₹${totalAmount}`);
}

// Animations
function setupAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animatedElements = document.querySelectorAll(
        '.category-item, .offer-card, .product-card, .feature-item, .testimonial-card, .blog-card, .ayurvedic-card'
    );

    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Hero text animation
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        heroText.classList.add('slide-in-left');
        setTimeout(() => heroText.classList.add('visible'), 500);
    }

    // Hero image animation
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.classList.add('slide-in-right');
        setTimeout(() => heroImage.classList.add('visible'), 700);
    }
}

// Smooth Scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
}

// Form Validation (for future contact forms)
function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            validateForm(this);
        });
    });
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
            showNotification(`कृपया ${input.placeholder} भरें`, 'error');
        } else {
            input.classList.remove('error');
        }
    });

    if (isValid) {
        showNotification('फॉर्म सफलतापूर्वक भेजा गया', 'success');
        form.reset();
    }
}

// Image Lazy Loading
function setupImageLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => notification.remove());

    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#0073e6'
    };
    return colors[type] || '#0073e6';
}

// Add notification animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    .notification i {
        font-size: 16px;
    }
    
    @media (max-width: 480px) {
        .notification {
            right: 10px !important;
            left: 10px !important;
            max-width: none !important;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance optimization
window.addEventListener('scroll', throttle(() => {
    // Add scroll-based functionality here if needed
}, 100));

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    showNotification('कुछ गलत हुआ है। कृपया पेज रीफ्रेश करें।', 'error');
});

// Service Worker registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        addToCart,
        performSearch,
        showNotification,
        updateCartDisplay
    };
}
