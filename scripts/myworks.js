const backButton = document.querySelector('.back-button img');

backButton.addEventListener('mouseover', () => {
    backButton.src = '../images/backr.svg';
    backButton.style.transform = 'rotate(-90deg)';
});

backButton.addEventListener('mouseout', () => {
    backButton.src = '../images/backg.svg';
    backButton.style.transform = 'rotate(0deg)';
});
