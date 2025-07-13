// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    navLinks.forEach(link => {
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

    // Search functionality
    const searchForm = document.querySelector('.search-form');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const make = document.querySelector('.search-select:nth-child(1)').value;
            const model = document.querySelector('.search-select:nth-child(2)').value;
            const priceRange = document.querySelector('.search-select:nth-child(3)').value;
            
            // Simple search alert (in real app, this would filter results)
            if (make !== 'Select make' || model !== 'Select Model' || priceRange !== 'Price Range') {
                alert(`Searching for: ${make} ${model} in ${priceRange} range`);
            } else {
                alert('Please select search criteria');
            }
        });
    }

    // Type filter functionality
    const typeFilters = document.querySelectorAll('.type-filter');
    const bikeCards = document.querySelectorAll('.bike-card');
    
    typeFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            typeFilters.forEach(f => f.classList.remove('active'));
            // Add active class to clicked filter
            this.classList.add('active');
            
            const filterType = this.textContent.trim();
            
            // Simple filter animation (in real app, this would filter by category)
            bikeCards.forEach(card => {
                card.style.opacity = '0.5';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 300);
            });
            
            console.log(`Filtering by: ${filterType}`);
        });
    });

    // Add hover effects to bike cards
    const allBikeCards = document.querySelectorAll('.bike-card, .brand-item');
    allBikeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });

    // View Details button functionality
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
    viewDetailsButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            alert('View Details clicked! In a real app, this would show detailed bike information.');
        });
    });

    // Get Quote button functionality
    const getQuoteBtn = document.querySelector('.get-quote-btn');
    if (getQuoteBtn) {
        getQuoteBtn.addEventListener('click', function() {
            alert('Get Quote clicked! In a real app, this would open a quote form.');
        });
    }

    // View Collection button functionality
    const viewCollectionBtn = document.querySelector('.view-collection-btn');
    if (viewCollectionBtn) {
        viewCollectionBtn.addEventListener('click', function() {
            alert('View Collection clicked! In a real app, this would show the full collection.');
        });
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#fff';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add click effects to buttons
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Mobile menu toggle (for responsive design)
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.style.display = 'none';
    mobileMenuBtn.style.background = 'none';
    mobileMenuBtn.style.border = 'none';
    mobileMenuBtn.style.fontSize = '24px';
    mobileMenuBtn.style.cursor = 'pointer';
    
    const headerActions = document.querySelector('.header-actions');
    if (headerActions) {
        headerActions.insertBefore(mobileMenuBtn, headerActions.firstChild);
    }

    // Show mobile menu button on small screens
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            mobileMenuBtn.style.display = 'block';
        } else {
            mobileMenuBtn.style.display = 'none';
        }
    }

    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();

    console.log('Motodeal website loaded successfully!');
});
