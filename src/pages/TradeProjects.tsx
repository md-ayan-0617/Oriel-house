import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { TRADE_PROJECTS } from '../data/trade';

export const TradeProjects: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#131821', color: '#F7F2E8', minHeight: '100vh', paddingBottom: '120px' }}>
      {/* Header */}
      <section style={{ padding: 'clamp(64px, 10vw, 120px) 0 clamp(32px, 4vw, 56px) 0', borderBottom: '1px solid rgba(247, 242, 232, 0.1)' }}>
        <div className="container-wide">
          <Link
            to="/trade"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.15em',
              color: 'var(--butter)',
              marginBottom: '20px'
            }}
          >
            <ArrowLeft size={14} />
            <span>TRADE OVERVIEW</span>
          </Link>

          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.25em', color: 'var(--butter)', display: 'block', marginBottom: '12px' }}>
            ARCHITECTURAL COMMISSIONS &bull; BUILT WORK
          </span>

          <h1 style={{ fontFamily: 'var(--font-theater)', fontSize: 'var(--text-mega)', lineHeight: 0.92, letterSpacing: '-0.03em' }}>
            PROJECT GALLERY.
          </h1>

          <p style={{ fontFamily: 'var(--font-personality)', fontSize: 'clamp(20px, 2.5vw, 28px)', fontStyle: 'italic', color: '#D7CDBD', marginTop: '16px', maxWidth: '720px' }}>
            Residential sanctuaries, boutique European hotels, and Michelin restaurants illuminated by Oriel House fixtures.
          </p>
        </div>
      </section>

      {/* Projects List */}
      <section style={{ paddingTop: '64px' }}>
        <div className="container-wide">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '96px' }}>
            {TRADE_PROJECTS.map((proj, idx) => (
              <div
                key={proj.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: idx % 2 === 0 ? '1.3fr 1fr' : '1fr 1.3fr',
                  gap: 'clamp(32px, 6vw, 84px)',
                  alignItems: 'center'
                }}
                className="editorial-card-grid"
              >
                <div style={{ order: idx % 2 === 0 ? 1 : 2, width: '100%', aspectRatio: '16/10', overflow: 'hidden', backgroundColor: '#0B0F15' }}>
                  <img src={proj.image} alt={proj.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <div style={{ order: idx % 2 === 0 ? 2 : 1 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--butter)', letterSpacing: '0.2em' }}>
                    {proj.category.toUpperCase()} // {proj.location}
                  </span>

                  <h2 style={{ fontFamily: 'var(--font-theater)', fontSize: 'clamp(36px, 5vw, 64px)', marginTop: '8px' }}>
                    {proj.name}
                  </h2>

                  <p style={{ fontSize: '14px', fontFamily: 'var(--font-mono)', color: '#91A8BB', marginTop: '4px' }}>
                    DESIGNER: {proj.designer}
                  </p>

                  <p style={{ fontSize: '16px', lineHeight: 1.7, color: '#D7CDBD', marginTop: '18px' }}>
                    {proj.description}
                  </p>

                  {/* Fixtures Used */}
                  <div style={{ marginTop: '24px', padding: '16px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--butter)', letterSpacing: '0.15em', display: 'block', marginBottom: '8px' }}>
                      FIXTURES SPECIFIED
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {proj.fixtures.map((f) => (
                        <span key={f} style={{ fontSize: '12px', fontFamily: 'var(--font-ui)', color: '#F7F2E8' }}>
                          &bull; {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: '28px' }}>
                    <Link
                      to="/trade/apply"
                      className="btn-primary"
                      style={{ backgroundColor: 'var(--butter)', color: '#1E1C1A', borderColor: 'var(--butter)' }}
                    >
                      <span>INQUIRE ABOUT THIS SPECIFICATION &rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
