const magicMouse = document.getElementById('magic-mouse');

const clickableSelectors = 'a, .works, .contact, button:not(.logo-btn), .rotating-logo, .lbtn';

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

const leftBtn = document.querySelector('.left-bar .logo-btn');
const leftLogo = leftBtn.querySelector('.rotating-logo');
let rotateToZeroInterval = null;

leftBtn.addEventListener('mouseenter', function() {
    // Get current rotation
    const st = window.getComputedStyle(leftLogo, null);
    const tr = st.getPropertyValue("transform");
    let angle = 0;
    if (tr !== "none") {
        const values = tr.split('(')[1].split(')')[0].split(',');
        const a = values[0];
        const b = values[1];
        angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
        if (angle < 0) angle += 360;
    }
    // Stop infinite animation
    leftLogo.style.animation = 'none';
    leftLogo.style.transition = 'none';
    leftLogo.style.transform = `rotate(${angle}deg)`;

    // Start fast continuous rotation (clockwise) and stop at 0deg
    let current = angle;
    clearInterval(rotateToZeroInterval);
    rotateToZeroInterval = setInterval(() => {
        current += 24; // fast rotation
        if (current >= 360) current -= 360;
        leftLogo.style.transform = `rotate(${current}deg)`;
        // If close to 0deg, snap to 0 and stop
        if (current < 24 || Math.abs(current - 360) < 24) {
            leftLogo.style.transform = `rotate(0deg)`;
            clearInterval(rotateToZeroInterval);
        }
    }, 16); // ~60fps
});

leftBtn.addEventListener('mouseleave', function() {
    clearInterval(rotateToZeroInterval);
    leftLogo.style.transition = '';
    leftLogo.style.transform = '';
    leftLogo.style.animation = 'rotate-logo 8s linear infinite';
});

const rightBtn = document.querySelector('.right-bar .logo-btn');
const rightLogo = rightBtn.querySelector('.logo');
const originalRightSrc = rightLogo.src;

rightBtn.addEventListener('mouseenter', () => {
    rightLogo.src = 'images/xr.png'; // Make sure this path is correct
});

rightBtn.addEventListener('mouseleave', () => {
    rightLogo.src = originalRightSrc;
});

//page transition for about me (existing - slide up)
function transitionToAboutMe() {
    const transition = document.getElementById('page-transition');
    transition.classList.add('active');
    setTimeout(() => {
        window.location.href = 'pages/me.html';
    }, 420);
}

/*slide-in left(myworks)*/
const myworksLink = document.getElementById('myworks-link');
const pageSlideIn = document.getElementById('page-slidein-transition');

if (myworksLink && pageSlideIn) {
    myworksLink.addEventListener('click', function(e) {
        e.preventDefault();
        pageSlideIn.classList.add('active');
        setTimeout(() => {
            window.location.href = myworksLink.href;
        }, 600); // Match the CSS transition duration
    });
}