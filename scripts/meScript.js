const magicMouse = document.getElementById('magic-mouse');

const clickableSelectors = 'a, p, .back-btn,.about-me-content, .about-me-keyword, .about-me-name, .me-bg-img, .me-bg-img, .about-me-title, button';

document.addEventListener('mousemove', (e) => {
    magicMouse.style.left = e.clientX + 'px';
    magicMouse.style.top = e.clientY + 'px';

    const elem = document.elementFromPoint(e.clientX, e.clientY);

    // Default mouse style: always white circle (border and fill)
    let borderColor = "#FFF";
    let background = "#FFF";

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
