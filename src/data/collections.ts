export interface Collection {
  slug: string;
  name: string;
  descriptor: string;
  originStory: string;
  materialsPalette: string[];
  heroImage: string;
  editorialQuote: string;
  products: string[]; // product slugs
  journalSlug?: string;
}

export const COLLECTIONS: Collection[] = [
  {
    slug: 'the-orchard',
    name: 'THE ORCHARD',
    descriptor: 'Warm plaster, green glass, aged unlacquered brass.',
    originStory: 'Conceived in late summer inside an overgrown stone conservatory. The fixtures reflect the quality of light falling through fruit boughs: dappled, intimate, and softened by lime plaster walls that hold the memory of the day.',
    materialsPalette: ['Unlacquered Brass', 'Lime Plaster', 'Bottle Green Blown Glass', 'Woven Cord'],
    heroImage: '/images/hero_room_day.svg',
    editorialQuote: 'The house should exhale when the afternoon sun drops behind the trees.',
    products: ['esme-sconce', 'bellamy-pendant']
  },
  {
    slug: 'night-train',
    name: 'NIGHT TRAIN',
    descriptor: 'Dark timber, patinated bronze, deep blue shadows.',
    originStory: 'Inspired by the quiet carriages of overnight sleeper journeys across Central Europe. Brass reading hoods, heavy knurled switches, and focused beams that illuminate a solitary page while leaving the rest of the compartment in velvety slumber.',
    materialsPalette: ['Fumed Oak', 'Patinated Bronze', 'Machined Brass Knurling', 'Heavy Cast Iron'],
    heroImage: '/images/floor_lamp_eleanor_on.svg',
    editorialQuote: 'Light that travels with you while the world outside is dark.',
    products: ['eleanor-floor-lamp', 'table-lamp-margo']
  },
  {
    slug: 'villa-rosa',
    name: 'VILLA ROSA',
    descriptor: 'Honed Calacatta marble, oxblood lacquer, cream linen.',
    originStory: 'A tribute to the enduring domestic grandeur of Northern Italian villas after dark. Marble plinths cut from historic quarries anchor warm opal glass domes that turn dining salons and quiet alcoves into miniature theatrical stages.',
    materialsPalette: ['Calacatta Viola Stone', 'Oxblood High-Gloss Lacquer', 'Mouth-Blown Opal Glass'],
    heroImage: '/images/table_lamp_margo_on.svg',
    editorialQuote: 'Domestic theatre begins when dinner moves past midnight.',
    products: ['margo-table-lamp', 'esme-sconce']
  },
  {
    slug: 'tideline',
    name: 'TIDELINE',
    descriptor: 'Mouth-blown opal glass, pale powder blue, carved alabaster.',
    originStory: 'Forms shaped like stones tumbled by Atlantic tides. Translucent alabaster and soft rounded diffusers that erase harsh glare, returning light to its elemental state.',
    materialsPalette: ['Spanish Alabaster', 'Powder Blue Enamel', 'Spun Brass', 'Satin Acrylic'],
    heroImage: '/images/flushmount_adrienne_on.svg',
    editorialQuote: 'Diffused like morning fog over coastal water.',
    products: ['adrienne-flushmount', 'isla-portable']
  },
  {
    slug: 'artist-editions',
    name: 'ARTIST EDITIONS',
    descriptor: 'Limited sculptural collaborations in lost-wax bronze and mobile kinetic brass.',
    originStory: 'Small numbered series created in dialogue with sculptors, metal casters, and glass blowers. Each fixture is an intentional domestic art object that functions as a kinetic sculpture even when unlit.',
    materialsPalette: ['Lost-Wax Cast Bronze', 'Hand-Balanced Mobile Brass', 'Mouth-Blown Sculptural Orbs'],
    heroImage: '/images/chandelier_solenne_on.svg',
    editorialQuote: 'Objects that command high air with quiet weight.',
    products: ['solenne-chandelier', 'lucien-candle']
  }
];
