export interface Finish {
  id: string;
  name: string;
  swatch: string;
  texture?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: 'sconces' | 'pendants' | 'ceiling' | 'table' | 'floor' | 'portable' | 'candlelight';
  categoryLabel: string;
  collection: string;
  collectionLabel: string;
  price: number;
  currency: string;
  finishes: Finish[];
  materials: string[];
  dimensions: string;
  weight: string;
  bulb: string;
  voltage: string;
  certifications: string[];
  leadTime: string;
  stockStatus: 'In Stock' | 'Made to Order' | 'Limited Edition';
  offImage: string;
  onImage: string;
  roomImages: string[];
  model3d?: boolean;
  specSheet: string;
  installationGuide: string;
  tradeEligible: boolean;
  new?: boolean;
  featured?: boolean;
  description: string;
  care: string;
  recommendedRooms: string[];
  relatedProducts: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'p-01',
    slug: 'esme-sconce',
    name: 'ESME',
    subtitle: 'The quiet one.',
    category: 'sconces',
    categoryLabel: 'Wall Sconce',
    collection: 'the-orchard',
    collectionLabel: 'The Orchard',
    price: 920,
    currency: 'USD',
    finishes: [
      { id: 'aged-brass', name: 'Aged Unlacquered Brass', swatch: '#A67A43' },
      { id: 'mineral-plaster', name: 'Raw Lime Plaster', swatch: '#ECE5DA' },
      { id: 'oxblood', name: 'Glazed Oxblood', swatch: '#873B35' }
    ],
    materials: ['Aged Brass', 'Hand-Trowelled Lime Plaster', 'Porcelain E12 Socket'],
    dimensions: 'H 380mm × W 140mm × D 110mm (15" × 5.5" × 4.3")',
    weight: '3.2 kg (7.0 lbs)',
    bulb: 'Dimmable Warm 2700K E12 LED, 4.5W, 450lm included',
    voltage: '110V – 240V Hardwired',
    certifications: ['UL Listed', 'CE Certified'],
    leadTime: '4–6 weeks handcrafted',
    stockStatus: 'Made to Order',
    offImage: '/images/sconce_esme_off.svg',
    onImage: '/images/sconce_esme_on.svg',
    roomImages: ['/images/hero_room_night.svg', '/images/trade_project_1.svg'],
    model3d: true,
    specSheet: '/specs/oriel-esme-sconce-spec.pdf',
    installationGuide: '/specs/oriel-esme-install.pdf',
    tradeEligible: true,
    new: true,
    featured: true,
    description: 'Esme does not shout across the room. Sculpted from architectural lime plaster and anchored by a hand-turned unlacquered brass plate, it casts a synchronized dual-arch wash of warm 2700K illumination across the plaster, softening wall angles and turning hallways into quiet passages.',
    care: 'Dust gently with dry goat-hair brush. Plaster will subtly absorb ambient room humidity. The brass backplate is living brass; handle with lint-free cotton gloves during installation to allow natural, even patina.',
    recommendedRooms: ['Hallway', 'Bedside', 'Powder Room', 'Living Room Alcove'],
    relatedProducts: ['margo-table-lamp', 'adrienne-flushmount', 'lucien-candle']
  },
  {
    id: 'p-02',
    slug: 'margo-table-lamp',
    name: 'MARGO',
    subtitle: 'The domestic companion.',
    category: 'table',
    categoryLabel: 'Table Lamp',
    collection: 'villa-rosa',
    collectionLabel: 'Villa Rosa',
    price: 1180,
    currency: 'USD',
    finishes: [
      { id: 'aged-brass', name: 'Hand-Turned Brass & Travertine', swatch: '#A67A43' },
      { id: 'calacatta-viola', name: 'Honed Calacatta & Brass', swatch: '#682928' },
      { id: 'fumed-oak', name: 'Waxed Fumed Oak', swatch: '#5E4738' }
    ],
    materials: ['Solid Spun Brass', 'Mouth-Blown Cased Opal Glass', 'Honed Roman Travertine Base'],
    dimensions: 'H 460mm × Dia 320mm (18.1" × 12.6")',
    weight: '5.8 kg (12.8 lbs)',
    bulb: 'Integrated 2700K Warm Dimming LED with inline rotary brass cord switch',
    voltage: '110V – 240V Plug-in with braided cotton cord',
    certifications: ['UL Listed', 'CE Certified'],
    leadTime: '2–3 weeks in studio',
    stockStatus: 'In Stock',
    offImage: '/images/table_lamp_margo_off.svg',
    onImage: '/images/table_lamp_margo_on.svg',
    roomImages: ['/images/hero_room_day.svg', '/images/hero_room_night.svg'],
    model3d: true,
    specSheet: '/specs/oriel-margo-table-spec.pdf',
    installationGuide: '/specs/oriel-margo-manual.pdf',
    tradeEligible: true,
    new: false,
    featured: true,
    description: 'Designed to sit beside a book or an unfinished glass of wine. Margo rests upon a heavy square of honed travertine, supporting a mouth-blown cased opal mushroom dome that turns incandescent light into a velvety, tactile domestic presence.',
    care: 'Wipe glass dome with damp microfiber cloth. Clean stone base with pH-neutral stone soap only. The heavy cord dimmer can be placed cleanly behind credenzas.',
    recommendedRooms: ['Living Room Sideboard', 'Bedside Table', 'Library Desk'],
    relatedProducts: ['eleanor-floor-lamp', 'esme-sconce', 'lucien-candle']
  },
  {
    id: 'p-03',
    slug: 'bellamy-pendant',
    name: 'BELLAMY',
    subtitle: 'The evening conductor.',
    category: 'pendants',
    categoryLabel: 'Suspension Pendant',
    collection: 'the-orchard',
    collectionLabel: 'The Orchard',
    price: 1850,
    currency: 'USD',
    finishes: [
      { id: 'aged-brass', name: 'Aged Brass & Fluted Opal', swatch: '#A67A43' },
      { id: 'dark-bronze', name: 'Oxidized Dark Bronze', swatch: '#32231A' }
    ],
    materials: ['Fluted Mouth-Blown Glass', 'Spun Brass Canopy', 'Braided Linen Suspension Cable'],
    dimensions: 'Dia 520mm × H 360mm (20.5" × 14.2") with custom drop up to 2400mm',
    weight: '7.4 kg (16.3 lbs)',
    bulb: 'E26 / E27 Socket, Warm 2400K–2700K filament bulb, max 60W equivalent',
    voltage: '110V – 240V Hardwired',
    certifications: ['UL Listed', 'CE Certified'],
    leadTime: '6–8 weeks handcrafted',
    stockStatus: 'Made to Order',
    offImage: '/images/pendant_bellamy_off.svg',
    onImage: '/images/pendant_bellamy_on.svg',
    roomImages: ['/images/trade_project_2.svg'],
    model3d: true,
    specSheet: '/specs/oriel-bellamy-pendant-spec.pdf',
    installationGuide: '/specs/oriel-bellamy-install.pdf',
    tradeEligible: true,
    new: true,
    featured: true,
    description: 'Make the dinner table the brightest thing in the room. Bellamy concentrates warmth downward onto linen, ceramic tableware, and wine glasses, while gently diffusing soft ambient light outward through its fluted hand-blown tiers.',
    care: 'Install with licensed electrician. Clean tiers periodically with soft antistatic duster.',
    recommendedRooms: ['Dining Table', 'Kitchen Island', 'Entry Foyer'],
    relatedProducts: ['esme-sconce', 'solenne-chandelier', 'lucien-candle']
  },
  {
    id: 'p-04',
    slug: 'eleanor-floor-lamp',
    name: 'ELEANOR',
    subtitle: 'The corner anchor.',
    category: 'floor',
    categoryLabel: 'Sculptural Floor Lamp',
    collection: 'night-train',
    collectionLabel: 'Night Train',
    price: 2450,
    currency: 'USD',
    finishes: [
      { id: 'aged-brass', name: 'Aged Brass & Cast Iron', swatch: '#A67A43' },
      { id: 'blackened-steel', name: 'Blackened Steel & Brass Details', swatch: '#282422' }
    ],
    materials: ['Counterbalanced Solid Brass Rod', 'Heavy Cast Iron Foot', 'Hand-Spun Shade'],
    dimensions: 'H 1720mm × Reach 980mm × Base Dia 340mm (67.7" × 38.6" × 13.4")',
    weight: '16.5 kg (36.3 lbs)',
    bulb: 'Warm Dim 2200K–2800K LED, foot-step brass dimmer on twisted cord',
    voltage: '110V – 240V Plug-in',
    certifications: ['UL Listed', 'CE Certified'],
    leadTime: '4–5 weeks',
    stockStatus: 'In Stock',
    offImage: '/images/floor_lamp_eleanor_off.svg',
    onImage: '/images/floor_lamp_eleanor_on.svg',
    roomImages: ['/images/hero_room_night.svg', '/images/trade_project_3.svg'],
    model3d: true,
    specSheet: '/specs/oriel-eleanor-floor-spec.pdf',
    installationGuide: '/specs/oriel-eleanor-assembly.pdf',
    tradeEligible: true,
    new: false,
    featured: true,
    description: 'An architectural gesture in space. Eleanor sweeps gracefully over reading chairs and sofas, dropping an intimate pool of golden light without imposing overhead fixture wiring.',
    care: 'Solid weighted iron base should be placed on level flooring or wool rugs. Pivot brass joint is friction-fit; adjust using the knurled brass thumbscrew.',
    recommendedRooms: ['Living Room Reading Corner', 'Library', 'Study'],
    relatedProducts: ['margo-table-lamp', 'isla-portable', 'esme-sconce']
  },
  {
    id: 'p-05',
    slug: 'adrienne-flushmount',
    name: 'ADRIENNE',
    subtitle: 'The low ceiling glow.',
    category: 'ceiling',
    categoryLabel: 'Ceiling Flush Mount',
    collection: 'tideline',
    collectionLabel: 'Tideline',
    price: 880,
    currency: 'USD',
    finishes: [
      { id: 'alabaster-brass', name: 'Carved Spanish Alabaster & Brass', swatch: '#E8DEC9' },
      { id: 'dark-bronze', name: 'Dark Patinated Bronze', swatch: '#32251D' }
    ],
    materials: ['Hand-Carved Translucent Alabaster Disc', 'Solid Machined Brass Collar'],
    dimensions: 'Dia 380mm × Depth 85mm (15" × 3.3")',
    weight: '4.8 kg (10.6 lbs)',
    bulb: 'Dedicated 2700K 90+ CRI LED Array, phase-dimmable to 1%',
    voltage: '110V – 240V Hardwired',
    certifications: ['UL Listed', 'CE Certified', 'Damp-rated for Bathrooms'],
    leadTime: '3–4 weeks',
    stockStatus: 'In Stock',
    offImage: '/images/flushmount_adrienne_off.svg',
    onImage: '/images/flushmount_adrienne_on.svg',
    roomImages: ['/images/trade_project_3.svg'],
    model3d: false,
    specSheet: '/specs/oriel-adrienne-flush-spec.pdf',
    installationGuide: '/specs/oriel-adrienne-install.pdf',
    tradeEligible: true,
    new: false,
    featured: false,
    description: 'For spaces where ceiling height is intimate. Natural Spanish alabaster reveals subtle honeyed veins as light filters through the mineral plate, bathing dressing rooms, corridors, and primary bathrooms in flattering skin-tone glow.',
    care: 'Suitable for damp locations (powder rooms, covered terraces). Clean with soft dry lint-free cloth.',
    recommendedRooms: ['Bath & Powder Room', 'Walk-in Wardrobe', 'Corridor Ceiling'],
    relatedProducts: ['esme-sconce', 'margo-table-lamp', 'isla-portable']
  },
  {
    id: 'p-06',
    slug: 'lucien-candle',
    name: 'LUCIEN',
    subtitle: 'The ancient flame.',
    category: 'candlelight',
    categoryLabel: 'Candle Object',
    collection: 'artist-editions',
    collectionLabel: 'Artist Editions',
    price: 360,
    currency: 'USD',
    finishes: [
      { id: 'lost-wax-bronze', name: 'Lost-Wax Cast Patinated Bronze', swatch: '#3A271E' },
      { id: 'cast-brass', name: 'Hand-Turned Untreated Brass', swatch: '#A67A43' }
    ],
    materials: ['Lost-Wax Solid Cast Bronze', 'Soy & Beeswax Core with Cedar & Fig notes'],
    dimensions: 'H 140mm × Dia 160mm (5.5" × 6.3")',
    weight: '2.8 kg (6.2 lbs)',
    bulb: 'Natural double organic cotton wick, 80-hour burn time; refill inserts available',
    voltage: 'Non-electric',
    certifications: ['Artisan Edition Mark'],
    leadTime: 'Immediate shipping',
    stockStatus: 'In Stock',
    offImage: '/images/candle_lucien_off.svg',
    onImage: '/images/candle_lucien_on.svg',
    roomImages: ['/images/hero_room_night.svg'],
    model3d: false,
    specSheet: '/specs/oriel-lucien-candle-spec.pdf',
    installationGuide: '/specs/oriel-candle-care.pdf',
    tradeEligible: true,
    new: true,
    featured: true,
    description: 'Before electric circuits, there was the single point of gathered flame. Cast as a heavy lost-wax bronze vessel, Lucien grounds the dinner table or evening bath in quiet, flickering domestic ritual.',
    care: 'Trim wick to 5mm before each lighting. Vessel is reusable indefinitely with Oriel House botanical wax refills.',
    recommendedRooms: ['Dinner Table', 'Bath Sanctuary', 'Bedside Altar'],
    relatedProducts: ['bellamy-pendant', 'esme-sconce', 'margo-table-lamp']
  },
  {
    id: 'p-07',
    slug: 'isla-portable',
    name: 'ISLA',
    subtitle: 'The cordless wanderer.',
    category: 'portable',
    categoryLabel: 'Cordless Portable Light',
    collection: 'tideline',
    collectionLabel: 'Tideline',
    price: 520,
    currency: 'USD',
    finishes: [
      { id: 'aged-brass', name: 'Aged Brass & Opal Acrylic', swatch: '#A67A43' },
      { id: 'verdigris-bronze', name: 'Verdigris Patina', swatch: '#687057' }
    ],
    materials: ['Spun Brass', 'Mouth-Blown Opal Diffuser', 'Lithium-Ion USB-C Core'],
    dimensions: 'H 270mm × Dia 150mm (10.6" × 5.9")',
    weight: '1.6 kg (3.5 lbs)',
    bulb: 'Warm Dim 1800K–2700K, 24-hour battery life on low, tactile rotary dial',
    voltage: '5V USB-C Magnetic Dock Charging Base included',
    certifications: ['IP44 Outdoor Splash Rated', 'CE Certified'],
    leadTime: 'In Stock',
    stockStatus: 'In Stock',
    offImage: '/images/portable_isla_off.svg',
    onImage: '/images/portable_isla_on.svg',
    roomImages: ['/images/hero_room_day.svg', '/images/hero_room_night.svg'],
    model3d: true,
    specSheet: '/specs/oriel-isla-portable-spec.pdf',
    installationGuide: '/specs/oriel-isla-manual.pdf',
    tradeEligible: true,
    new: true,
    featured: true,
    description: 'Light that travels where the conversation moves. From the kitchen table to the terrace, Isla carries the atmospheric weight of a permanent architectural fixture with cordless freedom.',
    care: 'Charge fully using magnetic dock. Wipe brass with dry cloth. Suitable for outdoor dining during fair weather.',
    recommendedRooms: ['Dining Terrace', 'Sideboard', 'Wine Cellar', 'Bedside'],
    relatedProducts: ['margo-table-lamp', 'lucien-candle', 'eleanor-floor-lamp']
  },
  {
    id: 'p-08',
    slug: 'solenne-chandelier',
    name: 'SOLENNE',
    subtitle: 'The slow pendulum.',
    category: 'ceiling',
    categoryLabel: 'Mobile Chandelier',
    collection: 'artist-editions',
    collectionLabel: 'Artist Editions',
    price: 3800,
    currency: 'USD',
    finishes: [
      { id: 'aged-brass', name: 'Kinetic Aged Brass & Blown Glass', swatch: '#A67A43' },
      { id: 'blackened-bronze', name: 'Blackened Bronze & Smoke Glass', swatch: '#241E1A' }
    ],
    materials: ['Counterweighted Brass Mobile Arms', 'Mouth-Blown Opal Glass Orbs'],
    dimensions: 'Span 1400mm × H 900mm (55" × 35.4") custom suspension',
    weight: '11.2 kg (24.7 lbs)',
    bulb: '3 × G9 LED 2700K Warm Dimming, 400lm each',
    voltage: '110V – 240V Hardwired',
    certifications: ['UL Listed', 'CE Certified'],
    leadTime: '8–10 weeks numbered edition',
    stockStatus: 'Limited Edition',
    offImage: '/images/chandelier_solenne_off.svg',
    onImage: '/images/chandelier_solenne_on.svg',
    roomImages: ['/images/trade_project_2.svg'],
    model3d: true,
    specSheet: '/specs/oriel-solenne-spec.pdf',
    installationGuide: '/specs/oriel-solenne-assembly.pdf',
    tradeEligible: true,
    new: true,
    featured: true,
    description: 'A mobile sculpture designed to inhabit high air. Solenne balances gently upon a single pivot point, its counterweights responding to domestic air currents with slow, meditative choreography.',
    care: 'Professional assembly required. Micro-adjust balance weights during initial mounting.',
    recommendedRooms: ['Living Room Center', 'Dining Salon', 'Staircase Void'],
    relatedProducts: ['bellamy-pendant', 'eleanor-floor-lamp', 'esme-sconce']
  }
];

export const CATEGORIES = [
  { id: 'all', slug: 'all', name: 'All Lighting', count: 8 },
  { id: 'sconces', slug: 'sconces', name: 'Wall Sconces', count: 1, subtitle: 'A small pool of light can change an entire wall.' },
  { id: 'pendants', slug: 'pendants', name: 'Pendants', count: 1, subtitle: 'Focused illumination for gathered tables.' },
  { id: 'ceiling', slug: 'ceiling', name: 'Ceiling & Mobiles', count: 2, subtitle: 'Sculptural forms that inhabit upper space.' },
  { id: 'table', slug: 'table', name: 'Table Lamps', count: 1, subtitle: 'The quiet companions of late evenings.' },
  { id: 'floor', slug: 'floor', name: 'Floor Lamps', count: 1, subtitle: 'Architectural corners that gather shadows.' },
  { id: 'portable', slug: 'portable', name: 'Portables', count: 1, subtitle: 'Light that moves through the house.' },
  { id: 'candlelight', slug: 'candlelight', name: 'Candle Objects', count: 1, subtitle: 'Ancient domestic fire in solid bronze.' }
];
