/* ═══════════════════════════════════════════════════════
   DEEP HORIZON — APP.JS
   UI interactions, bubbles, scroll reveals, cursor, nav
═══════════════════════════════════════════════════════ */

'use strict';

/* ── Custom Cursor ── */
(function () {
  const dot = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  // Track if audio is fading to prevent conflicts
  let isAudioFading = false;
  let isMoving = false;

  document.addEventListener('mousemove', e => {
    if (!isMoving) {
      ringX = e.clientX;
      ringY = e.clientY;
      isMoving = true;
    }
    mouseX = e.clientX;
    mouseY = e.clientY;

    // O ponto segue instantaneamente
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  function animate() {
    if (isMoving) {
      // Interpolação linear (lerp): atual + (alvo - atual) * fator
      // 0.15 é um bom equilíbrio entre fluidez e resposta
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
    }

    requestAnimationFrame(animate);
  }
  animate();

  document.querySelectorAll('a, button, .lore-card, .mech-card, .monster-card, .team-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.width = '18px';
      dot.style.height = '18px';
      ring.style.width = '50px';
      ring.style.height = '50px';
      ring.style.borderColor = 'var(--teal)';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.width = '10px';
      dot.style.height = '10px';
      ring.style.width = '34px';
      ring.style.height = '34px';
      ring.style.borderColor = 'rgba(0, 200, 255, 0.5)';
    });
  });
})();


/* ── Scroll Reveal ── */
(function () {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('up');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: .12 });
  els.forEach(el => obs.observe(el));
})();


/* ── Nav active state + scrolled ── */
(function () {
  const nav = document.getElementById('nav');
  const links = document.querySelectorAll('.nav-links a');
  const sections = ['hero', 'lore', 'gameplay', 'weapons', 'monsters', 'element-sec', 'wreck', 'inspiration', 'team', 'encounter'];

  window.addEventListener('scroll', () => {
    // scrolled class
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');

    // active link
    let current = 'hero';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      if (el.getBoundingClientRect().top <= 90) current = id;
    });
    links.forEach(a => {
      const href = a.getAttribute('href').replace('#', '');
      a.classList.toggle('active', href === current);
    });

    // Toggle horror mode UI visibility
    const isHorror = current === 'encounter';
    document.body.classList.toggle('is-horror', isHorror);
    document.documentElement.classList.toggle('is-horror', isHorror);

    // Audio & Video control
    const ambient = document.getElementById('horror-ambient');
    const video = document.getElementById('horror-video');

    if (ambient) {
      if (isHorror) {
        // Stop retrying if the horror section finished
        if (!document.body.classList.contains('video-ended')) {
          if (ambient.paused) {
            ambient.volume = 1;
            ambient.play().catch(() => { });
          }
          if (video && video.paused) {
            video.play().catch(() => { });
          }
        }
      } else {
        ambient.pause();
        ambient.currentTime = 0;
        if (video) {
          video.pause();
          if (video.readyState >= 1) {
            video.currentTime = 0;
          }
        }
        document.body.classList.remove('video-ended');
      }
    }
  }, { passive: true });

  // Use the horrorVideo reference correctly
  const horrorVideo = document.getElementById('horror-video');
  if (horrorVideo) {
    horrorVideo.addEventListener('ended', () => {
      document.body.classList.add('video-ended');

      // Stop audio immediately
      const ambient = document.getElementById('horror-ambient');
      if (ambient) {
        ambient.pause();
        ambient.currentTime = 0;
      }
    });
  }

  // Global click to unlock audio context (Browser requirement)
  window.addEventListener('click', () => {
    const ambient = document.getElementById('horror-ambient');
    const video = document.getElementById('horror-video');
    if (ambient) {
      if (document.body.classList.contains('is-horror') && !document.body.classList.contains('video-ended')) {
        ambient.volume = 1;
        if (ambient.paused) {
          ambient.play().catch(() => { });
        }
        if (video) {
          video.muted = false;
          if (video.paused) {
            video.play().catch(() => { });
          }
        }
      }
    }
  }, { passive: true });
})();


/* ── Bubble Generator ── */
function spawnBubbles(containerId, count) {
  const c = document.getElementById(containerId);
  if (!c) return;
  for (let i = 0; i < count; i++) {
    const b = document.createElement('div');
    b.className = 'bub';
    const size = Math.random() * 12 + 2;
    b.style.width = size + 'px';
    b.style.height = size + 'px';
    b.style.left = Math.random() * 100 + '%';
    b.style.bottom = (-size) + 'px';
    b.style.animationDuration = (Math.random() * 14 + 7) + 's';
    b.style.animationDelay = (Math.random() * 10) + 's';
    b.style.opacity = (Math.random() * .35 + .08);
    c.appendChild(b);
  }
}

['bubbles-hero', 'bubbles-lore', 'bubbles-gameplay', 'bubbles-weapons',
  'bubbles-monsters', 'bubbles-element', 'bubbles-wreck', 'bubbles-inspiration'].forEach(id => spawnBubbles(id, 18));


/* ── Element Particles (green glow drifters) ── */
(function () {
  const layer = document.getElementById('element-particle-layer');
  if (!layer) return;
  for (let i = 0; i < 28; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 5 + 1;
    p.style.cssText = `
      position: absolute;
      width: ${size}px; height: ${size}px;
      background: #44ff44;
      left: ${Math.random() * 100}%; top: ${Math.random() * 100}%;
      box-shadow: 0 0 ${size * 3}px #44ff44, 0 0 ${size * 6}px rgba(60,255,60,.3);
      animation: rise ${Math.random() * 9 + 5}s linear infinite;
      animation-delay: ${Math.random() * 8}s;
      opacity: ${Math.random() * .5 + .15};
      image-rendering: pixelated;
    `;
    layer.appendChild(p);
  }
})();


/* ── Animate stat bars on scroll into view ── */
(function () {
  const bars = document.querySelectorAll('.el-stat-fill, .wstat-fill');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = e.target.dataset.width || e.target.style.width;
        e.target.style.width = '0%';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            e.target.style.transition = 'width 1.2s cubic-bezier(.22,.61,.36,1)';
            e.target.style.width = target;
          });
        });
        obs.unobserve(e.target);
      }
    });
  }, { threshold: .5 });
  bars.forEach(b => {
    b.dataset.width = b.style.width;
    b.style.width = '0%';
    obs.observe(b);
  });
})();


/* ── Monster card flicker on hover ── */
(function () {
  document.querySelectorAll('.monster-card').forEach(card => {
    const cvs = card.querySelector('canvas');
    if (!cvs) return;
    card.addEventListener('mouseenter', () => {
      cvs.style.transition = 'filter .15s';
      cvs.style.filter = 'brightness(1.4) saturate(1.5) drop-shadow(0 0 20px lime)';
    });
    card.addEventListener('mouseleave', () => {
      cvs.style.filter = '';
    });
  });
})();


/* ── Depth number counter animation in hero ── */
(function () {
  const el = document.getElementById('depth-num');
  if (!el) return;
  let lastVal = 0;
  function update() {
    const v = parseInt(el.textContent) || 0;
    if (v !== lastVal) {
      el.style.color = '#00e5cc';
      setTimeout(() => el.style.color = '', 200);
      lastVal = v;
    }
    requestAnimationFrame(update);
  }
  update();
})();


/* ── Glitch effect on title (rare) ── */
(function () {
  const title = document.querySelector('.hero-title');
  if (!title) return;
  function glitch() {
    title.style.transform = `skewX(${(Math.random() - .5) * 3}deg) translateX(${(Math.random() - .5) * 4}px)`;
    title.style.filter = `hue-rotate(${Math.random() * 30}deg)`;
    setTimeout(() => {
      title.style.transform = '';
      title.style.filter = '';
    }, 60 + Math.random() * 80);
  }
  setInterval(() => {
    if (Math.random() < .15) {
      glitch();
      setTimeout(glitch, 120);
    }
  }, 3500);
})();


/* ── Typewriter for hero eyebrow ── */
(function () {
  const el = document.querySelector('.hero-eyebrow');
  if (!el) return;
  const text = el.textContent;
  el.textContent = '';
  el.style.opacity = '1';
  let i = 0;
  function type() {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(type, 55 + Math.random() * 40);
    }
  }
  setTimeout(type, 600);
})();

