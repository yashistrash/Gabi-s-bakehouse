document.addEventListener('DOMContentLoaded', function() {

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
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    document.querySelectorAll('.product-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.animationDelay = `${index * 0.15}s`;
        observer.observe(card);
    });

    document.querySelectorAll('.stat-number').forEach(stat => {
        observer.observe(stat);
    });

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

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

            alert(`Thank you for your interest in ${productName}! Please contact us to place your order.`);

            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
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

    const floatingElements = document.querySelectorAll('.floating-item');

    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 50;
            const y = (mouseY - 0.5) * speed * 50;

            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    window.addEventListener('load', function() {
        document.body.classList.add('loaded');

        setTimeout(() => {
            document.querySelectorAll('.hero-title, .hero-tagline, .hero-description, .hero-buttons').forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }, 300);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href').length > 1) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 60;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    let scrollTimeout;
    window.addEventListener('scroll', function() {
        document.body.style.pointerEvents = 'none';

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            document.body.style.pointerEvents = 'auto';
        }, 100);
    });

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

// Sparkle Cursor Effect
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.98) { // Only occasionally create sparkles
        createSparkle(e.clientX, e.clientY);
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle-cursor';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';

    const colors = ['#8B5CF6', '#EC4899', '#F9A8D4'];
    sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
    sparkle.textContent = '✨';

    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
}

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

// Enhanced Stats Counter with Bounce
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounterWithBounce(entry.target, target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statObserver.observe(stat);
});

function animateCounterWithBounce(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.dataset.suffix || '');
            clearInterval(timer);
            // Bounce effect
            element.style.transform = 'scale(1.2)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
}

// Section Reveal Animations
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    section.classList.add('reveal-section');
    revealObserver.observe(section);
});

// Add today's special banner
function addTodaysSpecial() {
    const specials = [
        "🎂 Today's Special: 20% off Red Velvet Cakes!",
        "🍪 Fresh Batch Alert: Chocolate Chip Cookies just out!",
        "🧁 Limited Edition: Rose Pink Cupcakes available!",
        "🥐 Morning Delight: Buy 2 Get 1 Free on Croissants!",
        "🍰 Sweet Deal: Family Pack Brownies at Special Price!"
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