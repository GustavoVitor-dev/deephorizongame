/* ═══════════════════════════════════════════════════════
   DEEP HORIZON — SPRITES.JS
   All pixel art drawn programmatically via canvas
═══════════════════════════════════════════════════════ */

'use strict';

const S = window.Sprites = {};

/* ── core pixel draw ── */
function px(ctx, art, palette, scale) {
  art.forEach((row, y) => {
    [...row].forEach((c, x) => {
      if (c === '.' || !palette[c]) return;
      ctx.fillStyle = palette[c];
      ctx.fillRect(x * scale, y * scale, scale, scale);
    });
  });
}

function makeCanvas(w, h, scale) {
  const c = document.createElement('canvas');
  c.width = w * scale;
  c.height = h * scale;
  const ctx = c.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  return { c, ctx };
}

/* ─────────────────────────────────────────────
   SUBMARINE  (22×13 → scale 5 = 110×65)
───────────────────────────────────────────── */
S.drawSub = function(canvas) {
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
  const p = {
    A:'#525870', B:'#8a8da8', C:'#363852',
    D:'#70728a', E:'#c8480a',
    F:'#182338', G:'#00c8ff',
    H:'#ff9900', I:'#ff5500', J:'#ff2200',
  };
  canvas.width  = art[0].length * scale;
  canvas.height = art.length * scale;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  px(ctx, art, p, scale);
  // porthole glow
  const grd = ctx.createRadialGradient(16*scale, 6.5*scale, 0, 16*scale, 6.5*scale, 2*scale);
  grd.addColorStop(0, 'rgba(0,200,255,0.55)');
  grd.addColorStop(1, 'transparent');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

/* ─────────────────────────────────────────────
   ELEMENT FRAGMENT  (12×12 → scale 8)
───────────────────────────────────────────── */
S.drawElementFrag = function(canvas, scale=8) {
  const art = [
    '............',
    '....AAAA....',
    '...ABBBBA...',
    '..ABCCCBBA..',
    '.ABCDDDDCBA.',
    '.ABCDEEEDBA.',
    '.ABCDDDECBA.',
    '.ABCCCCCBA..',
    '..ABBBBBA...',
    '...AAAAA....',
    '............',
    '............',
  ];
  const p = {
    A:'#1a8a30', B:'#2db84a', C:'#55ee6a',
    D:'#aaff88', E:'#ffffff',
  };
  canvas.width = art[0].length * scale;
  canvas.height = art.length * scale;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  px(ctx, art, p, scale);
};

/* ─────────────────────────────────────────────
   O2 BUBBLE  (10×10 → scale 7)
───────────────────────────────────────────── */
S.drawO2 = function(canvas) {
  const scale = 7;
  const art = [
    '..........',
    '..AAAAAA..',
    '.ABBBBBBA.',
    '.ABCCCBBA.',
    '.ABCBBBA..',
    '.ABBBBA...',
    '.ABBBBA...',
    '.AABBBA...',
    '..AAAA....',
    '..........',
  ];
  const p = { A:'#3388bb', B:'rgba(100,180,255,0.85)', C:'#e8f8ff' };
  canvas.width = art[0].length * scale;
  canvas.height = art.length * scale;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  px(ctx, art, p, scale);
  // "O2" text
  ctx.fillStyle = 'rgba(0,180,255,0.9)';
  ctx.font = `bold ${scale*1.4}px monospace`;
  ctx.textAlign = 'center';
  ctx.fillText('O₂', art[0].length*scale/2, art.length*scale*0.65);
};

/* ─────────────────────────────────────────────
   LANTERN SPRITE (10×12 → scale 6)
───────────────────────────────────────────── */
S.drawLantern = function(canvas) {
  const scale = 6;
  const art = [
    '..........',
    '...AAAA...',
    '..ABBBBA..',
    '.ABBCCBBA.',
    '.ABBCCCBA.',
    '.ABBCCCBA.',
    '.ABBCCCBA.',
    '..ABBBBA..',
    '...AAAA...',
    '....BB....',
    '...ABBA...',
    '..........',
  ];
  const p = { A:'#886644', B:'#ffcc44', C:'#ffffff' };
  canvas.width = art[0].length * scale;
  canvas.height = art.length * scale;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  px(ctx, art, p, scale);
  // glow
  const grd = ctx.createRadialGradient(5*scale, 5*scale, scale, 5*scale, 5*scale, 5*scale);
  grd.addColorStop(0, 'rgba(255,200,50,0.25)');
  grd.addColorStop(1, 'transparent');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

/* ─────────────────────────────────────────────
   WATER BLADE ATTACK (14×8 → scale 6)
───────────────────────────────────────────── */
S.drawBlade = function(canvas) {
  const scale = 6;
  const art = [
    '..............',
    '........AAAAA.',
    '.....AAAAAAAA.',
    '..AAAAAAAAAAB.',
    '.AAAAAAAAAB...',
    '....AAAAA.....',
    '.....AAA......',
    '..............',
  ];
  const p = { A:'#00c8ff', B:'#ffffff' };
  canvas.width = art[0].length * scale;
  canvas.height = art.length * scale;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  px(ctx, art, p, scale);
  // trail glow
  const grd = ctx.createLinearGradient(0, 0, canvas.width, 0);
  grd.addColorStop(0, 'transparent');
  grd.addColorStop(0.8, 'rgba(0,200,255,0.18)');
  grd.addColorStop(1, 'rgba(255,255,255,0.3)');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

/* ─────────────────────────────────────────────
   HEART / HP  (9×8 → scale 6)
───────────────────────────────────────────── */
S.drawHeart = function(canvas, full=true) {
  const scale = 5;
  const art = [
    '.........',
    '.AA..AA..',
    'ABBBABBA.',
    'ABBBBBBA.',
    '.ABBBBBA.',
    '..ABBBA..',
    '...ABA...',
    '....A....',
  ];
  const p = full ? { A:'#cc1111', B:'#ff3333' } : { A:'#441111', B:'#661111' };
  canvas.width = art[0].length * scale;
  canvas.height = art.length * scale;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  px(ctx, art, p, scale);
};

/* ─────────────────────────────────────────────
   O2 EMPTY (skull)  (12×12 → scale 5)
───────────────────────────────────────────── */
S.drawSkull = function(canvas) {
  const scale = 5;
  const art = [
    '............',
    '...AAAAAA...',
    '..ABBBBBBA..',
    '.ABBBBBBBBA.',
    '.ABBCBBCBBA.',
    '.ABBBBBBBBA.',
    '.ABBDBBDBBA.',
    '.AABBBBBBA..',
    '..AABBBBAA..',
    '...AAAAAA...',
    '............',
    '............',
  ];
  const p = { A:'#553333', B:'#cc4444', C:'#000000', D:'#ffffff' };
  canvas.width = art[0].length * scale;
  canvas.height = art.length * scale;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  px(ctx, art, p, scale);
};

/* ─────────────────────────────────────────────
   COLLECTION BOX (crate)  (12×12 → scale 5)
───────────────────────────────────────────── */
S.drawCrate = function(canvas) {
  const scale = 5;
  const art = [
    '............',
    '.AAAAAAAAAA.',
    '.ABBBBBBBBA.',
    '.ABCCCCCCBA.',
    '.ABCDDDDCBA.',
    '.ABCDBDDCBA.',
    '.ABCDDDDCBA.',
    '.ABCDDDDCBA.',
    '.ABCCCCCCBA.',
    '.ABBBBBBBBA.',
    '.AAAAAAAAAA.',
    '............',
  ];
  const p = { A:'#443322', B:'#665544', C:'#1a8a30', D:'#55ee6a' };
  canvas.width = art[0].length * scale;
  canvas.height = art.length * scale;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  px(ctx, art, p, scale);
};

/* ─────────────────────────────────────────────
   EXTRACTION POINT / DOCK  (20×14 → scale 5)
───────────────────────────────────────────── */
S.drawDock = function(canvas) {
  const scale = 5;
  const art = [
    '.....................',
    '..AAAAAAAAAAAAAAA...',
    '..ABBBBBBBBBBBBA...',
    '..ABCCCCCCCCCCBA...',
    '..ABCAAAAAAAAACBA...',
    '..ABCAADDDDAACBA...',
    '..ABCAADDDDAACBA...',
    '..ABCAAAAAAAAACBA...',
    '..ABCCCCCCCCCCBA...',
    '..ABBBBBBBBBBBBA...',
    '..AAAAAAAAAAAAAAA...',
    '...EEEEEEEEEEEEE...',
    '.....................',
    '.....................',
  ];
  const p = {
    A:'#334455', B:'#4a6070', C:'#223344',
    D:'#00c8ff', E:'#225566'
  };
  canvas.width = art[0].length * scale;
  canvas.height = art.length * scale;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  px(ctx, art, p, scale);
  // glow on dock
  const grd = ctx.createRadialGradient(10*scale, 6*scale, scale, 10*scale, 6*scale, 7*scale);
  grd.addColorStop(0, 'rgba(0,200,255,0.2)');
  grd.addColorStop(1, 'transparent');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

/* ─────────────────────────────────────────────
   MONSTER: LUMINARIS (fish)  (16×12 → scale 5)
───────────────────────────────────────────── */
S.drawLuminaris = function(canvas) {
  const scale = 6;
  const art = [
    '................',
    '....AAAAA.......',
    '...ABBBBBA......',
    '..ABBBCCBBA.....',
    'AABBBCDDCBBA....',
    'AABBBCDDCBBAAAA.',
    'AABBBCCCBBBBBA..',
    '..ABBBBBBBBA....',
    '...AABBBBAA.....',
    '....AAAAAA......',
    '...AA....AA.....',
    '................',
  ];
  const p = {
    A:'#115522', B:'#22aa44', C:'#55ee55',
    D:'#ffffff',
  };
  canvas.width = art[0].length * scale;
  canvas.height = art.length * scale;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  px(ctx, art, p, scale);
  // bioluminescence glow
  const grd = ctx.createRadialGradient(8*scale, 5*scale, scale, 8*scale, 5*scale, 6*scale);
  grd.addColorStop(0, 'rgba(80,255,80,0.22)');
  grd.addColorStop(1, 'transparent');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

/* ─────────────────────────────────────────────
   MONSTER: NULMEDUSA (jellyfish) (14×14 → scale 5)
───────────────────────────────────────────── */
S.drawNulmedusa = function(canvas) {
  const scale = 6;
  const art = [
    '.AAAAAAAAAAA..',
    'ABBBBBBBBBBA..',
    'ABCCCCCCCBBA..',
    'ABCDDDDDDCBA..',
    'ABCDEEEDECBA..',
    '.ABCCCCCBA....',
    '..AABBBA......',
    '..A.A.A.A.....',
    '.A...A...A....',
    'A.....A....A..',
    '.........A....',
    '...............',
    '...............',
    '...............',
  ];
  const p = {
    A:'#6633cc', B:'#9955ee', C:'#bb88ff',
    D:'#ddaaff', E:'#ffffff',
  };
  canvas.width = art[0].length * scale;
  canvas.height = art.length * scale;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  px(ctx, art, p, scale);
  const grd = ctx.createRadialGradient(7*scale, 4*scale, scale, 7*scale, 4*scale, 7*scale);
  grd.addColorStop(0, 'rgba(150,80,255,0.2)');
  grd.addColorStop(1, 'transparent');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

/* ─────────────────────────────────────────────
   MONSTER: ABISSAL-ANZOL (anglerfish) (16×14 → scale 5)
───────────────────────────────────────────── */
S.drawAnglerfish = function(canvas) {
  const scale = 6;
  const art = [
    '....A...........',
    '....AB..........',
    '....ABC.........',
    '..AABCCCCC......',
    '.AABCCDDDDCA....',
    'AABCCDDEEDDCA...',
    'AABCCDDEEDDCAAAA',
    'AABCCDDEEDDCA...',
    '.AABCCDDDDCA....',
    '..AABCCCCC......',
    '....ABC.........',
    '....AA..........',
    '................',
    '................',
  ];
  const p = {
    A:'#101028', B:'#1a1a44', C:'#2a2a66',
    D:'#3a3a99', E:'#aabb00',
  };
  canvas.width = art[0].length * scale;
  canvas.height = art.length * scale;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  px(ctx, art, p, scale);
  // lure glow
  const grd = ctx.createRadialGradient(4*scale, 2*scale, 0, 4*scale, 2*scale, 4*scale);
  grd.addColorStop(0, 'rgba(180,200,0,0.6)');
  grd.addColorStop(1, 'transparent');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

/* ─────────────────────────────────────────────
   MONSTER: FERROCARANGUEIJO (crab) (16×14 → scale 5)
───────────────────────────────────────────── */
S.drawCrab = function(canvas) {
  const scale = 6;
  const art = [
    'AA.....AA.......',
    'AAABBBBBBAAAA...',
    '.AABBBBBBBBBA...',
    'AABBCBBBBCBBAA..',
    'AABBBBBBBBBBBAA.',
    '.AABBBBBBBBBBA..',
    '..ABBBBBBBBBA...',
    '..AABBBBBBBAA...',
    '...AAABBBAAAA...',
    '....A..A..A.....',
    '................',
    '................',
    '................',
    '................',
  ];
  const p = {
    A:'#882200', B:'#cc4400', C:'#eeaa00',
  };
  canvas.width = art[0].length * scale;
  canvas.height = art.length * scale;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  px(ctx, art, p, scale);
};

/* ─────────────────────────────────────────────
   MONSTER: SERPENTE ABISSAL (bonus) (18×10 → scale 6)
───────────────────────────────────────────── */
S.drawSerpent = function(canvas) {
  const scale = 6;
  const art = [
    '..................',
    '..AAAAA...........',
    '.ABBBBA...........',
    'ABCCBBAAAAAAAAAA..',
    'ABCBBBBBBBBBBCBA..',
    'ABCBBBBBBBBBBBA...',
    '.ABBBBA...........',
    '..AAAAA...........',
    '..................',
    '..................',
  ];
  const p = { A:'#113322', B:'#226644', C:'#aaffcc' };
  canvas.width = art[0].length * scale;
  canvas.height = art.length * scale;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  px(ctx, art, p, scale);
};

/* ─────────────────────────────────────────────
   WRECK SCENE  (full canvas paint)
───────────────────────────────────────────── */
S.drawWreckScene = function(canvas) {
  canvas.width = 420; canvas.height = 240;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  const W = canvas.width, H = canvas.height;

  // Abyss background
  ctx.fillStyle = '#01060e';
  ctx.fillRect(0, 0, W, H);

  // Deep water gradient
  const bgGrd = ctx.createLinearGradient(0, 0, 0, H);
  bgGrd.addColorStop(0, 'rgba(0,30,70,0.4)');
  bgGrd.addColorStop(1, 'rgba(0,5,15,0.8)');
  ctx.fillStyle = bgGrd;
  ctx.fillRect(0, 0, W, H);

  // Seafloor silt
  ctx.fillStyle = '#0a1810';
  ctx.fillRect(0, H-45, W, 45);
  ctx.fillStyle = '#071208';
  for(let i=0;i<42;i++) {
    const h = Math.floor(Math.random()*6+2);
    ctx.fillRect(i*10, H-45-h+2, 8, h);
  }
  // seafloor rocks
  [[30,H-50,18,8],[85,H-52,22,10],[150,H-49,14,7],[210,H-51,20,9],[290,H-50,16,8],[350,H-48,20,9],[400,H-50,14,7]].forEach(([x,y,w,h])=>{
    ctx.fillStyle = '#0d1a14';
    ctx.fillRect(x,y,w,h);
  });

  // Seaweed
  ctx.fillStyle = '#1a3a18';
  [[20,H-45],[55,H-45],[100,H-45],[170,H-45],[230,H-45],[310,H-45],[380,H-45],[410,H-45]].forEach(([x,y])=>{
    for(let j=0;j<3;j++){
      ctx.fillRect(x+j*5-3, y-(j===1?22:16), 3, j===1?22:16);
      ctx.fillRect(x+j*5-5, y-(j===1?18:12), 8, 3);
    }
  });

  // Hull piece 1 — left (main body resting on floor)
  const hullColors = ['#1a1e2e','#252844','#353855','#808298','#606278'];
  ctx.fillStyle = hullColors[1];
  ctx.fillRect(10, H-130, 155, 88);
  ctx.fillStyle = hullColors[2];
  ctx.fillRect(13, H-127, 149, 82);
  // hull rivets
  ctx.fillStyle = hullColors[3];
  for(let i=0;i<8;i++) {
    ctx.fillRect(18+i*18, H-125, 4, 78);
  }
  // portholes
  [[35,H-105],[75,H-105],[115,H-105]].forEach(([px,py])=>{
    ctx.fillStyle = '#001830';
    ctx.fillRect(px, py, 20, 20);
    ctx.fillStyle = '#002244';
    ctx.fillRect(px+2, py+2, 16, 16);
    ctx.fillStyle = 'rgba(0,120,255,0.12)';
    ctx.fillRect(px+4, py+4, 12, 12);
    // crack on some
    if(px===75){
      ctx.fillStyle = hullColors[4];
      ctx.fillRect(px+20, py+4, 8, 2);
      ctx.fillRect(px+26, py+6, 4, 4);
    }
  });

  // Hull piece 2 — right (tilted, broken)
  ctx.save();
  ctx.translate(285, H-95);
  ctx.rotate(0.18);
  ctx.fillStyle = hullColors[1];
  ctx.fillRect(-70, -55, 140, 100);
  ctx.fillStyle = hullColors[2];
  ctx.fillRect(-68, -53, 136, 96);
  for(let i=0;i<7;i++) {
    ctx.fillStyle = hullColors[3];
    ctx.fillRect(-65+i*19, -51, 3, 92);
  }
  // porthole
  ctx.fillStyle = '#001830';
  ctx.fillRect(-20, -30, 22, 22);
  ctx.fillStyle = 'rgba(0,100,200,0.1)';
  ctx.fillRect(-18, -28, 18, 18);
  ctx.restore();

  // Broken mast / crane
  ctx.save();
  ctx.translate(165, H-130);
  ctx.rotate(-0.3);
  ctx.fillStyle = hullColors[4];
  ctx.fillRect(-4, -60, 8, 60);
  ctx.fillRect(-4, -60, 50, 6);
  ctx.restore();

  // Scattered debris
  ctx.fillStyle = '#334455';
  [[165,H-50,35,5],[185,H-54,22,5],[215,H-52,18,4],[130,H-49,28,5]].forEach(d=>ctx.fillRect(...d));

  // Element glow clusters
  const glowSpots = [{x:50,y:H-60},{x:95,y:H-65},{x:155,y:H-62},{x:210,y:H-58},{x:270,y:H-60},{x:340,y:H-63}];
  glowSpots.forEach(g=>{
    // glow halo
    const grd = ctx.createRadialGradient(g.x,g.y,0,g.x,g.y,22);
    grd.addColorStop(0,'rgba(80,255,80,0.55)');
    grd.addColorStop(0.4,'rgba(80,255,80,0.2)');
    grd.addColorStop(1,'rgba(80,255,80,0)');
    ctx.fillStyle = grd;
    ctx.fillRect(g.x-22,g.y-22,44,44);
    // fragment
    ctx.fillStyle = '#44ee44';
    ctx.fillRect(g.x-3,g.y-3,6,6);
    ctx.fillStyle = '#aaffaa';
    ctx.fillRect(g.x-1,g.y-1,3,3);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(g.x,g.y,1,1);
  });

  // Swimming particles
  for(let i=0;i<18;i++){
    const px2 = Math.random()*W;
    const py2 = Math.random()*(H-55);
    const r = Math.random()*1.2+0.3;
    ctx.beginPath();
    ctx.arc(px2,py2,r,0,Math.PI*2);
    ctx.fillStyle = `rgba(0,200,255,${Math.random()*0.25+0.05})`;
    ctx.fill();
  }

  // Vignette
  const vign = ctx.createRadialGradient(W/2,H/2,H*0.2,W/2,H/2,H*0.9);
  vign.addColorStop(0,'transparent');
  vign.addColorStop(1,'rgba(0,0,0,0.72)');
  ctx.fillStyle = vign;
  ctx.fillRect(0,0,W,H);

  // Top mist
  const mist = ctx.createLinearGradient(0,0,0,60);
  mist.addColorStop(0,'rgba(0,10,30,0.7)');
  mist.addColorStop(1,'transparent');
  ctx.fillStyle = mist;
  ctx.fillRect(0,0,W,60);
};

/* ─────────────────────────────────────────────
   GAMEPLAY MAP PREVIEW  (full canvas scene)
───────────────────────────────────────────── */
S.drawMapPreview = function(canvas) {
  canvas.width = 480; canvas.height = 300;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  const W = canvas.width, H = canvas.height;

  // Background
  ctx.fillStyle = '#010c18';
  ctx.fillRect(0, 0, W, H);

  // Layer bands (depth layers)
  const layers = [
    {y:0, h:70, col:'rgba(0,40,80,0.3)'},
    {y:70, h:80, col:'rgba(0,25,55,0.3)'},
    {y:150, h:90, col:'rgba(0,15,35,0.3)'},
    {y:240, h:60, col:'rgba(0,8,20,0.3)'},
  ];
  layers.forEach(l=>{
    ctx.fillStyle = l.col;
    ctx.fillRect(0, l.y, W, l.h);
  });

  // Depth labels
  const depthLabs = ['0m','200m','500m','800m'];
  ctx.fillStyle = 'rgba(0,200,255,0.25)';
  ctx.font = '9px "Share Tech Mono", monospace';
  layers.forEach((l,i)=>{
    ctx.fillRect(0, l.y, W, 1);
    ctx.fillText(depthLabs[i], 6, l.y+12);
  });

  // Terrain walls — pixel style
  ctx.fillStyle = '#0d1e14';
  // Left wall with cave openings
  const leftWall = [0,0,0,0,0,0,18,18,18,12,12,12,0,0,0,20,20,20,20,15,15,15,0,0,0,25,25,25,20,20];
  leftWall.forEach((w,i) => {
    if(w>0) ctx.fillRect(0, i*10, w, 10);
  });
  // Right wall
  const rightWall = [0,0,0,0,0,0,14,14,14,0,0,0,16,16,16,16,0,0,22,22,22,14,14,0,0,0,18,18,18,20];
  rightWall.forEach((w,i) => {
    if(w>0) ctx.fillRect(W-w, i*10, w, 10);
  });
  // Floor
  ctx.fillStyle = '#0d2010';
  ctx.fillRect(0, H-20, W, 20);
  ctx.fillRect(0, H-25, W, 8);
  for(let i=0;i<48;i++) {
    const h = Math.floor(Math.random()*8+3);
    ctx.fillStyle = i%3===0?'#112218':'#0d1e14';
    ctx.fillRect(i*10, H-20-h+2, 8, h);
  }

  // Element fragments scattered
  const frags = [{x:120,y:95},{x:180,y:160},{x:260,y:110},{x:320,y:210},{x:400,y:145},{x:80,y:200},{x:440,y:250}];
  frags.forEach(f=>{
    const grd = ctx.createRadialGradient(f.x,f.y,0,f.x,f.y,14);
    grd.addColorStop(0,'rgba(80,255,80,0.5)');
    grd.addColorStop(1,'rgba(80,255,80,0)');
    ctx.fillStyle = grd;
    ctx.fillRect(f.x-14,f.y-14,28,28);
    ctx.fillStyle = '#44ee44';
    ctx.fillRect(f.x-2,f.y-2,5,5);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(f.x,f.y,2,2);
  });

  // Oxygen bubbles
  const bubbles = [{x:200,y:50},{x:360,y:120},{x:140,y:180}];
  bubbles.forEach(b=>{
    ctx.strokeStyle = 'rgba(0,200,255,0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(b.x, b.y, 8, 0, Math.PI*2);
    ctx.stroke();
    ctx.fillStyle = 'rgba(0,200,255,0.12)';
    ctx.fill();
    ctx.fillStyle = 'rgba(200,240,255,0.6)';
    ctx.fillRect(b.x-1, b.y-3, 2, 2);
  });

  // Extraction dock (top-right)
  ctx.fillStyle = '#224466';
  ctx.fillRect(W-80, 0, 80, 35);
  ctx.fillStyle = '#335577';
  ctx.fillRect(W-78, 2, 76, 31);
  ctx.fillStyle = '#00c8ff';
  ctx.fillRect(W-76, 4, 72, 4);
  ctx.fillStyle = 'rgba(0,200,255,0.3)';
  ctx.fillRect(W-76, 8, 72, 25);
  const dockGrd = ctx.createRadialGradient(W-40, 18, 0, W-40, 18, 35);
  dockGrd.addColorStop(0, 'rgba(0,200,255,0.3)');
  dockGrd.addColorStop(1, 'transparent');
  ctx.fillStyle = dockGrd;
  ctx.fillRect(W-80, 0, 80, 60);
  ctx.fillStyle = 'rgba(0,200,255,0.7)';
  ctx.font = '8px "Share Tech Mono", monospace';
  ctx.fillText('REFINARIA', W-72, 22);

  // Mini submarine
  ctx.fillStyle = '#525870';
  ctx.fillRect(60, 55, 40, 16);
  ctx.fillStyle = '#8a8da8';
  ctx.fillRect(64, 52, 20, 6);
  ctx.fillStyle = '#00c8ff';
  ctx.fillRect(70, 57, 6, 6);
  ctx.fillStyle = 'rgba(0,200,255,0.25)';
  ctx.fillRect(100, 58, 60, 8);
  // sub light cone
  const coneGrd = ctx.createLinearGradient(100, 63, 180, 63);
  coneGrd.addColorStop(0, 'rgba(0,200,255,0.25)');
  coneGrd.addColorStop(1, 'transparent');
  ctx.fillStyle = coneGrd;
  ctx.beginPath();
  ctx.moveTo(100, 63);
  ctx.lineTo(180, 43);
  ctx.lineTo(180, 83);
  ctx.closePath();
  ctx.fill();

  // Monsters lurking
  // Ghost fish shadow
  ctx.fillStyle = 'rgba(180,255,0,0.15)';
  ctx.fillRect(360, 180, 35, 20);
  ctx.fillRect(355, 185, 45, 10);
  const grd2 = ctx.createRadialGradient(375,188,0,375,188,22);
  grd2.addColorStop(0,'rgba(180,255,0,0.2)');
  grd2.addColorStop(1,'transparent');
  ctx.fillStyle=grd2;
  ctx.fillRect(355,168,40,40);

  // UI overlay elements
  // Minimap border
  ctx.strokeStyle = 'rgba(0,200,255,0.2)';
  ctx.lineWidth = 1;
  ctx.strokeRect(0.5, 0.5, W-1, H-1);

  // Vignette
  const vign = ctx.createRadialGradient(W/2,H/2,H*0.15,W/2,H/2,H*0.85);
  vign.addColorStop(0,'transparent');
  vign.addColorStop(1,'rgba(0,0,0,0.65)');
  ctx.fillStyle = vign;
  ctx.fillRect(0,0,W,H);

  // Top + bottom fade
  const topFade = ctx.createLinearGradient(0,0,0,40);
  topFade.addColorStop(0,'rgba(1,12,24,0.8)');
  topFade.addColorStop(1,'transparent');
  ctx.fillStyle = topFade;
  ctx.fillRect(0,0,W,40);
};

/* ─────────────────────────────────────────────
   AVATAR (team member pixel portraits)
───────────────────────────────────────────── */
S.drawAvatar = function(canvas, colorHex, labelColor, initials) {
  const scale = 4;
  const size = 14;
  canvas.width = size * scale;
  canvas.height = size * scale;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  // Helmet outer
  ctx.fillStyle = colorHex;
  ctx.fillRect(1*scale, 0*scale, 12*scale, 14*scale);
  ctx.fillRect(0*scale, 1*scale, 14*scale, 12*scale);

  // Helmet darker bg
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.fillRect(2*scale, 1*scale, 10*scale, 12*scale);

  // Visor
  ctx.fillStyle = '#001122';
  ctx.fillRect(2*scale, 2*scale, 10*scale, 7*scale);
  ctx.fillStyle = 'rgba(0,150,255,0.1)';
  ctx.fillRect(3*scale, 3*scale, 8*scale, 5*scale);
  // Visor scan lines
  for(let y=0;y<5;y++){
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(3*scale, (3+y)*scale, 8*scale, Math.floor(scale/3));
  }
  // Visor highlight
  ctx.fillStyle = 'rgba(200,240,255,0.2)';
  ctx.fillRect(3*scale, 3*scale, 2*scale, 2*scale);

  // Initials
  ctx.fillStyle = labelColor;
  ctx.font = `bold ${scale*2.2}px monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(initials, 7*scale, 5.5*scale);

  // Chin/mouth bar
  ctx.fillStyle = colorHex;
  ctx.fillRect(3*scale, 10*scale, 8*scale, 3*scale);
  ctx.fillStyle = 'rgba(255,255,255,0.15)';
  ctx.fillRect(5*scale, 11*scale, 4*scale, 1*scale);
};

/* ─────────────────────────────────────────────
   SONAR SCREEN (hero background element)
───────────────────────────────────────────── */
S.drawSonarScreen = function(canvas) {
  canvas.width = 200; canvas.height = 200;
  const ctx = canvas.getContext('2d');
  const cx = 100, cy = 100, r = 90;

  // BG
  ctx.fillStyle = '#010c18';
  ctx.fillRect(0,0,200,200);

  // Grid circles
  [30,60,90].forEach(rad=>{
    ctx.beginPath();
    ctx.arc(cx,cy,rad,0,Math.PI*2);
    ctx.strokeStyle = 'rgba(0,200,255,0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  // Cross hairs
  ctx.strokeStyle = 'rgba(0,200,255,0.1)';
  ctx.beginPath(); ctx.moveTo(cx-r,cy); ctx.lineTo(cx+r,cy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx,cy-r); ctx.lineTo(cx,cy+r); ctx.stroke();

  // Blips
  const blips = [{x:130,y:75,a:0.9},{x:65,y:130,a:0.6},{x:150,y:140,a:0.4}];
  blips.forEach(b=>{
    ctx.fillStyle = `rgba(0,255,100,${b.a})`;
    ctx.fillRect(b.x-2,b.y-2,4,4);
    const grd = ctx.createRadialGradient(b.x,b.y,0,b.x,b.y,10);
    grd.addColorStop(0,`rgba(0,255,100,${b.a*0.4})`);
    grd.addColorStop(1,'transparent');
    ctx.fillStyle=grd;
    ctx.fillRect(b.x-10,b.y-10,20,20);
  });

  // Center dot
  ctx.fillStyle = 'rgba(0,200,255,0.8)';
  ctx.fillRect(cx-2,cy-2,4,4);
};
