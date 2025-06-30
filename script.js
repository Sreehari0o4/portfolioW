const magicMouse = document.getElementById('magic-mouse');

const clickableSelectors = 'a, button, .works, .contact';

let covering = false;

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
        // convert 3-digit hex to 6-digits.
        if (hex.length === 3) {
            hex = hex.split('').map(x => x + x).join('');
        }
        if (hex.length !== 6) {
            return '#000000';
        }
        // invert color components
        let r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
            g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
            b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
        // pad each with zeros and return
        return "#" + [r, g, b].map(x => x.length === 1 ? "0" + x : x).join('');
    }

    if (color) {
        const hexColor = rgbToHex(color);
        const inverted = invertColor(hexColor);

        magicMouse.style.borderColor = inverted;
        magicMouse.style.background = "transparent";
    }

    // Check if hovering over a clickable element
    if (elem && elem.matches(clickableSelectors)) {
        const rect = elem.getBoundingClientRect();
        magicMouse.style.width = rect.width + 'px';
        magicMouse.style.height = rect.height + 'px';
        magicMouse.style.left = rect.left + rect.width / 2 + 'px';
        magicMouse.style.top = rect.top + rect.height / 2 + 'px';
        magicMouse.classList.add('covering');
        covering = true;
    } else if (covering) {
        // Restore to default size
        magicMouse.style.width = '32px';
        magicMouse.style.height = '32px';
        magicMouse.classList.remove('covering');
        covering = false;
    }
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