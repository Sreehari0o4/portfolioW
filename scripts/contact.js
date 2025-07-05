async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showNotification('Phone number copied!');
    } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showNotification('Phone number copied!');
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff6060;
        color: black;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 1000;
        font-family: Coolvetica;
        font-size: 16px;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 2000);
}

// Function to handle top bar button hover effects
function initTopBarHover() {
    const topbarBtn = document.querySelector('.topbar-btn');
    const topbarImg = document.querySelector('.topbar-btn-img');
    
    if (topbarBtn && topbarImg) {
        const originalSrc = topbarImg.src;
        const hoverSrc = originalSrc.replace('backg.svg', 'backr.svg');
        
        topbarBtn.addEventListener('mouseenter', function() {
            topbarImg.src = hoverSrc;
        });
        
        topbarBtn.addEventListener('mouseleave', function() {
            topbarImg.src = originalSrc;
        });
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initTopBarHover);

// Function to handle footer logo hover effects
function initFooterHover() {
    const footerLink = document.querySelector('.footer a');
    const footerImg = document.querySelector('.footer-logo');
    
    if (footerLink && footerImg) {
        const originalSrc = footerImg.src;
        const hoverSrc = originalSrc.replace('meR.png', 'me.png');
        
        footerLink.addEventListener('mouseenter', function() {
            footerImg.src = hoverSrc;
        });
        
        footerLink.addEventListener('mouseleave', function() {
            footerImg.src = originalSrc;
        });
    }
}

// Add this to your existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    initTopBarHover();
    initFooterHover(); // Add this line
});

//magic mouse
// Updated JS snippet to set cursor fill with transparent negative color
const magicMouse = document.getElementById('magic-mouse');
const clickableSelectors = 'a, button:not(.logo-btn), .contact-grid, .phone-number, .footer a, .topbar-btn';

document.addEventListener('mousemove', (e) => {
    magicMouse.style.left = e.clientX + 'px';
    magicMouse.style.top = e.clientY + 'px';

    const elem = document.elementFromPoint(e.clientX, e.clientY);
    let color = elem ? window.getComputedStyle(elem).color : null;

    // Convert rgb/rgba to hex
    function rgbToHex(rgb) {
        const result = rgb.match(/\d+/g);
        if (!result) return "#000";
        return "#" + result.slice(0, 3).map(x => {
            const hex = parseInt(x).toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        }).join('');
    }

    // Invert hex color
    function invertColor(hex) {
        if (hex.indexOf('#') === 0) {
            hex = hex.slice(1);
        }
        if (hex.length === 3) {
            hex = hex.split('').map(x => x + x).join('');
        }
        if (hex.length !== 6) {
            return '#000000';
        }
        let r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
            g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
            b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
        return "#" + [r, g, b].map(x => x.length === 1 ? "0" + x : x).join('');
    }

    // Default mouse style
    let borderColor = "#000";
    let background = "transparent";

    if (color) {
        const hexColor = rgbToHex(color);
        borderColor = invertColor(hexColor);
    }

    // If hovering over a clickable, fill the mouse with transparent negative color
    if (elem && elem.matches(clickableSelectors)) {
        background = 'rgba(0, 0, 0, 0.2)'; // semi-transparent fill
        borderColor = 'rgba(255, 255, 255, 0.7)';
        magicMouse.style.width = '40px';
        magicMouse.style.height = '40px';
        magicMouse.classList.add('magic-mouse--filled');
    } else {
        magicMouse.style.width = '32px';
        magicMouse.style.height = '32px';
        magicMouse.classList.remove('magic-mouse--filled');
    }

    magicMouse.style.borderColor = borderColor;
    magicMouse.style.background = background;
});

// Add effect on hover for clickable elements
const hoverElements = document.querySelectorAll('a, .works, .contact, .main-text, .sub-text, .text-small, .phone-number, button, .footer a, .topbar-btn');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        magicMouse.classList.add('magic-mouse--active');
    });
    el.addEventListener('mouseleave', () => {
        magicMouse.classList.remove('magic-mouse--active');
    });
});


