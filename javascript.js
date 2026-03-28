(function() {
    // Плавная прокрутка по клику на кнопки
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // обработчики для кнопок hero
    const scrollToFeatures = document.getElementById('scroll-to-features');
    const scrollToCta = document.getElementById('scroll-to-cta');
    
    if (scrollToFeatures) {
        scrollToFeatures.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScroll('#features');
        });
    }
    
    if (scrollToCta) {
        scrollToCta.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScroll('#cta');
        });
    }

    // также плавный скролл для всех якорей (на случай дополнительных ссылок)
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                smoothScroll(href);
            }
        });
    });

    // Анимация при скролле (fade-in)
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -30px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Аккордеон для FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Закрываем все другие открытые вопросы
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Открываем/закрываем текущий
            if (!isActive) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    });

    // Валидация формы
    const form = document.getElementById('taktik-form');
    const messageDiv = document.getElementById('form-message');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();

            // Простая валидация
            if (name === '' || email === '') {
                messageDiv.innerHTML = '<span style="color: #ff2a6d;">❌ Заполни никнейм и почту!</span>';
                return;
            }

            // Валидация email (базовая)
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                messageDiv.innerHTML = '<span style="color: #ff2a6d;">❌ Неверный формат e-mail</span>';
                return;
            }

            // Если всё ок — показываем успех
            messageDiv.innerHTML = '<span style="color: #05d9e8;">✅ Гайд уже летит к тебе! Проверь почту (и спам).</span>';

            // Сброс сообщения через 6 секунд
            setTimeout(() => {
                messageDiv.innerHTML = '';
            }, 6000);
        });
    }

    // дополнительный эффект — показываем элементы, которые уже видны при загрузке
    setTimeout(() => {
        faders.forEach(fader => {
            const rect = fader.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                fader.classList.add('visible');
                if (appearOnScroll) {
                    appearOnScroll.unobserve(fader);
                }
            }
        });
    }, 200);
})();