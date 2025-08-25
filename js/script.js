
let mobileMenuOpen = false;

function toggleMobileMenu() {
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const mobileMenu = document.querySelector('.mobile-menu');

    mobileMenuOpen = !mobileMenuOpen;

    if (mobileMenuOpen) {
        mobileNav.classList.add('active');
        mobileOverlay.classList.add('active');
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        mobileNav.classList.remove('active');
        mobileOverlay.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Theme Toggle Functionality
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}




// Load saved theme
document.addEventListener('DOMContentLoaded', function () {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update active navigation link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Navbar scroll effect and progress bar
    const navbar = document.querySelector('.navbar');
    const progressBar = document.querySelector('.scroll-progress');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (scrolled / maxScroll) * 100;

        progressBar.style.width = scrollProgress + '%';

        if (scrolled > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active navigation based on scroll position
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');

        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (scrolled >= sectionTop && scrolled < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for multiple elements
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .rotate-in').forEach(el => {
        observer.observe(el);
    });

    // Enhanced profile image interactions
    const profileImage = document.querySelector('.profile-image');
    const icons = ['fas fa-code', 'fas fa-mobile-alt', 'fas fa-database', 'fas fa-robot', 'fas fa-chart-line', 'fas fa-cogs'];
    let currentIcon = 0;

    profileImage.addEventListener('click', function () {
        currentIcon = (currentIcon + 1) % icons.length;
        const iconElement = this.querySelector('i');
        iconElement.className = icons[currentIcon];

        // Add animation effect
        this.style.transform = 'scale(0.9) rotate(180deg)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
    });

    // Typing effect for hero subtitle
    function typeWriter(element, text, speed = 50) {
        element.innerHTML = '';
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }

    // Initialize typing effect after splash screen
    setTimeout(() => {
        const heroP = document.querySelector('.hero p');
        if (heroP) {
            const text = heroP.textContent;
            typeWriter(heroP, text, 30);
        }
    }, 4500);

    // Enhanced card interactions with 3D effects
    document.querySelectorAll('.skill-card, .project-card, .contact-card').forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const rotateX = (y / rect.height) * 10;
            const rotateY = (x / rect.width) * 10;

            card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = '';
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const speed = 0.5;
            hero.style.transform = `translateY(${scrolled * speed}px)`;
        }
    });

    // Dynamic gradient animation for hero
    const hero = document.querySelector('.hero');
    let gradientAngle = 135;
    setInterval(() => {
        gradientAngle += 1;
        if (hero) {
            hero.style.background = `linear-gradient(${gradientAngle}deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)`;
        }
    }, 100);

    // Console welcome message
    console.log(`
                🚀 Welcome to Khalid Abdelrazk's Portfolio!
                ✨ Built with modern web technologies
                📊 Data Analyst & Business Intelligence Specialist
                🤖 Telecommunications Engineering Student
                👨‍💼 Team Leader & Project Manager
                
                Contact: khalidabdelrazk4@gmail.com
            `);

    // Performance monitoring
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`⚡ Portfolio loaded in ${loadTime.toFixed(2)}ms`);
    });
});
