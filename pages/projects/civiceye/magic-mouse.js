const magicMouse = document.querySelector('.custom-cursor');

// Clickable selectors specific to spareparts page
const clickableSelectors = 'a, button, .topbar-button, .back-to-top-btn, .project-link, .screenshot-img, .back-icon, .main-title, .tagline, .developer, .copyright';

document.addEventListener('mousemove', (e) => {
    magicMouse.style.left = e.clientX + 'px';
    magicMouse.style.top = e.clientY + 'px';

    const elem = document.elementFromPoint(e.clientX, e.clientY);

    // Default mouse style: black border with transparent fill
    let borderColor = "#000";
    let background = "transparent";

    // If hovering over a clickable, fill the mouse with specific colors
    if (elem && elem.matches(clickableSelectors)) {
        let fill = window.getComputedStyle(elem).backgroundColor;
        if (fill === 'rgba(0, 0, 0, 0)' || fill === 'transparent') {
            fill = window.getComputedStyle(elem).color;
        }

        // Specific color assignments for different elements
        if (elem.matches('.topbar-button, .back-icon')) {
            fill = '#ff6060'; // Red for topbar elements
        }

        if (elem.matches('.back-to-top-btn')) {
            fill = '#ff6060'; // Red for back-to-top button
        }

        if (elem.matches('.project-link')) {
            fill = '#6f6f6f'; // Gray for project links
        }

        if (elem.matches('.tool-icon')) {
            fill = '#ff6060'; // Red for tool icons
        }

        if (elem.matches('.screenshot-img')) {
            fill = '#2F3737'; // Dark for screenshots
        }

        if (elem.matches('.main-title')) {
            fill = '#2F3737'; // Dark for main title
        }

        if (elem.matches('.tagline')) {
            fill = '#ff6060'; // Red for tagline
        }

        if (elem.matches('.developer')) {
            fill = '#FFFFFF'; // White for developer name
        }

        if (elem.matches('.copyright')) {
            fill = '#CCCCCC'; // Light gray for copyright
        }

        background = fill;
        borderColor = fill;
        magicMouse.style.width = '30px';
        magicMouse.style.height = '30px';
        magicMouse.classList.add('clickable');
        
        // Apply difference blend mode for inverse effect
        magicMouse.style.mixBlendMode = 'difference';
    } else {
        magicMouse.style.width = '30px';
        magicMouse.style.height = '30px';
        magicMouse.classList.remove('clickable');
        
        // Remove blend mode for normal elements
        magicMouse.style.mixBlendMode = 'normal';
    }

    magicMouse.style.borderColor = borderColor;
    magicMouse.style.background = background;
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
    magicMouse.style.opacity = '0';
});

// Show cursor when entering window
document.addEventListener('mouseenter', () => {
    magicMouse.style.opacity = '1';
});