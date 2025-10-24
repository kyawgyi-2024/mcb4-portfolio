// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Show success message
    showNotification(`Thank you, ${name}! Your message has been sent. We'll get back to you soon.`, 'success');
    
    // Reset the form
    contactForm.reset();
});

// Notification function
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#48bb78' : '#e53e3e'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrollY = window.scrollY;
    
    if(scrollY > 100) {
        header.style.background = 'linear-gradient(135deg, rgba(26, 54, 93, 0.95), rgba(45, 55, 72, 0.95))';
        header.style.backdropFilter = 'blur(10px)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'linear-gradient(135deg, var(--primary), var(--secondary))';
        header.style.backdropFilter = 'none';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Add animation to elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeIn 0.8s ease forwards`;
            if (entry.target.classList.contains('team-member') || entry.target.classList.contains('service-card')) {
                entry.target.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    entry.target.style.transform = 'translateY(0)';
                }, 50);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.team-member, .service-card, .about-text, .contact-info').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Enhanced hover effects for team members
document.querySelectorAll('.team-member').forEach(member => {
    const memberImg = member.querySelector('.member-img');
    const originalBg = memberImg.style.background;
    
    member.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px) scale(1.02)';
        this.style.zIndex = '10';
    });
    
    member.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.zIndex = '1';
    });
});

// Enhanced hover effects for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add floating animation to service icons
document.querySelectorAll('.service-icon').forEach(icon => {
    icon.style.animation = 'float 3s ease-in-out infinite';
});

// Form input focus effects
document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// Add social icons to team members dynamically
document.querySelectorAll('.team-member').forEach((member, index) => {
    const memberInfo = member.querySelector('.member-info');
    const socialDiv = document.createElement('div');
    socialDiv.className = 'member-social';
    socialDiv.innerHTML = `
        <a href="#" title="LinkedIn">Li</a>
        <a href="#" title="Facebook">Fb</a>
        <a href="#" title="Twitter">X</a>
    `;
    memberInfo.appendChild(socialDiv);
});

// Add service features dynamically
document.querySelectorAll('.service-card').forEach(card => {
    const serviceTitle = card.querySelector('h3').textContent;
    const featuresList = document.createElement('ul');
    featuresList.className = 'service-features';
    
    let features = [];
    switch(serviceTitle) {
        case 'Web Development':
            features = ['Responsive Design', 'Modern Frameworks', 'SEO Optimization', 'Performance Tuning'];
            break;
        case 'Mobile Apps':
            features = ['iOS & Android', 'Cross-Platform', 'Native Performance', 'App Store Deployment'];
            break;
        case 'UI/UX Design':
            features = ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'];
            break;
        case 'Consulting':
            features = ['Technical Audit', 'Strategy Planning', 'Implementation Guide', 'Performance Review'];
            break;
        case 'Data Analytics':
            features = ['Data Visualization', 'Business Insights', 'KPI Tracking', 'Predictive Analysis'];
            break;
        case 'Cloud Solutions':
            features = ['Cloud Migration', 'Infrastructure Setup', 'Security Implementation', 'Cost Optimization'];
            break;
    }
    
    features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
    
    card.appendChild(featuresList);
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    console.log('MCB4 Portfolio Website Loaded Successfully!');
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Add click effects to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255,255,255,0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple effect animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);