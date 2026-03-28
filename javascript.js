// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const burger = document.querySelector('.burger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (burger) {
        burger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            burger.innerHTML = navMenu.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (burger) burger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Smooth scroll function
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // Scroll to features button
    const scrollToFeatures = document.getElementById('scroll-to-features');
    if (scrollToFeatures) {
        scrollToFeatures.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScroll('#features');
        });
    }
    
    // Scroll to CTA button
    const scrollToCta = document.getElementById('scroll-to-cta');
    if (scrollToCta) {
        scrollToCta.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScroll('#cta');
        });
    }
    
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                smoothScroll(href);
            }
        });
    });
    
    // Fade-in animation on scroll
    const faders = document.querySelectorAll('.feature-card, .review-card, .faq-item, .hero-text, .hero-visual, .section-header');
    
    const appearOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, appearOptions);
    
    faders.forEach(fader => {
        fader.classList.add('fade-in');
        appearOnScroll.observe(fader);
    });
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    });
    
    // Form validation and submission
    const form = document.getElementById('taktik-form');
    const messageDiv = document.getElementById('form-message');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const game = document.getElementById('game').value.trim();
            
            // Validation
            if (name === '' || email === '') {
                messageDiv.innerHTML = '<span style="color: #ff2a6d;">❌ Пожалуйста, заполните никнейм и email!</span>';
                messageDiv.style.color = '#ff2a6d';
                return;
            }
            
            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                messageDiv.innerHTML = '<span style="color: #ff2a6d;">❌ Пожалуйста, введите корректный email адрес!</span>';
                messageDiv.style.color = '#ff2a6d';
                return;
            }
            
            // Success message
            messageDiv.innerHTML = '<span style="color: #05d9e8;">✅ Отлично! Бонус-гайд отправлен на твою почту. Проверь папку "Спам"!</span>';
            messageDiv.style.color = '#05d9e8';
            
            // Clear form
            form.reset();
            
            // Clear message after 5 seconds
            setTimeout(() => {
                messageDiv.innerHTML = '';
            }, 5000);
        });
    }
    
    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Add visible class to elements already in view on load
    setTimeout(() => {
        faders.forEach(fader => {
            const rect = fader.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                fader.classList.add('visible');
                appearOnScroll.unobserve(fader);
            }
        });
    }, 100);
    
    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Add animation to stats
    const stats = document.querySelectorAll('.stat-number');
    let animated = false;
    
    function animateStats() {
        if (animated) return;
        
        stats.forEach(stat => {
            const target = stat.innerText;
            const number = parseInt(target);
            if (!isNaN(number)) {
                let current = 0;
                const increment = number / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        stat.innerText = target;
                        clearInterval(timer);
                    } else {
                        stat.innerText = Math.floor(current);
                    }
                }, 20);
            }
        });
        animated = true;
    }
    
    // Trigger stats animation when hero section is in view
    const heroSection = document.getElementById('hero');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animateStats();
            }
        });
    }, { threshold: 0.5 });
    
    if (heroSection) observer.observe(heroSection);
});