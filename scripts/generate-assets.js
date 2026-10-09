import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public', 'images');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function writeSvg(filename, content) {
  fs.writeFileSync(path.join(outDir, filename), content.trim(), 'utf8');
  console.log(`Generated: ${filename}`);
}

// 1. HERO ROOM DAY & NIGHT (1920x1080)
function getHeroRoomSvg(isNight = false) {
  const wallGrad = isNight 
    ? `<linearGradient id="wall" x1="0%" y1="0%" x2="100%" y2="100%">
         <stop offset="0%" stop-color="#14171F"/>
         <stop offset="60%" stop-color="#1C212D"/>
         <stop offset="100%" stop-color="#18151D"/>
       </linearGradient>`
    : `<linearGradient id="wall" x1="0%" y1="0%" x2="100%" y2="100%">
         <stop offset="0%" stop-color="#EBE3D5"/>
         <stop offset="60%" stop-color="#DFD5C3"/>
         <stop offset="100%" stop-color="#D2C5B0"/>
       </linearGradient>`;

  const floorGrad = isNight
    ? `<linearGradient id="floor" x1="0%" y1="0%" x2="0%" y2="100%">
         <stop offset="0%" stop-color="#161210"/>
         <stop offset="100%" stop-color="#0E0B09"/>
       </linearGradient>`
    : `<linearGradient id="floor" x1="0%" y1="0%" x2="0%" y2="100%">
         <stop offset="0%" stop-color="#6F5849"/>
         <stop offset="100%" stop-color="#554236"/>
       </linearGradient>`;

  const windowSky = isNight
    ? `<linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
         <stop offset="0%" stop-color="#0A101D"/>
         <stop offset="100%" stop-color="#1B263B"/>
       </linearGradient>`
    : `<linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
         <stop offset="0%" stop-color="#D0E3F0"/>
         <stop offset="100%" stop-color="#EAF3FA"/>
       </linearGradient>`;

  const lightPool = isNight ? `
    <!-- LAMP GLOW POOL -->
    <radialGradient id="lampGlow" cx="68%" cy="56%" r="55%">
      <stop offset="0%" stop-color="#FFE0A3" stop-opacity="0.95"/>
      <stop offset="25%" stop-color="#F4B968" stop-opacity="0.6"/>
      <stop offset="60%" stop-color="#B7694C" stop-opacity="0.25"/>
      <stop offset="85%" stop-color="#873B35" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#14171F" stop-opacity="0"/>
    </radialGradient>
    <rect x="0" y="0" width="1920" height="1080" fill="url(#lampGlow)" mix-blend-mode="screen" />
    <circle cx="1310" cy="590" r="140" fill="#FFF2D6" opacity="0.9" filter="url(#highGlow)"/>
    <ellipse cx="1310" cy="880" rx="360" ry="140" fill="#FFDFA3" opacity="0.35" filter="url(#heavyBlur)"/>
  ` : `
    <!-- DAYLIGHT SUNBEAM -->
    <polygon points="260,180 520,180 920,840 480,840" fill="#FFF9ED" opacity="0.18" />
  `;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="100%" height="100%">
  <defs>
    ${wallGrad}
    ${floorGrad}
    ${windowSky}
    <filter id="highGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="35" result="blur"/>
    </filter>
    <filter id="heavyBlur" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="60" result="blur"/>
    </filter>
    <filter id="plasterGrain">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.05 0"/>
    </filter>
  </defs>

  <!-- Wall Background -->
  <rect width="1920" height="740" fill="url(#wall)"/>
  <rect width="1920" height="740" filter="url(#plasterGrain)" opacity="0.8"/>

  <!-- Architectural Molding / Baseboard -->
  <rect x="0" y="728" width="1920" height="12" fill="${isNight ? '#2A2420' : '#C2B5A0'}"/>
  <rect x="0" y="740" width="1920" height="340" fill="url(#floor)"/>

  <!-- Parquet Floor perspective lines -->
  <g stroke="${isNight ? '#231B17' : '#5E4A3D'}" stroke-width="1.5" opacity="0.6">
    <line x1="0" y1="1080" x2="600" y2="740"/>
    <line x1="300" y1="1080" x2="800" y2="740"/>
    <line x1="700" y1="1080" x2="1050" y2="740"/>
    <line x1="1100" y1="1080" x2="1300" y2="740"/>
    <line x1="1500" y1="1080" x2="1550" y2="740"/>
    <line x1="1920" y1="1080" x2="1750" y2="740"/>
  </g>

  <!-- Arched French Window Left -->
  <path d="M 220 720 L 220 280 A 160 160 0 0 1 540 280 L 540 720 Z" fill="url(#sky)" stroke="${isNight ? '#322C28' : '#B8A892'}" stroke-width="16"/>
  <!-- Window mullions -->
  <line x1="380" y1="120" x2="380" y2="720" stroke="${isNight ? '#322C28' : '#B8A892'}" stroke-width="8"/>
  <line x1="220" y1="360" x2="540" y2="360" stroke="${isNight ? '#322C28' : '#B8A892'}" stroke-width="6"/>
  <line x1="220" y1="520" x2="540" y2="520" stroke="${isNight ? '#322C28' : '#B8A892'}" stroke-width="6"/>

  ${isNight ? `
    <!-- Night Stars through window -->
    <circle cx="310" cy="220" r="1.5" fill="#FFF" opacity="0.8"/>
    <circle cx="450" cy="180" r="1.2" fill="#FFF" opacity="0.6"/>
    <circle cx="280" cy="340" r="1.5" fill="#FFF" opacity="0.7"/>
    <circle cx="480" cy="300" r="1" fill="#FFF" opacity="0.5"/>
  ` : ''}

  <!-- Framed Minimalist Art on Plaster Wall -->
  <rect x="740" y="160" width="340" height="420" fill="${isNight ? '#1F1A18' : '#DFD4C0'}" stroke="${isNight ? '#3B312B' : '#7D6955'}" stroke-width="14"/>
  <path d="M 780 480 Q 860 260 920 380 T 1040 290" fill="none" stroke="${isNight ? '#4A3E37' : '#8C7765'}" stroke-width="18" stroke-linecap="round"/>
  <circle cx="850" cy="310" r="40" fill="${isNight ? '#543632' : '#B7694C'}" opacity="0.85"/>

  <!-- Dark Timber Credenza / Low Table -->
  <rect x="680" y="650" width="460" height="110" fill="${isNight ? '#1E1916' : '#3E2F26'}" rx="4"/>
  <rect x="710" y="760" width="16" height="40" fill="${isNight ? '#130F0D' : '#2A1F18'}"/>
  <rect x="1094" y="760" width="16" height="40" fill="${isNight ? '#130F0D' : '#2A1F18'}"/>
  <!-- Ceramic Vase on credenza -->
  <path d="M 780 650 Q 755 600 770 560 L 795 560 Q 810 600 785 650 Z" fill="${isNight ? '#2F2723' : '#A89B8B'}"/>
  <!-- Linen Books on credenza -->
  <rect x="830" y="632" width="90" height="18" fill="${isNight ? '#2A2320' : '#DDD2C0'}" rx="2"/>
  <rect x="840" y="618" width="75" height="14" fill="${isNight ? '#3F2C29' : '#873B35'}" rx="2"/>

  <!-- Sculptural Lounge Chair (Right) -->
  <path d="M 1480 840 C 1460 760 1480 680 1560 660 C 1640 680 1660 760 1640 840 Z" fill="${isNight ? '#241E1B' : '#4E3A2F'}"/>
  <ellipse cx="1560" cy="830" rx="95" ry="30" fill="${isNight ? '#1B1614' : '#3B2B22'}"/>

  <!-- ORIEL SIGNATURE SCULPTURAL FLOOR LAMP (Focal Point at 1310, 590) -->
  <!-- Heavy Stone Plinth Base -->
  <rect x="1260" y="810" width="100" height="35" rx="6" fill="${isNight ? '#2D2825' : '#8F8478'}"/>
  <rect x="1275" y="800" width="70" height="10" rx="3" fill="${isNight ? '#554228' : '#A67A43'}"/>
  <!-- Slender Arched Brass Stem -->
  <path d="M 1310 800 C 1310 640 1370 510 1310 460 C 1270 420 1260 520 1310 550" fill="none" stroke="${isNight ? '#D4A35B' : '#A67A43'}" stroke-width="7" stroke-linecap="round"/>
  <!-- Lamp Shade (Sculptural Fluted Opal Glass + Brass) -->
  <path d="M 1260 580 C 1260 540 1360 540 1360 580 C 1340 615 1280 615 1260 580 Z" 
        fill="${isNight ? '#FFF5DC' : '#ECE5D8'}" 
        stroke="${isNight ? '#E9C978' : '#C2B49D'}" 
        stroke-width="3"/>
  <circle cx="1310" cy="578" r="14" fill="${isNight ? '#FFEDBF' : '#DDD1BE'}"/>

  ${lightPool}

  <!-- Meta Brand Stamp bottom right -->
  <text x="1840" y="1030" text-anchor="end" font-family="'IBM Plex Mono', monospace" font-size="12" fill="${isNight ? '#6E788B' : '#8A7E72'}" letter-spacing="2">
    ${isNight ? 'ORIEL HOUSE // ROOM 01 // 22:45 DUSK SCENE' : 'ORIEL HOUSE // ROOM 01 // 15:30 NATURAL LIGHT'}
  </text>
</svg>`;
}

// 2. SCONCE ESME (WALL SCONCE) ON & OFF (1200x1200)
function getSconceEsmeSvg(isOn = false) {
  const wallBg = isOn
    ? `<radialGradient id="wallWash" cx="50%" cy="50%" r="70%">
         <stop offset="0%" stop-color="#3A2D27"/>
         <stop offset="50%" stop-color="#241E1C"/>
         <stop offset="100%" stop-color="#181514"/>
       </radialGradient>`
    : `<linearGradient id="wallWash" x1="0%" y1="0%" x2="100%" y2="100%">
         <stop offset="0%" stop-color="#F2EDE4"/>
         <stop offset="100%" stop-color="#E2D9CB"/>
       </linearGradient>`;

  const lightWash = isOn ? `
    <!-- Dual Arch Light Wash Up and Down -->
    <radialGradient id="lightBeamUp" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#FFE7B8" stop-opacity="0.95"/>
      <stop offset="30%" stop-color="#F4B968" stop-opacity="0.6"/>
      <stop offset="70%" stop-color="#B7694C" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#241E1C" stop-opacity="0"/>
    </radialGradient>
    <ellipse cx="600" cy="280" rx="360" ry="240" fill="url(#lightBeamUp)" mix-blend-mode="screen"/>
    <ellipse cx="600" cy="920" rx="420" ry="260" fill="url(#lightBeamUp)" mix-blend-mode="screen"/>
    <circle cx="600" cy="580" r="160" fill="#FFF4D9" opacity="0.85" filter="url(#sconceGlow)"/>
  ` : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200" width="100%" height="100%">
  <defs>
    ${wallBg}
    <filter id="sconceGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="40" result="blur"/>
    </filter>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="15" dy="25" stdDeviation="18" flood-color="${isOn ? '#0C0A09' : '#948777'}" flood-opacity="${isOn ? '0.7' : '0.35'}"/>
    </filter>
  </defs>

  <rect width="1200" height="1200" fill="url(#wallWash)"/>
  
  ${lightWash}

  <!-- Limewash plaster texture lines -->
  <g stroke="${isOn ? '#382D28' : '#D5C9B7'}" stroke-width="1" opacity="0.35">
    <path d="M 100 200 Q 600 220 1100 190" fill="none"/>
    <path d="M 80 500 Q 550 510 1120 480" fill="none"/>
    <path d="M 120 850 Q 650 840 1080 870" fill="none"/>
  </g>

  <!-- ESME SCONCE BODY -->
  <!-- Aged Brass Backplate -->
  <rect x="560" y="380" width="80" height="440" rx="40" fill="${isOn ? '#C89A50' : '#9A7540'}" filter="url(#shadow)"/>
  
  <!-- Sculptural Plaster Curved Canopy / Shell -->
  <path d="M 440 600 C 440 450 540 410 600 410 C 660 410 760 450 760 600 C 760 750 660 790 600 790 C 540 790 440 750 440 600 Z" 
        fill="${isOn ? '#FFF7E6' : '#ECE5DA'}" 
        stroke="${isOn ? '#D7B47C' : '#C4B7A4'}" 
        stroke-width="5" 
        filter="url(#shadow)"/>

  <!-- Inner Recessed Diffuser Aperture -->
  <ellipse cx="600" cy="600" rx="55" ry="95" fill="${isOn ? '#FFF9EE' : '#DDD2C3'}"/>

  <!-- Aged Unlacquered Brass Center Pin / Fastener -->
  <circle cx="600" cy="600" r="18" fill="${isOn ? '#F2C679' : '#8A6836'}"/>
  <circle cx="600" cy="600" r="8" fill="${isOn ? '#FFE7B3' : '#6E5227'}"/>

  <!-- Subtle Model Metadata Stamp -->
  <text x="60" y="1140" font-family="'IBM Plex Mono', monospace" font-size="13" fill="${isOn ? '#968A7D' : '#8C8072'}" letter-spacing="2">
    ESME WALL SCONCE // ${isOn ? '2700K CAST HALO ACTIVE' : 'UNLIT PLASTER & BRASS DETAIL'}
  </text>
</svg>`;
}

// 3. TABLE LAMP MARGO ON & OFF (1200x1200)
function getTableLampMargoSvg(isOn = false) {
  const bg = isOn
    ? `<radialGradient id="tableBg" cx="50%" cy="50%" r="65%">
         <stop offset="0%" stop-color="#2D211B"/>
         <stop offset="60%" stop-color="#1E1714"/>
         <stop offset="100%" stop-color="#140F0D"/>
       </radialGradient>`
    : `<linearGradient id="tableBg" x1="0%" y1="0%" x2="100%" y2="100%">
         <stop offset="0%" stop-color="#F6F1E9"/>
         <stop offset="100%" stop-color="#E7DDCF"/>
       </linearGradient>`;

  const glowEffects = isOn ? `
    <radialGradient id="margoGlow" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#FFF2D1" stop-opacity="0.95"/>
      <stop offset="35%" stop-color="#F4B968" stop-opacity="0.55"/>
      <stop offset="70%" stop-color="#B7694C" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#1E1714" stop-opacity="0"/>
    </radialGradient>
    <circle cx="600" cy="460" r="380" fill="url(#margoGlow)" mix-blend-mode="screen"/>
    <!-- Table Surface Highlight -->
    <ellipse cx="600" cy="980" rx="380" ry="110" fill="#F4B968" opacity="0.3" filter="url(#tableGlowFilter)"/>
  ` : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200" width="100%" height="100%">
  <defs>
    ${bg}
    <filter id="tableGlowFilter" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="35" result="blur"/>
    </filter>
    <filter id="margoShadow">
      <feDropShadow dx="0" dy="25" stdDeviation="20" flood-color="${isOn ? '#080605' : '#8A7B6B'}" flood-opacity="${isOn ? '0.8' : '0.35'}"/>
    </filter>
  </defs>

  <rect width="1200" height="1200" fill="url(#tableBg)"/>

  <!-- Wooden Table Horizon Line -->
  <rect x="0" y="930" width="1200" height="270" fill="${isOn ? '#17120F' : '#695345'}"/>
  <line x1="0" y1="930" x2="1200" y2="930" stroke="${isOn ? '#2B211C' : '#8B7262'}" stroke-width="4"/>

  ${glowEffects}

  <!-- MARGO TABLE LAMP -->
  <!-- Honed Travertine / Marble Plinth -->
  <rect x="460" y="880" width="280" height="60" rx="8" fill="${isOn ? '#3A2E26' : '#C7BAA7'}" filter="url(#margoShadow)"/>
  
  <!-- Turned Aged Brass Stem -->
  <rect x="580" y="660" width="40" height="220" fill="${isOn ? '#D9A95C' : '#A67A43'}" filter="url(#margoShadow)"/>
  <ellipse cx="600" cy="740" rx="55" ry="15" fill="${isOn ? '#F2C679' : '#8F6633'}"/>

  <!-- Mouth-Blown Opal Glass Mushroom Dome -->
  <path d="M 320 540 C 320 330 440 280 600 280 C 760 280 880 330 880 540 C 880 580 820 620 600 620 C 380 620 320 580 320 540 Z" 
        fill="${isOn ? '#FFF9EE' : '#EDE6DA'}" 
        stroke="${isOn ? '#EAD6B3' : '#D0C3B0'}" 
        stroke-width="4" 
        filter="url(#margoShadow)"/>

  <!-- Brass Finial Cap -->
  <circle cx="600" cy="275" r="22" fill="${isOn ? '#F4C87B' : '#946E3A'}"/>
  <rect x="594" y="250" width="12" height="25" rx="4" fill="${isOn ? '#E5B460' : '#855E2B'}"/>

  <text x="60" y="1140" font-family="'IBM Plex Mono', monospace" font-size="13" fill="${isOn ? '#968A7D' : '#8C8072'}" letter-spacing="2">
    MARGO TABLE LAMP // ${isOn ? 'WARM DIFFUSED OPAL EMISSION' : 'AGED BRASS & HONED STONE'}
  </text>
</svg>`;
}

// 4. PENDANT BELLAMY (DINING) ON & OFF (1200x1200)
function getPendantBellamySvg(isOn = false) {
  const bg = isOn
    ? `<radialGradient id="pendBg" cx="50%" cy="40%" r="65%">
         <stop offset="0%" stop-color="#262F3D"/>
         <stop offset="60%" stop-color="#181D26"/>
         <stop offset="100%" stop-color="#0F1218"/>
       </radialGradient>`
    : `<linearGradient id="pendBg" x1="0%" y1="0%" x2="100%" y2="100%">
         <stop offset="0%" stop-color="#EFE8DD"/>
         <stop offset="100%" stop-color="#DCD0C0"/>
       </linearGradient>`;

  const glowCone = isOn ? `
    <!-- Downward Dramatic Light Cone onto Table -->
    <linearGradient id="coneGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFF0CC" stop-opacity="0.85"/>
      <stop offset="40%" stop-color="#F4B968" stop-opacity="0.45"/>
      <stop offset="85%" stop-color="#D7CDBD" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#0F1218" stop-opacity="0"/>
    </linearGradient>
    <polygon points="600,430 180,1180 1020,1180" fill="url(#coneGrad)" mix-blend-mode="screen"/>
    <ellipse cx="600" cy="420" r="140" fill="#FFF5D6" opacity="0.9" filter="url(#pendBlur)"/>
  ` : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200" width="100%" height="100%">
  <defs>
    ${bg}
    <filter id="pendBlur">
      <feGaussianBlur stdDeviation="30"/>
    </filter>
  </defs>

  <rect width="1200" height="1200" fill="url(#pendBg)"/>

  ${glowCone}

  <!-- Suspension Cord & Brass Canopy -->
  <rect x="575" y="0" width="50" height="25" fill="${isOn ? '#C89A50' : '#8F6A33'}"/>
  <line x1="600" y1="25" x2="600" y2="340" stroke="${isOn ? '#D4A35B' : '#735730'}" stroke-width="4"/>

  <!-- Tiered Tier 1: Wide Fluted Tier -->
  <path d="M 360 410 C 360 370 500 350 600 350 C 700 350 840 370 840 410 C 840 430 760 450 600 450 C 440 450 360 430 360 410 Z" 
        fill="${isOn ? '#F5D38A' : '#A67A43'}"/>

  <!-- Tier 2: Fluted Frosted Glass Disk -->
  <ellipse cx="600" cy="440" rx="300" ry="45" fill="${isOn ? '#FFF9EA' : '#ECE5DB'}" stroke="${isOn ? '#E2BF7A' : '#C4B7A5'}" stroke-width="4"/>

  <!-- Tier 3: Bottom Opal Glass Orb -->
  <circle cx="600" cy="490" r="75" fill="${isOn ? '#FFFDF5' : '#E8DFD0'}" stroke="${isOn ? '#F4C87B' : '#BFB09D'}" stroke-width="3"/>

  <!-- Meta Brand -->
  <text x="60" y="1140" font-family="'IBM Plex Mono', monospace" font-size="13" fill="${isOn ? '#8B97A8' : '#7A6E62'}" letter-spacing="2">
    BELLAMY PENDANT // ${isOn ? 'FOCUSED DINING TABLE LUMINESCENCE' : 'SCULPTURAL FLUTED BRASS & GLASS'}
  </text>
</svg>`;
}

// 5. FLOOR LAMP ELEANOR ON & OFF (1200x1200)
function getFloorLampEleanorSvg(isOn = false) {
  const bg = isOn
    ? `<radialGradient id="eleanorBg" cx="60%" cy="40%" r="65%">
         <stop offset="0%" stop-color="#342823"/>
         <stop offset="60%" stop-color="#1F1815"/>
         <stop offset="100%" stop-color="#120E0C"/>
       </radialGradient>`
    : `<linearGradient id="eleanorBg" x1="0%" y1="0%" x2="100%" y2="100%">
         <stop offset="0%" stop-color="#F2EDE3"/>
         <stop offset="100%" stop-color="#DFD4C3"/>
       </linearGradient>`;

  const glow = isOn ? `
    <radialGradient id="eleanorGlow" cx="62%" cy="32%" r="45%">
      <stop offset="0%" stop-color="#FFF2D6" stop-opacity="0.95"/>
      <stop offset="35%" stop-color="#F4B968" stop-opacity="0.5"/>
      <stop offset="70%" stop-color="#873B35" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#120E0C" stop-opacity="0"/>
    </radialGradient>
    <circle cx="740" cy="380" r="320" fill="url(#eleanorGlow)" mix-blend-mode="screen"/>
    <ellipse cx="740" cy="980" rx="260" ry="70" fill="#F4B968" opacity="0.25"/>
  ` : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200" width="100%" height="100%">
  <defs>${bg}</defs>
  <rect width="1200" height="1200" fill="url(#eleanorBg)"/>
  ${glow}

  <!-- Base Plate (Cast Iron / Bronze) -->
  <ellipse cx="480" cy="1000" rx="140" ry="30" fill="${isOn ? '#2B221D' : '#695547'}"/>

  <!-- Sweeping Asymmetrical Brass Arch -->
  <path d="M 480 1000 C 480 500 560 220 740 280" fill="none" stroke="${isOn ? '#D4A35B' : '#8F6832'}" stroke-width="12" stroke-linecap="round"/>

  <!-- Counterweight Sphere -->
  <circle cx="480" cy="560" r="28" fill="${isOn ? '#F2C679' : '#825C26'}"/>

  <!-- Conical Pivoting Lamp Shade -->
  <path d="M 680 340 L 800 340 L 840 430 L 640 430 Z" fill="${isOn ? '#FFF6E0' : '#ECE2D2'}" stroke="${isOn ? '#E5BA6E' : '#B8A892'}" stroke-width="4"/>
  <ellipse cx="740" cy="430" rx="100" ry="25" fill="${isOn ? '#FFFAEE' : '#DDD0BD'}"/>

  <text x="60" y="1140" font-family="'IBM Plex Mono', monospace" font-size="13" fill="${isOn ? '#9B8B7F' : '#7A6E62'}" letter-spacing="2">
    ELEANOR FLOOR LAMP // ${isOn ? 'ARCHITECTURAL READING POOL' : 'BALANCED ARCHED BRASS'}
  </text>
</svg>`;
}

// 6. FLUSHMOUNT ADRIENNE ON & OFF (1200x1200)
function getFlushmountAdrienneSvg(isOn = false) {
  const bg = isOn
    ? `<radialGradient id="adrBg" cx="50%" cy="50%" r="65%">
         <stop offset="0%" stop-color="#3D3228"/>
         <stop offset="60%" stop-color="#241E18"/>
         <stop offset="100%" stop-color="#14110E"/>
       </radialGradient>`
    : `<linearGradient id="adrBg" x1="0%" y1="0%" x2="100%" y2="100%">
         <stop offset="0%" stop-color="#EFE8DE"/>
         <stop offset="100%" stop-color="#DCD2C3"/>
       </linearGradient>`;

  const glow = isOn ? `
    <radialGradient id="adrGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFF5DC" stop-opacity="0.95"/>
      <stop offset="40%" stop-color="#F4B968" stop-opacity="0.5"/>
      <stop offset="80%" stop-color="#873B35" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#14110E" stop-opacity="0"/>
    </radialGradient>
    <circle cx="600" cy="600" r="420" fill="url(#adrGlow)" mix-blend-mode="screen"/>
  ` : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200" width="100%" height="100%">
  <defs>${bg}</defs>
  <rect width="1200" height="1200" fill="url(#adrBg)"/>
  ${glow}

  <!-- Outer Aged Brass Ring -->
  <circle cx="600" cy="600" r="320" fill="${isOn ? '#D4A35B' : '#946E3A'}"/>
  
  <!-- Carved Spanish Alabaster / Plaster Disc -->
  <circle cx="600" cy="600" r="280" fill="${isOn ? '#FFF9EC' : '#EDE4D6'}" stroke="${isOn ? '#EAD1A0' : '#C7B9A5'}" stroke-width="6"/>

  <!-- Alabaster Mineral Veining -->
  <path d="M 420 540 Q 560 520 680 580 T 780 660" fill="none" stroke="${isOn ? '#F2D7A5' : '#D2C4B1'}" stroke-width="8" opacity="0.6"/>
  <path d="M 460 670 Q 580 630 720 640" fill="none" stroke="${isOn ? '#F2D7A5' : '#D2C4B1'}" stroke-width="6" opacity="0.5"/>

  <!-- Center Solid Brass Stud -->
  <circle cx="600" cy="600" r="38" fill="${isOn ? '#F5CB78' : '#7A5726'}"/>

  <text x="60" y="1140" font-family="'IBM Plex Mono', monospace" font-size="13" fill="${isOn ? '#9B8D7F' : '#7A6E62'}" letter-spacing="2">
    ADRIENNE FLUSH MOUNT // ${isOn ? 'LOW CEILING DIFFUSED GLOW' : 'CARVED ALABASTER & SOLID BRASS'}
  </text>
</svg>`;
}

// 7. CANDLE LUCIEN ON & OFF (1200x1200)
function getCandleLucienSvg(isOn = false) {
  const bg = isOn
    ? `<radialGradient id="lucBg" cx="50%" cy="45%" r="65%">
         <stop offset="0%" stop-color="#36221A"/>
         <stop offset="60%" stop-color="#21140F"/>
         <stop offset="100%" stop-color="#120B08"/>
       </radialGradient>`
    : `<linearGradient id="lucBg" x1="0%" y1="0%" x2="100%" y2="100%">
         <stop offset="0%" stop-color="#F4EEE4"/>
         <stop offset="100%" stop-color="#E2D7C7"/>
       </linearGradient>`;

  const flameGlow = isOn ? `
    <radialGradient id="flameGrad" cx="50%" cy="38%" r="45%">
      <stop offset="0%" stop-color="#FFE8B2" stop-opacity="0.95"/>
      <stop offset="25%" stop-color="#F4B968" stop-opacity="0.65"/>
      <stop offset="55%" stop-color="#B7694C" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#120B08" stop-opacity="0"/>
    </radialGradient>
    <circle cx="600" cy="460" r="320" fill="url(#flameGrad)" mix-blend-mode="screen"/>
    <!-- Intimate Flame -->
    <path d="M 600 400 C 585 430 580 460 600 480 C 620 460 615 430 600 400 Z" fill="#FFEBBF"/>
    <ellipse cx="600" cy="470" rx="8" ry="12" fill="#5A88B5"/>
  ` : `
    <!-- Unlit Wick -->
    <line x1="600" y1="465" x2="600" y2="485" stroke="#2B201A" stroke-width="4" stroke-linecap="round"/>
  `;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200" width="100%" height="100%">
  <defs>${bg}</defs>
  <rect width="1200" height="1200" fill="url(#lucBg)"/>
  ${flameGlow}

  <!-- Stone/Wood Table Horizon -->
  <rect x="0" y="880" width="1200" height="320" fill="${isOn ? '#160E0A' : '#57453B'}"/>

  <!-- Lost-Wax Cast Bronze Vessel -->
  <path d="M 440 880 C 440 680 480 540 600 540 C 720 540 760 680 760 880 Z" 
        fill="${isOn ? '#3A271E' : '#4A372C'}" 
        stroke="${isOn ? '#5E4032' : '#32231A'}" 
        stroke-width="6"/>

  <!-- Wax Surface Pool -->
  <ellipse cx="600" cy="540" rx="120" ry="32" fill="${isOn ? '#F4E7CF' : '#E8DBC3'}"/>

  <text x="60" y="1140" font-family="'IBM Plex Mono', monospace" font-size="13" fill="${isOn ? '#A38B7C' : '#7A6E62'}" letter-spacing="2">
    LUCIEN CANDLE OBJECT // ${isOn ? 'FLICKERING INTIMATE FLAME' : 'SOLID LOST-WAX CAST BRONZE'}
  </text>
</svg>`;
}

// 8. PORTABLE ISLA ON & OFF (1200x1200)
function getPortableIslaSvg(isOn = false) {
  const bg = isOn
    ? `<radialGradient id="islaBg" cx="50%" cy="50%" r="65%">
         <stop offset="0%" stop-color="#34281E"/>
         <stop offset="60%" stop-color="#1F1812"/>
         <stop offset="100%" stop-color="#120E0A"/>
       </radialGradient>`
    : `<linearGradient id="islaBg" x1="0%" y1="0%" x2="100%" y2="100%">
         <stop offset="0%" stop-color="#F3ECE1"/>
         <stop offset="100%" stop-color="#E2D5C3"/>
       </linearGradient>`;

  const glow = isOn ? `
    <radialGradient id="islaGlow" cx="50%" cy="48%" r="48%">
      <stop offset="0%" stop-color="#FFF2D6" stop-opacity="0.95"/>
      <stop offset="35%" stop-color="#F4B968" stop-opacity="0.55"/>
      <stop offset="70%" stop-color="#B7694C" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#120E0A" stop-opacity="0"/>
    </radialGradient>
    <circle cx="600" cy="560" r="360" fill="url(#islaGlow)" mix-blend-mode="screen"/>
  ` : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200" width="100%" height="100%">
  <defs>${bg}</defs>
  <rect width="1200" height="1200" fill="url(#islaBg)"/>
  ${glow}

  <!-- Cast Brass Arched Handle -->
  <path d="M 450 620 C 450 280 750 280 750 620" fill="none" stroke="${isOn ? '#D4A35B' : '#8A642E'}" stroke-width="16" stroke-linecap="round"/>

  <!-- Cylindrical Diffuser Tube -->
  <rect x="500" y="440" width="200" height="260" rx="30" fill="${isOn ? '#FFF9EE' : '#E8DFD0'}" stroke="${isOn ? '#EAD6B3' : '#C7B9A5'}" stroke-width="4"/>

  <!-- Weighted Brass Base with tactile touch dial -->
  <rect x="460" y="690" width="280" height="110" rx="16" fill="${isOn ? '#B88842' : '#735222'}"/>
  <circle cx="600" cy="745" r="18" fill="${isOn ? '#F2C679' : '#4E3614'}"/>

  <text x="60" y="1140" font-family="'IBM Plex Mono', monospace" font-size="13" fill="${isOn ? '#9C8E7F' : '#7A6E62'}" letter-spacing="2">
    ISLA CORDLESS PORTABLE // ${isOn ? 'TACTILE ROTARY DIMMER ACTIVE' : 'RECHARGEABLE INDOOR/OUTDOOR'}
  </text>
</svg>`;
}

// 9. CHANDELIER SOLENNE ON & OFF (1200x1200)
function getChandelierSolenneSvg(isOn = false) {
  const bg = isOn
    ? `<radialGradient id="solBg" cx="50%" cy="40%" r="65%">
         <stop offset="0%" stop-color="#2D2A35"/>
         <stop offset="60%" stop-color="#1B1921"/>
         <stop offset="100%" stop-color="#100F14"/>
       </radialGradient>`
    : `<linearGradient id="solBg" x1="0%" y1="0%" x2="100%" y2="100%">
         <stop offset="0%" stop-color="#EFE8DE"/>
         <stop offset="100%" stop-color="#DCD2C3"/>
       </linearGradient>`;

  const glow = isOn ? `
    <circle cx="380" cy="480" r="140" fill="#FFF2D6" opacity="0.8" filter="url(#solBlur)"/>
    <circle cx="820" cy="540" r="140" fill="#FFF2D6" opacity="0.8" filter="url(#solBlur)"/>
    <circle cx="600" cy="380" r="160" fill="#FFF2D6" opacity="0.85" filter="url(#solBlur)"/>
  ` : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200" width="100%" height="100%">
  <defs>
    ${bg}
    <filter id="solBlur"><feGaussianBlur stdDeviation="35"/></filter>
  </defs>
  <rect width="1200" height="1200" fill="url(#solBg)"/>
  ${glow}

  <!-- Ceiling Drop Stem -->
  <line x1="600" y1="0" x2="600" y2="340" stroke="${isOn ? '#D4A35B' : '#7A5B2C'}" stroke-width="8"/>

  <!-- Mobile Kinetic Arms -->
  <line x1="320" y1="460" x2="880" y2="380" stroke="${isOn ? '#C8984D' : '#6A4F26'}" stroke-width="6"/>
  <line x1="420" y1="360" x2="780" y2="520" stroke="${isOn ? '#C8984D' : '#6A4F26'}" stroke-width="6"/>

  <!-- Orbs -->
  <circle cx="340" cy="460" r="50" fill="${isOn ? '#FFF9EE' : '#ECE5DA'}" stroke="${isOn ? '#E8C988' : '#B8A892'}" stroke-width="3"/>
  <circle cx="860" cy="380" r="50" fill="${isOn ? '#FFF9EE' : '#ECE5DA'}" stroke="${isOn ? '#E8C988' : '#B8A892'}" stroke-width="3"/>
  <circle cx="760" cy="520" r="50" fill="${isOn ? '#FFF9EE' : '#ECE5DA'}" stroke="${isOn ? '#E8C988' : '#B8A892'}" stroke-width="3"/>

  <!-- Counterweights -->
  <circle cx="440" cy="360" r="22" fill="${isOn ? '#F2C679' : '#4E3614'}"/>

  <text x="60" y="1140" font-family="'IBM Plex Mono', monospace" font-size="13" fill="${isOn ? '#9B96A8' : '#7A6E62'}" letter-spacing="2">
    SOLENNE MOBILE CHANDELIER // ${isOn ? 'THREE-TIER KINETIC HARMONY' : 'UNLACQUERED BRASS & MOUTH-BLOWN GLASS'}
  </text>
</svg>`;
}

// 10. MATERIAL MACRO DETAILS (1200x1200)
function getMaterialSvg(name, desc) {
  let innerArt = '';
  switch (name) {
    case 'brass':
      innerArt = `
        <defs>
          <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stop-color="#C59B58"/>
            <stop offset="35%" stop-color="#E2BF7A"/>
            <stop offset="65%" stop-color="#A77A38"/>
            <stop offset="100%" stop-color="#735222"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="1200" fill="url(#brassGrad)"/>
        <!-- Fine brushed grain lines -->
        <g stroke="#F4DBA1" stroke-width="1" opacity="0.4">
          ${Array.from({ length: 40 }).map((_, i) => `<line x1="0" y1="${i * 30}" x2="1200" y2="${i * 30 + 15}"/>`).join('')}
        </g>
        <!-- Patina spots -->
        <circle cx="480" cy="620" r="60" fill="#5E431E" opacity="0.25"/>
        <circle cx="820" cy="410" r="90" fill="#5E431E" opacity="0.2"/>
      `;
      break;
    case 'plaster':
      innerArt = `
        <defs>
          <linearGradient id="plasterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FAF5EC"/>
            <stop offset="50%" stop-color="#EDE4D5"/>
            <stop offset="100%" stop-color="#DCD0BD"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="1200" fill="url(#plasterGrad)"/>
        <!-- Trowel stroke textures -->
        <path d="M 0 300 Q 400 240 800 320 T 1200 290" fill="none" stroke="#D3C3AD" stroke-width="45" opacity="0.35"/>
        <path d="M 0 650 Q 500 700 900 620 T 1200 660" fill="none" stroke="#D3C3AD" stroke-width="60" opacity="0.3"/>
        <path d="M 0 980 Q 600 940 1200 990" fill="none" stroke="#D3C3AD" stroke-width="40" opacity="0.25"/>
      `;
      break;
    case 'opal_glass':
      innerArt = `
        <defs>
          <radialGradient id="opalGrad" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="40%" stop-color="#FBF7EE"/>
            <stop offset="75%" stop-color="#EBE2D3"/>
            <stop offset="100%" stop-color="#CFC2AF"/>
          </radialGradient>
        </defs>
        <rect width="1200" height="1200" fill="url(#opalGrad)"/>
        <circle cx="600" cy="600" r="450" fill="#FFF" opacity="0.4" filter="url(#glassBlur)"/>
      `;
      break;
    case 'marble':
      innerArt = `
        <defs>
          <linearGradient id="marbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#EDE6DA"/>
            <stop offset="100%" stop-color="#DFD5C6"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="1200" fill="url(#marbGrad)"/>
        <!-- Dramatic Calacatta Viola veins -->
        <path d="M 120 0 Q 300 340 480 620 T 980 1200" fill="none" stroke="#682928" stroke-width="28" stroke-linecap="round" opacity="0.75"/>
        <path d="M 280 200 Q 420 380 460 520" fill="none" stroke="#873B35" stroke-width="12" opacity="0.6"/>
        <path d="M 700 700 Q 820 900 1100 1020" fill="none" stroke="#4D1E1E" stroke-width="18" opacity="0.7"/>
      `;
      break;
    case 'oak':
      innerArt = `
        <defs>
          <linearGradient id="oakGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#735A49"/>
            <stop offset="50%" stop-color="#5E4738"/>
            <stop offset="100%" stop-color="#4B372B"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="1200" fill="url(#oakGrad)"/>
        <!-- Rich organic wood rings -->
        <g stroke="#3B2A20" stroke-width="3" opacity="0.5">
          ${Array.from({ length: 25 }).map((_, i) => `<path d="M 0 ${i * 48} Q 600 ${i * 48 + 25} 1200 ${i * 48}" fill="none"/>`).join('')}
        </g>
      `;
      break;
    default:
      innerArt = `<rect width="1200" height="1200" fill="#E8DEC9"/>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200" width="100%" height="100%">
  <defs>
    <filter id="glassBlur"><feGaussianBlur stdDeviation="45"/></filter>
  </defs>
  ${innerArt}
  <rect x="0" y="1040" width="1200" height="160" fill="#1E1C1A" opacity="0.8"/>
  <text x="60" y="1120" font-family="'Young Serif', serif" font-size="34" fill="#F7F2E8">${desc.title}</text>
  <text x="60" y="1160" font-family="'IBM Plex Mono', monospace" font-size="14" fill="#D7CDBD" letter-spacing="2">${desc.meta}</text>
</svg>`;
}

// 11. STUDIO & PROCESS PHOTOGRAPHY (1200x900)
function getStudioProcessSvg(step, title, caption) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2D2824"/>
      <stop offset="100%" stop-color="#1A1715"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#bg)"/>
  
  <!-- Workbench Timber Surface -->
  <rect x="0" y="480" width="1200" height="420" fill="#3D3027"/>
  <line x1="0" y1="480" x2="1200" y2="480" stroke="#5E4B3E" stroke-width="4"/>

  <!-- Workbench Artisan Tools & Objects -->
  <!-- Brass Caliper -->
  <line x1="240" y1="620" x2="440" y2="760" stroke="#A67A43" stroke-width="12" stroke-linecap="round"/>
  <line x1="280" y1="650" x2="480" y2="790" stroke="#A67A43" stroke-width="8" stroke-linecap="round"/>

  <!-- Raw Turned Brass Shade Component -->
  <circle cx="720" cy="640" r="130" fill="#C59B58" stroke="#876229" stroke-width="8"/>
  <circle cx="720" cy="640" r="60" fill="#2D2824"/>

  <!-- Technical Drawing Sketches / Paper -->
  <polygon points="880,520 1140,560 1080,780 820,740" fill="#EAE2D5" stroke="#C7BBAA" stroke-width="3"/>
  <line x1="860" y1="580" x2="1040" y2="610" stroke="#7A6F62" stroke-width="2"/>
  <line x1="870" y1="620" x2="1010" y2="645" stroke="#7A6F62" stroke-width="2"/>

  <!-- Window Natural Raking Sunlight -->
  <polygon points="120,0 420,0 720,480 320,480" fill="#FFF7EB" opacity="0.08"/>

  <!-- Caption Plaque -->
  <rect x="50" y="50" width="340" height="90" fill="#14110F" opacity="0.85" rx="4"/>
  <text x="75" y="88" font-family="'IBM Plex Mono', monospace" font-size="12" fill="#E9C978" letter-spacing="2">FIG. 0${step} // CRAFT ARCHIVE</text>
  <text x="75" y="118" font-family="'Young Serif', serif" font-size="18" fill="#F7F2E8">${title}</text>
</svg>`;
}

// 12. TRADE PROJECTS (1600x1000)
function getTradeProjectSvg(name, location, fixture) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="100%" height="100%">
  <defs>
    <linearGradient id="tradeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1A222E"/>
      <stop offset="60%" stop-color="#131821"/>
      <stop offset="100%" stop-color="#0E1218"/>
    </linearGradient>
  </defs>
  <rect width="1600" height="1000" fill="url(#tradeGrad)"/>

  <!-- Architectural Colonnade / Arches -->
  <g fill="none" stroke="#2D3A4D" stroke-width="8">
    <path d="M 200 900 L 200 400 A 150 150 0 0 1 500 400 L 500 900"/>
    <path d="M 650 900 L 650 400 A 150 150 0 0 1 950 400 L 950 900"/>
    <path d="M 1100 900 L 1100 400 A 150 150 0 0 1 1400 400 L 1400 900"/>
  </g>

  <!-- Sconces mounted in each arch bay with luminous warm glows -->
  <g>
    <circle cx="350" cy="500" r="160" fill="#FFDFA3" opacity="0.35"/>
    <rect x="335" y="460" width="30" height="90" rx="15" fill="#E9C978"/>
    
    <circle cx="800" cy="500" r="160" fill="#FFDFA3" opacity="0.35"/>
    <rect x="785" y="460" width="30" height="90" rx="15" fill="#E9C978"/>
    
    <circle cx="1250" cy="500" r="160" fill="#FFDFA3" opacity="0.35"/>
    <rect x="1235" y="460" width="30" height="90" rx="15" fill="#E9C978"/>
  </g>

  <!-- Flooring Horizon -->
  <rect x="0" y="860" width="1600" height="140" fill="#0A0D12"/>

  <!-- Info Overlay -->
  <rect x="80" y="760" width="540" height="150" fill="#171C26" opacity="0.9" rx="6"/>
  <text x="120" y="810" font-family="'IBM Plex Mono', monospace" font-size="12" fill="#91A8BB" letter-spacing="2">PROJECT SPECIFICATION // ${location}</text>
  <text x="120" y="850" font-family="'DM Serif Display', serif" font-size="30" fill="#F7F2E8">${name}</text>
  <text x="120" y="885" font-family="'Manrope', sans-serif" font-size="14" fill="#D7CDBD">Specified: ${fixture}</text>
</svg>`;
}

// 13. JOURNAL ESSAY COVERS (1200x800)
function getJournalSvg(title, category, date) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="100%" height="100%">
  <defs>
    <linearGradient id="jGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#342B28"/>
      <stop offset="50%" stop-color="#231D1B"/>
      <stop offset="100%" stop-color="#171312"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#jGrad)"/>

  <!-- Warm lamp in corner casting gradient across paper -->
  <circle cx="1000" cy="240" r="320" fill="#F4B968" opacity="0.25"/>
  <circle cx="1000" cy="240" r="40" fill="#FFF2D6" opacity="0.8"/>

  <!-- Graphic Editorial Lines -->
  <line x1="120" y1="140" x2="1080" y2="140" stroke="#7A685D" stroke-width="2"/>
  <text x="120" y="110" font-family="'IBM Plex Mono', monospace" font-size="14" fill="#E9C978" letter-spacing="3">${category.toUpperCase()} // ${date}</text>
  
  <text x="120" y="380" font-family="'DM Serif Display', serif" font-size="52" fill="#F7F2E8">
    ${title}
  </text>
  <text x="120" y="520" font-family="'Manrope', sans-serif" font-size="20" fill="#D7CDBD" opacity="0.85">
    An inquiry into darkness, evening rituals, and domestic architecture.
  </text>
</svg>`;
}

// 14. FOUNDER PORTRAIT
function getFounderPortraitSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1400" width="100%" height="100%">
  <defs>
    <linearGradient id="portBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2B2420"/>
      <stop offset="100%" stop-color="#161210"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="1400" fill="url(#portBg)"/>
  
  <!-- Studio Atelier Shelves behind -->
  <line x1="100" y1="350" x2="1100" y2="350" stroke="#483B33" stroke-width="6"/>
  <line x1="100" y1="700" x2="1100" y2="700" stroke="#483B33" stroke-width="6"/>
  
  <!-- Lamp prototype on shelf -->
  <circle cx="340" cy="260" r="45" fill="#FFE5A8" opacity="0.6"/>
  <rect x="325" y="270" width="30" height="75" fill="#A67A43"/>

  <!-- Designer Silhouette Figure -->
  <ellipse cx="680" cy="620" rx="140" ry="180" fill="#3A3029"/>
  <path d="M 440 1400 C 440 980 540 850 680 850 C 820 850 920 980 920 1400 Z" fill="#241E1A"/>

  <!-- Warm lamp spotlighting the desk -->
  <circle cx="950" cy="800" r="280" fill="#FFDFA3" opacity="0.3"/>
  <circle cx="950" cy="800" r="30" fill="#FFF2D6"/>

  <text x="80" y="1320" font-family="'Young Serif', serif" font-size="34" fill="#F7F2E8">ALISTAIR VANCE</text>
  <text x="80" y="1355" font-family="'IBM Plex Mono', monospace" font-size="14" fill="#D7CDBD" letter-spacing="2">FOUNDER &amp; DESIGN DIRECTOR // STUDIO ARCHIVE</text>
</svg>`;
}

// EXECUTE GENERATION
console.log('Generating complete SVG asset suite for ORIEL HOUSE...');

// 1. Hero Room Pair
writeSvg('hero_room_day.svg', getHeroRoomSvg(false));
writeSvg('hero_room_night.svg', getHeroRoomSvg(true));

// 2. Signature Products Pairs
writeSvg('sconce_esme_off.svg', getSconceEsmeSvg(false));
writeSvg('sconce_esme_on.svg', getSconceEsmeSvg(true));

writeSvg('table_lamp_margo_off.svg', getTableLampMargoSvg(false));
writeSvg('table_lamp_margo_on.svg', getTableLampMargoSvg(true));

writeSvg('pendant_bellamy_off.svg', getPendantBellamySvg(false));
writeSvg('pendant_bellamy_on.svg', getPendantBellamySvg(true));

writeSvg('floor_lamp_eleanor_off.svg', getFloorLampEleanorSvg(false));
writeSvg('floor_lamp_eleanor_on.svg', getFloorLampEleanorSvg(true));

writeSvg('flushmount_adrienne_off.svg', getFlushmountAdrienneSvg(false));
writeSvg('flushmount_adrienne_on.svg', getFlushmountAdrienneSvg(true));

writeSvg('candle_lucien_off.svg', getCandleLucienSvg(false));
writeSvg('candle_lucien_on.svg', getCandleLucienSvg(true));

writeSvg('portable_isla_off.svg', getPortableIslaSvg(false));
writeSvg('portable_isla_on.svg', getPortableIslaSvg(true));

writeSvg('chandelier_solenne_off.svg', getChandelierSolenneSvg(false));
writeSvg('chandelier_solenne_on.svg', getChandelierSolenneSvg(true));

// 3. Materials
writeSvg('material_brass.svg', getMaterialSvg('brass', { title: 'AGED BRASS', meta: 'UNLACQUERED / LIVING PATINA' }));
writeSvg('material_plaster.svg', getMaterialSvg('plaster', { title: 'MINERAL PLASTER', meta: 'HAND-TROWELLED / CHALK TEXTURE' }));
writeSvg('material_opal_glass.svg', getMaterialSvg('opal_glass', { title: 'MOUTH-BLOWN OPAL', meta: 'CASED MILK GLASS / 2700K DIFFUSION' }));
writeSvg('material_marble.svg', getMaterialSvg('marble', { title: 'CALACATTA VIOLA', meta: 'HONED STONE / DEEP BURGUNDY VEIN' }));
writeSvg('material_oak.svg', getMaterialSvg('oak', { title: 'FUMED OAK', meta: 'QUARTER-SAWN / NATURAL WAX' }));

// 4. Studio & Craft
writeSvg('studio_process_1.svg', getStudioProcessSvg('1', 'HAND-TURNING THE BASE', 'Solid brass bar stock machined and hand-faced on lathe'));
writeSvg('studio_process_2.svg', getStudioProcessSvg('2', 'SURFACE ABRASION & PATINA', 'Multi-stage oil rubbing to accelerate natural mineral patina'));
writeSvg('studio_process_3.svg', getStudioProcessSvg('3', 'ELECTRICAL HARNESS & TESTING', 'Silicone-sleeved twisted cord assembly and 48-hour burn-in'));

// 5. Trade Architecture Projects
writeSvg('trade_project_1.svg', getTradeProjectSvg('HOTEL SAINT-GERMAIN', 'PARIS 06', 'ESME SCONCES IN PATINATED BRASS'));
writeSvg('trade_project_2.svg', getTradeProjectSvg('VILLA MONTEMAR', 'MALLORCA', 'CUSTOM BELLAMY PENDANTS IN LINEN GLASS'));
writeSvg('trade_project_3.svg', getTradeProjectSvg('THE ARCHITECTURAL RESIDENCE', 'MELBOURNE', 'ELEANOR FLOOR FIXTURES & ADRIENNE FLUSH'));

// 6. Editorial Journal
writeSvg('journal_1.svg', getJournalSvg('HOW TO LIGHT A DINNER TABLE WITHOUT LIGHTING THE ROOM', 'LIGHTING ESSAY', 'OCTOBER 2026'));
writeSvg('journal_2.svg', getJournalSvg('WHY ONE LAMP IS SOMETIMES BETTER THAN SIX DOWNLIGHTS', 'ARCHITECTURAL CRITIQUE', 'SEPTEMBER 2026'));
writeSvg('journal_3.svg', getJournalSvg('THE CASE FOR WARMER CORNERS', 'DOMESTIC RITUAL', 'AUGUST 2026'));
writeSvg('journal_4.svg', getJournalSvg('A HOUSE AFTER 6 PM: THE THEATRE OF SHADOWS', 'PHOTO ESSAY', 'JULY 2026'));

// 7. Founder
writeSvg('founder_portrait.svg', getFounderPortraitSvg());

console.log('✓ All 27 local assets generated successfully in public/images/!');
