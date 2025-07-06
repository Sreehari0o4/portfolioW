const backButton = document.querySelector('.back-button img');
const projectRectangles = document.querySelectorAll('.project-rectangle');
const projectInfo = document.getElementById('project-info');
const projectTitle = document.getElementById('project-title');
const projectDescription = document.getElementById('project-description');

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
        
        projectTitle.textContent = title;
        projectDescription.textContent = description;
        projectInfo.classList.add('show');
    });
    
    rectangle.addEventListener('mouseleave', () => {
        projectInfo.classList.remove('show');
    });
});
