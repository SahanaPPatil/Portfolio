// =====================================================
// CONSOLE WELCOME MESSAGE
// =====================================================
console.log('%c👋 Welcome to Sahana\'s Portfolio!', 'color: #00d9ff; font-size: 20px; font-weight: bold;');
console.log('%cInterested in working together? Let\'s connect!', 'color: #a855f7; font-size: 14px;');
console.log('%cEmail: patilsahana6824@gmail.com', 'color: #a0aec0; font-size: 12px;');

// =====================================================
// NAVIGATION FUNCTIONALITY
// =====================================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navItems = document.querySelectorAll('.nav-links a');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Active nav link based on scroll position
const sections = document.querySelectorAll('section');
const navLinksArray = document.querySelectorAll('.nav-links a');

function updateActiveNavLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// =====================================================
// SMOOTH SCROLLING
// =====================================================
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('href');
        gsap.to(window, {
            duration: 1,
            scrollTo: targetId,
            ease: "power2.inOut"
        });
    });
});

// Scroll down arrow
document.getElementById('scrollDown').addEventListener('click', () => {
    gsap.to(window, {
        duration: 1,
        scrollTo: "#about",
        ease: "power2.inOut"
    });
});

// =====================================================
// BACK TO TOP BUTTON
// =====================================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    gsap.to(window, {
        duration: 1,
        scrollTo: 0,
        ease: "power2.inOut"
    });
});

// =====================================================
// GSAP ANIMATIONS
// =====================================================
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Hero section animations
gsap.from('.hero-content h1', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power3.out",
    delay: 0.3
});

gsap.from('.hero-content .tagline', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power3.out",
    delay: 0.5
});

gsap.from('.hero-content .description', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power3.out",
    delay: 0.7
});

gsap.from('.cta-buttons', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power3.out",
    delay: 0.9
});

// Section title animations
gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none"
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        ease: "power3.out"
    });
});

// About section animations
gsap.from('.profile-img', {
    scrollTrigger: {
        trigger: '.about-content',
        start: "top 80%",
        toggleActions: "play none none none"
    },
    duration: 1,
    scale: 0.8,
    opacity: 0,
    ease: "back.out(1.7)"
});

gsap.from('.about-text', {
    scrollTrigger: {
        trigger: '.about-content',
        start: "top 80%",
        toggleActions: "play none none none"
    },
    duration: 1,
    x: 50,
    opacity: 0,
    ease: "power3.out",
    delay: 0.3
});

gsap.from('.education-item', {
    scrollTrigger: {
        trigger: '.about-text',
        start: "top 60%",
        toggleActions: "play none none none"
    },
    duration: 0.8,
    y: 30,
    opacity: 0,
    stagger: 0.2,
    ease: "power3.out"
});

// Skills section animations
gsap.from('.skill-category', {
    scrollTrigger: {
        trigger: '.skills-container',
        start: "top 80%",
        toggleActions: "play none none none"
    },
    duration: 0.8,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: "power3.out"
});

// Animate skill bars when they come into view
ScrollTrigger.create({
    trigger: '.skills-container',
    start: "top 80%",
    onEnter: () => {
        document.querySelectorAll('.skill-progress').forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            gsap.to(bar, {
                width: progress + '%',
                duration: 1.5,
                ease: "power2.out"
            });
        });
    }
});

// Projects section animations
gsap.from('.project-card', {
    scrollTrigger: {
        trigger: '.projects-grid',
        start: "top 80%",
        toggleActions: "play none none none"
    },
    duration: 0.8,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: "power3.out"
});

// Contact section animations
gsap.from('.contact-info', {
    scrollTrigger: {
        trigger: '.contact-container',
        start: "top 80%",
        toggleActions: "play none none none"
    },
    duration: 1,
    x: -50,
    opacity: 0,
    ease: "power3.out"
});

gsap.from('.contact-form', {
    scrollTrigger: {
        trigger: '.contact-container',
        start: "top 80%",
        toggleActions: "play none none none"
    },
    duration: 1,
    x: 50,
    opacity: 0,
    ease: "power3.out",
    delay: 0.2
});

// =====================================================
// FORM VALIDATION & SUBMISSION
// =====================================================
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const errorAlert = document.getElementById('errorAlert');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Form field validation
function validateField(field) {
    const value = field.value.trim();
    const errorElement = document.getElementById(field.id + 'Error');
    
    if (value === '') {
        errorElement.style.display = 'block';
        field.style.borderColor = '#ff4444';
        return false;
    }
    
    if (field.type === 'email' && !emailRegex.test(value)) {
        errorElement.textContent = 'Please enter a valid email address';
        errorElement.style.display = 'block';
        field.style.borderColor = '#ff4444';
        return false;
    }
    
    errorElement.style.display = 'none';
    field.style.borderColor = 'transparent';
    return true;
}

// Real-time validation
const formFields = ['name', 'email', 'subject', 'message'];
formFields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
        if (field.value.trim() !== '') {
            const errorElement = document.getElementById(field.id + 'Error');
            errorElement.style.display = 'none';
            field.style.borderColor = 'transparent';
        }
    });
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all fields
    let isValid = true;
    formFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        return;
    }
    
    // Simulate form submission (since no backend)
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        successMessage.style.display = 'block';
        errorAlert.style.display = 'none';
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
        
        // Scroll to success message
        gsap.to(window, {
            duration: 0.5,
            scrollTo: { y: successMessage, offsetY: 100 },
            ease: "power2.inOut"
        });
    }, 1500);
});

// =====================================================
// INTERSECTION OBSERVER FOR ADDITIONAL ANIMATIONS
// =====================================================
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

// Observe elements for fade-in effect
document.querySelectorAll('.info-item, .social-links a').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});