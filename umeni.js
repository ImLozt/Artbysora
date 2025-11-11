// Všechno spustíme až po načtení DOMu
document.addEventListener('DOMContentLoaded', () => {
  /* 1) Klik na kartu => fullscreen obrázek */
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
  if (header) {
    let prev = window.scrollY;

    window.addEventListener('scroll', () => {
      const cur = window.scrollY;

      if (cur > prev && cur > 80) {
        // scrolluješ dolů
        header.classList.add('hidden');
      } else {
        // scrolluješ nahoru, nebo jsi nahoře
        header.classList.remove('hidden');
      }

      prev = cur;
    });
  }
});
