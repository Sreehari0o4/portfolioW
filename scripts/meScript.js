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


/*page transition*/
window.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
      document.querySelector('.about-content').classList.add('visible');
    }, 10); // Delay in milliseconds
  });

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('about-modal');
  const openMore = document.getElementById('more-about-link');
  if (!modal || !openMore) return;

  const closeEls = modal.querySelectorAll('[data-close]');
  let lastFocus = null;

  const focusablesSel = 'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])';
  function getFocusables() {
    return [...modal.querySelectorAll(focusablesSel)];
  }

  function openModal() {
    lastFocus = document.activeElement;
    document.body.classList.add('modal-open');
    modal.classList.add('about-modal--open');
    modal.setAttribute('aria-hidden', 'false');
    const f = getFocusables();
    if (f[0]) f[0].focus();
  }

  function closeModal() {
    modal.classList.remove('about-modal--open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lastFocus) lastFocus.focus();
  }

  openMore.addEventListener('click', e => {
    e.preventDefault();
    openModal();
  });

  closeEls.forEach(el => el.addEventListener('click', closeModal));

  modal.addEventListener('click', e => {
    if (e.target.classList.contains('about-modal__backdrop')) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('about-modal--open')) closeModal();
    if (e.key === 'Tab' && modal.classList.contains('about-modal--open')) {
      const f = getFocusables();
      if (!f.length) return;
      const i = f.indexOf(document.activeElement);
      if (e.shiftKey && (i <= 0)) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    }
  });
});
