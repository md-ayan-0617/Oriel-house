import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { COLLECTIONS } from '../data/collections';
import { useStore } from '../store/useStore';

export const Collections: React.FC = () => {
  const { setCursor, resetCursor } = useStore();

  return (
    <div style={{ backgroundColor: '#161413', color: '#F7F2E8', minHeight: '100vh' }}>
      {/* Editorial Header */}
      <section style={{ padding: 'clamp(80px, 12vw, 140px) 0 clamp(40px, 6vw, 80px) 0', borderBottom: '1px solid rgba(247, 242, 232, 0.1)' }}>
        <div className="container-wide">
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.25em',
              color: 'var(--butter)',
              display: 'block',
              marginBottom: '16px'
            }}
          >
            NARRATIVE SUITES // ARCHIVE
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-theater)',
              fontSize: 'var(--text-mega)',
              lineHeight: 0.92,
              letterSpacing: '-0.03em'
            }}
          >
            COLLECTIONS.
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-personality)',
              fontSize: 'clamp(20px, 2.5vw, 30px)',
              fontStyle: 'italic',
              color: '#D7CDBD',
              marginTop: '20px',
              maxWidth: '820px',
              lineHeight: 1.3
            }}
          >
            Each collection begins somewhere: a room, a journey, a found object, a material, a memory.
          </p>
        </div>
      </section>

      {/* COLLECTION PORTALS (Full Screen Atmospheric Portals) */}
      <div>
        {COLLECTIONS.map((col, idx) => (
          <section
            key={col.slug}
            style={{
              position: 'relative',
              minHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 80px)',
              borderBottom: '1px solid rgba(247, 242, 232, 0.12)',
              overflow: 'hidden'
            }}
            onMouseEnter={() => setCursor('EXPLORE', 'enter')}
            onMouseLeave={resetCursor}
          >
            {/* Background Environmental Photography */}
            <img
              src={col.heroImage}
              alt={col.name}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.45,
                filter: 'saturate(0.85) contrast(1.1)',
                transform: 'scale(1.02)',
                transition: 'transform 1s ease, opacity 0.6s ease'
              }}
            />

            {/* Gradient Mask Vignette */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(18, 15, 14, 0.95) 0%, rgba(18, 15, 14, 0.3) 60%, rgba(18, 15, 14, 0.6) 100%)'
              }}
            />

            {/* Content Overlay */}
            <div style={{ position: 'relative', zIndex: 2, maxWidth: '980px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--butter)', letterSpacing: '0.2em' }}>
                PORTAL 0{idx + 1}
              </span>

              <h2
                style={{
                  fontFamily: 'var(--font-theater)',
                  fontSize: 'clamp(54px, 8.5vw, 130px)',
                  lineHeight: 0.95,
                  marginTop: '6px',
                  letterSpacing: '-0.02em'
                }}
              >
                {col.name}
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-personality)',
                  fontSize: 'clamp(18px, 2.2vw, 26px)',
                  fontStyle: 'italic',
                  color: '#FFE2A8',
                  marginTop: '12px'
                }}
              >
                &ldquo;{col.editorialQuote}&rdquo;
              </p>

              <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#D7CDBD', marginTop: '16px', maxWidth: '640px' }}>
                {col.originStory}
              </p>

              {/* Material Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '20px' }}>
                {col.materialsPalette.map((m) => (
                  <span
                    key={m}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      letterSpacing: '0.1em',
                      padding: '4px 10px',
                      backgroundColor: 'rgba(247, 242, 232, 0.1)',
                      border: '1px solid rgba(247, 242, 232, 0.15)',
                      color: '#F7F2E8'
                    }}
                  >
                    {m}
                  </span>
                ))}
              </div>

              <div style={{ marginTop: '32px' }}>
                <Link
                  to={`/collections/${col.slug}`}
                  className="btn-primary"
                  style={{
                    backgroundColor: 'var(--butter)',
                    color: '#1E1C1A',
                    borderColor: 'var(--butter)',
                    padding: '16px 36px'
                  }}
                >
                  <span>ENTER THE {col.name} SUITE</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
