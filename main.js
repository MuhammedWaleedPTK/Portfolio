document.addEventListener('DOMContentLoaded', () => {

    // --- Web Audio UI Sound FX Engine ---
    let soundEnabled = localStorage.getItem('portfolio-sound') !== 'false';
    const soundBtn = document.getElementById('sound-toggle');
    const soundIcon = document.getElementById('sound-icon');

    const updateSoundIcon = () => {
        if (soundIcon) {
            soundIcon.innerText = soundEnabled ? '🔊' : '🔇';
        }
    };
    updateSoundIcon();

    if (soundBtn) {
        soundBtn.addEventListener('click', () => {
            soundEnabled = !soundEnabled;
            localStorage.setItem('portfolio-sound', soundEnabled);
            updateSoundIcon();
            if (soundEnabled) playClickSound(800, 0.05);
        });
    }

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    const playClickSound = (freq = 600, duration = 0.04) => {
        if (!soundEnabled) return;
        try {
            if (audioCtx.state === 'suspended') audioCtx.resume();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(freq * 0.5, audioCtx.currentTime + duration);

            gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch (e) {
            // Web Audio fallback
        }
    };

    const playHoverSound = () => {
        if (!soundEnabled) return;
        try {
            if (audioCtx.state === 'suspended') audioCtx.resume();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(400, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(550, audioCtx.currentTime + 0.03);

            gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + 0.03);
        } catch (e) {
            // Web Audio fallback
        }
    };

    // Attach Sound Effects to Interactive Elements
    document.querySelectorAll('.btn, .btn-inspect, .filter-pill, .nav-link, .store-link, .contact-btn').forEach(el => {
        el.addEventListener('mouseenter', () => playHoverSound());
        el.addEventListener('click', () => playClickSound(700, 0.05));
    });

    // --- Theme Switcher ---
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (themeIcon) {
            themeIcon.innerText = theme === 'light' ? '🌙' : '☀️';
        }
    }

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('mobile-active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('mobile-active');
            });
        });
    }



    // --- Active Link Observer on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // --- Screenshot Carousel Sliders ---
    const initProjectSliders = () => {
        const tracks = document.querySelectorAll('.slider-track');

        tracks.forEach(track => {
            const images = track.querySelectorAll('.project-ss');
            if (images.length <= 1) return;

            let currentIndex = 0;

            setInterval(() => {
                images[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % images.length;
                images[currentIndex].classList.add('active');
            }, 3800 + Math.random() * 800);
        });
    };

    initProjectSliders();

    // --- Dynamic Typewriter Role Morphing ---
    const initTypewriter = () => {
        const targetEl = document.getElementById('typewriter-text');
        if (!targetEl) return;

        const roles = [
            "GAME DEVELOPER",
            "UNITY DEVELOPER",
            "GAMEPLAY ARCHITECT",
            "C# SYSTEMS ENGINEER",
            "MOBILE OPTIMIZER"
        ];

        let roleIndex = 0;
        let charIndex = roles[0].length;
        let isDeleting = true;
        let typingSpeed = 80;

        const type = () => {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                targetEl.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 40;
            } else {
                targetEl.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 90;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                // Pause at full word
                typingSpeed = 2200;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 400;
            }

            setTimeout(type, typingSpeed);
        };

        // Start cycling after initial delay
        setTimeout(type, 2000);
    };

    initTypewriter();

    // --- Scroll Reveal Animation ---
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section, .project-card, .skill-card, .tool-card-main, .tool-card-side, .timeline-item').forEach(el => {
        el.classList.add('hide');
        observer.observe(el);
    });

});
