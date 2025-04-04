// Animation on scroll
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements when they come into view
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.scrollY;
        const windowBottomPosition = windowTopPosition + windowHeight;
        
        animateElements.forEach(element => {
            const elementHeight = element.offsetHeight;
            const elementTopPosition = element.offsetTop;
            const elementBottomPosition = elementTopPosition + elementHeight;
            
            if (
                (elementBottomPosition >= windowTopPosition) && 
                (elementTopPosition <= windowBottomPosition)
            ) {
                element.classList.add('show');
            }
        });
    }
    
    // Check elements on load
    checkIfInView();
    
    // Check elements on scroll
    window.addEventListener('scroll', checkIfInView);
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
});

// Gallery scrolling
let scrollPosition = 0;
const galleryImages = document.querySelector('.gallery-images');

function scrollGallery(direction) {
    const galleryItem = document.querySelector('.gallery-item');
    if (!galleryItem) return;
    
    const itemWidth = galleryItem.offsetWidth + 16; // Width + margin
    const visibleItems = Math.floor(galleryImages.parentElement.offsetWidth / itemWidth);
    const maxScroll = galleryImages.scrollWidth - galleryImages.parentElement.offsetWidth;
    
    if (direction > 0) {
        // Scroll right
        scrollPosition = Math.min(scrollPosition + itemWidth * visibleItems, maxScroll);
    } else {
        // Scroll left
        scrollPosition = Math.max(scrollPosition - itemWidth * visibleItems, 0);
    }
    
    galleryImages.style.transform = `translateX(-${scrollPosition}px)`;
}

// Modal Functions
function openLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

function openPaymentModal(plan, price) {
    document.getElementById('paymentModal').style.display = 'block';
    document.getElementById('selected-plan-info').innerHTML = `
        <div class="selected-plan">
            <h3>${plan} Plan</h3>
            <p>Price: Rs. ${price}/month</p>
        </div>
    `;
}

function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none';
}

function openTrainerModal(name, specialty, experience, timing, price) {
    document.getElementById('trainerModal').style.display = 'block';
    document.getElementById('trainer-details').innerHTML = `
        <h3>${name}</h3>
        <p><strong>Specialty:</strong> ${specialty}</p>
        <p><strong>Experience:</strong> ${experience}</p>
        <p><strong>Timing:</strong><br> ${timing}</p>
        <p><strong>Session Price:</strong> ${price}</p>
        <button class="book-trainer" onclick="bookTrainer('${name}')">Book a Session</button>
    `;
}

function closeTrainerModal() {
    document.getElementById('trainerModal').style.display = 'none';
}

function bookTrainer(trainerName) {
    alert(`You've requested to book a session with ${trainerName}. Please login to confirm your booking.`);
    closeTrainerModal();
    openLoginModal();
}

// Form Handlers
function handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;
    
    // Here you would typically handle login with a backend
    console.log('Login attempt:', { email, password });
    
    // Show user account page after login
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('userAccountPage').style.display = 'block';
    
    // Update user info
    document.getElementById('user-name').textContent = email.split('@')[0];
    document.getElementById('user-email').textContent = email;
    
    return false;
}

function logout() {
    document.getElementById('userAccountPage').style.display = 'none';
}

function handlePayment(event) {
    event.preventDefault();
    const form = event.target;
    const cardNumber = form.querySelector('input[placeholder="Card Number"]').value;
    const expiry = form.querySelector('input[placeholder="MM/YY"]').value;
    const cvv = form.querySelector('input[placeholder="CVV"]').value;
    
    // Here you would typically handle payment with a payment processor
    console.log('Payment attempt:', { cardNumber, expiry, cvv });
    alert('Payment successful! Your membership has been activated.');
    closePaymentModal();
    
    return false;
}

function handleContactSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;
    
    // Here you would typically handle sending the message to a backend
    console.log('Contact form submission:', { name, email, message });
    alert(`Thank you ${name}! We will get back to you soon.`);
    form.reset();
    
    return false;
}

// Account page tab switching
function showAccountTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.account-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(`${tabName}-tab`).classList.add('active');
    
    // Update active state in navigation
    const navItems = document.querySelectorAll('.account-nav li');
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Find and activate the clicked nav item
    const clickedItem = Array.from(navItems).find(item => 
        item.textContent.toLowerCase().includes(tabName)
    );
    
    if (clickedItem) {
        clickedItem.classList.add('active');
    }
}

// Close modals when clicking outside
window.onclick = function(event) {
    const loginModal = document.getElementById('loginModal');
    const paymentModal = document.getElementById('paymentModal');
    const trainerModal = document.getElementById('trainerModal');
    
    if (event.target === loginModal) {
        loginModal.style.display = 'none';
    }
    if (event.target === paymentModal) {
        paymentModal.style.display = 'none';
    }
    if (event.target === trainerModal) {
        trainerModal.style.display = 'none';
    }
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
});