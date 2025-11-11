document.addEventListener('DOMContentLoaded', () => {
  /* 1) FULLSCREEN OVERLAY S MINI-THUMBNAILY PRO SKUPINY */

  // vytvoříme overlay jen jednou
  const overlay = document.createElement('div');
  overlay.className = 'fullscreen-overlay';
  overlay.style.display = 'none';

  overlay.innerHTML = `
    <span id="overlay-close">✖</span>
    <img id="overlay-main-img" src="" alt="">
    <div id="overlay-thumbs"></div>
  `;

  document.body.appendChild(overlay);

  const mainImgEl = overlay.querySelector('#overlay-main-img');
  const thumbsContainer = overlay.querySelector('#overlay-thumbs');
  const closeBtn = overlay.querySelector('#overlay-close');

  let currentGroupImgs = [];
  let currentIndex = 0;

  const cards = document.querySelectorAll('.card[data-group]');

  function getImgsInGroup(groupName) {
    const result = [];
    cards.forEach(card => {
      if (card.dataset.group === groupName) {
        const img = card.querySelector('img');
        if (img) result.push(img);
      }
    });
    return result;
  }

  function hideOverlay() {
    overlay.style.display = 'none';
    thumbsContainer.innerHTML = '';
  }

  function renderOverlay() {
    if (!currentGroupImgs.length) return;

    const currentImg = currentGroupImgs[currentIndex];
    mainImgEl.src = currentImg.src;
    mainImgEl.alt = currentImg.alt || '';

    thumbsContainer.innerHTML = '';

    if (currentGroupImgs.length > 1) {
      currentGroupImgs.forEach((imgEl, idx) => {
        if (idx === currentIndex) return;
        const thumb = document.createElement('img');
        thumb.src = imgEl.src;
        thumb.alt = imgEl.alt || '';
        thumb.addEventListener('click', () => {
          currentIndex = idx;
          renderOverlay();
        });
        thumbsContainer.appendChild(thumb);
      });
    }

    overlay.style.display = 'flex';
  }

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const groupName = card.dataset.group;
      if (!groupName) return;

      currentGroupImgs = getImgsInGroup(groupName);

      const clickedImg = card.querySelector('img');
      const idx = currentGroupImgs.findIndex(imgEl => imgEl === clickedImg);
      currentIndex = idx >= 0 ? idx : 0;

      renderOverlay();
    });
  });

  closeBtn.addEventListener('click', hideOverlay);

  overlay.addEventListener('click', e => {
    if (e.target === overlay) {
      hideOverlay();
    }
  });

  /* 2) SCHOVÁNÍ / ZOBRAZENÍ HLAVIČKY PŘI SCROLLU */

  const header = document.getElementById('hero-header');
  if (header) {
    let prev = window.scrollY;

    window.addEventListener('scroll', () => {
      const cur = window.scrollY;

      if (cur > prev && cur > 80) {
        header.classList.add('hidden');
      } else {
        header.classList.remove('hidden');
      }

      prev = cur;
    });
  }
});
