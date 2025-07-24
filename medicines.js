// Medicines Page JavaScript

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const productsCount = document.getElementById('productsCount');
const sortSelect = document.getElementById('sortBy');
const viewButtons = document.querySelectorAll('.view-btn');
const filterCheckboxes = document.querySelectorAll('.filter-checkbox input[type="checkbox"]');
const clearFiltersBtn = document.getElementById('clearFilters');
const sidebarSearch = document.getElementById('sidebarSearch');
const pricePresets = document.querySelectorAll('.price-preset');
const applyPriceFilter = document.querySelector('.apply-price-filter');
const minPriceInput = document.getElementById('minPrice');
const maxPriceInput = document.getElementById('maxPrice');
const quickViewModal = document.getElementById('quickViewModal');
const closeQuickViewBtn = document.getElementById('closeQuickView');
const quickViewBtns = document.querySelectorAll('.quick-view-btn');
const wishlistBtns = document.querySelectorAll('.wishlist-btn');
const paginationBtns = document.querySelectorAll('.pagination-number');

// Product Data (in a real app, this would come from an API)
let allProducts = [
    {
        id: 1,
        name: 'पैरासिटामोल 500mg',
        brand: 'सिप्ला',
        category: 'pain-relief',
        description: 'बुखार और दर्द निवारक टैबलेट',
        currentPrice: 45,
        originalPrice: 53,
        discount: 15,
        rating: 4,
        reviewCount: 234,
        availability: 'स्टॉक में उपलब्ध',
        image: 'https://via.placeholder.com/250x200/0073e6/ffffff?text=Paracetamol',
        badges: ['discount'],
        prescriptionRequired: false
    },
    {
        id: 2,
        name: 'मेटफॉर्मिन 500mg',
        brand: 'सन फार्मा',
        category: 'diabetes',
        description: 'मधुमेह नियंत्रण की दवा',
        currentPrice: 85,
        originalPrice: 85,
        discount: 0,
        rating: 5,
        reviewCount: 189,
        availability: 'स्टॉक में उपलब्ध',
        image: 'https://via.placeholder.com/250x200/28a745/ffffff?text=Metformin',
        badges: ['prescription'],
        prescriptionRequired: true
    },
    {
        id: 3,
        name: 'मल्टी विटामिन टैबलेट',
        brand: 'हिमालया',
        category: 'vitamins',
        description: 'दैनिक पोषण के लिए',
        currentPrice: 299,
        originalPrice: 299,
        discount: 0,
        rating: 5,
        reviewCount: 456,
        availability: 'स्टॉक में उपलब्ध',
        image: 'https://via.placeholder.com/250x200/ffc107/000000?text=Multivitamin',
        badges: ['popular'],
        prescriptionRequired: false
    },
    {
        id: 4,
        name: 'च्यवनप्राश',
        brand: 'डाबर',
        category: 'ayurvedic',
        description: 'प्रतिरक्षा प्रणाली बढ़ाने के लिए',
        currentPrice: 200,
        originalPrice: 250,
        discount: 20,
        rating: 4,
        reviewCount: 312,
        availability: 'स्टॉक में उपलब्ध',
        image: 'https://via.placeholder.com/250x200/28a745/ffffff?text=Chyawanprash',
        badges: ['discount', 'ayurvedic'],
        prescriptionRequired: false
    },
    {
        id: 5,
        name: 'एस्पिरिन 75mg',
        brand: 'डॉ. रेड्डीज',
        category: 'heart',
        description: 'हृदय रोग की रोकथाम के लिए',
        currentPrice: 125,
        originalPrice: 125,
        discount: 0,
        rating: 5,
        reviewCount: 167,
        availability: 'स्टॉक में उपलब्ध',
        image: 'https://via.placeholder.com/250x200/dc3545/ffffff?text=Aspirin',
        badges: ['prescription'],
        prescriptionRequired: true
    },
    {
        id: 6,
        name: 'एमोक्सिसिलिन 500mg',
        brand: 'सिप्ला',
        category: 'antibiotics',
        description: 'बैक्टीरियल संक्रमण की दवा',
        currentPrice: 180,
        originalPrice: 180,
        discount: 0,
        rating: 4,
        reviewCount: 89,
        availability: 'स्टॉक में उपलब्ध',
        image: 'https://via.placeholder.com/250x200/6f42c1/ffffff?text=Amoxicillin',
        badges: ['prescription'],
        prescriptionRequired: true
    }
];

let filteredProducts = [...allProducts];
let currentPage = 1;
const productsPerPage = 12;
let wishlist = JSON.parse(localStorage.getItem('medicalShopWishlist')) || [];

// Initialize medicines page
document.addEventListener('DOMContentLoaded', function() {
    initializeMedicinesPage();
});

function initializeMedicinesPage() {
    renderProducts();
    setupEventListeners();
    updateProductsCount();
    updateWishlistButtons();
}

function setupEventListeners() {
    // Sort functionality
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSort);
    }

    // View toggle
    viewButtons.forEach(btn => {
        btn.addEventListener('click', handleViewToggle);
    });

    // Filter functionality
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleFilters);
    });

    // Clear filters
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearAllFilters);
    }

    // Search functionality
    if (sidebarSearch) {
        sidebarSearch.addEventListener('input', debounce(handleSearch, 300));
    }

    // Price filters
    pricePresets.forEach(preset => {
        preset.addEventListener('click', handlePricePreset);
    });

    if (applyPriceFilter) {
        applyPriceFilter.addEventListener('click', handlePriceFilter);
    }

    // Quick view modal
    if (closeQuickViewBtn) {
        closeQuickViewBtn.addEventListener('click', closeQuickView);
    }

    if (quickViewModal) {
        quickViewModal.addEventListener('click', function(e) {
            if (e.target === quickViewModal) {
                closeQuickView();
            }
        });
    }

    // Pagination
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', handlePagination);
    });

    // ESC key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && quickViewModal.classList.contains('active')) {
            closeQuickView();
        }
    });
}

function renderProducts() {
    if (!productsGrid) return;

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);

    if (productsToShow.length === 0) {
        showEmptyState();
        return;
    }

    productsGrid.innerHTML = productsToShow.map(product => createProductCard(product)).join('');
    
    // Re-attach event listeners for new elements
    attachProductEventListeners();
    updatePagination();
}

function createProductCard(product) {
    const discountBadge = product.discount > 0 ? `<span class="badge-discount">${product.discount}% छूट</span>` : '';
    const prescriptionBadge = product.prescriptionRequired ? `<span class="badge-prescription">प्रिस्क्रिप्शन आवश्यक</span>` : '';
    const popularBadge = product.badges.includes('popular') ? `<span class="badge-popular">बेस्टसेलर</span>` : '';
    const ayurvedicBadge = product.badges.includes('ayurvedic') ? `<span class="badge-ayurvedic">आयुर्वेदिक</span>` : '';
    
    const badges = `${discountBadge}${prescriptionBadge}${popularBadge}${ayurvedicBadge}`;
    
    const originalPriceHtml = product.originalPrice > product.currentPrice ? 
        `<span class="original-price">₹${product.originalPrice}</span>` : '';
    
    const discountPercentHtml = product.discount > 0 ? 
        `<span class="discount-percent">${product.discount}% छूट</span>` : '';

    const stars = Array.from({length: 5}, (_, i) => 
        `<i class="fas fa-star${i < product.rating ? '' : ' far fa-star'}"></i>`
    ).join('');

    const isInWishlist = wishlist.includes(product.id);

    return `
        <div class="product-card" data-category="${product.category}" data-brand="${product.brand.toLowerCase().replace(/\s+/g, '-')}" data-price="${product.currentPrice}" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-badges">
                    ${badges}
                </div>
                <div class="product-actions">
                    <button class="quick-view-btn" title="त्वरित देखें" data-id="${product.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" title="पसंदीदा में जोड़ें" data-id="${product.id}">
                        <i class="${isInWishlist ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-brand">${product.brand}</p>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">
                    <div class="stars">
                        ${stars}
                    </div>
                    <span class="rating-count">(${product.reviewCount} समीक्षाएं)</span>
                </div>
                <div class="product-price">
                    <span class="current-price">₹${product.currentPrice}</span>
                    ${originalPriceHtml}
                    ${discountPercentHtml}
                </div>
                <div class="product-availability">
                    <i class="fas fa-check-circle"></i>
                    <span>${product.availability}</span>
                </div>
                <div class="product-buttons">
                    <button class="btn-cart" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i>
                        कार्ट में जोड़ें
                    </button>
                    <button class="btn-buy-now" data-id="${product.id}">
                        अभी खरीदें
                    </button>
                </div>
            </div>
        </div>
    `;
}

function attachProductEventListeners() {
    // Quick view buttons
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = parseInt(this.dataset.id);
            showQuickView(productId);
        });
    });

    // Wishlist buttons
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = parseInt(this.dataset.id);
            toggleWishlist(productId);
        });
    });

    // Add to cart buttons
    document.querySelectorAll('.btn-cart').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = parseInt(this.dataset.id);
            const product = allProducts.find(p => p.id === productId);
            if (product) {
                addToCart(product);
            }
        });
    });

    // Buy now buttons
    document.querySelectorAll('.btn-buy-now').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = parseInt(this.dataset.id);
            const product = allProducts.find(p => p.id === productId);
            if (product) {
                buyNow(product);
            }
        });
    });
}

function handleSort() {
    const sortValue = sortSelect.value;
    
    switch (sortValue) {
        case 'name-asc':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'price-low':
            filteredProducts.sort((a, b) => a.currentPrice - b.currentPrice);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.currentPrice - a.currentPrice);
            break;
        case 'discount':
            filteredProducts.sort((a, b) => b.discount - a.discount);
            break;
        case 'popular':
            filteredProducts.sort((a, b) => b.reviewCount - a.reviewCount);
            break;
        default:
            // Relevance - keep original order
            break;
    }
    
    currentPage = 1;
    renderProducts();
}

function handleViewToggle() {
    viewButtons.forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');
    
    const view = this.dataset.view;
    if (view === 'list') {
        productsGrid.classList.add('list-view');
    } else {
        productsGrid.classList.remove('list-view');
    }
}

function handleFilters() {
    const selectedCategories = Array.from(document.querySelectorAll('.filter-checkbox input[value]:checked'))
        .map(cb => cb.value)
        .filter(val => val !== 'all');

    const selectedBrands = Array.from(document.querySelectorAll('.filter-checkbox input[value*="-"]:checked'))
        .map(cb => cb.value);

    const selectedAvailability = Array.from(document.querySelectorAll('.filter-checkbox input[value*="stock"]:checked, .filter-checkbox input[value*="prescription"]:checked, .filter-checkbox input[value*="otc"]:checked'))
        .map(cb => cb.value);

    const selectedDiscounts = Array.from(document.querySelectorAll('.filter-checkbox input[value*="discount"]:checked'))
        .map(cb => parseInt(cb.value.split('-')[1]));

    filteredProducts = allProducts.filter(product => {
        // Category filter
        if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
            return false;
        }

        // Brand filter
        if (selectedBrands.length > 0) {
            const productBrand = product.brand.toLowerCase().replace(/\s+/g, '-');
            if (!selectedBrands.includes(productBrand)) {
                return false;
            }
        }

        // Availability filter
        if (selectedAvailability.length > 0) {
            if (selectedAvailability.includes('prescription-required') && !product.prescriptionRequired) {
                return false;
            }
            if (selectedAvailability.includes('otc') && product.prescriptionRequired) {
                return false;
            }
        }

        // Discount filter
        if (selectedDiscounts.length > 0) {
            const hasRequiredDiscount = selectedDiscounts.some(discount => product.discount >= discount);
            if (!hasRequiredDiscount) {
                return false;
            }
        }

        return true;
    });

    currentPage = 1;
    renderProducts();
    updateProductsCount();
}

function handleSearch() {
    const query = sidebarSearch.value.toLowerCase().trim();
    
    if (query === '') {
        filteredProducts = [...allProducts];
    } else {
        filteredProducts = allProducts.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.brand.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
    }
    
    currentPage = 1;
    renderProducts();
    updateProductsCount();
}

function handlePricePreset() {
    const min = parseInt(this.dataset.min);
    const max = parseInt(this.dataset.max);
    
    minPriceInput.value = min;
    maxPriceInput.value = max === 1000 ? '' : max;
    
    applyPriceFilter.click();
}

function handlePriceFilter() {
    const minPrice = parseInt(minPriceInput.value) || 0;
    const maxPrice = parseInt(maxPriceInput.value) || Infinity;
    
    filteredProducts = filteredProducts.filter(product => 
        product.currentPrice >= minPrice && product.currentPrice <= maxPrice
    );
    
    currentPage = 1;
    renderProducts();
    updateProductsCount();
}

function clearAllFilters() {
    // Clear all checkboxes
    filterCheckboxes.forEach(checkbox => {
        if (checkbox.value === 'all') {
            checkbox.checked = true;
        } else {
            checkbox.checked = false;
        }
    });
    
    // Clear price inputs
    minPriceInput.value = '';
    maxPriceInput.value = '';
    
    // Clear search
    sidebarSearch.value = '';
    
    // Reset sort
    sortSelect.value = 'relevance';
    
    // Reset products
    filteredProducts = [...allProducts];
    currentPage = 1;
    renderProducts();
    updateProductsCount();
    
    showNotification('सभी फ़िल्टर साफ़ कर दिए गए', 'success');
}

function showQuickView(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    // Populate modal content
    document.getElementById('quickViewImage').src = product.image;
    document.getElementById('quickViewName').textContent = product.name;
    document.getElementById('quickViewBrand').textContent = product.brand;
    document.getElementById('quickViewDescription').textContent = product.description;
    
    // Rating
    const stars = Array.from({length: 5}, (_, i) => 
        `<i class="fas fa-star${i < product.rating ? '' : ' far fa-star'}"></i>`
    ).join('');
    document.getElementById('quickViewRating').innerHTML = `
        <div class="stars">${stars}</div>
        <span class="rating-count">(${product.reviewCount} समीक्षाएं)</span>
    `;
    
    // Price
    const originalPriceHtml = product.originalPrice > product.currentPrice ? 
        `<span class="original-price">₹${product.originalPrice}</span>` : '';
    const discountPercentHtml = product.discount > 0 ? 
        `<span class="discount-percent">${product.discount}% छूट</span>` : '';
    
    document.getElementById('quickViewPrice').innerHTML = `
        <span class="current-price">₹${product.currentPrice}</span>
        ${originalPriceHtml}
        ${discountPercentHtml}
    `;
    
    // Availability
    document.getElementById('quickViewAvailability').innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${product.availability}</span>
    `;
    
    // Show modal
    quickViewModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeQuickView() {
    quickViewModal.classList.remove('active');
    document.body.style.overflow = '';
}

function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    
    if (index > -1) {
        wishlist.splice(index, 1);
        showNotification('पसंदीदा से हटा दिया गया', 'info');
    } else {
        wishlist.push(productId);
        showNotification('पसंदीदा में जोड़ा गया', 'success');
    }
    
    localStorage.setItem('medicalShopWishlist', JSON.stringify(wishlist));
    updateWishlistButtons();
}

function updateWishlistButtons() {
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        const productId = parseInt(btn.dataset.id);
        const isInWishlist = wishlist.includes(productId);
        
        btn.classList.toggle('active', isInWishlist);
        const icon = btn.querySelector('i');
        icon.className = isInWishlist ? 'fas fa-heart' : 'far fa-heart';
    });
}

function addToCart(product) {
    // Use the existing addToCart function from script.js
    if (typeof window.addToCart === 'function') {
        const productCard = document.querySelector(`[data-id="${product.id}"]`);
        window.addToCart(productCard);
    } else {
        // Fallback implementation
        let cart = JSON.parse(localStorage.getItem('medicalShopCart')) || [];
        
        const existingProduct = cart.find(item => item.name === product.name);
        
        if (existingProduct) {
            existingProduct.quantity += 1;
            showNotification(`${product.name} की मात्रा बढ़ाई गई`, 'success');
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                brand: product.brand,
                price: product.currentPrice,
                image: product.image,
                quantity: 1
            });
            showNotification(`${product.name} कार्ट में जोड़ा गया`, 'success');
        }
        
        localStorage.setItem('medicalShopCart', JSON.stringify(cart));
        
        // Update cart display if function exists
        if (typeof window.updateCartDisplay === 'function') {
            window.updateCartDisplay();
        }
    }
}

function buyNow(product) {
    addToCart(product);
    showNotification('चेकआउट पेज पर भेजा जा रहा है...', 'info');
    setTimeout(() => {
        window.location.href = '#checkout';
    }, 1000);
}

function handlePagination() {
    const page = parseInt(this.textContent);
    if (page && page !== currentPage) {
        currentPage = page;
        renderProducts();
        
        // Update active pagination button
        document.querySelectorAll('.pagination-number').forEach(btn => {
            btn.classList.remove('active');
        });
        this.classList.add('active');
        
        // Scroll to top of products
        document.querySelector('.medicines-content').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

function updatePagination() {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const paginationNumbers = document.querySelector('.pagination-numbers');
    
    if (!paginationNumbers) return;
    
    let paginationHTML = '';
    
    for (let i = 1; i <= Math.min(totalPages, 5); i++) {
        paginationHTML += `<button class="pagination-number ${i === currentPage ? 'active' : ''}">${i}</button>`;
    }
    
    if (totalPages > 5) {
        paginationHTML += '<span class="pagination-dots">...</span>';
        paginationHTML += `<button class="pagination-number">${totalPages}</button>`;
    }
    
    paginationNumbers.innerHTML = paginationHTML;
    
    // Re-attach event listeners
    document.querySelectorAll('.pagination-number').forEach(btn => {
        btn.addEventListener('click', handlePagination);
    });
    
    // Update prev/next buttons
    const prevBtn = document.querySelector('.pagination-btn:first-child');
    const nextBtn = document.querySelector('.pagination-btn:last-child');
    
    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages;
    }
}

function updateProductsCount() {
    if (productsCount) {
        productsCount.textContent = `${filteredProducts.length} दवाएँ मिलीं`;
    }
}

function showEmptyState() {
    productsGrid.innerHTML = `
        <div class="empty-state">
            <i class="fas fa-search"></i>
            <h3>कोई दवा नहीं मिली</h3>
            <p>कृपया अपने फ़िल्टर बदलें या दूसरी खोज करें</p>
            <button onclick="clearAllFilters()">सभी फ़िल्टर साफ़ करें</button>
        </div>
    `;
}

// Utility function for debouncing
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

// Notification function (reuse from main script if available)
function showNotification(message, type = 'info') {
    if (typeof window.showNotification === 'function') {
        window.showNotification(message, type);
    } else {
        // Fallback alert
        alert(message);
    }
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        handleSort,
        handleFilters,
        toggleWishlist,
        addToCart,
        showQuickView
    };
}