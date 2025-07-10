const backButton = document.querySelector('.back-button img');
const projectRectangles = document.querySelectorAll('.project-rectangle');
const projectInfo = document.getElementById('project-info');
const projectTitle = document.getElementById('project-title');
const projectDescription = document.getElementById('project-description');
const descriptionText = document.querySelector('.description-text');
const techStack = document.getElementById('tech-stack');
const defaultText = document.getElementById('default-text');
const moreLink = document.getElementById('more-link');

// Back button functionality
backButton.addEventListener('mouseover', () => {
    backButton.src = '../images/backr.svg';
    backButton.style.transform = 'rotate(-90deg)';
});

backButton.addEventListener('mouseout', () => {
    backButton.src = '../images/backb.svg';
    backButton.style.transform = 'rotate(0deg)';
});

// More link functionality
moreLink.addEventListener('click', (e) => {
    e.preventDefault();
    // Add your navigation logic here
    console.log('Navigate to more projects');
    // Example: window.location.href = '../pages/more-projects.html';
});

// Project hover functionality
projectRectangles.forEach(rectangle => {
    rectangle.addEventListener('mouseenter', () => {
        const title = rectangle.getAttribute('data-title');
        const description = rectangle.getAttribute('data-description');
        const stack = rectangle.getAttribute('data-stack');
        
        projectTitle.textContent = title;
        descriptionText.textContent = description;
        techStack.textContent = stack;
        
        // Hide default text and show project info
        defaultText.classList.add('hide');
        projectInfo.classList.add('show');
    });
    
    rectangle.addEventListener('mouseleave', () => {
        // Show default text and hide project info
        projectInfo.classList.remove('show');
        defaultText.classList.remove('hide');
    });
});

//magic mouse for myworks page
const magicMouse = document.getElementById('magic-mouse');

// Fixed the topbar button selector (removed the dot and space)
const clickableSelectors = 'a, button, .main-heading, body, img, .project-rectangle';

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

        if (elem.matches('.project-rectangle')) {
            fill = '#ff6060'; // for top-bar-btn
        }

        if (elem.matches('img')) {
            fill = '#ff6060'; // for back-button
        }

        if (elem.matches('.main-heading')) {
            fill = '#fff'; // for heading
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
