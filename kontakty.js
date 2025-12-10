document.addEventListener('DOMContentLoaded', () => {
  /* 1) Klik na kartu => fullscreen (zůstává; na téhle stránce se klidně nic nespustí) */
  document.querySelectorAll('.card').forEach(card => {
    const imgEl = card.querySelector('img');
    if (!imgEl) return;

    card.addEventListener('click', () => {
      const caption = card.querySelector('p')?.textContent ?? '';
      const overlay = document.createElement('div');
      overlay.className = 'fullscreen-overlay';
      overlay.innerHTML = `
        <img src="${imgEl.src}" alt="${imgEl.alt || ''}">
        <p>${caption}</p>
      `;
      overlay.addEventListener('click', () => overlay.remove());
      document.body.appendChild(overlay);
    });
  });

  /* 2) Schovávání / zobrazování hlavičky při scrollu */
  const header = document.getElementById('hero-header');
  if (!header) return;

  let lastY = window.scrollY;
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;

    if (y > lastY && y > 80) {
      header.classList.add('hidden');    // dolů => schovat
    } else {
      header.classList.remove('hidden'); // nahoru/nahoře => ukázat
    }

    lastY = y;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
});
