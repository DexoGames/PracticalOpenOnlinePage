// ==========================================
// TIME BOMB FUNCTIONALITY - Shared across all pages
// ==========================================

// Create and inject bomb HTML into the page
function initBomb() {
    // Check if bomb already exists (avoid double initialization)
    if (document.getElementById('bombContainer')) return;
    
    // Create bomb container
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
    
    // Insert at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', bombHTML);
    
    // Check if page-wrapper already exists
    let pageWrapper = document.getElementById('pageWrapper');
    
    // If no page-wrapper exists, create one and wrap all content
    if (!pageWrapper) {
        // Get all direct children of body except bomb elements
        const bodyChildren = Array.from(document.body.children).filter(el => 
            !el.classList.contains('bomb-container') && 
            !el.classList.contains('explosion-overlay')
        );
        
        // Create wrapper
        pageWrapper = document.createElement('div');
        pageWrapper.className = 'page-wrapper';
        pageWrapper.id = 'pageWrapper';
        
        // Move all content into wrapper
        bodyChildren.forEach(child => pageWrapper.appendChild(child));
        
        // Add wrapper to body (after bomb elements)
        document.body.appendChild(pageWrapper);
    }
    
    // Initialize bomb functionality
    startBombTimer();
}

let timeLeft = 60;
let timerInterval;
let isExploded = false;

// Get all explodable elements - optimized to only get visible ones near scroll
function getExplodableElements() {
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const buffer = viewportHeight; // Only explode elements within 1 viewport above/below
    
    const allElements = document.querySelectorAll('.navbar, .hero, .section, .footer, .project-card, .social-links a, .skill-tag, .gallery-item, .photos-page, h1, h2, h3, p, img, .photo-item, .featured-card, .contact-item, .btn');
    
    // Filter to only elements near the viewport
    return Array.from(allElements).filter(el => {
        const rect = el.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const elementBottom = elementTop + rect.height;
        
        // Check if element is within the visible range (with buffer)
        const visibleTop = scrollY - buffer;
        const visibleBottom = scrollY + viewportHeight + buffer;
        
        return elementBottom > visibleTop && elementTop < visibleBottom;
    });
}

// Start the countdown
function startBombTimer() {
    const timerDisplay = document.getElementById('timer');
    const defuseBtn = document.getElementById('defuseBtn');
    const bombContainer = document.getElementById('bombContainer');
    
    if (!timerDisplay || !defuseBtn || !bombContainer) return;
    
    // Defuse handler
    defuseBtn.addEventListener('click', defuseBomb);
    
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        
        // Add urgency effects
        if (timeLeft <= 10) {
            bombContainer.classList.add('critical');
            timerDisplay.style.color = '#ff0000';
        }
        
        // Shake effect as time runs low
        if (timeLeft <= 5) {
            const pageWrapper = document.getElementById('pageWrapper');
            if (pageWrapper) pageWrapper.classList.add('shake');
        }
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            explodePage();
        }
    }, 1000);
}

// Defuse (reset) the bomb
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
    
    // Fun defuse animation
    defuseBtn.textContent = 'DEFUSED!';
    defuseBtn.style.background = 'linear-gradient(135deg, #00ff00, #00aa00)';
    
    setTimeout(() => {
        defuseBtn.textContent = 'DEFUSE';
        defuseBtn.style.background = '';
    }, 1000);
}

// EXPLODE THE PAGE! - Optimized version
function explodePage() {
    isExploded = true;
    
    const explosionOverlay = document.getElementById('explosionOverlay');
    const bombContainer = document.getElementById('bombContainer');
    
    // Lock scrolling during explosion
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    // Flash red overlay then fade to dark red
    explosionOverlay.classList.add('active');
    
    // Change background to dark red
    document.body.style.transition = 'background 1s ease';
    document.body.style.background = 'linear-gradient(135deg, #2a0a0a, #4a1010, #2a0a0a)';
    
    // Fade out overlay after flash
    setTimeout(() => {
        explosionOverlay.style.transition = 'opacity 1.5s ease';
        explosionOverlay.style.opacity = '0';
    }, 400);
    
    // Get only nearby visible elements for performance
    const elements = getExplodableElements();
    
    // Disable pointer events on all elements to prevent interaction during explosion
    const pageWrapper = document.getElementById('pageWrapper');
    if (pageWrapper) {
        pageWrapper.style.pointerEvents = 'none';
    }
    
    // Batch DOM reads first
    const elementData = elements.map(el => {
        const rect = el.getBoundingClientRect();
        return { el, rect };
    });
    
    // Pre-calculate all animation values to avoid recalculating in loop
    const animations = elementData.map((_, index) => ({
        angle: Math.random() * 360,
        distance: 800 + Math.random() * 2000,
        rotateAmount: (Math.random() - 0.5) * 1440,
        duration: 0.8 + Math.random() * 1.5,
        opacityDuration: 1.5 + Math.random(),
        scale: Math.random() * 0.3,
        delay: index * 15
    }));
    
    // Use will-change to hint browser about upcoming animations
    elementData.forEach(({ el }) => {
        el.style.willChange = 'transform, opacity';
    });
    
    // Then batch DOM writes with requestAnimationFrame for smoother animation
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
        
        // Clean up will-change after animations complete to free memory
        setTimeout(() => {
            elementData.forEach(({ el }) => {
                el.style.willChange = 'auto';
            });
        }, 3000);
    });
    
    // Hide bomb container with fade out
    bombContainer.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    bombContainer.style.opacity = '0';
    bombContainer.style.transform = 'scale(0.8)';
    setTimeout(() => {
        bombContainer.style.display = 'none';
    }, 500);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBomb);
} else {
    initBomb();
}
