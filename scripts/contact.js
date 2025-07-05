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


//magic mouse for contact page
const magicMouse = document.getElementById('magic-mouse');

// Fixed the topbar button selector (removed the dot and space)
const clickableSelectors = 'a, button, .phone-number, .footer-logo, .main-heading, .contact-item, .contact-grid, .topbar-btn-img';

document.addEventListener('mousemove', (e) => {
    magicMouse.style.left = e.clientX + 'px';
    magicMouse.style.top = e.clientY + 'px';

    const elem = document.elementFromPoint(e.clientX, e.clientY);

    // Default mouse style: always white circle (border and fill)
    let borderColor = "#FFF";
    let background = "#000";

    // If hovering over a clickable, fill the mouse with its color (no covering)
    if (elem && elem.matches(clickableSelectors)) {
        let fill = window.getComputedStyle(elem).backgroundColor;
        if (fill === 'rgba(0, 0, 0, 0)' || fill === 'transparent') {
            fill = window.getComputedStyle(elem).color;
        }

        // Special handling for topbar button image to ensure visibility
        if (elem.matches('.topbar-btn-img')) {
            fill = '#ff6060'; // for top-bar-btn
        }

        if (elem.matches('.footer-logo')) {
            fill = '#fff'; // for footer logo
        }

        background = fill;
        borderColor = fill;
        magicMouse.style.width = '32px';
        magicMouse.style.height = '32px';
        magicMouse.classList.remove('covering');
    } else {
        magicMouse.style.width = '32px';
        magicMouse.style.height = '32px';
        magicMouse.classList.remove('covering');
    }

    magicMouse.style.borderColor = borderColor;
    magicMouse.style.background = background;
});



