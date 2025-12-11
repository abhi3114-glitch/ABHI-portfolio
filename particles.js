/**
 * Particle Network Animation
 * A lightweight, dependency-free particle system
 */

class ParticleNetwork {
    constructor(options = {}) {
        this.options = {
            containerId: options.containerId || 'particles-js',
            particleColor: options.particleColor || 'rgba(100, 255, 218, 0.5)',
            lineColor: options.lineColor || 'rgba(100, 255, 218, 0.15)',
            particleAmount: options.particleAmount || 80,
            defaultSpeed: options.defaultSpeed || 0.5,
            variantSpeed: options.variantSpeed || 1,
            defaultRadius: options.defaultRadius || 2,
            variantRadius: options.variantRadius || 2,
            linkRadius: options.linkRadius || 150,
        };

        this.container = document.getElementById(this.options.containerId);
        if (!this.container) {
            console.error('Particle container not found');
            return;
        }

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);

        this.particles = [];
        this.w = this.container.offsetWidth;
        this.h = this.container.offsetHeight;

        // Handle resize
        window.addEventListener('resize', () => this.resize());

        this.init();
        this.animate();
    }

    init() {
        this.resize();
        this.createParticles();
    }

    resize() {
        this.w = this.container.offsetWidth;
        this.h = this.container.offsetHeight;
        this.canvas.width = this.w;
        this.canvas.height = this.h;
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.options.particleAmount; i++) {
            this.particles.push(new Particle(this.w, this.h, this.options));
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.w, this.h);

        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update();
            this.particles[i].draw(this.ctx);

            // Draw connections
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.options.linkRadius) {
                    const opacity = 1 - (distance / this.options.linkRadius);
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = this.options.lineColor.replace(')', `, ${opacity})`).replace('rgb', 'rgba');
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}

class Particle {
    constructor(w, h, options) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.w = w;
        this.h = h;
        this.options = options;

        const speed = options.defaultSpeed + Math.random() * options.variantSpeed;
        const angle = Math.floor(Math.random() * 360);

        this.vector = {
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed
        };

        this.radius = options.defaultRadius + Math.random() * options.variantRadius;
    }

    update() {
        this.border();
        this.x += this.vector.x;
        this.y += this.vector.y;
    }

    border() {
        if (this.x >= this.w || this.x <= 0) {
            this.vector.x *= -1;
        }
        if (this.y >= this.h || this.y <= 0) {
            this.vector.y *= -1;
        }
        if (this.x > this.w) this.x = this.w;
        if (this.x < 0) this.x = 0;
        if (this.y > this.h) this.y = this.h;
        if (this.y < 0) this.y = 0;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.options.particleColor;
        ctx.fill();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Only init if the container exists
    const container = document.getElementById('particles-js');
    if (container) {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!prefersReducedMotion) {
            new ParticleNetwork({
                containerId: 'particles-js',
                particleColor: 'rgba(100, 255, 218, 0.5)',
                lineColor: 'rgba(100, 255, 218, 0.15)',
                particleAmount: window.innerWidth < 768 ? 40 : 80, // Fewer particles on mobile
                linkRadius: 150
            });
        }
    }
});
