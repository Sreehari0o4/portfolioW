const backButton = document.querySelector('.back-button img');
const projectRectangles = document.querySelectorAll('.project-rectangle');
const projectInfo = document.getElementById('project-info');
const projectTitle = document.getElementById('project-title');
const projectDescription = document.getElementById('project-description');
const descriptionText = document.querySelector('.description-text');
const techStack = document.getElementById('tech-stack');
const defaultText = document.getElementById('default-text');

// Back button functionality
backButton.addEventListener('mouseover', () => {
    backButton.src = '../images/backr.svg';
    backButton.style.transform = 'rotate(-90deg)';
});

backButton.addEventListener('mouseout', () => {
    backButton.src = '../images/backb.svg';
    backButton.style.transform = 'rotate(0deg)';
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
