document.addEventListener('DOMContentLoaded', function() {
    // Immediate mobile-first approach: Make all product cards visible on mobile
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        // Force immediate visibility on mobile devices
        document.querySelectorAll('.product-card').forEach(card => {
            card.classList.add('visible');
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.animation = 'none';
        });
    } else {
        // Desktop fallback: Make all product cards visible after short delay
        setTimeout(() => {
            document.querySelectorAll('.product-card').forEach(card => {
                card.classList.add('visible');
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            });
        }, 100);
    }
    // Scroll-triggered rotation for corner model-viewer
    const cornerModel = document.getElementById('cornerModel');
    if (cornerModel) {
        let lastScrollY = window.scrollY;
        let currentDeg = 0;
        const sensitivity = 0.2; // degrees per pixel scrolled

        window.addEventListener('scroll', () => {
            const dy = window.scrollY - lastScrollY;
            lastScrollY = window.scrollY;
            currentDeg = (currentDeg + dy * sensitivity) % 360;
            cornerModel.setAttribute('camera-orbit', `${currentDeg}deg 60deg 120%`);
        }, { passive: true });
    }

    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contactForm');

    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }

        if (scrollTop > lastScrollTop && scrollTop > 300) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        // Update active nav link based on scroll position
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const link = document.querySelector(`a[href="#${section.id}"]`);

            if (rect.top <= 100 && rect.bottom >= 100 && link) {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');

        const spans = mobileToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 60;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                navMenu.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Add magnetic effect to nav links
        link.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            this.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    let observer = null;
    if ('IntersectionObserver' in window) {
        observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
    }

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        if (observer) {
            observer.observe(el);
        } else {
            el.classList.add('visible');
        }
    });

    document.querySelectorAll('.product-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;

        // Only use intersection observer on desktop
        if (!isMobile && observer) {
            observer.observe(card);
        } else {
            card.classList.add('visible');
        }
    });

    // Handle window resize and orientation changes
    window.addEventListener('resize', function() {
        const currentlyMobile = window.innerWidth <= 768;
        if (currentlyMobile) {
            document.querySelectorAll('.product-card').forEach(card => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.style.animation = 'none';
                card.classList.add('visible');
            });
        }
    });

    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.animationDelay = `${index * 0.15}s`;
        if (observer) {
            observer.observe(card);
        } else {
            card.classList.add('visible');
        }
    });

    // Remove duplicate stat-number observer and counter (anime.js handles this)

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    const orderButtons = document.querySelectorAll('.btn-order');
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            const card = this.closest('.product-card');
            const productName = card.querySelector('.product-name').textContent;

            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

            setTimeout(() => ripple.remove(), 600);

            const whatsappNumber = '919036024688';
            const message = `I want to place an order for ${productName}.`;
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

            const newWindow = window.open(whatsappUrl, '_blank');
            if (!newWindow) {
                window.location.href = whatsappUrl;
            }
        });
    });

    const productImages = document.querySelectorAll('.product-image');
    productImages.forEach(image => {
        image.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            const img = this.querySelector('img');
            img.style.transformOrigin = `${x}% ${y}%`;
        });

        image.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            img.style.transformOrigin = 'center center';
        });
    });

    // Removed floating-item mousemove transform to prevent conflicts with CSS keyframes

    window.addEventListener('load', function() {
        document.body.classList.add('loaded');

        setTimeout(() => {
            document.querySelectorAll('.hero-title, .hero-tagline, .hero-description, .hero-buttons').forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 200);
            });

            // Initialize Artisan Elegance System
            initializeEleganceSystem();
        }, 300);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.classList.contains('nav-link')) return; // handled separately
            if (this.getAttribute('href').length > 1) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 60;
                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
            }
        });
    });

    // Removed pointer-events disabling during scroll to avoid blocking interactions

    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    }

    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        }

        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        .btn-order {
            position: relative;
            overflow: hidden;
        }

        body.loaded {
            overflow-x: hidden;
        }

        .visible {
            animation: fadeInUp 0.6s ease forwards;
        }
    `;
    document.head.appendChild(style);
});

// ============================================
// ARTISAN ELEGANCE SYSTEM
// ============================================

function initializeEleganceSystem() {
    // Staggered reveal of elegance elements
    const geometricShapes = document.querySelectorAll('.geometric-shape');
    const bakeryIcons = document.querySelectorAll('.bakery-icon');
    const typographyAccents = document.querySelectorAll('.typography-accent');
    const dotPatterns = document.querySelectorAll('.dot-pattern');

    // Reveal geometric shapes
    geometricShapes.forEach((shape, index) => {
        setTimeout(() => {
            shape.style.opacity = '1';
        }, index * 800 + 500);
    });

    // Reveal bakery icons
    bakeryIcons.forEach((icon, index) => {
        setTimeout(() => {
            icon.style.opacity = '1';
        }, index * 1200 + 1500);
    });

    // Reveal typography accents
    typographyAccents.forEach((text, index) => {
        setTimeout(() => {
            text.style.opacity = '1';
        }, index * 2000 + 2000);
    });

    // Reveal dot patterns
    dotPatterns.forEach((dot, index) => {
        setTimeout(() => {
            dot.style.opacity = '1';
        }, index * 400 + 3000);
    });
}

// Gentle parallax effect on mouse movement
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) - 0.5;
    mouseY = (e.clientY / window.innerHeight) - 0.5;
});

function updateParallax() {
    targetX += (mouseX - targetX) * 0.02;
    targetY += (mouseY - targetY) * 0.02;

    const geometricShapes = document.querySelectorAll('.geometric-shape');
    const bakeryIcons = document.querySelectorAll('.bakery-icon');
    const typographyAccents = document.querySelectorAll('.typography-accent');

    // Apply different parallax intensities to layers
    geometricShapes.forEach((shape, index) => {
        const intensity = (index + 1) * 0.3;
        const x = targetX * intensity * 20;
        const y = targetY * intensity * 20;
        shape.style.transform = `translate(${x}px, ${y}px) scale(${1 + Math.abs(targetX) * 0.02})`;
    });

    bakeryIcons.forEach((icon, index) => {
        const intensity = (index + 1) * 0.15;
        const x = targetX * intensity * 15;
        const y = targetY * intensity * 15;
        icon.style.transform = `translate(${x}px, ${y}px) rotate(${targetX * 2}deg)`;
    });

    typographyAccents.forEach((text, index) => {
        const intensity = (index + 1) * 0.1;
        const x = targetX * intensity * 10;
        const y = targetY * intensity * 10;
        text.style.transform = `translate(${x}px, ${y}px) rotate(${text.style.getPropertyValue('--text-rotation') || '0deg'}) scale(${1 + Math.abs(targetY) * 0.01})`;
    });

    requestAnimationFrame(updateParallax);
}

// Start parallax animation
requestAnimationFrame(updateParallax);

// Enhanced hover interactions for hero decorations
const heroDecorations = document.querySelector('.hero-side-decorations');
if (heroDecorations) {
    heroDecorations.addEventListener('mouseenter', () => {
        heroDecorations.style.filter = 'brightness(1.1)';
    });

    heroDecorations.addEventListener('mouseleave', () => {
        heroDecorations.style.filter = 'brightness(1)';
    });
}

console.log("🍰 Welcome to Gabi's Bakehouse - Where every bite tells a story!");

// ============================================
// PURPLE/PINK THEME INTERACTIVE ENHANCEMENTS
// ============================================

// Scroll Progress Indicator
function updateScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
}

window.addEventListener('scroll', updateScrollProgress);
window.addEventListener('load', updateScrollProgress);

// Rotating Taglines
const taglines = [
    "Artisan Delights, Baked with Love",
    "Where Every Crumb Counts",
    "Sprinkled with Love, Served with Pride",
    "Rise & Shine with Our Divine Bakes",
    "Kneaded with Care, Baked to Perfection",
    "Sweet Dreams are Made of Cheese...cake",
    "Life is What You Bake It",
    "Happiness is Homemade",
    "Flour Power Since Day One",
    "Baked Fresh Daily, Loved Forever"
];

let taglineIndex = 0;
const rotatingTagline = document.getElementById('rotatingTagline');

function rotateTagline() {
    if (rotatingTagline) {
        rotatingTagline.style.opacity = '0';
        setTimeout(() => {
            taglineIndex = (taglineIndex + 1) % taglines.length;
            rotatingTagline.textContent = taglines[taglineIndex];
            rotatingTagline.style.opacity = '1';
        }, 300);
    }
}

setInterval(rotateTagline, 3000);

// Floating Bakery Elements
const bakeryEmojis = ['🥐', '🍰', '🧁', '🍪', '🥖', '🍩', '🥧', '🎂', '🍮', '🍞'];
const floatingContainer = document.getElementById('floatingContainer');

function createFloatingElement() {
    const element = document.createElement('div');
    element.className = 'floating-bakery-item';
    element.textContent = bakeryEmojis[Math.floor(Math.random() * bakeryEmojis.length)];
    element.style.left = Math.random() * 100 + '%';
    element.style.animationDelay = Math.random() * 5 + 's';
    element.style.animationDuration = (15 + Math.random() * 10) + 's';
    floatingContainer.appendChild(element);

    setTimeout(() => element.remove(), 25000);
}

setInterval(createFloatingElement, 3000);


// Particle Effect on Button Click
document.querySelectorAll('.btn-order, .btn-primary').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        for (let i = 0; i < 10; i++) {
            createParticle(rect.left + x, rect.top + y);
        }
    });
});

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';

    const angle = Math.random() * Math.PI * 2;
    const velocity = 50 + Math.random() * 100;
    particle.style.setProperty('--x', Math.cos(angle) * velocity + 'px');
    particle.style.setProperty('--y', Math.sin(angle) * velocity + 'px');

    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 3000);
}

// Magnetic Button Effect
document.querySelectorAll('.btn-order').forEach(button => {
    button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
    });
});

// Stats counters handled by anime.js in animations.js

// Section Reveal Animations
let revealObserver = null;
if ('IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
}

document.querySelectorAll('section').forEach(section => {
    section.classList.add('reveal-section');
    if (revealObserver) {
        revealObserver.observe(section);
    } else {
        section.classList.add('active');
    }
});

// Add today's special banner
function addTodaysSpecial() {
    const specials = [
        "🎂 Freshly Baked with love!",
        "🍪 Fresh from the oven, straight to your heart!",
        "🧁 Crafting joy, one bake at a time.",
        "🥐 Pure ingredients, perfect taste!",
        "🍰 Turn cravings into celebrations."
    ];

    const banner = document.createElement('div');
    banner.className = 'todays-special-banner';
    banner.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: -100%;
        background: linear-gradient(135deg, #8B5CF6, #EC4899);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3);
        z-index: 1000;
        transition: right 0.5s ease;
        font-weight: 600;
    `;

    banner.textContent = specials[Math.floor(Math.random() * specials.length)];
    document.body.appendChild(banner);

    setTimeout(() => {
        banner.style.right = '20px';
        setTimeout(() => {
            banner.style.right = '-100%';
            setTimeout(() => banner.remove(), 500);
        }, 5000);
    }, 1000);
}

// Show today's special periodically
setTimeout(addTodaysSpecial, 5000);
setInterval(addTodaysSpecial, 30000);

// Add freshness indicators to products
document.querySelectorAll('.product-card').forEach((card, index) => {
    if (Math.random() > 0.7) {
        const freshBadge = document.createElement('div');
        freshBadge.className = 'fresh-badge';
        freshBadge.innerHTML = '🔥 Fresh!';
        freshBadge.style.cssText = `
            position: absolute;
            top: 10px;
            left: 10px;
            background: linear-gradient(135deg, #EC4899, #F9A8D4);
            color: white;
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            animation: pulse 2s infinite;
            z-index: 10;
        `;
        card.style.position = 'relative';
        card.appendChild(freshBadge);
    }
});

console.log("✨ Purple/Pink theme enhancements loaded!");