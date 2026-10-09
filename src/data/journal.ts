export interface JournalArticle {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  heroImage: string;
  excerpt: string;
  content: {
    lead: string;
    sections: {
      heading?: string;
      body: string[];
      pullQuote?: string;
      caption?: string;
      image?: string;
    }[];
  };
  featuredObjects: string[]; // product slugs
}

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    slug: 'how-to-light-a-dinner-table',
    title: 'HOW TO LIGHT A DINNER TABLE WITHOUT LIGHTING THE ROOM',
    category: 'LIGHTING ESSAY',
    date: 'OCTOBER 2026',
    readTime: '6 MIN READ',
    author: 'Clara Delacroix',
    authorRole: 'Architectural Historian & Interior Critic',
    heroImage: '/images/journal_1.svg',
    excerpt: 'Too many modern dining rooms suffer from an excess of ambition from the ceiling. When downlights flood the periphery, conversation scatters. Here is the case for intentional darkness.',
    content: {
      lead: 'The mistake made in ninety percent of contemporary renovations is the assumption that dinner guests require the same visual acuity as surgeons.',
      sections: [
        {
          heading: 'The Pool and the Periphery',
          body: [
            'A memorable dinner is an intimate theatre set. The faces of the people gathered around the table, the texture of the linen runner, the condensation on a chilled wine glass—these are the actors that deserve illumination.',
            'Everything else—the distant bookcase, the kitchen door, the far corners of the dining room—should recede into velvety twilight. When the periphery is dark, the center becomes magnetic.'
          ],
          pullQuote: 'When you light the entire room equally, you destroy intimacy before the first course arrives.'
        },
        {
          heading: 'The Geometry of Suspension',
          body: [
            'The optimal height for a dining pendant is between 750mm and 820mm above the table surface. This puts the source of illumination below standing eye-level, meaning anyone entering the room perceives an illuminated domestic oasis rather than a glare bomb.',
            'Crucially, fluted or tiered glass allows horizontal diffusion to remain soft, preventing glare while washing the tabletop with high-color-rendering warmth.'
          ],
          caption: 'Bellamy pendant hung at 780mm over quarter-sawn fumed oak table set for six.'
        }
      ]
    },
    featuredObjects: ['bellamy-pendant', 'lucien-candle', 'esme-sconce']
  },
  {
    slug: 'why-one-lamp-is-better-than-six-downlights',
    title: 'WHY ONE LAMP IS SOMETIMES BETTER THAN SIX DOWNLIGHTS',
    category: 'ARCHITECTURAL CRITIQUE',
    date: 'SEPTEMBER 2026',
    readTime: '8 MIN READ',
    author: 'Alistair Vance',
    authorRole: 'Founder & Design Director',
    heroImage: '/images/journal_2.svg',
    excerpt: 'Recessed ceiling cans are the great plague of 21st-century residential architecture. They turn ceilings into Swiss cheese and cast unflattering vertical shadows.',
    content: {
      lead: 'Downlights were invented for commercial office spaces where cubicles required even lux levels regardless of human emotion. Why did we allow them into our bedrooms and living rooms?',
      sections: [
        {
          heading: 'The Tyranny of the Grid',
          body: [
            'When an electrician draws a regular grid of six or eight ceiling spotlights across a living room, they are designing for electrical convenience, not domestic comfort.',
            'A single sculptural floor lamp or a low table lamp anchored in a corner achieves what six downlights cannot: it creates directionality, shadow, and psychological shelter.'
          ],
          pullQuote: 'Good architecture is defined as much by what remains unlit as by what is illuminated.'
        },
        {
          heading: 'Shadow as Material',
          body: [
            'Without shadow, materials cannot communicate their depth. Plaster looks flat; velvet looks dull; wood loses its grain. A low-angle lamp grazes surfaces, bringing stone and unlacquered brass to life.'
          ]
        }
      ]
    },
    featuredObjects: ['eleanor-floor-lamp', 'margo-table-lamp']
  },
  {
    slug: 'the-case-for-warmer-corners',
    title: 'THE CASE FOR WARMER CORNERS',
    category: 'DOMESTIC RITUAL',
    date: 'AUGUST 2026',
    readTime: '5 MIN READ',
    author: 'Elena Rostova',
    authorRole: 'Interior Stylist',
    heroImage: '/images/journal_3.svg',
    excerpt: 'Corners are usually abandoned to potted plants and dust. When you place a sculptural sconce or floor fixture in an unexpected alcove, the perimeter of the home expands.',
    content: {
      lead: 'The psychological size of a room is determined not by its square footage, but by the furthest illuminated point.',
      sections: [
        {
          heading: 'Expanding the Boundary',
          body: [
            'When the corners of a room are plunged into blackness, the walls feel like they are closing in. But when a small pool of light grazes a far wall, the eye travels comfortably across the entire volume.',
            'Our Esme sconce was designed specifically for this quiet task: to sit close against the plaster and turn forgotten passages into moments of pause.'
          ]
        }
      ]
    },
    featuredObjects: ['esme-sconce', 'adrienne-flushmount']
  },
  {
    slug: 'a-house-after-6-pm',
    title: 'A HOUSE AFTER 6 PM: THE THEATRE OF SHADOWS',
    category: 'PHOTO ESSAY',
    date: 'JULY 2026',
    readTime: '4 MIN READ',
    author: 'Julian Thorne',
    authorRole: 'Architectural Photographer',
    heroImage: '/images/journal_4.svg',
    excerpt: 'Documenting forty-eight hours inside an 1890s townhouse as daylight fades and the domestic lamps take command of the scene.',
    content: {
      lead: 'Between 17:30 and 19:00, something fundamental changes in the way a home breathes.',
      sections: [
        {
          heading: 'Blue Hour to Candle Hour',
          body: [
            'Outside the arched sash windows, the sky shifts from pale zinc to intense ultramarine. Inside, one by one, the brass switches click. The house transforms into a private theatre.'
          ],
          pullQuote: 'Leave one light on: the signal that a home is waiting for someone to return.'
        }
      ]
    },
    featuredObjects: ['margo-table-lamp', 'lucien-candle', 'isla-portable']
  }
];
