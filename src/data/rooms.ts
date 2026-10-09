export interface RoomStory {
  slug: string;
  name: string;
  headline: string;
  descriptor: string;
  advice: string;
  heroImage: string;
  recommendedProducts: string[];
  lightingLayers: {
    overhead: { title: string; desc: string; slug: string };
    wall: { title: string; desc: string; slug: string };
    low: { title: string; desc: string; slug: string };
    candle: { title: string; desc: string; slug: string };
  };
}

export const ROOMS: RoomStory[] = [
  {
    slug: 'dining',
    name: 'DINING ROOM',
    headline: 'Make the table the brightest thing in the room.',
    descriptor: 'Intimate dinner tables require concentrated warmth that pools on table linen while leaving peripheral walls in soft dusk.',
    advice: 'Never illuminate a dining room from the ceiling perimeter. Hang a sculptural pendant 750–850mm above the tabletop to draw guests together, complemented by low wall sconces and candle points.',
    heroImage: '/images/pendant_bellamy_on.svg',
    recommendedProducts: ['bellamy-pendant', 'esme-sconce', 'lucien-candle'],
    lightingLayers: {
      overhead: { title: 'The Overhead Conductor', desc: 'Bellamy Pendant hung at 800mm, dimmed to 45% for intimate dining.', slug: 'bellamy-pendant' },
      wall: { title: 'The Wall Grazing Pool', desc: 'Pair of Esme sconces flanking credenza to prevent corner darkness.', slug: 'esme-sconce' },
      low: { title: 'The Sideboard Accent', desc: 'Margo table lamp on low credenza casting light across decanters.', slug: 'margo-table-lamp' },
      candle: { title: 'The Gathered Flame', desc: 'Lucien bronze candle vessel centered on linen runner.', slug: 'lucien-candle' }
    }
  },
  {
    slug: 'living',
    name: 'LIVING ROOM',
    headline: 'Good living rooms need shadows.',
    descriptor: 'A living room should never feel uniformly lit. Instead, distribute three to four distinct islands of warmth where people read, converse, or unwind.',
    advice: 'Place an arched floor lamp behind your primary lounge chair, a low table lamp on a credenza, and a soft wall sconce in the furthest alcove. Turn off all central ceiling downlights.',
    heroImage: '/images/hero_room_night.svg',
    recommendedProducts: ['eleanor-floor-lamp', 'margo-table-lamp', 'solenne-chandelier'],
    lightingLayers: {
      overhead: { title: 'The Floating Kinetic Mobile', desc: 'Solenne mobile chandelier anchored high for sculptural presence.', slug: 'solenne-chandelier' },
      wall: { title: 'The Plaster Wash', desc: 'Esme sconce at 1600mm height on the chimney breast.', slug: 'esme-sconce' },
      low: { title: 'The Corner Reading Light', desc: 'Eleanor arched floor lamp focused softly over armchair.', slug: 'eleanor-floor-lamp' },
      candle: { title: 'The Evening Scent', desc: 'Lucien solid bronze candle on stone coffee table.', slug: 'lucien-candle' }
    }
  },
  {
    slug: 'bedroom',
    name: 'BEDROOM',
    headline: 'Light for waking slowly and resting deeply.',
    descriptor: 'The bedroom demands low-angle illumination that avoids direct eye contact, using warm materials that invite sleep.',
    advice: 'Replace bedside ceiling spots with warm low-wattage table lamps or wall sconces mounted slightly below eye level when reading in bed.',
    heroImage: '/images/table_lamp_margo_on.svg',
    recommendedProducts: ['margo-table-lamp', 'esme-sconce', 'isla-portable'],
    lightingLayers: {
      overhead: { title: 'The Alabaster Disc', desc: 'Adrienne flush mount centered overhead, dimmed to 20%.', slug: 'adrienne-flushmount' },
      wall: { title: 'The Bedside Arch', desc: 'Esme wall sconce with dedicated wall switch within arm reach.', slug: 'esme-sconce' },
      low: { title: 'The Nightstand Glow', desc: 'Margo table lamp with rotary dimmer at 1800K glow.', slug: 'margo-table-lamp' },
      candle: { title: 'The Quiet Night Altar', desc: 'Lucien candle vessel on dresser.', slug: 'lucien-candle' }
    }
  },
  {
    slug: 'hallway',
    name: 'CORRIDORS & ENTRY',
    headline: 'Transitioning from the outside world into quiet shelter.',
    descriptor: 'Corridors should feel like rhythmic architectural journeys rather than clinical passageways.',
    advice: 'Install repeated low sconces along textured plaster walls at regular intervals to create pools of light that lead the eye through the house.',
    heroImage: '/images/trade_project_1.svg',
    recommendedProducts: ['esme-sconce', 'adrienne-flushmount'],
    lightingLayers: {
      overhead: { title: 'The Low Profile Ceiling', desc: 'Adrienne alabaster flush mount in entry vestibule.', slug: 'adrienne-flushmount' },
      wall: { title: 'The Repeating Sconces', desc: 'Esme sconces positioned every 2.4 meters down hallway.', slug: 'esme-sconce' },
      low: { title: 'The Console Accent', desc: 'Isla cordless light on entry console table.', slug: 'isla-portable' },
      candle: { title: 'The Welcoming Flame', desc: 'Lucien bronze candle lit 15 minutes before guests arrive.', slug: 'lucien-candle' }
    }
  },
  {
    slug: 'bath',
    name: 'BATH & POWDER',
    headline: 'Flattering warmth that honors skin tone.',
    descriptor: 'Powder rooms should be intimate jewel boxes; master baths should feel like quiet thermal sanctuaries.',
    advice: 'Avoid harsh overhead downlights above the mirror that cast heavy facial shadows. Flank the mirror with twin warm sconces at eye level (1650mm).',
    heroImage: '/images/flushmount_adrienne_on.svg',
    recommendedProducts: ['esme-sconce', 'adrienne-flushmount', 'lucien-candle'],
    lightingLayers: {
      overhead: { title: 'The Moisture-Resistant Alabaster', desc: 'Adrienne flush mount damp-rated for bath zones.', slug: 'adrienne-flushmount' },
      wall: { title: 'The Mirror Flankers', desc: 'Twin Esme sconces in plaster finish at 1650mm AFF.', slug: 'esme-sconce' },
      low: { title: 'The Tub-Side Portable', desc: 'Isla IP44 portable light set safely on cedar bath stool.', slug: 'isla-portable' },
      candle: { title: 'The Soaking Sanctuary', desc: 'Lucien candle on honed marble tub surround.', slug: 'lucien-candle' }
    }
  },
  {
    slug: 'study',
    name: 'STUDY & LIBRARY',
    headline: 'A focused pool of light for solitary thought.',
    descriptor: 'The study balances concentrated task illumination on working surfaces with soft peripheral darkness.',
    advice: 'Keep general illumination low and bring a dedicated sculptural lamp within 600mm of the working desk.',
    heroImage: '/images/table_lamp_margo_on.svg',
    recommendedProducts: ['margo-table-lamp', 'eleanor-floor-lamp', 'isla-portable'],
    lightingLayers: {
      overhead: { title: 'The Kinetic Mobile', desc: 'Solenne chandelier dimmed to background whisper.', slug: 'solenne-chandelier' },
      wall: { title: 'The Bookcase Accent', desc: 'Esme sconce mounted above timber library shelves.', slug: 'esme-sconce' },
      low: { title: 'The Dedicated Desk Lamp', desc: 'Margo table lamp on walnut desk surface.', slug: 'margo-table-lamp' },
      candle: { title: 'The Thinking Flame', desc: 'Lucien candle on credenza corner.', slug: 'lucien-candle' }
    }
  }
];
