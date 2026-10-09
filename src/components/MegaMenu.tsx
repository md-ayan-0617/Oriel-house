import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { CATEGORIES } from '../data/products';

const MENU_ITEMS = [
  { id: '01', label: 'SHOP ALL', path: '/shop', preview: '/images/hero_room_night.svg', desc: 'Sculptural objects & room fixtures' },
  { id: '02', label: 'COLLECTIONS', path: '/collections', preview: '/images/floor_lamp_eleanor_on.svg', desc: 'Narrative suites & design stories' },
  { id: '03', label: 'ROOMS', path: '/rooms', preview: '/images/pendant_bellamy_on.svg', desc: 'Atmospheres for living, dining & bed' },
  { id: '04', label: 'PLAYGROUND', path: '/play', preview: '/images/table_lamp_margo_on.svg', desc: 'Interactive room lighting studio' },
  { id: '05', label: 'MATERIALS', path: '/materials', preview: '/images/material_brass.svg', desc: 'Living unlacquered brass, stone & plaster' },
  { id: '06', label: 'JOURNAL', path: '/journal', preview: '/images/journal_1.svg', desc: 'The Evening Paper: essays on light' },
  { id: '07', label: 'ABOUT THE STUDIO', path: '/about', preview: '/images/studio_process_1.svg', desc: 'Domestic philosophy & craft' },
  { id: '08', label: 'TRADE PROGRAM', path: '/trade', preview: '/images/trade_project_1.svg', desc: 'For architects & interior designers' },
  { id: '09', label: 'CONTACT', path: '/contact', preview: '/images/candle_lucien_on.svg', desc: 'Studio appointments & inquiries' }
];

export const MegaMenu: React.FC = () => {
  const { isMenuOpen, toggleMenu, setCursor, resetCursor } = useStore();
  const [activePreview, setActivePreview] = useState(MENU_ITEMS[0].preview);
  const [activeDesc, setActiveDesc] = useState(MENU_ITEMS[0].desc);

  // Close on Escape key & trap focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        toggleMenu(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, toggleMenu]);

  // Lock body scroll when open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  if (!isMenuOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'var(--warm-ivory)',
        color: 'var(--ink)',
        display: 'flex',
        flexDirection: 'column',
        animation: 'fadeIn 0.4s ease'
      }}
    >
      {/* Top Bar with Brand & Close Button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '28px clamp(24px, 5vw, 64px)',
          borderBottom: '1px solid rgba(30, 28, 26, 0.1)'
        }}
      >
        <Link
          to="/"
          onClick={() => toggleMenu(false)}
          style={{
            fontFamily: 'var(--font-theater)',
            fontSize: '28px',
            letterSpacing: '-0.02em',
            display: 'flex',
            alignItems: 'baseline',
            gap: '8px'
          }}
        >
          <span>Oriel</span>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: '11px', letterSpacing: '0.22em', fontWeight: 600 }}>
            HOUSE
          </span>
        </Link>

        <button
          onClick={() => toggleMenu(false)}
          aria-label="Close menu"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.1em',
            padding: '8px 16px',
            border: '1px solid rgba(30, 28, 26, 0.2)'
          }}
          onMouseEnter={() => setCursor('CLOSE', 'view')}
          onMouseLeave={resetCursor}
        >
          <span>CLOSE</span>
          <X size={16} />
        </button>
      </div>

      {/* Main Split Body: 55% Nav / 45% Room Preview */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          overflow: 'hidden'
        }}
      >
        {/* Left Navigation: 55% */}
        <div
          style={{
            flex: '1 1 55%',
            padding: ' clamp(20px, 4vw, 48px) clamp(24px, 5vw, 64px)',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <nav>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {MENU_ITEMS.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    onClick={() => toggleMenu(false)}
                    onMouseEnter={() => {
                      setActivePreview(item.preview);
                      setActiveDesc(item.desc);
                      setCursor('ENTER', 'enter');
                    }}
                    onMouseLeave={resetCursor}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '20px',
                      padding: '8px 0',
                      transition: 'transform 0.25s ease, color 0.25s ease'
                    }}
                    className="menu-nav-link"
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        color: 'var(--stone)',
                        letterSpacing: '0.1em'
                      }}
                    >
                      {item.id}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-theater)',
                        fontSize: 'clamp(28px, 3.8vw, 54px)',
                        letterSpacing: '-0.02em',
                        lineHeight: 1
                      }}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Category Quick Index */}
          <div
            style={{
              marginTop: '32px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(30, 28, 26, 0.1)'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--stone)',
                letterSpacing: '0.15em',
                display: 'block',
                marginBottom: '12px'
              }}
            >
              PRODUCT INDEX
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              {CATEGORIES.filter((c) => c.slug !== 'all').map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/shop/${cat.slug}`}
                  onClick={() => toggleMenu(false)}
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '13px',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    opacity: 0.75
                  }}
                  onMouseEnter={() => setCursor('VIEW', 'view')}
                  onMouseLeave={resetCursor}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Preview: 45% (Hidden on small mobile) */}
        <div
          style={{
            flex: '1 1 45%',
            position: 'relative',
            backgroundColor: '#1E1C1A',
            borderLeft: '1px solid rgba(30, 28, 26, 0.1)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '40px'
          }}
          className="menu-preview-col"
        >
          <img
            key={activePreview}
            src={activePreview}
            alt="Atmospheric room preview"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.88,
              transition: 'opacity 0.5s ease, transform 0.8s ease',
              transform: 'scale(1.02)'
            }}
          />

          {/* Shutter Reveal Overlay Vignette */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(20, 18, 16, 0.85) 0%, rgba(20, 18, 16, 0.1) 60%)'
            }}
          />

          <div style={{ position: 'relative', zIndex: 2, color: 'var(--warm-ivory)' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.2em',
                color: 'var(--butter)',
                display: 'block',
                marginBottom: '8px'
              }}
            >
              ATMOSPHERIC PREVIEW
            </span>
            <p
              style={{
                fontFamily: 'var(--font-personality)',
                fontSize: '22px',
                lineHeight: 1.3,
                maxWidth: '420px'
              }}
            >
              {activeDesc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
