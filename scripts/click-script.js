// Smooth cursor implementation for click.html
const magicMouse = document.getElementById('magic-mouse');

// Initialize cursor as visible
if (magicMouse) {
    magicMouse.style.opacity = '1';
    magicMouse.style.display = 'block';
    magicMouse.style.visibility = 'visible';
}

// Use requestAnimationFrame for smoother cursor movement
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
const smoothFactor = 0.15; // Lower for smoother but slower movement

// Track mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Ensure cursor is always visible when mouse moves
    if (magicMouse) {
        magicMouse.style.opacity = '1';
    }
});

// Animation loop for smooth cursor movement
function updateCursorPosition() {
    // Calculate smooth movement
    cursorX += (mouseX - cursorX) * smoothFactor;
    cursorY += (mouseY - cursorY) * smoothFactor;
    
    if (magicMouse) {
        // Make sure the cursor is visible everywhere
        magicMouse.style.opacity = '1';
        magicMouse.style.transform = `translate(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%))`;
        
        const elem = document.elementFromPoint(cursorX, cursorY);
        if (elem) {
            // Handle hovering over specific elements
            if (elem.matches('.gallery-image')) {
                magicMouse.classList.add('magic-mouse--active');
            } else if (!elem.matches('a, .works, .contact, button, .logo')) {
                magicMouse.classList.remove('magic-mouse--active');
            }
        }
    }
    
    // Continue animation loop
    requestAnimationFrame(updateCursorPosition);
}

// Start the animation loop
requestAnimationFrame(updateCursorPosition);

// Add mouse effects for interactive elements
document.querySelectorAll('a, .works, .contact, button, .logo').forEach(el => {
    el.addEventListener('mouseenter', () => {
        magicMouse.classList.add('magic-mouse--active');
    });
    el.addEventListener('mouseleave', () => {
        // Check if we're hovering over another interactive element
        const elemUnderCursor = document.elementFromPoint(cursorX, cursorY);
        if (!elemUnderCursor || !elemUnderCursor.matches('a, .works, .contact, button, .logo')) {
            magicMouse.classList.remove('magic-mouse--active');
        }
    });
});

// Optimize image hover interaction
const galleryImages = document.querySelectorAll('.gallery-image');
galleryImages.forEach(img => {
    img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.02)';
        magicMouse.classList.add('magic-mouse--active');
    });
    
    img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
        magicMouse.classList.remove('magic-mouse--active');
    });
});

// Remove default interaction from original script
const leftBtn = document.querySelector('.left-bar .logo-btn');
if (leftBtn) {
    const leftLogo = leftBtn.querySelector('.rotating-logo');
    if (leftLogo) {
        leftLogo.style.animation = 'none';
    }
}
