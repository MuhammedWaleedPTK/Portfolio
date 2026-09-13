document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    // Load saved theme
    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeBtn) { // Ensure themeBtn exists before adding listener
        themeBtn.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
            updateThemeIcon(newTheme);

            // Assuming triggerAchievement is defined elsewhere or will be added
            // if (typeof triggerAchievement === 'function') {
            //     triggerAchievement('Theme Switch', `Activated ${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} Mode`);
            // }
        });
    }

    function updateThemeIcon(theme) {
        if (themeIcon) { // Ensure themeIcon exists
            themeIcon.innerText = theme === 'light' ? '🌙' : '☀️';
        }
    }

    // Automated Project Sliders
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
            }, 3500 + Math.random() * 1000); // Slight offset for more natural feel
        });
    };

    initProjectSliders();
});

// Reveal Animation on Scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
        }
    });
}, observerOptions);

document.querySelectorAll('section, .project-card, .tool-feature').forEach(el => {
    el.classList.add('hide');
    observer.observe(el);
});

// Remove loading class after DOM load
window.addEventListener('load', () => {
    document.body.classList.remove('loading');
});

// Hacker Terminal Logic
const terminalInput = document.getElementById('terminal-input');
const terminalBody = document.getElementById('terminal-body');

if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = terminalInput.value.trim().toLowerCase();
            handleCommand(command);
            terminalInput.value = '';
        }
    });
}

function handleCommand(cmd) {
    const line = document.createElement('div');
    line.className = 'terminal-line';

    let response = '';

    switch (cmd) {
        case 'help':
            response = 'AVAILABLE MODULES: about, projects, skills, heritage, achievements, clear';
            break;
        case 'about':
            response = 'DATA: Muhammed Waleed PTK. Unity Developer based in India. Technical lead for multiple high-performance mobile titles.';
            break;
        case 'projects':
            response = 'SCANNING: Accessing Project Database...';
            location.href = '#projects';
            break;
        case 'contact':
            response = 'muhammedwaleedkidanhi@gmail.com';
            break;
        case 'clear':
            terminalBody.innerHTML = '';
            return;
        case 'secret':
            response = 'REVEALED: [SpriteCut AI] represents the future of asset automation.';
            break;
        case 'heritage':
            response = 'REDIRECTING: System logs show a transition from Electronics Engineering to Unity Development. Data-driven logic remains consistent.';
            location.href = '#heritage';
            break;
        case 'skills':
            response = 'CORE MODULES: Unity 2D/3D, C#, Optimization, Monetization, Firebase, Splines.';
            location.href = '#skills';
            break;
        default:
            response = `Command not found: ${cmd}. Type 'help' for options.`;
    }

    line.innerHTML = `<span class="prompt">></span> ${cmd}<br><span style="color: #fff; opacity: 0.8;">${response}</span>`;
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
}
