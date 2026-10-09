import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.join(__dirname, '../public/images');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('Generating additional rich architectural & client portal SVG assets...');

// 1. account_portal_hero.svg: High-end private architectural salon
const accountHeroSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="100%" height="100%">
  <defs>
    <linearGradient id="wallGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EBE2D3"/>
      <stop offset="60%" stop-color="#DDCFB9"/>
      <stop offset="100%" stop-color="#CBB99E"/>
    </linearGradient>
    <linearGradient id="floorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3A2E26"/>
      <stop offset="100%" stop-color="#241B16"/>
    </linearGradient>
    <linearGradient id="windowLight" x1="0%" y1="0%" x2="100%" y2="80%">
      <stop offset="0%" stop-color="#FFF5E0" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#FFF5E0" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFE0A0" stop-opacity="0.9"/>
      <stop offset="40%" stop-color="#E9C978" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#E9C978" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F3E2B8"/>
      <stop offset="35%" stop-color="#CCA056"/>
      <stop offset="70%" stop-color="#8E6527"/>
      <stop offset="100%" stop-color="#C2964C"/>
    </linearGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="15" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Wall & Room Background -->
  <rect width="1600" height="900" fill="url(#wallGrad)"/>

  <!-- High Classical Arched Windows -->
  <g opacity="0.85">
    <!-- Left Arched Window -->
    <path d="M 120 120 Q 240 40 360 120 L 360 620 L 120 620 Z" fill="#C5D3DC" stroke="#7A6F62" stroke-width="8"/>
    <line x1="240" y1="80" x2="240" y2="620" stroke="#7A6F62" stroke-width="6"/>
    <line x1="120" y1="280" x2="360" y2="280" stroke="#7A6F62" stroke-width="6"/>
    <line x1="120" y1="450" x2="360" y2="450" stroke="#7A6F62" stroke-width="6"/>

    <!-- Center Arched Window -->
    <path d="M 440 90 Q 600 0 760 90 L 760 620 L 440 620 Z" fill="#C5D3DC" stroke="#7A6F62" stroke-width="8"/>
    <line x1="600" y1="45" x2="600" y2="620" stroke="#7A6F62" stroke-width="6"/>
    <line x1="440" y1="260" x2="760" y2="260" stroke="#7A6F62" stroke-width="6"/>
    <line x1="440" y1="440" x2="760" y2="440" stroke="#7A6F62" stroke-width="6"/>
  </g>

  <!-- Angled Window Daylight Beam -->
  <polygon points="440,90 760,90 1200,680 500,680" fill="url(#windowLight)"/>

  <!-- Timber Floor -->
  <polygon points="0,620 1600,620 1600,900 0,900" fill="url(#floorGrad)"/>
  <!-- Plank lines -->
  <line x1="0" y1="680" x2="1600" y2="680" stroke="#221812" stroke-width="2" opacity="0.4"/>
  <line x1="0" y1="750" x2="1600" y2="750" stroke="#221812" stroke-width="2" opacity="0.4"/>
  <line x1="0" y1="830" x2="1600" y2="830" stroke="#221812" stroke-width="2" opacity="0.4"/>

  <!-- Architectural Molding & Cornice -->
  <rect x="0" y="40" width="1600" height="24" fill="#B3A38D" opacity="0.7"/>
  <rect x="0" y="605" width="1600" height="15" fill="#58483B"/>

  <!-- Architect's Large Timber Drafting Table -->
  <g id="draftingTable">
    <!-- Table shadow -->
    <polygon points="760,780 1480,780 1520,840 820,840" fill="#140F0C" opacity="0.5" filter="url(#softShadow)"/>
    <!-- Table Top -->
    <polygon points="800,560 1440,560 1480,620 760,620" fill="#4A3B30"/>
    <polygon points="760,620 1480,620 1480,645 760,645" fill="#30241C"/>
    <!-- Table Legs -->
    <rect x="790" y="645" width="28" height="150" fill="#2E241D"/>
    <rect x="1430" y="645" width="28" height="150" fill="#2E241D"/>
    <line x1="810" y1="720" x2="1440" y2="720" stroke="#241B16" stroke-width="12"/>

    <!-- Unrolled Blueprint Drawing Sheet on Table -->
    <polygon points="840,580 1360,575 1380,612 850,615" fill="#2C3D52" stroke="#5A7494" stroke-width="2"/>
    <!-- Blueprint Lines -->
    <line x1="880" y1="590" x2="1320" y2="587" stroke="#A7C0DC" stroke-width="1.5" stroke-dasharray="8 4" opacity="0.8"/>
    <line x1="910" y1="602" x2="1280" y2="600" stroke="#A7C0DC" stroke-width="1.5" opacity="0.8"/>
    <circle cx="1040" cy="595" r="12" fill="none" stroke="#E9C978" stroke-width="1.5"/>
    <!-- Brass Paperweights -->
    <circle cx="850" cy="582" r="8" fill="url(#brassGrad)"/>
    <circle cx="1360" cy="576" r="8" fill="url(#brassGrad)"/>

    <!-- Sculptural Architect's Task Lamp (Glow Active) -->
    <g id="architectLamp">
      <ellipse cx="1260" cy="590" rx="26" ry="12" fill="url(#brassGrad)"/>
      <path d="M 1260 585 Q 1280 470 1200 420 Q 1160 400 1140 430" fill="none" stroke="url(#brassGrad)" stroke-width="8" stroke-linecap="round"/>
      <path d="M 1130 420 L 1180 435 L 1155 465 Z" fill="url(#brassGrad)"/>
      <!-- Lamp Glow Pool -->
      <circle cx="1140" cy="460" r="160" fill="url(#lampGlow)"/>
    </g>
  </g>

  <!-- Large Artwork Frame on Wall -->
  <rect x="940" y="140" width="460" height="340" fill="#DFD6C7" stroke="#3D3025" stroke-width="14" filter="url(#softShadow)"/>
  <circle cx="1170" cy="310" r="100" fill="#873B35" opacity="0.85"/>
  <path d="M 1040 380 Q 1170 200 1300 370" fill="none" stroke="#28201C" stroke-width="6"/>

  <!-- Atmospheric Studio Text overlay watermark -->
  <text x="80" y="840" font-family="'IBM Plex Mono', monospace" font-size="14" fill="#D7CDBD" letter-spacing="4" opacity="0.6">
    ORIEL HOUSE // ATELIER SPECIFICATION SALON // 51.5074° N, 0.1278° W
  </text>
</svg>`;

// 2. craft_bench_brass.svg: High-end workshop bench and tooling
const craftBenchSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="100%" height="100%">
  <defs>
    <linearGradient id="benchBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2D231E"/>
      <stop offset="100%" stop-color="#191310"/>
    </linearGradient>
    <linearGradient id="benchTop" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#5A4739"/>
      <stop offset="50%" stop-color="#46362B"/>
      <stop offset="100%" stop-color="#2E221B"/>
    </linearGradient>
    <linearGradient id="polishedBrass" x1="0%" y1="0%" x2="100%" y2="50%">
      <stop offset="0%" stop-color="#FFF0CC"/>
      <stop offset="25%" stop-color="#F2D184"/>
      <stop offset="60%" stop-color="#BA8B3D"/>
      <stop offset="85%" stop-color="#6F4D17"/>
      <stop offset="100%" stop-color="#D4A755"/>
    </linearGradient>
    <radialGradient id="benchLight" cx="45%" cy="30%" r="55%">
      <stop offset="0%" stop-color="#FFEBB8" stop-opacity="0.8"/>
      <stop offset="45%" stop-color="#E9C978" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#E9C978" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="800" fill="url(#benchBg)"/>

  <!-- Ambient Light Cone from Overhanging Studio Shade -->
  <circle cx="560" cy="240" r="480" fill="url(#benchLight)"/>

  <!-- Workshop Pegboard & Wall Tools -->
  <g opacity="0.35">
    <pattern id="pegboard" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="12" cy="12" r="2.5" fill="#4A3D34"/>
    </pattern>
    <rect x="0" y="0" width="1200" height="380" fill="url(#pegboard)"/>
    <!-- Hanging Spanners & Calipers -->
    <path d="M 180 80 L 180 220 M 170 90 L 190 90" stroke="#7A6658" stroke-width="5" stroke-linecap="round"/>
    <path d="M 280 60 L 280 240 M 270 70 L 290 70" stroke="#7A6658" stroke-width="7" stroke-linecap="round"/>
    <path d="M 980 90 Q 940 180 980 250" fill="none" stroke="#7A6658" stroke-width="4"/>
  </g>

  <!-- Heavy Oak Craftsman Workbench Top -->
  <rect x="0" y="440" width="1200" height="360" fill="url(#benchTop)"/>
  <line x1="0" y1="440" x2="1200" y2="440" stroke="#7C6552" stroke-width="3"/>
  <!-- Gouges & Scratches on Timber for tactile reality -->
  <path d="M 140 480 Q 220 484 310 481" stroke="#221812" stroke-width="2" opacity="0.6"/>
  <path d="M 640 510 Q 720 508 860 512" stroke="#221812" stroke-width="2" opacity="0.6"/>

  <!-- Hand-Machined Brass Cylinders & Components on Bench -->
  <g id="brassComponents">
    <!-- Turned Sconce Backplate -->
    <ellipse cx="600" cy="560" rx="140" ry="70" fill="url(#polishedBrass)"/>
    <ellipse cx="600" cy="560" rx="110" ry="55" fill="#3D2E1C"/>
    <ellipse cx="600" cy="560" rx="90" ry="45" fill="url(#polishedBrass)"/>
    <circle cx="600" cy="560" r="18" fill="#1C140D"/>

    <!-- Solid Turned Brass Spindle -->
    <path d="M 240 590 L 460 590 L 460 635 L 240 635 Z" fill="url(#polishedBrass)"/>
    <ellipse cx="240" cy="612" rx="12" ry="22.5" fill="#6F4D17"/>
    <ellipse cx="460" cy="612" rx="12" ry="22.5" fill="#FFF0CC"/>

    <!-- Artisan Calipers Measuring Dimension -->
    <path d="M 520 450 Q 580 500 590 540" fill="none" stroke="#D7CDBD" stroke-width="6" stroke-linecap="round"/>
    <path d="M 680 450 Q 620 500 610 540" fill="none" stroke="#D7CDBD" stroke-width="6" stroke-linecap="round"/>
    <circle cx="600" cy="460" r="10" fill="#873B35"/>
  </g>

  <!-- Linen Polishing Cloth -->
  <path d="M 800 600 Q 860 560 920 610 Q 980 640 940 680 Q 880 700 810 660 Z" fill="#D7CDBD" opacity="0.85"/>

  <!-- Studio Label -->
  <text x="60" y="740" font-family="'IBM Plex Mono', monospace" font-size="14" fill="#E9C978" letter-spacing="3">
    FIG. 04 // BENCH PATINA &amp; LATHE TURNING // GRADE-CZ121 SOLID BRASS
  </text>
</svg>`;

// 3. blueprint_elevation.svg: Detailed Technical Lighting Elevation
const blueprintElevationSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="100%" height="100%">
  <defs>
    <linearGradient id="bpBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1B2836"/>
      <stop offset="100%" stop-color="#131C26"/>
    </linearGradient>
    <radialGradient id="lightCone" cx="50%" cy="0%" r="90%">
      <stop offset="0%" stop-color="#FFE8B0" stop-opacity="0.4"/>
      <stop offset="40%" stop-color="#E9C978" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#E9C978" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="900" fill="url(#bpBg)"/>

  <!-- Grid Pattern -->
  <g opacity="0.15">
    <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
      <rect width="40" height="40" fill="none" stroke="#6F93BA" stroke-width="1"/>
    </pattern>
    <rect width="1200" height="900" fill="url(#gridPattern)"/>
  </g>

  <!-- Architectural Room Section Elevation Lines -->
  <!-- Ceiling Line -->
  <line x1="100" y1="180" x2="1100" y2="180" stroke="#A7C2DE" stroke-width="3"/>
  <text x="110" y="165" font-family="'IBM Plex Mono', monospace" font-size="12" fill="#88A8CD">CEILING DATUM +3200mm</text>

  <!-- Wall Datum Lines -->
  <line x1="200" y1="180" x2="200" y2="760" stroke="#A7C2DE" stroke-width="2"/>
  <line x1="1000" y1="180" x2="1000" y2="760" stroke="#A7C2DE" stroke-width="2"/>

  <!-- Finished Floor Line -->
  <line x1="100" y1="760" x2="1100" y2="760" stroke="#A7C2DE" stroke-width="4"/>
  <text x="110" y="790" font-family="'IBM Plex Mono', monospace" font-size="12" fill="#88A8CD">FINISHED FLOOR LEVEL ±0.000</text>

  <!-- Center Suspended Fixture: Bellamy Pendant -->
  <g id="pendantDrawing">
    <!-- Ceiling Rose -->
    <ellipse cx="600" cy="180" rx="30" ry="8" fill="#E9C978"/>
    <!-- Braided Cord Drop -->
    <line x1="600" y1="180" x2="600" y2="400" stroke="#E9C978" stroke-width="3"/>
    <!-- Pendant Shade -->
    <path d="M 490 440 Q 600 390 710 440 L 680 470 Q 600 450 520 470 Z" fill="#E9C978" stroke="#FFE7AB" stroke-width="2"/>
    <!-- Opal Sphere -->
    <circle cx="600" cy="470" r="34" fill="#FFF9ED" stroke="#E9C978" stroke-width="2"/>

    <!-- Projected Light Distribution Cone (Lux Envelope) -->
    <polygon points="600,470 300,760 900,760" fill="url(#lightCone)"/>
    <path d="M 300 760 Q 600 740 900 760" fill="none" stroke="#FFE0A0" stroke-width="2" stroke-dasharray="6 4"/>
    <text x="600" y="730" font-family="'IBM Plex Mono', monospace" font-size="13" fill="#FFE0A0" text-anchor="middle">
      PRIMARY TASK LUX: 320 lx @ TABLETOP
    </text>
  </g>

  <!-- Wall Sconce Elevation Left: Esme Sconce -->
  <g id="sconceDrawing">
    <!-- Mounting Plate at 1650mm AFF -->
    <rect x="200" y="440" width="16" height="60" fill="#E9C978"/>
    <circle cx="235" cy="470" r="24" fill="#FFF9ED" stroke="#E9C978" stroke-width="2"/>
    <!-- Wall grazing beam -->
    <path d="M 235 470 L 340 320 L 340 620 Z" fill="url(#lightCone)" opacity="0.7"/>
    <!-- Dimension String -->
    <line x1="160" y1="760" x2="160" y2="470" stroke="#88A8CD" stroke-width="1.5" stroke-dasharray="4 2"/>
    <polyline points="155,475 160,470 165,475" fill="none" stroke="#88A8CD" stroke-width="1.5"/>
    <polyline points="155,755 160,760 165,755" fill="none" stroke="#88A8CD" stroke-width="1.5"/>
    <text x="145" y="620" font-family="'IBM Plex Mono', monospace" font-size="11" fill="#88A8CD" transform="rotate(-90 145 620)" text-anchor="middle">
      1650mm AFF MOUNTING CENTER
    </text>
  </g>

  <!-- Dimension Annotation for Table Clearance -->
  <line x1="600" y1="470" x2="600" y2="600" stroke="#88A8CD" stroke-width="1.5" stroke-dasharray="4 2"/>
  <text x="615" y="540" font-family="'IBM Plex Mono', monospace" font-size="12" fill="#88A8CD">
    820mm CLEARANCE TO DINING SURFACE
  </text>

  <!-- Titleblock -->
  <rect x="760" y="780" width="380" height="90" fill="#172330" stroke="#48688C" stroke-width="2"/>
  <text x="780" y="805" font-family="'Young Serif', serif" font-size="16" fill="#F7F2E8">ORIEL HOUSE // SCHEMATIC ELEVATION</text>
  <text x="780" y="828" font-family="'IBM Plex Mono', monospace" font-size="11" fill="#88A8CD">DRAWING NO: OH-SPEC-ELV-04 / SCALE 1:20</text>
  <text x="780" y="848" font-family="'IBM Plex Mono', monospace" font-size="11" fill="#E9C978">STATUS: TRADE SPECIFICATION APPROVED</text>
</svg>`;

// 4. swatch_box.svg: Presentation wooden tray of 5 authentic architectural materials
const swatchBoxSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="100%" height="100%">
  <defs>
    <linearGradient id="trayOak" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4E3D31"/>
      <stop offset="50%" stop-color="#3D2F25"/>
      <stop offset="100%" stop-color="#281E17"/>
    </linearGradient>
    <linearGradient id="swatchBrass" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F2DFB8"/>
      <stop offset="50%" stop-color="#C2964C"/>
      <stop offset="100%" stop-color="#6F4D17"/>
    </linearGradient>
    <linearGradient id="swatchBronze" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#54453A"/>
      <stop offset="50%" stop-color="#352920"/>
      <stop offset="100%" stop-color="#1E1712"/>
    </linearGradient>
    <linearGradient id="swatchPlaster" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FAF5EE"/>
      <stop offset="60%" stop-color="#ECE3D4"/>
      <stop offset="100%" stop-color="#D7CDBD"/>
    </linearGradient>
    <radialGradient id="swatchGlass" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="50%" stop-color="#FFF5E0"/>
      <stop offset="100%" stop-color="#D4C9B4"/>
    </radialGradient>
    <linearGradient id="swatchTravertine" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#DFD7C9"/>
      <stop offset="50%" stop-color="#C8BEAD"/>
      <stop offset="100%" stop-color="#9C907E"/>
    </linearGradient>
  </defs>

  <!-- Background Linen -->
  <rect width="1200" height="800" fill="#F0E9DD"/>

  <!-- Solid Smoked Oak Tray -->
  <rect x="100" y="160" width="1000" height="480" rx="16" fill="url(#trayOak)" stroke="#1F1611" stroke-width="12"/>
  <!-- Velvet/Linen Inset Base -->
  <rect x="130" y="190" width="940" height="420" rx="8" fill="#1C1815"/>

  <!-- 5 Individual Roundel Samples -->
  <!-- 01 Aged Unlacquered Brass -->
  <g transform="translate(230, 390)">
    <circle cx="0" cy="0" r="76" fill="#120D0A"/>
    <circle cx="0" cy="0" r="70" fill="url(#swatchBrass)"/>
    <circle cx="0" cy="0" r="66" fill="none" stroke="#FFFFFF" stroke-opacity="0.3" stroke-width="2"/>
    <text x="0" y="105" font-family="'IBM Plex Mono', monospace" font-size="12" fill="#D7CDBD" text-anchor="middle" letter-spacing="1">
      AGED BRASS
    </text>
    <text x="0" y="125" font-family="'IBM Plex Mono', monospace" font-size="10" fill="#887A6E" text-anchor="middle">
      LIVING PATINA
    </text>
  </g>

  <!-- 02 Bronzed Umber -->
  <g transform="translate(415, 390)">
    <circle cx="0" cy="0" r="76" fill="#120D0A"/>
    <circle cx="0" cy="0" r="70" fill="url(#swatchBronze)"/>
    <text x="0" y="105" font-family="'IBM Plex Mono', monospace" font-size="12" fill="#D7CDBD" text-anchor="middle" letter-spacing="1">
      DARK BRONZE
    </text>
    <text x="0" y="125" font-family="'IBM Plex Mono', monospace" font-size="10" fill="#887A6E" text-anchor="middle">
      HAND-WAXED
    </text>
  </g>

  <!-- 03 Fluted Opal Glass -->
  <g transform="translate(600, 390)">
    <circle cx="0" cy="0" r="76" fill="#120D0A"/>
    <circle cx="0" cy="0" r="70" fill="url(#swatchGlass)"/>
    <!-- Fluting lines -->
    <line x1="-40" y1="-50" x2="-40" y2="50" stroke="#B8AC96" stroke-width="3" opacity="0.6"/>
    <line x1="-20" y1="-64" x2="-20" y2="64" stroke="#B8AC96" stroke-width="3" opacity="0.6"/>
    <line x1="0" y1="-68" x2="0" y2="68" stroke="#B8AC96" stroke-width="3" opacity="0.6"/>
    <line x1="20" y1="-64" x2="20" y2="64" stroke="#B8AC96" stroke-width="3" opacity="0.6"/>
    <line x1="40" y1="-50" x2="40" y2="50" stroke="#B8AC96" stroke-width="3" opacity="0.6"/>
    <text x="0" y="105" font-family="'IBM Plex Mono', monospace" font-size="12" fill="#D7CDBD" text-anchor="middle" letter-spacing="1">
      OPAL GLASS
    </text>
    <text x="0" y="125" font-family="'IBM Plex Mono', monospace" font-size="10" fill="#887A6E" text-anchor="middle">
      MOUTH-BLOWN
    </text>
  </g>

  <!-- 04 Raw Limewash Plaster -->
  <g transform="translate(785, 390)">
    <circle cx="0" cy="0" r="76" fill="#120D0A"/>
    <circle cx="0" cy="0" r="70" fill="url(#swatchPlaster)"/>
    <text x="0" y="105" font-family="'IBM Plex Mono', monospace" font-size="12" fill="#D7CDBD" text-anchor="middle" letter-spacing="1">
      CHALK PLASTER
    </text>
    <text x="0" y="125" font-family="'IBM Plex Mono', monospace" font-size="10" fill="#887A6E" text-anchor="middle">
      MINERAL TEXTURE
    </text>
  </g>

  <!-- 05 Raw Travertine -->
  <g transform="translate(970, 390)">
    <circle cx="0" cy="0" r="76" fill="#120D0A"/>
    <circle cx="0" cy="0" r="70" fill="url(#swatchTravertine)"/>
    <!-- Stone cavities -->
    <ellipse cx="-20" cy="-10" rx="14" ry="6" fill="#7C7060" opacity="0.5"/>
    <ellipse cx="25" cy="18" rx="18" ry="8" fill="#7C7060" opacity="0.5"/>
    <text x="0" y="105" font-family="'IBM Plex Mono', monospace" font-size="12" fill="#D7CDBD" text-anchor="middle" letter-spacing="1">
      TRAVERTINE
    </text>
    <text x="0" y="125" font-family="'IBM Plex Mono', monospace" font-size="10" fill="#887A6E" text-anchor="middle">
      CARVED STONE
    </text>
  </g>

  <!-- Brass Plaque on Wooden Tray -->
  <rect x="490" y="215" width="220" height="34" fill="url(#swatchBrass)" stroke="#1F1611" stroke-width="2"/>
  <text x="600" y="238" font-family="'IBM Plex Mono', monospace" font-size="11" fill="#1E1C1A" text-anchor="middle" font-weight="bold" letter-spacing="2">
    ORIEL HOUSE ARCHIVE
  </text>
</svg>`;

// 5. client_residence_1.svg: Cotswolds Manor Residence
const residence1Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="100%" height="100%">
  <defs>
    <linearGradient id="cotswoldWall" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#C7BBA7"/>
      <stop offset="100%" stop-color="#A89B85"/>
    </linearGradient>
    <radialGradient id="pendantWarmth" cx="50%" cy="30%" r="55%">
      <stop offset="0%" stop-color="#FFE0A0" stop-opacity="0.85"/>
      <stop offset="50%" stop-color="#E9C978" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#E9C978" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="800" fill="url(#cotswoldWall)"/>

  <!-- Timber Ceiling Beams -->
  <rect x="0" y="40" width="1200" height="40" fill="#3A2D23"/>
  <rect x="0" y="140" width="1200" height="35" fill="#3A2D23"/>

  <!-- Dining Table in Dusk -->
  <polygon points="150,560 1050,560 1120,680 80,680" fill="#2E241D"/>
  <rect x="180" y="680" width="40" height="120" fill="#1D1611"/>
  <rect x="980" y="680" width="40" height="120" fill="#1D1611"/>

  <!-- Light Glow on Table -->
  <circle cx="600" cy="380" r="380" fill="url(#pendantWarmth)"/>

  <!-- Bellamy Pendant Suspended -->
  <line x1="600" y1="140" x2="600" y2="340" stroke="#E9C978" stroke-width="4"/>
  <path d="M 460 380 Q 600 320 740 380 Z" fill="#E9C978"/>
  <circle cx="600" cy="405" r="36" fill="#FFF9ED"/>

  <!-- Table Details: Candles & Wine Glass Silhouettes -->
  <rect x="420" y="525" width="6" height="35" fill="#F7F2E8"/>
  <circle cx="423" cy="518" r="5" fill="#FFA500"/>
  <rect x="780" y="525" width="6" height="35" fill="#F7F2E8"/>
  <circle cx="783" cy="518" r="5" fill="#FFA500"/>

  <text x="60" y="740" font-family="'IBM Plex Mono', monospace" font-size="13" fill="#F7F2E8" letter-spacing="2">
    PROJECT: COTSWOLDS STONE RESIDENCE // FIXTURE: BELLAMY PENDANT &amp; LUCIEN CANDLE
  </text>
</svg>`;

// 6. client_residence_2.svg: Mayfair Penthouse Salon
const residence2Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="100%" height="100%">
  <defs>
    <linearGradient id="mayfairWall" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#26344A"/>
      <stop offset="100%" stop-color="#182230"/>
    </linearGradient>
    <radialGradient id="sconceWarmth" cx="30%" cy="40%" r="45%">
      <stop offset="0%" stop-color="#FFE5B4" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#E9C978" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#E9C978" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="tableLampWarmth" cx="80%" cy="55%" r="40%">
      <stop offset="0%" stop-color="#FFE5B4" stop-opacity="0.85"/>
      <stop offset="50%" stop-color="#E9C978" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#E9C978" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="800" fill="url(#mayfairWall)"/>

  <!-- Left Sconce Warmth -->
  <circle cx="340" cy="340" r="280" fill="url(#sconceWarmth)"/>
  <!-- Right Margo Lamp Warmth -->
  <circle cx="920" cy="480" r="260" fill="url(#tableLampWarmth)"/>

  <!-- Esme Sconce on Wall -->
  <rect x="330" y="310" width="18" height="60" fill="#E9C978"/>
  <ellipse cx="339" cy="340" rx="36" ry="16" fill="#FFF9ED"/>

  <!-- Dark Oak Credenza on Right -->
  <rect x="760" y="520" width="400" height="240" fill="#1C1510"/>
  <line x1="760" y1="520" x2="1160" y2="520" stroke="#7A604D" stroke-width="4"/>

  <!-- Margo Table Lamp on Credenza -->
  <rect x="900" y="470" width="38" height="50" fill="#E9C978" rx="6"/>
  <circle cx="919" cy="430" r="42" fill="#FFF8EB"/>

  <!-- Large Artwork in Shadow -->
  <rect x="440" y="160" width="280" height="380" fill="#1F2A3B" stroke="#675466" stroke-width="8"/>
  <circle cx="580" cy="350" r="60" fill="#873B35" opacity="0.7"/>

  <text x="60" y="740" font-family="'IBM Plex Mono', monospace" font-size="13" fill="#D7CDBD" letter-spacing="2">
    PROJECT: MAYFAIR PENTHOUSE // FIXTURES: ESME SCONCE &amp; MARGO TABLE LAMP
  </text>
</svg>`;

const assets = [
  { name: 'account_portal_hero.svg', data: accountHeroSvg },
  { name: 'craft_bench_brass.svg', data: craftBenchSvg },
  { name: 'blueprint_elevation.svg', data: blueprintElevationSvg },
  { name: 'swatch_box.svg', data: swatchBoxSvg },
  { name: 'client_residence_1.svg', data: residence1Svg },
  { name: 'client_residence_2.svg', data: residence2Svg },
];

assets.forEach(asset => {
  const filePath = path.join(outputDir, asset.name);
  fs.writeFileSync(filePath, asset.data);
  console.log(`✓ Wrote ${asset.name}`);
});

console.log('All additional rich assets generated successfully!');
