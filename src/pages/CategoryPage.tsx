import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';

const CATEGORY_GUIDES: Record<string, { title: string; subtitle: string; advice: string; locations: string[] }> = {
  sconces: {
    title: 'WALL LIGHTS',
    subtitle: 'A small pool of light can change an entire wall.',
    advice: 'Mounted close to lime plaster or wood paneling, sconces soften corners, eliminate shadows under eye level, and transform passages into contemplative galleries.',
    locations: ['Long Corridors & Hallways', 'Flanking Bedside Headboards', 'Living Room Chimney Breast', 'Powder Room Mirror Flankers', 'Intimate Dining Alcoves']
  },
  pendants: {
    title: 'PENDANTS & SUSPENSIONS',
    subtitle: 'Make the table the brightest thing in the room.',
    advice: 'Hang pendants 750–820mm above the dining tabletop to create a magnetic focal pool that draws dinner guests together while periphery recedes.',
    locations: ['Gathered Dining Tables', 'Kitchen Stone Islands', 'High-Ceiling Entry Foyers', 'Library Working Tables']
  },
  table: {
    title: 'TABLE LAMPS',
    subtitle: 'The quiet companions of late evenings.',
    advice: 'Table lamps provide tactile proximity. Place them low—on credenzas, bedside tables, or writing desks—where hands can reach the switch.',
    locations: ['Bedside Nightstands', 'Living Room Credenzas', 'Study Desks', 'Bookshelf Nooks']
  },
  floor: {
    title: 'FLOOR LAMPS',
    subtitle: 'An architectural gesture in space.',
    advice: 'Floor lamps anchor perimeter corners without requiring permanent ceiling junction boxes. Ideal for creating dedicated reading corners.',
    locations: ['Deep Lounge Reading Corners', 'Living Room Seating Circles', 'Corner Architectural Anchors']
  },
  ceiling: {
    title: 'CEILING & MOBILES',
    subtitle: 'Sculptural forms that inhabit high air.',
    advice: 'Whether low-profile flush mounts or kinetic mobile chandeliers, ceiling fixtures should diffuse softly rather than cast harsh downward glare.',
    locations: ['Low Ceiling Entryways', 'Dressing Rooms', 'Primary Bath Sanctuary', 'Double-Height Voids']
  },
  portable: {
    title: 'PORTABLE LIGHTS',
    subtitle: 'Light that moves with the conversation.',
    advice: 'Cordless rechargeable lighting brings architectural fixture warmth to terraces, wine cellars, dining tables, and outdoor summer dinners.',
    locations: ['Dining Terraces', 'Bedside Altar', 'Cocktail Trays', 'Bath Stools']
  },
  candlelight: {
    title: 'CANDLE OBJECTS',
    subtitle: 'Ancient domestic fire in solid bronze.',
    advice: 'Before electric circuits, there was the gathering around open flame. Cast in solid lost-wax bronze, our candle vessels ground rituals in warm stillness.',
    locations: ['Intimate Dinner Centers', 'Bath Sanctuary', 'Evening Reading Tables']
  }
};

export const CategoryPage: React.FC = () => {
  const { category = 'sconces' } = useParams<{ category: string }>();

  const guide = CATEGORY_GUIDES[category] || {
    title: category.toUpperCase(),
    subtitle: 'Sculptural lighting objects.',
    advice: 'Designed for rooms where life happens.',
    locations: ['Living', 'Dining', 'Bedside']
  };

  const categoryProducts = PRODUCTS.filter((p) => p.category === category);

  return (
    <div style={{ backgroundColor: 'var(--warm-ivory)', minHeight: '100vh', paddingBottom: '120px' }}>
      {/* Back Link & Header */}
      <section style={{ padding: 'clamp(48px, 6vw, 84px) 0 clamp(32px, 4vw, 56px) 0', borderBottom: '1px solid rgba(30, 28, 26, 0.08)' }}>
        <div className="container-wide">
          <Link
            to="/shop"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.1em',
              marginBottom: '24px',
              color: 'var(--stone)'
            }}
          >
            <ArrowLeft size={14} />
            <span>BACK TO ALL LIGHTING</span>
          </Link>

          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.2em',
              color: 'var(--oxblood)',
              display: 'block',
              marginBottom: '12px'
            }}
          >
            CATEGORY COMPENDIUM
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-theater)',
              fontSize: 'var(--text-h1)',
              lineHeight: 0.98,
              letterSpacing: '-0.02em'
            }}
          >
            {guide.title}.
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-personality)',
              fontSize: 'clamp(20px, 2.5vw, 28px)',
              fontStyle: 'italic',
              color: 'var(--espresso)',
              marginTop: '12px',
              maxWidth: '680px'
            }}
          >
            "{guide.subtitle}"
          </p>

          <p style={{ fontSize: '16px', lineHeight: 1.6, color: 'var(--espresso)', opacity: 0.85, maxWidth: '640px', marginTop: '16px' }}>
            {guide.advice}
          </p>

          {/* WHERE TO USE THEM — VISUAL MINI GUIDE */}
          <div
            style={{
              marginTop: '40px',
              padding: '24px',
              backgroundColor: 'var(--parchment)',
              border: '1px solid rgba(30, 28, 26, 0.1)'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.15em',
                color: 'var(--oxblood)',
                display: 'block',
                marginBottom: '12px'
              }}
            >
              WHERE TO PLACE THEM
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {guide.locations.map((loc) => (
                <span
                  key={loc}
                  style={{
                    padding: '6px 14px',
                    backgroundColor: 'rgba(247, 242, 232, 0.85)',
                    border: '1px solid rgba(30, 28, 26, 0.15)',
                    fontSize: '13px',
                    fontFamily: 'var(--font-ui)'
                  }}
                >
                  &bull; {loc}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section style={{ paddingTop: '56px' }}>
        <div className="container-wide">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: 'clamp(32px, 5vw, 64px)'
            }}
          >
            {categoryProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
