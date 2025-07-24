// Products Page JavaScript

// Sample Products Data
const productsData = [
    {
        id: 1,
        name: "कॉटन कैजुअल शर्ट",
        category: "mens",
        price: 899,
        originalPrice: 1299,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop",
        rating: 4.5,
        reviews: 128,
        colors: ["black", "white", "blue"],
        sizes: ["S", "M", "L", "XL"],
        badge: "hot",
        isNew: false
    },
    {
        id: 2,
        name: "डेनिम जींस",
        category: "mens",
        price: 1299,
        originalPrice: 1799,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop",
        rating: 5.0,
        reviews: 95,
        colors: ["blue", "black"],
        sizes: ["M", "L", "XL", "XXL"],
        badge: "new",
        isNew: true
    },
    {
        id: 3,
        name: "डिजाइनर कुर्ती",
        category: "womens",
        price: 799,
        originalPrice: 1199,
        image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=300&h=400&fit=crop",
        rating: 4.8,
        reviews: 203,
        colors: ["red", "green", "yellow"],
        sizes: ["XS", "S", "M", "L"],
        badge: "bestseller",
        isNew: false
    },
    {
        id: 4,
        name: "किड्स ड्रेस",
        category: "kids",
        price: 599,
        originalPrice: 899,
        image: "https://images.unsplash.com/photo-1583743814966-8936f37f8302?w=300&h=400&fit=crop",
        rating: 4.9,
        reviews: 87,
        colors: ["red", "blue", "green"],
        sizes: ["XS", "S", "M"],
        badge: "new",
        isNew: true
    },
    {
        id: 5,
        name: "फॉर्मल शर्ट",
        category: "mens",
        price: 1199,
        originalPrice: 1599,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=400&fit=crop",
        rating: 4.3,
        reviews: 156,
        colors: ["white", "blue", "black"],
        sizes: ["S", "M", "L", "XL"],
        badge: "",
        isNew: false
    },
    {
        id: 6,
        name: "पार्टी ड्रेस",
        category: "womens",
        price: 1899,
        originalPrice: 2499,
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop",
        rating: 4.7,
        reviews: 234,
        colors: ["black", "red", "blue"],
        sizes: ["XS", "S", "M", "L", "XL"],
        badge: "hot",
        isNew: false
    },
    {
        id: 7,
        name: "स्पोर्ट्स टी-शर्ट",
        category: "mens",
        price: 499,
        originalPrice: 699,
        image: "https://images.unsplash.com/photo-1583743814966-8936f37f8302?w=300&h=400&fit=crop",
        rating: 4.4,
        reviews: 178,
        colors: ["black", "white", "red", "blue"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        badge: "",
        isNew: false
    },
    {
        id: 8,
        name: "ट्रेडिशनल लहंगा",
        category: "womens",
        price: 2999,
        originalPrice: 3999,
        image: "https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=300&h=400&fit=crop",
        rating: 4.9,
        reviews: 89,
        colors: ["red", "green", "yellow"],
        sizes: ["XS", "S", "M", "L"],
        badge: "bestseller",
        isNew: false
    },
    {
        id: 9,
        name: "बेबी रोम्पर",
        category: "kids",
        price: 399,
        originalPrice: 599,
        image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300&h=400&fit=crop",
        rating: 4.6,
        reviews: 67,
        colors: ["blue", "green", "yellow"],
        sizes: ["XS", "S"],
        badge: "new",
        isNew: true
    },
    {
        id: 10,
        name: "विंटर जैकेट",
        category: "mens",
        price: 1999,
        originalPrice: 2799,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=400&fit=crop",
        rating: 4.5,
        reviews: 145,
        colors: ["black", "blue"],
        sizes: ["M", "L", "XL", "XXL"],
        badge: "hot",
        isNew: false
    },
    {
        id: 11,
        name: "सिल्क साड़ी",
        category: "womens",
        price: 3499,
        originalPrice: 4999,
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&h=400&fit=crop",
        rating: 4.8,
        reviews: 112,
        colors: ["red", "green", "blue"],
        sizes: ["One Size"],
        badge: "bestseller",
        isNew: false
    },
    {
        id: 12,
        name: "स्कूल यूनिफॉर्म",
        category: "kids",
        price: 699,
        originalPrice: 999,
        image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=300&h=400&fit=crop",
        rating: 4.4,
        reviews: 203,
        colors: ["white", "blue"],
        sizes: ["XS", "S", "M", "L"],
        badge: "",
        isNew: false
    }
];

// Global Variables
let currentProducts = [...productsData];
let currentPage = 1;
let itemsPerPage = 12;
let activeFilters = {
    category: [],
    priceRange: [0, 5000],
    sizes: [],
    colors: []
};

// Initialize Products Page
document.addEventListener('DOMContentLoaded', function() {
    initializeFilters();
    initializeSorting();
    initializeViewToggle();
    renderProducts();
    initializePagination();
});

// Initialize Filters
function initializeFilters() {
    // Category Filter
    const categoryCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleCategoryFilter);
    });
    
    // Price Range Filter
    const priceRange = document.getElementById('priceRange');
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    
    if (priceRange) {
        priceRange.addEventListener('input', handlePriceRangeFilter);
    }
    
    if (minPrice && maxPrice) {
        minPrice.addEventListener('change', handlePriceInputFilter);
        maxPrice.addEventListener('change', handlePriceInputFilter);
    }
    
    // Size Filter
    const sizeBtns = document.querySelectorAll('.size-btn');
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', handleSizeFilter);
    });
    
    // Color Filter
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', handleColorFilter);
    });
    
    // Clear Filters
    const clearFiltersBtn = document.querySelector('.clear-filters-btn');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearAllFilters);
    }
}

// Handle Category Filter
function handleCategoryFilter(e) {
    const value = e.target.value;
    const isChecked = e.target.checked;
    
    if (value === 'all') {
        // If "All" is checked, uncheck other categories
        if (isChecked) {
            activeFilters.category = [];
            document.querySelectorAll('input[type="checkbox"]:not([value="all"])').forEach(cb => {
                cb.checked = false;
            });
        }
    } else {
        // Uncheck "All" when specific category is selected
        document.querySelector('input[value="all"]').checked = false;
        
        if (isChecked) {
            activeFilters.category.push(value);
        } else {
            activeFilters.category = activeFilters.category.filter(cat => cat !== value);
        }
        
        // If no categories selected, check "All"
        if (activeFilters.category.length === 0) {
            document.querySelector('input[value="all"]').checked = true;
        }
    }
    
    applyFilters();
}

// Handle Price Range Filter
function handlePriceRangeFilter(e) {
    const value = parseInt(e.target.value);
    activeFilters.priceRange[1] = value;
    document.getElementById('maxPrice').value = value;
    applyFilters();
}

function handlePriceInputFilter() {
    const minPrice = parseInt(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseInt(document.getElementById('maxPrice').value) || 5000;
    
    activeFilters.priceRange = [minPrice, maxPrice];
    document.getElementById('priceRange').value = maxPrice;
    applyFilters();
}

// Handle Size Filter
function handleSizeFilter(e) {
    const size = e.target.textContent;
    const isActive = e.target.classList.contains('active');
    
    if (isActive) {
        e.target.classList.remove('active');
        activeFilters.sizes = activeFilters.sizes.filter(s => s !== size);
    } else {
        e.target.classList.add('active');
        activeFilters.sizes.push(size);
    }
    
    applyFilters();
}

// Handle Color Filter
function handleColorFilter(e) {
    const color = e.target.dataset.color;
    const isActive = e.target.classList.contains('active');
    
    if (isActive) {
        e.target.classList.remove('active');
        activeFilters.colors = activeFilters.colors.filter(c => c !== color);
    } else {
        e.target.classList.add('active');
        activeFilters.colors.push(color);
    }
    
    applyFilters();
}

// Apply Filters
function applyFilters() {
    currentProducts = productsData.filter(product => {
        // Category filter
        if (activeFilters.category.length > 0 && !activeFilters.category.includes(product.category)) {
            return false;
        }
        
        // Price filter
        if (product.price < activeFilters.priceRange[0] || product.price > activeFilters.priceRange[1]) {
            return false;
        }
        
        // Size filter
        if (activeFilters.sizes.length > 0 && !activeFilters.sizes.some(size => product.sizes.includes(size))) {
            return false;
        }
        
        // Color filter
        if (activeFilters.colors.length > 0 && !activeFilters.colors.some(color => product.colors.includes(color))) {
            return false;
        }
        
        return true;
    });
    
    currentPage = 1;
    updateResultsCount();
    renderProducts();
    updatePagination();
}

// Clear All Filters
function clearAllFilters() {
    // Reset checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.checked = cb.value === 'all';
    });
    
    // Reset price inputs
    document.getElementById('minPrice').value = 0;
    document.getElementById('maxPrice').value = 5000;
    document.getElementById('priceRange').value = 2500;
    
    // Reset size buttons
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('.size-btn[data-size="M"]')?.classList.add('active');
    
    // Reset color options
    document.querySelectorAll('.color-option').forEach(option => {
        option.classList.remove('active');
    });
    
    // Reset filters
    activeFilters = {
        category: [],
        priceRange: [0, 5000],
        sizes: [],
        colors: []
    };
    
    currentProducts = [...productsData];
    currentPage = 1;
    updateResultsCount();
    renderProducts();
    updatePagination();
    
    showNotification('सभी फिल्टर हटा दिए गए', 'info');
}

// Initialize Sorting
function initializeSorting() {
    const sortSelect = document.getElementById('sortBy');
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSorting);
    }
}

// Handle Sorting
function handleSorting(e) {
    const sortBy = e.target.value;
    
    switch (sortBy) {
        case 'price-low':
            currentProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            currentProducts.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            currentProducts.sort((a, b) => b.isNew - a.isNew);
            break;
        case 'rating':
            currentProducts.sort((a, b) => b.rating - a.rating);
            break;
        default: // featured
            currentProducts.sort((a, b) => a.id - b.id);
    }
    
    renderProducts();
}

// Initialize View Toggle
function initializeViewToggle() {
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', handleViewToggle);
    });
}

// Handle View Toggle
function handleViewToggle(e) {
    const viewType = e.target.closest('.view-btn').dataset.view;
    
    // Update active button
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.closest('.view-btn').classList.add('active');
    
    // Update grid class
    const productsGrid = document.getElementById('productsGrid');
    if (viewType === 'list') {
        productsGrid.classList.add('list-view');
    } else {
        productsGrid.classList.remove('list-view');
    }
}

// Render Products
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const productsToShow = currentProducts.slice(startIndex, endIndex);
    
    if (productsToShow.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <i class="fas fa-search"></i>
                <h3>कोई प्रोडक्ट नहीं मिला</h3>
                <p>कृपया अपने फिल्टर बदलें या कुछ और खोजें</p>
            </div>
        `;
        return;
    }
    
    productsGrid.innerHTML = productsToShow.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<div class="product-badges"><span class="badge ${product.badge}">${getBadgeText(product.badge)}</span></div>` : ''}
                <div class="product-actions">
                    <button class="action-btn wishlist-btn" title="विशलिस्ट में जोड़ें">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="action-btn quick-view-btn" title="क्विक व्यू">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-rating">
                    ${generateStars(product.rating)}
                    <span>(${product.rating})</span>
                    <small>${product.reviews} समीक्षा</small>
                </div>
                <div class="product-price">
                    <span class="current-price">₹${product.price.toLocaleString()}</span>
                    ${product.originalPrice ? `<span class="original-price">₹${product.originalPrice.toLocaleString()}</span>` : ''}
                </div>
                <div class="product-colors">
                    ${product.colors.slice(0, 4).map(color => `<div class="color-dot" style="background: ${getColorCode(color)}" title="${color}"></div>`).join('')}
                    ${product.colors.length > 4 ? `<span class="more-colors">+${product.colors.length - 4}</span>` : ''}
                </div>
                <button class="add-to-cart-btn" data-product-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i>
                    कार्ट में डालें
                </button>
            </div>
        </div>
    `).join('');
    
    // Add event listeners to new product cards
    addProductEventListeners();
}

// Helper Functions
function getBadgeText(badge) {
    const badges = {
        'hot': 'HOT',
        'new': 'NEW',
        'bestseller': 'BESTSELLER'
    };
    return badges[badge] || badge.toUpperCase();
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function getColorCode(color) {
    const colors = {
        'black': '#000000',
        'white': '#ffffff',
        'red': '#e74c3c',
        'blue': '#3498db',
        'green': '#27ae60',
        'yellow': '#f1c40f'
    };
    return colors[color] || color;
}

// Add Event Listeners to Product Cards
function addProductEventListeners() {
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', handleAddToCart);
    });
    
    // Wishlist buttons
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', handleWishlist);
    });
    
    // Quick view buttons
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', handleQuickView);
    });
}

// Handle Add to Cart
function handleAddToCart(e) {
    const productId = parseInt(e.target.dataset.productId);
    const product = productsData.find(p => p.id === productId);
    
    if (product) {
        // Add to cart logic (using existing cart functionality)
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.name === product.name);
        
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({
                id: Date.now() + Math.random(),
                name: product.name,
                price: `₹${product.price}`,
                image: product.image,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        // Button animation
        const btn = e.target;
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> जोड़ा गया!';
        btn.style.background = '#27ae60';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.disabled = false;
        }, 2000);
        
        showNotification('प्रोडक्ट कार्ट में जोड़ा गया!', 'success');
    }
}

// Handle Wishlist
function handleWishlist(e) {
    const btn = e.target.closest('.wishlist-btn');
    const isWishlisted = btn.classList.contains('wishlisted');
    
    if (isWishlisted) {
        btn.classList.remove('wishlisted');
        btn.style.color = '';
        showNotification('विशलिस्ट से हटाया गया', 'info');
    } else {
        btn.classList.add('wishlisted');
        btn.style.color = '#e74c3c';
        showNotification('विशलिस्ट में जोड़ा गया', 'success');
    }
}

// Handle Quick View
function handleQuickView(e) {
    const productCard = e.target.closest('.product-card');
    const productId = parseInt(productCard.dataset.productId);
    const product = productsData.find(p => p.id === productId);
    
    if (product) {
        // Use existing quick view functionality
        showQuickView(productCard);
    }
}

// Update Results Count
function updateResultsCount() {
    const resultsCount = document.querySelector('.results-count');
    if (resultsCount) {
        resultsCount.textContent = `${currentProducts.length} प्रोडक्ट्स मिले`;
    }
}

// Initialize Pagination
function initializePagination() {
    const pageButtons = document.querySelectorAll('.page-btn');
    pageButtons.forEach(btn => {
        btn.addEventListener('click', handlePagination);
    });
}

// Handle Pagination
function handlePagination(e) {
    const btn = e.target.closest('.page-btn');
    
    if (btn.classList.contains('prev-page')) {
        if (currentPage > 1) {
            currentPage--;
        }
    } else if (btn.classList.contains('next-page')) {
        const totalPages = Math.ceil(currentProducts.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
        }
    } else if (!isNaN(btn.textContent)) {
        currentPage = parseInt(btn.textContent);
    }
    
    renderProducts();
    updatePagination();
    
    // Scroll to top of products
    document.querySelector('.products-page').scrollIntoView({ behavior: 'smooth' });
}

// Update Pagination
function updatePagination() {
    const totalPages = Math.ceil(currentProducts.length / itemsPerPage);
    const pagination = document.querySelector('.pagination');
    
    if (!pagination) return;
    
    // Update page buttons
    const pageButtons = pagination.querySelectorAll('.page-btn:not(.prev-page):not(.next-page)');
    pageButtons.forEach(btn => {
        btn.classList.remove('active');
        if (parseInt(btn.textContent) === currentPage) {
            btn.classList.add('active');
        }
    });
    
    // Update prev/next buttons
    const prevBtn = pagination.querySelector('.prev-page');
    const nextBtn = pagination.querySelector('.next-page');
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

// Update Cart Count (from main script)
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

// Add Products Page Specific Styles
const productsPageStyles = `
<style>
/* Products Page Styles */
.products-page {
    padding: 40px 0 80px;
}

.products-controls {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 40px;
    align-items: start;
}

/* Filters Section */
.filters-section {
    background: #fff;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    position: sticky;
    top: 140px;
}

.filters-section h3 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 25px;
    color: #2c3e50;
    display: flex;
    align-items: center;
    gap: 10px;
}

.filter-group {
    margin-bottom: 30px;
    padding-bottom: 25px;
    border-bottom: 1px solid #e1e8ed;
}

.filter-group:last-of-type {
    border-bottom: none;
}

.filter-group h4 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 15px;
    color: #333;
}

.filter-options {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.filter-option {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    color: #666;
}

.filter-option input[type="checkbox"] {
    margin-right: 10px;
    accent-color: #e74c3c;
}

.filter-option:hover {
    color: #333;
}

/* Price Range */
.price-range {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.price-inputs {
    display: flex;
    align-items: center;
    gap: 10px;
}

.price-inputs input {
    width: 80px;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    text-align: center;
}

.price-slider input[type="range"] {
    width: 100%;
    accent-color: #e74c3c;
}

/* Size Options */
.size-options {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.size-btn {
    width: 40px;
    height: 40px;
    border: 2px solid #ddd;
    background: #fff;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
}

.size-btn:hover,
.size-btn.active {
    border-color: #e74c3c;
    background: #e74c3c;
    color: #fff;
}

/* Color Options */
.color-options {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.color-option {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
}

.color-option:hover {
    transform: scale(1.1);
}

.color-option.active::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-weight: bold;
    text-shadow: 0 0 2px rgba(0,0,0,0.5);
}

.clear-filters-btn {
    width: 100%;
    background: #f8f9fa;
    color: #666;
    border: 1px solid #ddd;
    padding: 12px;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.clear-filters-btn:hover {
    background: #e9ecef;
    color: #333;
}

/* Products Main */
.products-main {
    min-height: 600px;
}

.products-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.results-count {
    font-weight: 600;
    color: #2c3e50;
}

.products-actions {
    display: flex;
    align-items: center;
    gap: 20px;
}

.sort-options {
    display: flex;
    align-items: center;
    gap: 10px;
}

.sort-options label {
    font-weight: 500;
    color: #666;
}

.sort-options select {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background: #fff;
}

.view-options {
    display: flex;
    gap: 5px;
}

.view-btn {
    width: 40px;
    height: 40px;
    border: 1px solid #ddd;
    background: #fff;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.view-btn.active,
.view-btn:hover {
    background: #e74c3c;
    color: #fff;
    border-color: #e74c3c;
}

/* Products Grid */
.products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 30px;
    margin-bottom: 50px;
}

.products-grid.list-view {
    grid-template-columns: 1fr;
}

.products-grid.list-view .product-card {
    display: flex;
    align-items: center;
    gap: 20px;
}

.products-grid.list-view .product-image {
    width: 200px;
    height: 250px;
    flex-shrink: 0;
}

.products-grid.list-view .product-info {
    flex: 1;
    padding: 20px;
}

.product-colors {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 15px;
}

.color-dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid #ddd;
}

.more-colors {
    font-size: 12px;
    color: #666;
    margin-left: 5px;
}

.no-products {
    grid-column: 1 / -1;
    text-align: center;
    padding: 80px 20px;
    color: #666;
}

.no-products i {
    font-size: 64px;
    margin-bottom: 20px;
    opacity: 0.5;
}

.no-products h3 {
    font-size: 24px;
    margin-bottom: 10px;
    color: #333;
}

/* Pagination */
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 40px;
}

.page-btn {
    width: 40px;
    height: 40px;
    border: 1px solid #ddd;
    background: #fff;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
}

.page-btn:hover:not(:disabled) {
    background: #f8f9fa;
}

.page-btn.active {
    background: #e74c3c;
    color: #fff;
    border-color: #e74c3c;
}

.page-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.page-dots {
    color: #666;
    font-weight: bold;
}

/* Responsive Design */
@media (max-width: 1024px) {
    .products-controls {
        grid-template-columns: 250px 1fr;
        gap: 30px;
    }
}

@media (max-width: 768px) {
    .products-controls {
        grid-template-columns: 1fr;
        gap: 20px;
    }
    
    .filters-section {
        position: static;
    }
    
    .products-header {
        flex-direction: column;
        gap: 15px;
        align-items: stretch;
    }
    
    .products-actions {
        justify-content: space-between;
    }
    
    .products-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 20px;
    }
    
    .products-grid.list-view .product-card {
        flex-direction: column;
    }
    
    .products-grid.list-view .product-image {
        width: 100%;
        height: 300px;
    }
}

@media (max-width: 480px) {
    .products-grid {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 15px;
    }
    
    .size-options {
        justify-content: center;
    }
    
    .color-options {
        justify-content: center;
    }
}
</style>
`;

// Add the styles to the document
document.head.insertAdjacentHTML('beforeend', productsPageStyles);