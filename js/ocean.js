/* ═══════════════════════════════════════════════════════
   DEEP HORIZON — OCEAN.JS
   Animated ocean background + submarine controller
═══════════════════════════════════════════════════════ */

'use strict';

/* ── Ocean Background Canvas ── */
const Ocean = (function() {
  const canvas = document.getElementById('ocean-bg');
  const ctx = canvas.getContext('2d');
  let W, H, time = 0;
  let scrollRatio = 0;

  // Particles
  const pts = [];
  function initParticles() {
    pts.length = 0;
    for(let i = 0; i < 160; i++) {
      pts.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - .5) * .18,
        vy: (Math.random() - .5) * .12,
        r: Math.random() * 1.6 + .25,
        a: Math.random() * .55 + .08,
        green: Math.random() > .72,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    initParticles();
  }

  function setScroll(r) { scrollRatio = r; }

  let subX = 0, subY = 0;
  function setSubPos(x, y) { subX = x; subY = y; }

  function frame() {
    time += .012;
    ctx.clearRect(0, 0, W, H);

    const d = Math.min(scrollRatio, 1);

    // Deepening background
    const rC = Math.round(1  + 12 * (1 - d));
    const gC = Math.round(3  + 22 * (1 - d));
    const bC = Math.round(8  + 46 * (1 - d));
    ctx.fillStyle = `rgb(${rC},${gC},${bC})`;
    ctx.fillRect(0, 0, W, H);

    // Caustic light rays (only near surface)
    if (d < .65) {
      const opacity = (.65 - d) * .12;
      for(let i = 0; i < 6; i++) {
        const rx = (Math.sin(time * .22 + i * 1.5) * .5 + .5) * W;
        const ry = (Math.sin(time * .16 + i * .8) * .5 + .5) * H * .7;
        const grd = ctx.createRadialGradient(rx, ry, 0, rx, ry, 100 + Math.sin(time + i) * 30);
        grd.addColorStop(0, `rgba(0,140,240,${opacity})`);
        grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, W, H);
      }
    }

    // Bioluminescent glow (deeper sections)
    if (d > .45) {
      const bOp = (d - .45) * .18;
      for(let i = 0; i < 4; i++) {
        const gx = (Math.sin(time * .15 + i * 2.1) * .5 + .5) * W;
        const gy = (Math.sin(time * .12 + i * 1.4) * .5 + .5) * H;
        const grd = ctx.createRadialGradient(gx, gy, 0, gx, gy, 80);
        grd.addColorStop(0, `rgba(80,255,80,${bOp})`);
        grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, W, H);
      }
    }

    // Particles
    pts.forEach(p => {
      p.x += p.vx;
      p.y += p.vy + Math.sin(time + p.phase) * .04;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      const depth_fade = d > .7 ? .4 : d > .4 ? .7 : 1;
      const alpha = p.a * depth_fade * (.8 + Math.sin(time * 1.5 + p.phase) * .2);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.green
        ? `rgba(60,255,100,${alpha * .5})`
        : `rgba(0,180,255,${alpha * .28})`;
      ctx.fill();
    });

    // Submarine light cone
    if (subX && subY) {
      const coneGrd = ctx.createRadialGradient(subX, subY, 0, subX, subY, 220);
      coneGrd.addColorStop(0, `rgba(0,200,255,${.07 * (1 - d * .5)})`);
      coneGrd.addColorStop(.5, `rgba(0,200,255,${.03 * (1 - d * .5)})`);
      coneGrd.addColorStop(1, 'transparent');
      ctx.fillStyle = coneGrd;
      ctx.fillRect(0, 0, W, H);
    }

    requestAnimationFrame(frame);
  }

  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(frame);

  return { setScroll, setSubPos };
})();


/* ── Submarine Controller ── */
const SubController = (function() {
  const wrap    = document.getElementById('sub-wrap');
  const subCvs  = document.getElementById('sub-canvas');
  const glow    = document.getElementById('sub-glow');

  let curX = 100, curY = 200;
  let tgtX = 100, tgtY = 200;
  let flipped = false;
  let animT = 0;
  let depth = 0;

  // Section target positions (xRatio, yRatio)
  const targets = [
    { xr:.68, yr:.22 },  // hero
    { xr:.12, yr:.48 },  // lore
    { xr:.70, yr:.28 },  // gameplay
    { xr:.15, yr:.55 },  // weapons
    { xr:.72, yr:.42 },  // monsters
    { xr:.18, yr:.35 },  // element
    { xr:.60, yr:.50 },  // wreck
    { xr:.45, yr:.18 },  // team
  ];

  const sectionIds = ['hero','lore','gameplay','weapons','monsters','element-sec','wreck','team'];

  function getActiveSection() {
    let active = 0;
    sectionIds.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (el.getBoundingClientRect().top <= window.innerHeight * .52) active = i;
    });
    return active;
  }

  function setTarget(secIdx) {
    const t = targets[secIdx] || targets[0];
    const sw = subCvs.width, sh = subCvs.height;
    tgtX = t.xr * (window.innerWidth - sw);
    tgtY = t.yr * (window.innerHeight - sh);

    const shouldFlip = t.xr > .5;
    if (shouldFlip !== flipped) {
      flipped = shouldFlip;
      subCvs.style.transform = flipped ? 'scaleX(-1)' : 'scaleX(1)';
    }
  }

  function drawSub() {
    // Animate engine flame
    const scale = 5;
    const art = [
      '.......................',
      '.........BBBB.........',
      '........BAAAB.........',
      '.....CCCBAAAAABDD.....',
      '....CAAAAAAAAABDDDE...',
      '...CAAAAAAAAAABDDDE...',
      '...CAAAAFGAAAAAADDE...',
      '...CAAAAFGAAAAAADDE...',
      '....CAAAAAAAAABDDDE...',
      '.....CCCBAAAAABDD.....',
      '.....HHHIIIIJJJJ......',
      '.......................',
      '.......................',
    ];
    const flicker = Math.sin(animT * 0.35) * 0.4 + 0.6;
    const p = {
      A:'#525870', B:'#8a8da8', C:'#363852',
      D:'#70728a',
      E: `rgba(${200 + Math.round(flicker*55)},${70 + Math.round(flicker*30)},10,1)`,
      F:'#182338', G:'#00c8ff',
      H: `rgba(255,${150+Math.round(flicker*50)},0,0.9)`,
      I: `rgba(255,${80+Math.round(flicker*40)},0,0.9)`,
      J: `rgba(255,30,0,0.8)`,
    };
    subCvs.width  = art[0].length * scale;
    subCvs.height = art.length * scale;
    const ctx = subCvs.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    art.forEach((row, y) => {
      [...row].forEach((c, x) => {
        if (c === '.' || !p[c]) return;
        ctx.fillStyle = p[c];
        ctx.fillRect(x * scale, y * scale, scale, scale);
      });
    });

    // Porthole window glow
    const pgrd = ctx.createRadialGradient(16*scale, 6.5*scale, 0, 16*scale, 6.5*scale, 2.5*scale);
    pgrd.addColorStop(0, `rgba(0,200,255,${0.5 + Math.sin(animT*.2)*.15})`);
    pgrd.addColorStop(1, 'transparent');
    ctx.fillStyle = pgrd;
    ctx.fillRect(0, 0, subCvs.width, subCvs.height);
  }

  function lerp(a, b, t) { return a + (b - a) * t; }

  function tick() {
    animT += 0.6;
    // Smooth movement
    curX = lerp(curX, tgtX, .032);
    curY = lerp(curY, tgtY, .028);

    // Bob
    const bob = Math.sin(animT * .018) * 4;
    const wobble = Math.sin(animT * .03) * 1.5;

    wrap.style.left = Math.round(curX) + 'px';
    wrap.style.top  = Math.round(curY + bob) + 'px';
    wrap.style.transform = `rotate(${wobble}deg)`;

    // Update glow opacity based on depth
    glow.style.opacity = Math.max(.3, 1 - depth * .7);

    // Deepen filter
    if (depth > .6) {
      wrap.style.filter = `drop-shadow(0 0 10px rgba(140,80,255,${(depth-.6)*1.5})) saturate(${1-depth*.4})`;
    } else {
      wrap.style.filter = `drop-shadow(0 0 ${12 + Math.sin(animT*.015)*4}px rgba(0,200,255,${.5+Math.sin(animT*.02)*.2}))`;
    }

    // Feed ocean the sub center position
    Ocean.setSubPos(curX + subCvs.width / 2, curY + bob + subCvs.height / 2);

    drawSub();
    requestAnimationFrame(tick);
  }

  function onScroll() {
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    depth = Math.max(0, Math.min(1, scrollY / maxScroll));
    Ocean.setScroll(depth);
    setTarget(getActiveSection());

    // depth fill
    const fill = document.getElementById('depth-progress');
    const num  = document.getElementById('depth-num');
    if (fill) fill.style.height = (depth * 100) + '%';
    if (num)  num.textContent = Math.round(depth * 5000) + 'm';
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => setTarget(getActiveSection()));

  tick();
  onScroll();

  return {};
})();
