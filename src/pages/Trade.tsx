import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Download, Layers, ShieldCheck } from 'lucide-react';
import { TRADE_BENEFITS, TRADE_PROJECTS } from '../data/trade';
import { PRODUCTS } from '../data/products';

export const Trade: React.FC = () => {
  return (
    <div style={{ backgroundColor: 'var(--olive)', color: 'var(--warm-ivory)', minHeight: '100vh', paddingBottom: '120px' }}>
      {/* Trade Hero */}
      <section style={{ padding: 'clamp(80px, 12vw, 150px) 0 clamp(40px, 6vw, 80px) 0', borderBottom: '1px solid rgba(247, 242, 232, 0.15)' }}>
        <div className="container-wide">
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.25em', color: 'var(--butter)', display: 'block', marginBottom: '16px' }}>
            PROFESSIONAL PARTNERSHIP PROGRAM
          </span>

          <h1 style={{ fontFamily: 'var(--font-theater)', fontSize: 'var(--text-mega)', lineHeight: 0.92, letterSpacing: '-0.03em' }}>
            FOR DESIGNERS OF ROOMS.
          </h1>

          <p style={{ fontFamily: 'var(--font-personality)', fontSize: 'clamp(20px, 2.5vw, 30px)', fontStyle: 'italic', color: '#E9DEC7', marginTop: '24px', maxWidth: '820px' }}>
            We work intimately with independent interior architects, hospitality studios, and lighting designers on commissions from private residences to bespoke boutique hotels.
          </p>

          <div style={{ marginTop: '36px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link
              to="/trade/apply"
              className="btn-primary"
              style={{ backgroundColor: 'var(--warm-ivory)', color: 'var(--olive)', borderColor: 'var(--warm-ivory)', padding: '16px 36px' }}
            >
              <span>APPLY FOR TRADE ACCOUNT &rarr;</span>
            </Link>

            <Link
              to="/trade/projects"
              className="btn-outline"
              style={{ color: 'var(--warm-ivory)', borderColor: 'rgba(247, 242, 232, 0.3)', padding: '16px 32px' }}
            >
              <span>VIEW RECENT COMMISSIONS</span>
            </Link>
          </div>
        </div>
      </section>

      {/* TRADE BENEFITS GRID */}
      <section style={{ padding: 'clamp(80px, 10vw, 140px) 0' }}>
        <div className="container-wide">
          <div style={{ maxWidth: '640px', marginBottom: '60px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', color: 'var(--butter)' }}>
              CORE PROGRAM PRIVILEGES
            </span>
            <h2 style={{ fontFamily: 'var(--font-theater)', fontSize: 'var(--text-h2)', lineHeight: 1 }}>
              Support For Complex Spaces.
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(24px, 4vw, 48px)'
            }}
          >
            {TRADE_BENEFITS.map((benefit, idx) => (
              <div
                key={benefit.title}
                style={{
                  padding: '32px',
                  backgroundColor: 'rgba(20, 26, 20, 0.5)',
                  border: '1px solid rgba(247, 242, 232, 0.12)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--butter)' }}>
                    0{idx + 1}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-theater)', fontSize: '24px', marginTop: '12px', marginBottom: '12px' }}>
                    {benefit.title}
                  </h3>
                  <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#D7CDBD' }}>
                    {benefit.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED TRADE INSTALLATIONS PREVIEW */}
      <section style={{ padding: 'clamp(64px, 8vw, 100px) 0', borderTop: '1px solid rgba(247, 242, 232, 0.12)' }}>
        <div className="container-wide">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '40px' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', color: 'var(--butter)' }}>
                PROJECT ARCHIVE
              </span>
              <h2 style={{ fontFamily: 'var(--font-theater)', fontSize: '38px' }}>
                Recent Installations.
              </h2>
            </div>
            <Link to="/trade/projects" className="btn-text" style={{ color: 'var(--butter)', borderColor: 'var(--butter)' }}>
              VIEW ALL PROJECTS &rarr;
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px' }}>
            {TRADE_PROJECTS.map((proj) => (
              <div key={proj.id} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '100%', aspectRatio: '16/10', overflow: 'hidden', backgroundColor: '#131821' }}>
                  <img src={proj.image} alt={proj.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ marginTop: '16px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--butter)', letterSpacing: '0.15em' }}>
                    {proj.category.toUpperCase()} &bull; {proj.location}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-theater)', fontSize: '24px', marginTop: '4px' }}>
                    {proj.name}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#D7CDBD', marginTop: '6px' }}>
                    Designer: {proj.designer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRADE SPEC RESOURCE DOWNLOADS TABLE */}
      <section style={{ paddingTop: '80px' }}>
        <div className="container-wide">
          <div style={{ maxWidth: '640px', marginBottom: '32px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', color: 'var(--butter)' }}>
              RESOURCE REPOSITORY
            </span>
            <h2 style={{ fontFamily: 'var(--font-theater)', fontSize: '38px' }}>
              Cut-Sheets &amp; 3D Assets.
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(20, 26, 20, 0.4)', border: '1px solid rgba(247, 242, 232, 0.12)' }}>
            {PRODUCTS.map((p) => (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '20px 24px',
                  borderBottom: '1px solid rgba(247, 242, 232, 0.08)',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div>
                  <h4 style={{ fontFamily: 'var(--font-theater)', fontSize: '22px' }}>{p.name}</h4>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#AAA092' }}>
                    {p.categoryLabel} &bull; {p.dimensions}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <a
                    href={p.specSheet}
                    onClick={(e) => { e.preventDefault(); alert(`Downloading Architectural PDF Cut-Sheet: ${p.name}`); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--butter)',
                      textDecoration: 'underline'
                    }}
                  >
                    <Download size={13} />
                    <span>SPEC SHEET (PDF)</span>
                  </a>

                  {p.model3d && (
                    <a
                      href={`/specs/${p.slug}.step`}
                      onClick={(e) => { e.preventDefault(); alert(`Downloading 3D CAD (.STEP) geometry: ${p.name}`); }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: 'var(--butter)',
                        textDecoration: 'underline'
                      }}
                    >
                      <Download size={13} />
                      <span>3D CAD (.STEP)</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
