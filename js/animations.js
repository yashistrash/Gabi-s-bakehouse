document.addEventListener('DOMContentLoaded', function() {

    const heroTimeline = anime.timeline({
        easing: 'easeOutExpo',
        duration: 1000
    });

    heroTimeline
        .add({
            targets: '.hero-title .title-line-1',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            delay: 300
        })
        .add({
            targets: '.hero-title .title-line-2',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800
        }, '-=400')
        .add({
            targets: '.hero-tagline',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 600
        }, '-=300')
        .add({
            targets: '.hero-description',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 600
        }, '-=300')
        .add({
            targets: '.hero-buttons .btn',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 600,
            delay: anime.stagger(100)
        }, '-=300')
        .add({
            targets: '.scroll-indicator',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 600
        }, '-=200');

    anime({
        targets: '.navbar',
        translateY: [-60, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutQuad',
        delay: 500
    });

    anime({
        targets: '.floating-item',
        translateY: function() {
            return anime.random(-20, 20);
        },
        translateX: function() {
            return anime.random(-20, 20);
        },
        rotate: function() {
            return anime.random(-15, 15);
        },
        duration: function() {
            return anime.random(3000, 5000);
        },
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutQuad',
        delay: function(el, i) {
            return i * 200;
        }
    });

    const scrollElements = document.querySelectorAll('.product-card, .feature-card, .about-text, .about-image');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');

                if (entry.target.classList.contains('product-card')) {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateY: [50, 0],
                        scale: [0.9, 1],
                        duration: 800,
                        easing: 'easeOutQuad',
                        delay: entry.target.dataset.delay || 0
                    });
                } else if (entry.target.classList.contains('feature-card')) {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateY: [30, 0],
                        rotateX: [30, 0],
                        duration: 600,
                        easing: 'easeOutQuad',
                        delay: entry.target.dataset.delay || 0
                    });
                } else if (entry.target.classList.contains('about-text')) {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateX: [-50, 0],
                        duration: 1000,
                        easing: 'easeOutQuad'
                    });
                } else if (entry.target.classList.contains('about-image')) {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateX: [50, 0],
                        duration: 1000,
                        easing: 'easeOutQuad'
                    });
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    scrollElements.forEach((el, index) => {
        if (el.classList.contains('product-card') || el.classList.contains('feature-card')) {
            el.dataset.delay = index * 100;
        }
        scrollObserver.observe(el);
    });

    const statNumbers = document.querySelectorAll('.stat-number');
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');

                const target = parseInt(entry.target.getAttribute('data-target'));

                anime({
                    targets: entry.target,
                    textContent: [0, target],
                    round: 1,
                    duration: 2000,
                    easing: 'easeInOutExpo'
                });

                anime({
                    targets: entry.target,
                    scale: [0.5, 1],
                    opacity: [0, 1],
                    duration: 600,
                    easing: 'easeOutBack'
                });
            }
        });
    }, {
        threshold: 0.5
    });

    statNumbers.forEach(stat => {
        statObserver.observe(stat);
    });

    const sectionHeaders = document.querySelectorAll('.section-header');
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');

                anime({
                    targets: entry.target.querySelector('.section-label'),
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 600,
                    easing: 'easeOutQuad'
                });

                anime({
                    targets: entry.target.querySelector('.section-title'),
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 800,
                    delay: 200,
                    easing: 'easeOutQuad'
                });

                const underline = document.createElement('div');
                underline.style.position = 'absolute';
                underline.style.bottom = '-10px';
                underline.style.left = '50%';
                underline.style.transform = 'translateX(-50%)';
                underline.style.height = '3px';
                underline.style.background = 'var(--accent-rose)';
                underline.style.width = '0';
                entry.target.style.position = 'relative';
                entry.target.appendChild(underline);

                anime({
                    targets: underline,
                    width: ['0', '60px'],
                    duration: 1000,
                    delay: 500,
                    easing: 'easeOutQuad'
                });
            }
        });
    }, {
        threshold: 0.5
    });

    sectionHeaders.forEach(header => {
        headerObserver.observe(header);
    });

    document.querySelectorAll('.btn-order').forEach(button => {
        button.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });

        button.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });

        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect-span');
            this.appendChild(ripple);

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            anime({
                targets: ripple,
                scale: [0, 4],
                opacity: [1, 0],
                duration: 600,
                easing: 'easeOutQuad',
                complete: function() {
                    ripple.remove();
                }
            });

            anime({
                targets: this,
                scale: [1, 0.95, 1],
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });

    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this.querySelector('.product-image img'),
                scale: 1.1,
                duration: 500,
                easing: 'easeOutQuad'
            });

            anime({
                targets: this.querySelector('.product-overlay'),
                opacity: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });

        card.addEventListener('mouseleave', function() {
            anime({
                targets: this.querySelector('.product-image img'),
                scale: 1,
                duration: 500,
                easing: 'easeOutQuad'
            });

            anime({
                targets: this.querySelector('.product-overlay'),
                opacity: 0,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });

    document.querySelectorAll('.social-link').forEach((link, index) => {
        link.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                translateY: -5,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });

        link.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                translateY: 0,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });

    const testimonialSlider = anime({
        targets: '.testimonial-card',
        translateX: [100, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutQuad',
        autoplay: false
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"]');

            anime({
                targets: submitBtn,
                scale: [1, 0.95, 1.05, 1],
                duration: 600,
                easing: 'easeOutElastic(1, .5)'
            });

            const successAnimation = anime({
                targets: this,
                translateY: [0, -10, 0],
                duration: 500,
                easing: 'easeOutQuad'
            });
        });

        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                anime({
                    targets: this,
                    borderColor: 'var(--accent-rose)',
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });

            input.addEventListener('blur', function() {
                anime({
                    targets: this,
                    borderColor: 'var(--secondary-cream)',
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
        });
    }

    const logoAnimation = anime({
        targets: '.logo',
        rotate: [0, 360],
        duration: 20000,
        loop: true,
        autoplay: false,
        easing: 'linear'
    });

    document.querySelector('.logo').addEventListener('mouseenter', function() {
        anime({
            targets: this,
            scale: 1.1,
            duration: 300,
            easing: 'easeOutQuad'
        });
    });

    document.querySelector('.logo').addEventListener('mouseleave', function() {
        anime({
            targets: this,
            scale: 1,
            duration: 300,
            easing: 'easeOutQuad'
        });
    });

    let particles = [];
    const particleCount = 30;

    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'var(--accent-rose)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        document.body.appendChild(particle);

        anime({
            targets: particle,
            translateX: anime.random(-100, 100),
            translateY: anime.random(-100, 100),
            scale: [1, 0],
            opacity: [1, 0],
            duration: anime.random(1000, 2000),
            easing: 'easeOutQuad',
            complete: function() {
                particle.remove();
            }
        });
    }

    document.addEventListener('DOMContentLoaded', function() {
        const loadingAnimation = anime({
            targets: 'body',
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutQuad'
        });
    });

    const style = document.createElement('style');
    style.textContent = `
        .ripple-effect-span {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            pointer-events: none;
        }

        .animated {
            opacity: 1 !important;
        }

        .counted {
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);

    console.log('✨ Anime.js animations initialized successfully!');
});

window.addEventListener('load', function() {
    anime({
        targets: '.loading-spinner',
        opacity: [1, 0],
        scale: [1, 0],
        duration: 500,
        easing: 'easeOutQuad',
        complete: function() {
            const spinner = document.querySelector('.loading-spinner');
            if (spinner) spinner.remove();
        }
    });
});