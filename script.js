/* ============================================
   PREMIUM PORTFOLIO - INTERACTIVE JAVASCRIPT
   ============================================ */

// ============================================
// DOM ELEMENTS
// ============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const cursorGlow = document.getElementById('cursorGlow');
const typingText = document.getElementById('typingText');
const projectsGrid = document.getElementById('projectsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const contactForm = document.getElementById('contactForm');

// ============================================
// PROJECTS DATA (From GitHub)
// ============================================
const projects = [
    {
        id: 1,
        title: "AUTODEV",
        description: "A production-grade developer productivity platform that eliminates onboarding friction and environment inconsistency in modern engineering teams.",
        category: "fullstack",
        tech: ["TypeScript", "React", "Node.js", "Docker"],
        github: "https://github.com/abhi3114-glitch/AUTODEV",
        demo: null,
        emoji: "🚀"
    },
    {
        id: 2,
        title: "GuardianGrid",
        description: "AI Mesh Network Communication for Internet-Less Emergencies. Revolutionary peer-to-peer emergency communication system.",
        category: "ai",
        tech: ["TypeScript", "Next.js", "WebRTC", "AI"],
        github: "https://github.com/abhi3114-glitch/GuardianGrid",
        demo: null,
        emoji: "🛡️"
    },
    {
        id: 3,
        title: "FINVISION",
        description: "AI-powered personal finance dashboard built with Flask & Next.js. Smart financial tracking and insights.",
        category: "fullstack",
        tech: ["JavaScript", "Next.js", "Flask", "AI"],
        github: "https://github.com/abhi3114-glitch/FINVISION",
        demo: "https://finvision-blond.vercel.app",
        emoji: "💰"
    },
    {
        id: 4,
        title: "IdeaSynth",
        description: "Intelligent application that transforms user browsing history into structured, viable startup concepts using AI.",
        category: "ai",
        tech: ["TypeScript", "Next.js", "FastAPI", "Gemini AI"],
        github: "https://github.com/abhi3114-glitch/IdeaSynth",
        demo: null,
        emoji: "💡"
    },
    {
        id: 5,
        title: "GuardianEye",
        description: "AI-powered real-time fall detection system using YOLO, Mediapipe, Flask & Telegram alerts for elderly care.",
        category: "ai",
        tech: ["Python", "YOLO", "MediaPipe", "Flask"],
        github: "https://github.com/abhi3114-glitch/GuardianEye",
        demo: null,
        emoji: "👁️"
    },
    {
        id: 6,
        title: "CIAS",
        description: "Cognitive Intelligence Augmentation System - AI-powered cognitive enhancement platform for productivity.",
        category: "ai",
        tech: ["TypeScript", "React", "AI", "ML"],
        github: "https://github.com/abhi3114-glitch/CIAS",
        demo: "https://cias-x.vercel.app",
        emoji: "🧠"
    },
    {
        id: 7,
        title: "CIVIL-MIND",
        description: "Hybrid Constitutional Governance Platform - Bridging traditional governance with modern technology.",
        category: "fullstack",
        tech: ["TypeScript", "Next.js", "PostgreSQL"],
        github: "https://github.com/abhi3114-glitch/CIVIL-MIND-",
        demo: "https://civil-mind.vercel.app",
        emoji: "⚖️"
    },
    {
        id: 8,
        title: "LLM-COUNCIL-V2",
        description: "Better, improved and free version of LLM Council - Multi-model AI collaboration platform.",
        category: "ai",
        tech: ["Python", "FastAPI", "React", "LLMs"],
        github: "https://github.com/abhi3114-glitch/LLM-COUNCIL-V2",
        demo: "https://llm-council-v2.vercel.app",
        emoji: "🤖"
    },
    {
        id: 9,
        title: "EduOrbit",
        description: "Production-grade React/TypeScript app that visualizes study topics as 3D satellites with interactive dependency graphs.",
        category: "fullstack",
        tech: ["TypeScript", "React", "Three.js", "3D"],
        github: "https://github.com/abhi3114-glitch/EduOrbit",
        demo: null,
        emoji: "🛰️"
    },
    {
        id: 10,
        title: "INFRAMIND",
        description: "Self-Healing Cloud & API Reliability Copilot - Intelligent infrastructure monitoring and auto-recovery.",
        category: "devops",
        tech: ["TypeScript", "Docker", "Kubernetes", "AI"],
        github: "https://github.com/abhi3114-glitch/INFRAMIND",
        demo: null,
        emoji: "☁️"
    },
    {
        id: 11,
        title: "DEPLOYSENSE",
        description: "Smart deployment monitoring and analytics platform for modern DevOps workflows.",
        category: "devops",
        tech: ["TypeScript", "Node.js", "Docker", "CI/CD"],
        github: "https://github.com/abhi3114-glitch/DEPLOYSENSE",
        demo: null,
        emoji: "🔄"
    },
    {
        id: 12,
        title: "LifeEcho",
        description: "Privacy-first behavioral forecasting system that constructs a 'future-you' digital twin using AI.",
        category: "ai",
        tech: ["Python", "ML", "TensorFlow", "Privacy"],
        github: "https://github.com/abhi3114-glitch/LifeEcho",
        demo: null,
        emoji: "🔮"
    }
];

// ============================================
// TYPING ANIMATION
// ============================================
const typingPhrases = [
    "Full Stack Developer",
    "AI/ML Enthusiast",
    "Cloud Architect",
    "Open Source Contributor",
    "Problem Solver",
    "Tech Explorer"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentPhrase = typingPhrases[phraseIndex];

    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % typingPhrases.length;
        typingSpeed = 500; // Pause before next phrase
    }

    setTimeout(typeEffect, typingSpeed);
}

// ============================================
// CURSOR GLOW EFFECT
// ============================================
let mouseX = 0;
let mouseY = 0;
let glowX = 0;
let glowY = 0;

function updateCursorGlow() {
    const dx = mouseX - glowX;
    const dy = mouseY - glowY;

    glowX += dx * 0.1;
    glowY += dy * 0.1;

    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';

    requestAnimationFrame(updateCursorGlow);
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorGlow.classList.add('active');
});

document.addEventListener('mouseleave', () => {
    cursorGlow.classList.remove('active');
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
let lastScrollY = window.scrollY;

function handleNavbarScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScrollY = currentScrollY;
}

// ============================================
// MOBILE NAVIGATION
// ============================================
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal, .skill-category, .project-card, .info-card, .timeline-item, .contact-card');
    const windowHeight = window.innerHeight;

    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 150;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(easeOutQuart * target);

            counter.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }

        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(updateCounter);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}

// ============================================
// PROJECTS RENDERING
// ============================================
function renderProjects(filter = 'all') {
    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(project => project.category === filter);

    projectsGrid.innerHTML = filteredProjects.map((project, index) => `
        <div class="project-card reveal" style="animation-delay: ${index * 0.1}s">
            <div class="project-image">
                <div class="project-placeholder">${project.emoji}</div>
                <div class="project-overlay">
                    <div class="project-links">
                        <a href="${project.github}" target="_blank" rel="noopener" class="project-link" aria-label="View Code">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                            </svg>
                        </a>
                        ${project.demo ? `
                        <a href="${project.demo}" target="_blank" rel="noopener" class="project-link" aria-label="Live Demo">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                                <polyline points="15 3 21 3 21 9"/>
                                <line x1="10" y1="14" x2="21" y2="3"/>
                            </svg>
                        </a>
                        ` : ''}
                    </div>
                </div>
            </div>
            <div class="project-content">
                <span class="project-category">${project.category}</span>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');

    // Re-trigger reveal animation
    setTimeout(revealOnScroll, 100);
}

// ============================================
// PROJECT FILTER
// ============================================
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        // Fade out
        projectsGrid.style.opacity = '0';
        projectsGrid.style.transform = 'translateY(20px)';

        setTimeout(() => {
            renderProjects(filter);

            // Fade in
            setTimeout(() => {
                projectsGrid.style.opacity = '1';
                projectsGrid.style.transform = 'translateY(0)';
            }, 50);
        }, 300);
    });
});

// ============================================
// CONTACT FORM HANDLING
// ============================================
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Animate button
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = `
        <svg class="spinner" viewBox="0 0 24 24" width="20" height="20">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" opacity="0.3"/>
            <path d="M12 2a10 10 0 0110 10" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round">
                <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
            </path>
        </svg>
        <span>Sending...</span>
    `;
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        submitBtn.innerHTML = `
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span>Message Sent!</span>
        `;
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

        // Reset form
        contactForm.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    }, 2000);
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// ============================================
// PARALLAX EFFECT FOR ORBS
// ============================================
function parallaxOrbs() {
    const orbs = document.querySelectorAll('.orb');
    const scrollY = window.scrollY;

    orbs.forEach((orb, index) => {
        const speed = 0.05 * (index + 1);
        orb.style.transform = `translateY(${scrollY * speed}px)`;
    });
}

// ============================================
// SKILL TAG HOVER EFFECT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const skillTags = document.querySelectorAll('.skill-tag');

    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.05) translateY(-2px)';
        });

        tag.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });
});

// ============================================
// MAGNETIC BUTTON EFFECT
// ============================================
const magneticButtons = document.querySelectorAll('.btn-primary');

magneticButtons.forEach(button => {
    button.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });

    button.addEventListener('mouseleave', function () {
        this.style.transform = '';
    });
});

// ============================================
// PAGE LOAD ANIMATIONS
// ============================================
window.addEventListener('load', () => {
    // Add loaded class to body for any CSS transitions
    document.body.classList.add('loaded');

    // Initialize components
    typeEffect();
    updateCursorGlow();
    renderProjects();
    animateCounters();

    // Observe elements for reveal animation
    document.querySelectorAll('.skill-category, .info-card, .timeline-content, .contact-card').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
});

// ============================================
// SCROLL EVENT LISTENERS
// ============================================
window.addEventListener('scroll', () => {
    handleNavbarScroll();
    updateActiveNavLink();
    revealOnScroll();
    parallaxOrbs();
}, { passive: true });

// ============================================
// RESIZE EVENT LISTENER
// ============================================
window.addEventListener('resize', () => {
    // Handle any responsive adjustments
    if (window.innerWidth > 992) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// ============================================
// CONSOLE EASTER EGG
// ============================================
console.log('%c Welcome to my Portfolio! 🚀', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%c Built by Abhishek Pratap Singh Chauhan', 'font-size: 14px; color: #8b5cf6;');
console.log('%c Looking for the source code? Check it out on GitHub!', 'font-size: 12px; color: #fff;');
