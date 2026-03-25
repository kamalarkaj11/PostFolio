// ========================================
    // ENHANCED PARTICLES SYSTEM
    // ========================================
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random properties
            const size = Math.random() * 4 + 2;
            const left = Math.random() * 100;
            const delay = Math.random() * 15;
            const duration = Math.random() * 10 + 15;
            
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = left + '%';
            particle.style.animationDelay = delay + 's';
            particle.style.animationDuration = duration + 's';
            
            // Random gradient colors
            const colors = ['var(--gradient)', 'var(--gradient-2)', 'var(--accent-green)', 'var(--accent-pink)', 'var(--accent-yellow)'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // ========================================
    // MOUSE GLOW FOLLOWER
    // ========================================
    function initMouseGlow() {
        const hero = document.querySelector('.hero');
        const mouseGlow = document.getElementById('mouseGlow');
        
        if (!hero || !mouseGlow) return;
        
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            mouseGlow.style.left = (x - 200) + 'px';
            mouseGlow.style.top = (y - 200) + 'px';
        });
        
        hero.addEventListener('mouseleave', () => {
            mouseGlow.style.opacity = '0';
        });
        
        hero.addEventListener('mouseenter', () => {
            mouseGlow.style.opacity = '1';
        });
    }
    
    // ========================================
    // MAGNETIC BUTTON EFFECT
    // ========================================
    function initMagneticButtons() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }
    
    // ========================================
    // SMOOTH SCROLL REVEAL ANIMATIONS
    // ========================================
    function initScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Add staggered animation delay for cards
                    const cards = entry.target.querySelectorAll('.project-card, .skill-item, .stat');
                    cards.forEach((card, index) => {
                        card.style.transitionDelay = `${index * 0.1}s`;
                    });
                }
            });
        }, observerOptions);
        
        // Observe all fade-in elements
        document.querySelectorAll('.fade-in, .project-card, .skill-item, .stat, .skills-category').forEach(el => {
            observer.observe(el);
        });
    }
    
    // ========================================
    // 3D TILT EFFECT FOR CARDS
    // ========================================
    function initCardTilt() {
        const cards = document.querySelectorAll('.project-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }
    
    // ========================================
    // SKILL BARS ANIMATION
    // ========================================
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressFills = entry.target.querySelectorAll('.progress-fill');
                    progressFills.forEach(fill => {
                        const width = fill.style.width;
                        fill.style.width = '0';
                        setTimeout(() => {
                            fill.style.width = width;
                        }, 100);
                    });
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => observer.observe(bar));
    }
    
    // ========================================
    // PARALLAX EFFECT
    // ========================================
    function initParallax() {
        const orbs = document.querySelectorAll('.orb');
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 0.1;
                orb.style.transform = `translateY(${scrollY * speed}px)`;
            });
        });
    }
    
    // ========================================
    // CURSOR TRAIL EFFECT
    // ========================================
    function initCursorTrail() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        const trail = [];
        const trailLength = 10;
        
        for (let i = 0; i < trailLength; i++) {
            const dot = document.createElement('div');
            dot.className = 'cursor-dot';
            dot.style.cssText = `
                position: absolute;
                width: ${4 - i * 0.3}px;
                height: ${4 - i * 0.3}px;
                background: var(--primary-color);
                border-radius: 50%;
                pointer-events: none;
                opacity: ${0.8 - i * 0.08};
                z-index: 100;
                transition: all 0.1s ease;
            `;
            hero.appendChild(dot);
            trail.push({ element: dot, x: 0, y: 0 });
        }
        
        let mouseX = 0, mouseY = 0;
        
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        });
        
        function animateTrail() {
            let x = mouseX, y = mouseY;
            
            trail.forEach((point, index) => {
                const nextX = x;
                const nextY = y;
                
                point.x += (nextX - point.x) * 0.3;
                point.y += (nextY - point.y) * 0.3;
                
                point.element.style.left = point.x + 'px';
                point.element.style.top = point.y + 'px';
                
                x = point.x;
                y = point.y;
            });
            
            requestAnimationFrame(animateTrail);
        }
        
        animateTrail();
    }
    
    // ========================================
    // STARRY BACKGROUND
    // ========================================
    function createStars() {
        const starsContainer = document.getElementById('starsContainer');
        if (!starsContainer) return;
        
        const starCount = 50;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const size = Math.random() * 3 + 1;
            const delay = Math.random() * 2;
            
            star.style.left = x + '%';
            star.style.top = y + '%';
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            star.style.animationDelay = delay + 's';
            
            const colors = ['#ffffff', '#00d9ff', '#a855f7', '#f472b6', '#fbbf24'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            star.style.background = color;
            star.style.boxShadow = `0 0 ${size * 2}px ${color}`;
            
            starsContainer.appendChild(star);
        }
    }
    
    // ========================================
    // INITIALIZE ALL ANIMATIONS
    // ========================================
    document.addEventListener('DOMContentLoaded', () => {
        createParticles();
        createStars();
        initMouseGlow();
        initMagneticButtons();
        initScrollAnimations();
        initCardTilt();
        initSkillBars();
        initParallax();
        initCursorTrail();
        
        // Mobile Menu Toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = navLinks.classList.contains('active') 
                    ? 'rotate(45deg) translate(5px, 5px)' : 'none';
                spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
                spans[2].style.transform = navLinks.classList.contains('active') 
                    ? 'rotate(-45deg) translate(7px, -6px)' : 'none';
            });
        }

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans.forEach(span => span.style = '');
            });
        });

        // Navbar Background on Scroll
        const navbar = document.querySelector('.navbar');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(15, 23, 42, 0.98)';
                navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.4)';
            } else {
                navbar.style.background = 'rgba(15, 23, 42, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            }
        });

        // Active Navigation on Scroll
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-links a');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href').slice(1) === current) {
                    item.classList.add('active');
                }
            });
        });

        // Contact Form Handling
        const contactForm = document.getElementById('contactForm');
        const response = document.getElementById('response');

        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();

                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;

                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
               

                
            });
        }
        
        console.log('Enhanced animations loaded successfully!');
        
        // ========================================
        // LOADING SCREEN
        // ========================================
        function initLoader() {
            const loader = document.getElementById('loader');
            
            window.addEventListener('load', () => {
                setTimeout(() => {
                    loader.classList.add('hidden');
                    // Initialize section animations after loader
                    initSectionAnimations();
                }, 2500);
            });
        }

        // ========================================
        // SCROLL PROGRESS BAR
        // ========================================
        function initScrollProgress() {
            const scrollProgress = document.getElementById('scrollProgress');
            
            window.addEventListener('scroll', () => {
                const windowHeight = window.innerHeight;
                const documentHeight = document.documentElement.scrollHeight;
                const scrollTop = window.scrollY;
                const scrollable = documentHeight - windowHeight;
                
                if (scrollTop > 100) {
                    scrollProgress.classList.add('active');
                } else {
                    scrollProgress.classList.remove('active');
                }
                
                const scrollPercent = (scrollTop / scrollable) * 100;
                const scrollBar = scrollProgress.querySelector('.scroll-progress-bar');
                scrollBar.style.width = scrollPercent + '%';
            });
        }

        // ========================================
        // BACK TO TOP BUTTON
        // ========================================
        function initBackToTop() {
            const backToTop = document.getElementById('backToTop');
            
            window.addEventListener('scroll', () => {
                if (window.scrollY > 500) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            });
            
            backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // ========================================
        // NUMBER COUNTER ANIMATION
        // ========================================
        function initCounters() {
            const counters = document.querySelectorAll('.stat-number');
            const speed = 200;
            
            const animateCounter = (counter) => {
                const target = parseInt(counter.getAttribute('data-target')) || 0;
                if (target === 0) return;
                
                const increment = target / speed;
                let current = 0;
                
                counter.classList.add('counting');
                
                const updateCount = () => {
                    current += increment;
                    
                    if (current < target) {
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCount();
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            counters.forEach(counter => {
                observer.observe(counter);
            });
        }

        // ========================================
        // BUTTON RIPPLE EFFECT
        // ========================================
        function initRippleEffect() {
            const buttons = document.querySelectorAll('.btn, .submit-btn, .reset-btn');
            
            buttons.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    const ripple = document.createElement('span');
                    ripple.classList.add('ripple');
                    
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    
                    ripple.style.width = ripple.style.height = size + 'px';
                    ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
                    ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
                    
                    this.appendChild(ripple);
                    
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                });
            });
        }

        // ========================================
        // SECTION REVEAL ANIMATIONS
        // ========================================
        function initSectionAnimations() {
            const sections = document.querySelectorAll('section');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });
            
            sections.forEach(section => {
                observer.observe(section);
            });
        }

        // ========================================
        // SMOOTH SCROLL FOR NAV LINKS
        // ========================================
        function initSmoothScroll() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
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
        }

        // Initialize all new functions
        initLoader();
        initScrollProgress();
        initBackToTop();
        initCounters();
        initRippleEffect();
        initSmoothScroll();
    });

