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
const featuredGrid = document.getElementById('featuredGrid');
const projectsGrid = document.getElementById('projectsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const contactForm = document.getElementById('contactForm');
const themeToggleBtn = document.getElementById('themeToggle');
const preloader = document.getElementById('preloader');

// ============================================
// THEME TOGGLE LOGIC
// ============================================
// Check for saved theme or system preference
const savedTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';

if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// ============================================
// PROJECTS DATA (From GitHub)
// ============================================
const projects = [
    {
        id: 1,
        title: "VectorForge",
        description: "High-performance C++ Vector Database optimized for similarity search and AI applications. Features HNSW indexing and custom memory allocators.",
        category: "backend",
        tech: ["C++", "CUDA", "SIMD", "CMake"],
        github: "https://github.com/abhi3114-glitch/VectorForge",
        demo: null,
        featured: true
    },
    {
        id: 2,
        title: "REYNA",
        description: "A statically typed, compiled programming language built with Python. Features custom lexer, parser, and LLVM-based code generation.",
        category: "devops",
        tech: ["Python", "LLVM", "Compilers", "Assembly"],
        github: "https://github.com/abhi3114-glitch/REYNA",
        demo: null,
        featured: true
    },
    {
        id: 3,
        title: "ShardDB",
        description: "Distributed Key-Value Store implementing Raft consensus for consistency and sharding for horizontal scalability. Fault-tolerant by design.",
        category: "backend",
        tech: ["Go", "gRPC", "Raft", "Distributed Systems"],
        github: "https://github.com/abhi3114-glitch/ShardDB",
        demo: null,
        featured: true
    },
    {
        id: 4,
        title: "K8s-Lite",
        description: "Lightweight implementation of Kubernetes core components (Scheduler, Kubelet, API Server). Designed for edge computing and learning internals.",
        category: "devops",
        tech: ["Go", "Docker", "Linux Namespaces", "Networking"],
        github: "https://github.com/abhi3114-glitch/K8s-Lite",
        demo: null,
        featured: true
    },
    {
        id: 5,
        title: "PulseMesh",
        description: "Offline-capable peer-to-peer communication tool built with Electron. Enables secure messaging without internet access.",
        category: "fullstack",
        tech: ["Electron", "Node.js", "WebRTC", "React"],
        github: "https://github.com/abhi3114-glitch/PulseMesh",
        demo: null,
        featured: false
    },
    {
        id: 6,
        title: "AUTODEV",
        description: "A production-grade developer productivity platform that eliminates onboarding friction and environment inconsistency.",
        category: "devops",
        tech: ["TypeScript", "React", "Docker", "Node.js"],
        github: "https://github.com/abhi3114-glitch/AUTODEV",
        demo: null,
        featured: false
    },
    {
        id: 7,
        title: "WEB-OS-NOVA",
        description: "A browser-based Operating System simulation featuring window management, file system, and native-like apps.",
        category: "fullstack",
        tech: ["JavaScript", "CSS3", "HTML5", "OS Design"],
        github: "https://github.com/abhi3114-glitch/WEB-OS-NOVA",
        demo: null,
        featured: false
    },
    {
        id: 8,
        title: "LLM-COUNCIL-V2",
        description: "Advanced multi-model AI collaboration platform orchestrating various LLMs for complex problem solving.",
        category: "ai",
        tech: ["Python", "FastAPI", "React", "LangChain"],
        github: "https://github.com/abhi3114-glitch/LLM-COUNCIL-V2",
        demo: null,
        featured: false
    },
    {
        id: 9,
        title: "ThunderStrike-API",
        description: "High-performance distributed API Gateway designed for microservices architecture with rate limiting and load balancing.",
        category: "backend",
        tech: ["Go", "gRPC", "Redis", "Distributed Systems"],
        github: "https://github.com/abhi3114-glitch/ThunderStrike-API",
        demo: null,
        featured: false
    },
    {
        id: 10,
        title: "X-CODE",
        description: "Cloud-native IDE and code editor providing a VS Code-like experience in the browser with real-time collaboration.",
        category: "fullstack",
        tech: ["React", "Monaco Editor", "Node.js", "WebSockets"],
        github: "https://github.com/abhi3114-glitch/X-CODE",
        demo: null,
        featured: false
    },
    {
        id: 11,
        title: "VaultGrid",
        description: "Decentralized secure storage system focusing on data privacy, sharding, and redundant storage across nodes.",
        category: "backend",
        tech: ["Rust", "Cryptography", "P2P", "Storage"],
        github: "https://github.com/abhi3114-glitch/VaultGrid",
        demo: null,
        featured: false
    },
    {
        id: 12,
        title: "SIDRES",
        description: "Secure Identity & Digital Resilience System. Advanced authentication and security framework for distributed applications.",
        category: "backend",
        tech: ["Python", "Cryptography", "Zero-Trust", "Security"],
        github: "https://github.com/abhi3114-glitch/SIDRES",
        demo: null,
        featured: false
    },
    {
        id: 13,
        title: "DEPLOYSENSE",
        description: "Smart deployment monitoring and analytics platform for modern DevOps workflows.",
        category: "devops",
        tech: ["TypeScript", "Node.js", "Docker", "CI/CD"],
        github: "https://github.com/abhi3114-glitch/DEPLOYSENSE",
        demo: null,
        featured: false
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
// SKILLS RENDERING
// ============================================
function renderSkills() {
    const skillsContainer = document.getElementById('skillsCategories');
    if (!skillsContainer) return;

    if (typeof categories === 'undefined' || typeof techStack === 'undefined') {
        console.error('Tech stack data not loaded');
        return;
    }

    skillsContainer.innerHTML = '';

    const skillsByCategory = {};
    techStack.forEach(skill => {
        if (!skillsByCategory[skill.cat]) {
            skillsByCategory[skill.cat] = [];
        }
        skillsByCategory[skill.cat].push(skill);
    });

    Object.keys(categories).forEach((catKey, index) => {
        if (skillsByCategory[catKey] && skillsByCategory[catKey].length > 0) {
            const categoryDef = categories[catKey];
            const skills = skillsByCategory[catKey];

            const categoryHtml = `
                <div class="skill-category reveal" style="transition-delay: ${index * 0.1}s">
                    <h3>${categoryDef.icon} ${categoryDef.name}</h3>
                    <div class="skill-items">
                        ${skills.map(skill => `
                            <div class="skill-item">
                                <div class="skill-icon">${skill.svg}</div>
                                <span class="skill-name">${skill.name}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            skillsContainer.innerHTML += categoryHtml;
        }
    });
}

// ============================================
// PROJECTS RENDERING
// ============================================
function renderProjects(filter = 'all') {
    // 1. Render Featured Masterpieces (Fixed Top 4)
    if (featuredGrid) {
        const featuredProjects = projects.filter(project => project.featured);
        featuredGrid.innerHTML = featuredProjects.map((project, index) => `
            <div class="featured-card reveal" style="transition-delay: ${index * 0.1}s">
                <div class="featured-content">
                    <div class="featured-header">
                        <span class="featured-badge">🏆 Masterpiece</span>
                        <span class="project-category">${project.category}</span>
                    </div>
                    <h3 class="featured-title">${project.title}</h3>
                    <p class="featured-description">${project.description}</p>
                    <div class="project-tech">
                        ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="featured-links">
                        <a href="${project.github}" target="_blank" rel="noopener" class="btn btn-sm btn-outline">
                            GitHub
                        </a>
                        ${project.demo ? `
                        <a href="${project.demo}" target="_blank" rel="noopener" class="btn btn-sm btn-primary">
                            Live Demo
                        </a>
                        ` : ''}
                    </div>
                </div>
                <div class="featured-decoration"></div>
            </div>
        `).join('');
    }

    // 2. Render Other Projects (Filterable)
    if (projectsGrid) {
        const otherProjects = projects.filter(project => !project.featured);
        const filteredProjects = filter === 'all'
            ? otherProjects
            : otherProjects.filter(project => project.category === filter);

        projectsGrid.innerHTML = filteredProjects.map((project, index) => `
            <div class="project-card reveal" style="animation-delay: ${index * 0.1}s">
                <div class="project-content">
                    <div class="project-header">
                        <span class="project-category">${project.category}</span>
                        <div class="project-links">
                            <a href="${project.github}" target="_blank" rel="noopener" class="project-link" aria-label="View Code">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                                </svg>
                            </a>
                            ${project.demo ? `
                            <a href="${project.demo}" target="_blank" rel="noopener" class="project-link" aria-label="Live Demo">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                                    <polyline points="15 3 21 3 21 9"/>
                                    <line x1="10" y1="14" x2="21" y2="3"/>
                                </svg>
                            </a>
                            ` : ''}
                        </div>
                    </div>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Re-trigger reveal animation
    setTimeout(revealOnScroll, 100);

    // Initialize 3D Tilt Effect
    setTimeout(initTiltEffect, 100);
}

// ============================================
// 3D TILT EFFECT
// ============================================
function initTiltEffect() {
    const cards = document.querySelectorAll('.project-card, .skill-category');

    cards.forEach(card => {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
    });
}

function handleTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5; // Max tilt (deg)
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.transition = 'transform 0.1s ease';
}

function resetTilt(e) {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    card.style.transition = 'transform 0.5s ease';
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

    // Hide preloader
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 500); // Small buffer for smoothness
    }

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
