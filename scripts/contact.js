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
