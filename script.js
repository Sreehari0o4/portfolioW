const magicMouse = document.getElementById('magic-mouse');

const clickableSelectors = 'a, .works, .contact, button:not(.logo-btn)';

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

    // If hovering over a clickable, fill the mouse with its color (no covering)
    if (elem && elem.matches(clickableSelectors)) {
        let fill = window.getComputedStyle(elem).backgroundColor;
        if (fill === 'rgba(0, 0, 0, 0)' || fill === 'transparent') {
            fill = window.getComputedStyle(elem).color;
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

// Add effect on links and dark backgrounds
document.querySelectorAll('a, .works, .contact, .main-text, .sub-text, .text-small').forEach(el => {
    el.addEventListener('mouseenter', () => {
        magicMouse.classList.add('magic-mouse--active');
    });
    el.addEventListener('mouseleave', () => {
        magicMouse.classList.remove('magic-mouse--active');
    });
});