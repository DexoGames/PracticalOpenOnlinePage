function initBomb() {
    if (document.getElementById('bombContainer')) return;
    
    const bombHTML = `
        <div class="bomb-container" id="bombContainer">
            <div class="bomb-display">
                <div class="timer" id="timer">60</div>
                <button class="defuse-btn" id="defuseBtn">DEFUSE</button>
            </div>
            <div class="bomb-warning">Reset before detonation!</div>
        </div>
        <div class="explosion-overlay" id="explosionOverlay"></div>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', bombHTML);
    
    let pageWrapper = document.getElementById('pageWrapper');
    
    if (!pageWrapper) {
        const bodyChildren = Array.from(document.body.children).filter(el => 
            !el.classList.contains('bomb-container') && 
            !el.classList.contains('explosion-overlay')
        );
        
        pageWrapper = document.createElement('div');
        pageWrapper.className = 'page-wrapper';
        pageWrapper.id = 'pageWrapper';
        
        bodyChildren.forEach(child => pageWrapper.appendChild(child));
        
        document.body.appendChild(pageWrapper);
    }
    
    startBombTimer();
}

let timeLeft = 60;
let timerInterval;
let isExploded = false;

function loadTimerState() {
    const savedTime = localStorage.getItem('bombTimeLeft');
    const savedTimestamp = localStorage.getItem('bombTimestamp');
    
    if (savedTime && savedTimestamp) {
        const elapsed = Math.floor((Date.now() - parseInt(savedTimestamp)) / 1000);
        const calculatedTime = Math.max(0, parseInt(savedTime) - elapsed);
        
        // reset timer when it hits 0, otherwise page stays permanently exploded
        if (calculatedTime <= 0) {
            clearTimerState();
            timeLeft = 60;
            isExploded = false;
            return;
        }
        
        timeLeft = calculatedTime;
    }
}

function saveTimerState() {
    localStorage.setItem('bombTimeLeft', timeLeft);
    localStorage.setItem('bombTimestamp', Date.now());
}

function clearTimerState() {
    localStorage.removeItem('bombTimeLeft');
    localStorage.removeItem('bombTimestamp');
}

// only grab elements near the viewport, otherwise fps tanks during explosion
function getExplodableElements() {
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const buffer = viewportHeight;
    
    const allElements = document.querySelectorAll('.navbar, .hero, .section, .footer, .project-card, .social-links a, .skill-tag, .gallery-item, .photos-page, h1, h2, h3, p, img, .photo-item, .featured-card, .contact-item, .btn');
    
    return Array.from(allElements).filter(el => {
        const rect = el.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const elementBottom = elementTop + rect.height;
        
        const visibleTop = scrollY - buffer;
        const visibleBottom = scrollY + viewportHeight + buffer;
        
        return elementBottom > visibleTop && elementTop < visibleBottom;
    });
}

function startBombTimer() {
    const timerDisplay = document.getElementById('timer');
    const defuseBtn = document.getElementById('defuseBtn');
    const bombContainer = document.getElementById('bombContainer');
    
    if (!timerDisplay || !defuseBtn || !bombContainer) return;
    
    loadTimerState();
    
    timerDisplay.textContent = timeLeft;
    
    if (timeLeft <= 10) {
        bombContainer.classList.add('critical');
        timerDisplay.style.color = '#ff0000';
    }
    
    defuseBtn.addEventListener('click', defuseBomb);
    
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        saveTimerState();
        
        if (timeLeft <= 10) {
            bombContainer.classList.add('critical');
            timerDisplay.style.color = '#ff0000';
        }
        
        if (timeLeft <= 5) {
            const pageWrapper = document.getElementById('pageWrapper');
            if (pageWrapper) pageWrapper.classList.add('shake');
        }
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            saveTimerState();
            explodePage();
        }
    }, 1000);
}

function defuseBomb() {
    if (isExploded) return;
    
    const timerDisplay = document.getElementById('timer');
    const defuseBtn = document.getElementById('defuseBtn');
    const bombContainer = document.getElementById('bombContainer');
    const pageWrapper = document.getElementById('pageWrapper');
    
    timeLeft = 60;
    timerDisplay.textContent = timeLeft;
    timerDisplay.style.color = '#00ff00';
    bombContainer.classList.remove('warning', 'critical');
    if (pageWrapper) pageWrapper.classList.remove('shake');
    
    clearTimerState();
    isExploded = false;
    
    defuseBtn.textContent = 'DEFUSED!';
    defuseBtn.style.background = 'linear-gradient(135deg, #00ff00, #00aa00)';
    
    setTimeout(() => {
        defuseBtn.textContent = 'DEFUSE';
        defuseBtn.style.background = '';
    }, 1000);
}

function explodePage() {
    isExploded = true;
    
    const explosionOverlay = document.getElementById('explosionOverlay');
    const bombContainer = document.getElementById('bombContainer');
    
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    explosionOverlay.classList.add('active');
    
    document.body.style.transition = 'background 1s ease';
    document.body.style.background = 'linear-gradient(135deg, #2a0a0a, #4a1010, #2a0a0a)';
    
    setTimeout(() => {
        explosionOverlay.style.transition = 'opacity 1.5s ease';
        explosionOverlay.style.opacity = '0';
    }, 400);
    
    const elements = getExplodableElements();
    
    const pageWrapper = document.getElementById('pageWrapper');
    if (pageWrapper) {
        pageWrapper.style.pointerEvents = 'none';
    }
    
    // batching all the DOM reads/writes separately keeps animations smooth
    const elementData = elements.map(el => {
        const rect = el.getBoundingClientRect();
        return { el, rect };
    });
    
    const animations = elementData.map((_, index) => ({
        angle: Math.random() * 360,
        distance: 800 + Math.random() * 2000,
        rotateAmount: (Math.random() - 0.5) * 1440,
        duration: 0.8 + Math.random() * 1.5,
        opacityDuration: 1.5 + Math.random(),
        scale: Math.random() * 0.3,
        delay: index * 15
    }));
    
    elementData.forEach(({ el }) => {
        el.style.willChange = 'transform, opacity';
    });
    
    requestAnimationFrame(() => {
        elementData.forEach(({ el }, index) => {
            const anim = animations[index];
            
            // Small delay for cascading effect
            setTimeout(() => {
                const x = Math.cos(anim.angle * Math.PI / 180) * anim.distance;
                const y = Math.sin(anim.angle * Math.PI / 180) * anim.distance + 1500;
                
                el.style.transition = `transform ${anim.duration}s ease-out, opacity ${anim.opacityDuration}s ease-out`;
                el.style.transform = `translate(${x}px, ${y}px) rotate(${anim.rotateAmount}deg) scale(${anim.scale})`;
                el.style.opacity = '0';
            }, anim.delay);
        });
        
        setTimeout(() => {
            elementData.forEach(({ el }) => {
                el.style.willChange = 'auto';
            });
        }, 3000);
    });
    
    bombContainer.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    bombContainer.style.opacity = '0';
    bombContainer.style.transform = 'scale(0.8)';
    setTimeout(() => {
        bombContainer.style.display = 'none';
    }, 500);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBomb);
} else {
    initBomb();
}
