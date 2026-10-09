export interface TradeProject {
  id: string;
  name: string;
  location: string;
  designer: string;
  category: 'Hospitality' | 'Residential' | 'Restaurant' | 'Commercial';
  image: string;
  fixtures: string[];
  description: string;
}

export const TRADE_PROJECTS: TradeProject[] = [
  {
    id: 'tp-01',
    name: 'HOTEL SAINT-GERMAIN',
    location: 'Paris 06, France',
    designer: 'Studio Liaigre & Associés',
    category: 'Hospitality',
    image: '/images/trade_project_1.svg',
    fixtures: ['ESME Sconces in Patinated Brass', 'ADRIENNE Flush Mounts'],
    description: 'Bespoke corridor lighting program across forty-two guest chambers. Each suite features unlacquered brass Esme sconces flanking headboard alcoves.'
  },
  {
    id: 'tp-02',
    name: 'VILLA MONTEMAR',
    location: 'Mallorca, Spain',
    designer: 'More Design Palma',
    category: 'Residential',
    image: '/images/trade_project_2.svg',
    fixtures: ['Custom BELLAMY Pendants', 'MARGO Table Lamps in Travertine'],
    description: 'A restored 17th-century stone fincas where custom extended-drop Bellamy pendants illuminate a five-meter reclaimed timber dining table.'
  },
  {
    id: 'tp-03',
    name: 'THE ARCHITECTURAL RESIDENCE',
    location: 'Melbourne, Australia',
    designer: 'Edition Office Architects',
    category: 'Residential',
    image: '/images/trade_project_3.svg',
    fixtures: ['ELEANOR Arched Floor Lamps', 'SOLENNE Kinetic Mobile'],
    description: 'Double-height concrete and fumed timber living pavilion anchored by a suspended Solenne mobile chandelier and intimate Eleanor reading lights.'
  }
];

export const TRADE_BENEFITS = [
  {
    title: 'PROJECT TIER PRICING',
    desc: 'Structured professional pricing on all standard fixtures and volume project schedules.'
  },
  {
    title: 'COMPLIMENTARY MATERIAL KITS',
    desc: 'Hand-finished brass swatches, aged bronze castings, lime plaster tiles, and carved alabaster samples.'
  },
  {
    title: 'DEDICATED TECHNICAL CONCIERGE',
    desc: 'Direct consultation on mounting details, driver specifications, 0–10V dimming protocols, and UL/CE compliance.'
  },
  {
    title: 'CUSTOM DROP & FINISH MODIFICATIONS',
    desc: 'Custom cord drops, alternate backplate scales, and bespoke metal patinas for hospitality projects.'
  },
  {
    title: 'RESERVED STUDIO LEAD-TIMES',
    desc: 'Priority bench production slots and guaranteed shipping schedules for critical installation dates.'
  },
  {
    title: '3D & REVIT RESOURCE PORTAL',
    desc: 'Immediate access to downloadable 3D CAD (.dwg, .step, .obj) and photometric IES lighting files.'
  }
];
