// DOM Elements
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const cartIcon = document.querySelector('.cart-icon');
const cartCount = document.querySelector('.cart-count');
const heroSlider = document.querySelector('.hero-slider');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const newsletterForm = document.querySelector('.newsletter-form');
const searchBox = document.querySelector('.search-box input');
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');

// Global Variables
let currentSlide = 0;
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let slideInterval;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeSlider();
    initializeMobileMenu();
    initializeCart();
    initializeSearch();
    initializeNewsletterForm();
    initializeScrollAnimations();
    initializeProductCards();
    updateCartCount();
});

// Hero Slider Functionality
function initializeSlider() {
    // Auto slide every 5 seconds
    slideInterval = setInterval(nextSlide, 5000);
    
    // Event listeners for controls
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // Pause auto-slide on hover
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        heroSlider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
}

function prevSlide() {
    currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    updateSlider();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

function updateSlider() {
    // Update slides
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Mobile Menu Functionality
function initializeMobileMenu() {
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', toggleMobileMenu);
        
        // Close menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }
}

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
}

function closeMobileMenu() {
    navMenu.classList.remove('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-times');
}

// Cart Functionality
function initializeCart() {
    updateCartCount();
    
    // Add to cart buttons
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', handleAddToCart);
    });
    
    // Cart icon click
    if (cartIcon) {
        cartIcon.addEventListener('click', showCartModal);
    }
}

function handleAddToCart(e) {
    e.preventDefault();
    
    const productCard = e.target.closest('.product-card');
    const product = {
        id: Date.now() + Math.random(),
        name: productCard.querySelector('h3').textContent,
        price: productCard.querySelector('.current-price').textContent,
        image: productCard.querySelector('img').src,
        quantity: 1
    };
    
    // Check if product already exists in cart
    const existingProduct = cart.find(item => item.name === product.name);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update UI
    updateCartCount();
    showAddToCartAnimation(e.target);
    showNotification('प्रोडक्ट कार्ट में जोड़ा गया!', 'success');
}

function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

function showAddToCartAnimation(button) {
    button.textContent = 'जोड़ा गया!';
    button.style.background = '#27ae60';
    
    setTimeout(() => {
        button.textContent = 'कार्ट में डालें';
        button.style.background = '#2c3e50';
    }, 2000);
}

function showCartModal() {
    // Create cart modal
    const modal = document.createElement('div');
    modal.className = 'cart-modal';
    modal.innerHTML = `
        <div class="cart-modal-content">
            <div class="cart-header">
                <h3>शॉपिंग कार्ट</h3>
                <button class="close-cart">&times;</button>
            </div>
            <div class="cart-items">
                ${cart.length === 0 ? '<p>आपका कार्ट खाली है</p>' : generateCartHTML()}
            </div>
            <div class="cart-footer">
                <div class="cart-total">
                    <strong>कुल: ${calculateTotal()}</strong>
                </div>
                <button class="checkout-btn">चेकआउट करें</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    modal.querySelector('.close-cart').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

function generateCartHTML() {
    return cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>${item.price}</p>
            </div>
            <div class="quantity-controls">
                <button onclick="updateQuantity('${item.id}', -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity('${item.id}', 1)">+</button>
            </div>
            <button onclick="removeFromCart('${item.id}')" class="remove-item">हटाएं</button>
        </div>
    `).join('');
}

function calculateTotal() {
    return cart.reduce((total, item) => {
        const price = parseInt(item.price.replace('₹', '').replace(',', ''));
        return total + (price * item.quantity);
    }, 0).toLocaleString('hi-IN', { style: 'currency', currency: 'INR' });
}

function updateQuantity(id, change) {
    const item = cart.find(item => item.id == id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            // Refresh cart modal if open
            const modal = document.querySelector('.cart-modal');
            if (modal) {
                document.body.removeChild(modal);
                showCartModal();
            }
        }
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id != id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Refresh cart modal if open
    const modal = document.querySelector('.cart-modal');
    if (modal) {
        document.body.removeChild(modal);
        showCartModal();
    }
    
    showNotification('प्रोडक्ट कार्ट से हटाया गया!', 'info');
}

// Search Functionality
function initializeSearch() {
    if (searchBox) {
        searchBox.addEventListener('input', handleSearch);
        searchBox.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch(searchBox.value);
            }
        });
    }
    
    const searchBtn = document.querySelector('.search-box button');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            performSearch(searchBox.value);
        });
    }
}

function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    if (query.length > 2) {
        // Show search suggestions
        showSearchSuggestions(query);
    } else {
        hideSearchSuggestions();
    }
}

function showSearchSuggestions(query) {
    const suggestions = [
        'शर्ट', 'जींस', 'टी-शर्ट', 'कुर्ती', 'ड्रेस', 'स्वेटर',
        'मेन्स कलेक्शन', 'वीमेन्स कलेक्शन', 'किड्स कलेक्शन'
    ].filter(item => item.toLowerCase().includes(query));
    
    // Create suggestions dropdown
    let dropdown = document.querySelector('.search-suggestions');
    if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.className = 'search-suggestions';
        searchBox.parentNode.appendChild(dropdown);
    }
    
    dropdown.innerHTML = suggestions.map(suggestion => 
        `<div class="suggestion-item">${suggestion}</div>`
    ).join('');
    
    // Add click listeners
    dropdown.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', () => {
            searchBox.value = item.textContent;
            performSearch(item.textContent);
            hideSearchSuggestions();
        });
    });
}

function hideSearchSuggestions() {
    const dropdown = document.querySelector('.search-suggestions');
    if (dropdown) {
        dropdown.remove();
    }
}

function performSearch(query) {
    showNotification(`"${query}" के लिए खोजा जा रहा है...`, 'info');
    // Here you would typically filter products or redirect to search results
    console.log('Searching for:', query);
}

// Newsletter Form
function initializeNewsletterForm() {
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    if (validateEmail(email)) {
        // Simulate API call
        setTimeout(() => {
            showNotification('न्यूजलेटर के लिए सफलतापूर्वक सब्सक्राइब हो गए!', 'success');
            e.target.reset();
        }, 1000);
    } else {
        showNotification('कृपया एक वैध ईमेल एड्रेस डालें', 'error');
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Product Cards Interactions
function initializeProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Wishlist functionality
        const wishlistBtn = card.querySelector('.action-btn:first-child');
        if (wishlistBtn) {
            wishlistBtn.addEventListener('click', (e) => {
                e.preventDefault();
                toggleWishlist(card, wishlistBtn);
            });
        }
        
        // Quick view functionality
        const quickViewBtn = card.querySelector('.action-btn:last-child');
        if (quickViewBtn) {
            quickViewBtn.addEventListener('click', (e) => {
                e.preventDefault();
                showQuickView(card);
            });
        }
    });
}

function toggleWishlist(card, btn) {
    const isWishlisted = btn.classList.contains('wishlisted');
    
    if (isWishlisted) {
        btn.classList.remove('wishlisted');
        btn.style.color = '#333';
        showNotification('विशलिस्ट से हटाया गया', 'info');
    } else {
        btn.classList.add('wishlisted');
        btn.style.color = '#e74c3c';
        showNotification('विशलिस्ट में जोड़ा गया', 'success');
    }
}

function showQuickView(card) {
    const productName = card.querySelector('h3').textContent;
    const productPrice = card.querySelector('.current-price').textContent;
    const productImage = card.querySelector('img').src;
    
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.innerHTML = `
        <div class="quick-view-content">
            <button class="close-quick-view">&times;</button>
            <div class="quick-view-product">
                <div class="quick-view-image">
                    <img src="${productImage}" alt="${productName}">
                </div>
                <div class="quick-view-details">
                    <h3>${productName}</h3>
                    <div class="price">${productPrice}</div>
                    <div class="rating">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                        <span>(4.5)</span>
                    </div>
                    <p>यह एक बेहतरीन क्वालिटी का प्रोडक्ट है जो आपकी स्टाइल को निखारेगा।</p>
                    <div class="size-selector">
                        <label>साइज़:</label>
                        <select>
                            <option>S</option>
                            <option>M</option>
                            <option>L</option>
                            <option>XL</option>
                        </select>
                    </div>
                    <button class="add-to-cart-btn">कार्ट में डालें</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Event listeners
    modal.querySelector('.close-quick-view').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loading');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.category-card, .product-card, .quick-link-card, .review-card'
    );
    
    animateElements.forEach(el => observer.observe(el));
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

// Smooth scrolling for navigation links
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

// Back to top button
function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: #e74c3c;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        z-index: 1000;
    `;
    
    document.body.appendChild(backToTop);
    
    // Show/hide based on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button
createBackToTopButton();

// Category and Quick Link interactions
document.querySelectorAll('.category-card, .quick-link-card').forEach(card => {
    card.addEventListener('click', function() {
        const cardType = this.classList.contains('category-card') ? 'category' : 'quick-link';
        const title = this.querySelector('h3').textContent;
        showNotification(`${title} सेक्शन में जा रहे हैं...`, 'info');
    });
});

// Loading screen (optional)
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
});

// Handle form submissions
document.addEventListener('submit', (e) => {
    if (e.target.matches('form:not(.newsletter-form)')) {
        e.preventDefault();
        showNotification('फॉर्म सबमिट हो गया!', 'success');
    }
});

// Add CSS for notifications and modals
const additionalStyles = `
<style>
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: #fff;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    transform: translateX(100%);
    transition: all 0.3s;
    z-index: 10000;
    min-width: 300px;
}

.notification.show {
    transform: translateX(0);
}

.notification.success {
    border-left: 4px solid #27ae60;
}

.notification.error {
    border-left: 4px solid #e74c3c;
}

.notification.warning {
    border-left: 4px solid #f39c12;
}

.notification.info {
    border-left: 4px solid #3498db;
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 10px;
}

.notification-content i {
    font-size: 18px;
}

.notification.success i { color: #27ae60; }
.notification.error i { color: #e74c3c; }
.notification.warning i { color: #f39c12; }
.notification.info i { color: #3498db; }

.cart-modal, .quick-view-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
}

.cart-modal-content, .quick-view-content {
    background: #fff;
    border-radius: 15px;
    padding: 30px;
    max-width: 600px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
}

.cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
}

.close-cart, .close-quick-view {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #999;
}

.cart-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px 0;
    border-bottom: 1px solid #eee;
}

.cart-item img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
}

.item-details {
    flex: 1;
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 10px;
}

.quantity-controls button {
    width: 30px;
    height: 30px;
    border: 1px solid #ddd;
    background: #fff;
    border-radius: 50%;
    cursor: pointer;
}

.cart-footer {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #eee;
    text-align: center;
}

.checkout-btn {
    background: #e74c3c;
    color: #fff;
    border: none;
    padding: 15px 40px;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 15px;
}

.search-suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    z-index: 1000;
    margin-top: 5px;
}

.suggestion-item {
    padding: 12px 20px;
    cursor: pointer;
    transition: background 0.3s;
}

.suggestion-item:hover {
    background: #f8f9fa;
}

.quick-view-product {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    align-items: start;
}

.quick-view-image img {
    width: 100%;
    border-radius: 8px;
}

.quick-view-details h3 {
    font-size: 24px;
    margin-bottom: 15px;
}

.quick-view-details .price {
    font-size: 20px;
    color: #e74c3c;
    font-weight: 700;
    margin-bottom: 15px;
}

.size-selector {
    margin: 20px 0;
}

.size-selector select {
    padding: 8px 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-left: 10px;
}

@media (max-width: 768px) {
    .quick-view-product {
        grid-template-columns: 1fr;
        gap: 20px;
    }
    
    .notification {
        min-width: auto;
        left: 20px;
        right: 20px;
    }
    
    .cart-modal-content, .quick-view-content {
        width: 95%;
        padding: 20px;
    }
}
</style>
`;

// Add the styles to the document
document.head.insertAdjacentHTML('beforeend', additionalStyles);
