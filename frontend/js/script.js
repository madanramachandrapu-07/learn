// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Mobile menu functionality
    initializeMobileMenu();
    
    // Smooth scrolling for navigation links
    initializeSmoothScrolling();
    
    // Newsletter subscription
    initializeNewsletter();
    
    // Intersection observer for animations
    initializeScrollAnimations();
    
    // Header scroll behavior
    initializeHeaderScroll();
});

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            
            // Update button icon
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });
        
        // Close mobile menu when clicking on nav links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenu.contains(event.target) && 
                !mobileMenuBtn.contains(event.target) && 
                mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        });
    }
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = 80; // Approximate header height
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Newsletter subscription functionality
function subscribeNewsletter() {
    const emailInput = document.getElementById('emailInput');
    const email = emailInput.value.trim();
    
    if (!email) {
        showNotification('Please enter your email address', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate API call
    showNotification('Subscribing...', 'info');
    
    setTimeout(() => {
        showNotification('Thank you for subscribing! Welcome to Skill Swap.', 'success');
        emailInput.value = '';
    }, 1500);
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Simple notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '12px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '1000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease-in-out',
        minWidth: '250px',
        textAlign: 'center'
    });
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.backgroundColor = '#10b981';
            break;
        case 'error':
            notification.style.backgroundColor = '#ef4444';
            break;
        case 'info':
        default:
            notification.style.backgroundColor = '#3b82f6';
            break;
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Initialize scroll animations
function initializeScrollAnimations() {
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
    
    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.feature-card, .skill-card, .step-card, .teacher-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// Header scroll behavior
function initializeHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Button click handlers
document.addEventListener('click', function(event) {
    const target = event.target.closest('button');
    if (!target) return;
    
    const buttonText = target.textContent.trim();
    
    // Handle CTA button clicks
    if (buttonText.includes('Start Learning') || 
        buttonText.includes('Get Started') || 
        buttonText.includes('Join the Community')) {
        showNotification('Welcome to Skill Swap! Complete your regestration ','info');
    }
    
    // Handle demo video button
    if (buttonText.includes('Watch Demo')) {
        showNotification('Demo video will be available soon!', 'info');
    }
    
    // Handle sign in button
    if (buttonText.includes('Sign In')) {
        // showNotification('Sign in feature coming soon!', 'info');
    }
});

// Skill card interactions
document.addEventListener('DOMContentLoaded', function() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('click', function() {
            const skillTitle = this.querySelector('.skill-title').textContent;
            showNotification(`Explore ${skillTitle} courses - Feature coming soon!`, 'info');
        });
    });
    
    // Teacher card interactions
    const teacherCards = document.querySelectorAll('.teacher-card');
    
    teacherCards.forEach(card => {
        card.addEventListener('click', function() {
            const teacherName = this.querySelector('.teacher-name').textContent;
            showNotification(`View ${teacherName}'s profile - Feature coming soon!`, 'info');
        });
    });
});

// Add keyboard accessibility
document.addEventListener('keydown', function(event) {
    // Close mobile menu with Escape key
    if (event.key === 'Escape') {
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        }
    }
});

// Performance optimization: Debounced scroll handler
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

// Apply debouncing to scroll-heavy functions
const debouncedScrollHandler = debounce(() => {
    // Any additional scroll-based functionality can go here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Form handling for newsletter
document.addEventListener('keypress', function(event) {
    if (event.target.id === 'emailInput' && event.key === 'Enter') {
        event.preventDefault();
        subscribeNewsletter();
    }
});

// Add loading states for better UX
function addLoadingState(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i data-lucide="loader-2"></i> Loading...';
    button.disabled = true;
    lucide.createIcons();
    
    return () => {
        button.innerHTML = originalText;
        button.disabled = false;
        lucide.createIcons();
    };
}

document.addEventListener('DOMContentLoaded', function() {
    // ... other initializations and event listeners ...

    // --- Backend Integration for Signup and Login ---

    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');

    // Function to handle the signup form submission
    async function handleSignup(event) {
        event.preventDefault(); // Prevents the page from reloading

        // Get form data
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;
        const phoneNumber = document.getElementById('signupPhone').value;

        // Basic frontend validation for password match
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            // Send a POST request to our backend signup endpoint
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, phoneNumber }),
            });

            const data = await response.json();

            if (response.ok) {
                // Success: store the JWT and redirect
                localStorage.setItem('token', data.token);
                alert('Signup successful! Redirecting to profile setup...');
                window.location.href = 'profile-1.html'; // You'll need to create this file
            } else {
                // Failure: show the error message from the backend
                alert(data.msg || 'Signup failed.');
            }
        } catch (error) {
            console.error('Error during signup:', error);
            alert('An error occurred. Please try again.');
        }
    }

    // Function to handle the login form submission
    async function handleLogin(event) {
        event.preventDefault(); // Prevents the page from reloading

        // Get form data
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            // Send a POST request to our backend login endpoint
            const response = await fetch('http://localhost:5000/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Success: store the JWT and redirect
                localStorage.setItem('token', data.token);
                alert('Login successful! Redirecting to homepage...');
                window.location.href = 'homepage.html'; // You'll need to create this file
            } else {
                // Failure: show the error message from the backend
                alert(data.msg || 'Login failed.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again.');
        }
    }

    // Add event listeners to the forms
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

// Enhanced error handling
window.addEventListener('error', function(event) {
    console.error('JavaScript error:', event.error);
    // In a real application, you might want to send this to an error tracking service
});

// Console welcome message
console.log('%c🚀 Welcome to Skill Swap!', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%cThis is a demo version converted from React to vanilla HTML/CSS/JS', 'color: #64748b; font-size: 12px;');