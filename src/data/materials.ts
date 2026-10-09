export interface MaterialInfo {
  id: string;
  name: string;
  category: string;
  origin: string;
  image: string;
  description: string;
  patinaBehavior: string;
  care: string;
  usedIn: string[]; // product slugs
  lightTests: {
    morning: string;
    warmLamp: string;
    candle: string;
    coolDaylight: string;
  };
}

export const MATERIALS: MaterialInfo[] = [
  {
    id: 'aged-brass',
    name: 'AGED UNLACQUERED BRASS',
    category: 'Metal',
    origin: 'Hand-rubbed in our studio from solid European copper-zinc billet',
    image: '/images/material_brass.svg',
    description: 'We do not coat our brass in synthetic clear lacquer or plastic films. The metal is living, warm to the touch, and hand-finished with oil rubbings that reveal fine micro-grain and gentle tonal shading.',
    patinaBehavior: 'Over months and years, contact with ambient oxygen and domestic hands deepens its tone from honey gold into rich, antique bronze-brown. It records the quiet life of the house.',
    care: 'Never use harsh chemical metal polish or acid cleaners. Dust with a soft dry cotton cloth. If desired, apply a natural microcrystalline wax annually to stabilize the current patina.',
    usedIn: ['esme-sconce', 'margo-table-lamp', 'bellamy-pendant', 'eleanor-floor-lamp', 'isla-portable', 'solenne-chandelier'],
    lightTests: {
      morning: 'Reflects soft golden highlights with gentle specular sheen.',
      warmLamp: 'Deepens into glowing amber with radiant metallic warmth.',
      candle: 'Catches warm dancing highlights along machined bevels.',
      coolDaylight: 'Reveals the delicate fine brushwork and natural raw billet grain.'
    }
  },
  {
    id: 'mineral-plaster',
    name: 'RAW LIME PLASTER',
    category: 'Mineral',
    origin: 'Aged hydraulic slaked lime with marble flour from historic kilns',
    image: '/images/material_plaster.svg',
    description: 'Hand-applied with steel and wooden trowels. Plaster possesses a tactile chalkiness and subtle mineral variation that softens acoustic resonance and absorbs light rather than bouncing it glare-first.',
    patinaBehavior: 'Breathable and mineral-hard. Plaster gently cures and hardens over time, developing subtle textural depth without flaking or discoloration.',
    care: 'Dust with a natural soft-bristle brush. Avoid direct contact with oily fingers during installation. Small scuffs can be gently buffed with 1000-grit micro-abrasive foam.',
    usedIn: ['esme-sconce'],
    lightTests: {
      morning: 'Presents as clean warm chalk with soft dimensional shadows in trowel hollows.',
      warmLamp: 'Glows like warm Tuscan stucco, catching soft grazing gradients.',
      candle: 'Holds long velvety gradients with gentle organic contrast.',
      coolDaylight: 'Clean architectural bone-white with nuanced mineral texture.'
    }
  },
  {
    id: 'opal-glass',
    name: 'MOUTH-BLOWN CASED OPAL GLASS',
    category: 'Glass',
    origin: 'Traditional glassworks in the Bavarian Forest',
    image: '/images/material_opal_glass.svg',
    description: 'Blown by master artisans using three distinct molten layers: a crystal core, a dense milky white opal stratum, and a clear protective surface. It acts as an optical diffuser that eliminates harsh hot-spots.',
    patinaBehavior: 'Impervious to UV aging and heat. The glass retains its velvety cream luminance indefinitely without yellowing or clouding.',
    care: 'Wipe with microfiber cloth moistened with purified water. Remove shades for thorough washing with mild soap when necessary.',
    usedIn: ['margo-table-lamp', 'bellamy-pendant', 'isla-portable', 'solenne-chandelier'],
    lightTests: {
      morning: 'Appears as velvety alabaster white against morning sunlight.',
      warmLamp: 'Transforms into a luminous golden orb with 100% glare-free diffusion.',
      candle: 'Diffuses candle warmth with buttery, calm translucency.',
      coolDaylight: 'Smooth milk-glass finish with subtle thickness variations.'
    }
  },
  {
    id: 'calacatta-viola',
    name: 'HONED CALACATTA VIOLA',
    category: 'Stone',
    origin: 'Historic Apuan Alps quarry, Carrara, Italy',
    image: '/images/material_marble.svg',
    description: 'Honed to a matte, non-reflective silk touch. Deep cabernet and oxblood breccia veins travel across creamy white calcite backgrounds, ensuring no two lamp plinths are ever identical.',
    patinaBehavior: 'Honed marble absorbs ambient domestic light without gloss glare. With proper sealing, the surface develops a subtle antique patina.',
    care: 'Clean exclusively with pH-neutral marble cleanser. Wipe liquids promptly to preserve the honed matte finish.',
    usedIn: ['margo-table-lamp'],
    lightTests: {
      morning: 'High-contrast purple-red veins stand out crisply against pale calcite.',
      warmLamp: 'Deep wine and burgundy tones warm dramatically under 2700K lamp wash.',
      candle: 'Honed surface creates a velvety, non-reflective domestic backdrop.',
      coolDaylight: 'Reveals crystalline calcite depth and historic geological drama.'
    }
  },
  {
    id: 'fumed-oak',
    name: 'QUARTER-SAWN FUMED OAK',
    category: 'Timber',
    origin: 'Sustainably harvested French white oak, ammonia-fumed',
    image: '/images/material_oak.svg',
    description: 'Fumed rather than stained; the natural tannins in the oak react with vaporized ammonia to darken the timber all the way through the grain to deep espresso and charcoal.',
    patinaBehavior: 'Finished with natural beeswax and organic carnauba, the wood gains warmth and a deep luster as it is touched.',
    care: 'Re-wax annually with natural furniture paste. Avoid standing water.',
    usedIn: ['margo-table-lamp', 'eleanor-floor-lamp'],
    lightTests: {
      morning: 'Deep chocolate grain with warm undertones visible under window light.',
      warmLamp: 'Velvety dark backdrop that grounds luminous glass fixtures.',
      candle: 'Gleams gently where the wax coat catches flame reflection.',
      coolDaylight: 'Rich charcoal-umber with crisp open ray flecks.'
    }
  }
];
