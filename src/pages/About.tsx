import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div style={{ backgroundColor: 'var(--warm-ivory)', minHeight: '100vh', paddingBottom: '120px' }}>
      {/* About Hero */}
      <section style={{ padding: 'clamp(80px, 12vw, 150px) 0 clamp(40px, 6vw, 80px) 0', borderBottom: '1px solid rgba(30, 28, 26, 0.08)' }}>
        <div className="container-wide">
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.25em', color: 'var(--oxblood)', display: 'block', marginBottom: '16px' }}>
            THE HOUSE BEHIND THE LIGHT // STUDIO ORIGIN
          </span>

          <h1 style={{ fontFamily: 'var(--font-theater)', fontSize: 'var(--text-mega)', lineHeight: 0.92, letterSpacing: '-0.03em' }}>
            WE START<br />WITH THE<br />ROOM.<br />NOT THE<br />OBJECT.
          </h1>

          <p style={{ fontFamily: 'var(--font-personality)', fontSize: 'clamp(20px, 2.5vw, 30px)', fontStyle: 'italic', color: 'var(--espresso)', marginTop: '24px', maxWidth: '780px' }}>
            ORIEL HOUSE is an independent lighting studio creating sculptural wall sconces, pendants, chandeliers, table lamps, floor fixtures, and candle objects for rooms where life actually happens.
          </p>
        </div>
      </section>

      {/* Narrative Story Column + Founder Portrait */}
      <section style={{ padding: 'clamp(64px, 8vw, 110px) 0' }}>
        <div className="container-wide">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.2fr',
              gap: 'clamp(32px, 6vw, 84px)',
              alignItems: 'center'
            }}
            className="editorial-card-grid"
          >
            <div style={{ position: 'relative', width: '100%', aspectRatio: '4/5', backgroundColor: '#1E1C1A' }}>
              <img
                src="/images/founder_portrait.svg"
                alt="Studio Founder Alistair Vance amidst lighting mockups"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', color: 'var(--stone)' }}>
                ATELIER ESSAY
              </span>

              <h2 style={{ fontFamily: 'var(--font-theater)', fontSize: '42px', lineHeight: 1.05, marginTop: '8px' }}>
                Born in an Old Victorian Conservatory.
              </h2>

              <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--espresso)', marginTop: '20px' }}>
                The studio was founded in 2021 by architectural designer Alistair Vance. While restoring an uninsulated 1890s townhouse, he observed how modern electric fittings were relentlessly designed for showroom catalogues—bright, sterile, and aggressively glare-inducing—rather than the intimate reality of living with shadows.
              </p>

              <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--espresso)', marginTop: '16px' }}>
                We draw reference not from contemporary trend cycles, but from old domestic houses, garden loggias, Central European sleeper train compartments, found bronze artifacts, worn timber tables, and the specific golden temperature of a room when dinner moves past ten.
              </p>

              <blockquote
                style={{
                  fontFamily: 'var(--font-personality)',
                  fontSize: '22px',
                  fontStyle: 'italic',
                  color: 'var(--oxblood)',
                  borderLeft: '2px solid var(--oxblood)',
                  paddingLeft: '20px',
                  margin: '28px 0'
                }}
              >
                &ldquo;Every room is a quiet theatre set. The lamp is the conductor that cues the evening into existence.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* THE FIVE PRINCIPLES */}
      <section style={{ padding: 'clamp(80px, 10vw, 140px) 0', backgroundColor: 'var(--parchment)' }}>
        <div className="container-wide">
          <div style={{ maxWidth: '680px', marginBottom: '60px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', color: 'var(--oxblood)' }}>
              STUDIO CANON
            </span>
            <h2 style={{ fontFamily: 'var(--font-theater)', fontSize: 'var(--text-h2)', lineHeight: 1 }}>
              Five Domestic Principles.
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {[
              { num: '01', title: 'LIGHT FIRST.', desc: 'Before sculpting metal or blowing glass, we study the shape and softness of the light pool. If the shadow is unpleasant, the fixture is discarded.' },
              { num: '02', title: 'OBJECT SECOND.', desc: 'When the lamp is turned off during bright daylight, it must stand as a quiet architectural sculpture that honors the domestic still-life around it.' },
              { num: '03', title: 'ROOM ALWAYS.', desc: 'No lamp lives in isolation. It converses with plaster, parquet floorboards, dinner linen, and distant doorways.' },
              { num: '04', title: 'MATERIALS SHOULD AGE, NOT EXPIRE.', desc: 'No synthetic clear coats or planned obsolescence. Unlacquered brass, mineral lime, and solid stone develop deeper character as they are touched over decades.' },
              { num: '05', title: 'MAKE FEWER THINGS BETTER.', desc: 'We do not maintain seasonal collections of dozens of disposable variations. We build small, numbered editions with hand-assembled electrical integrity.' }
            ].map((p) => (
              <div
                key={p.num}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 1.5fr 2fr',
                  padding: '28px 0',
                  borderBottom: '1px solid rgba(30, 28, 26, 0.12)',
                  alignItems: 'baseline'
                }}
                className="principle-row"
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', color: 'var(--terracotta)' }}>
                  {p.num}
                </span>
                <h3 style={{ fontFamily: 'var(--font-theater)', fontSize: '28px' }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--espresso)', opacity: 0.9 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .principle-row {
              grid-template-columns: 1fr !important;
              gap: 8px !important;
            }
          }
        `}</style>
      </section>

      {/* Workshop & Craft Gallery */}
      <section style={{ paddingTop: '80px' }}>
        <div className="container-wide">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '32px' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', color: 'var(--stone)' }}>
                THE WORKBENCH
              </span>
              <h3 style={{ fontFamily: 'var(--font-theater)', fontSize: '38px' }}>
                Documentary Archive.
              </h3>
            </div>
            <Link to="/contact" className="btn-text">
              BOOK A STUDIO VISIT &rarr;
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            <img src="/images/studio_process_1.svg" alt="Turning brass on lathe" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
            <img src="/images/studio_process_2.svg" alt="Hand rubbing oil patina" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
            <img src="/images/studio_process_3.svg" alt="Testing electrical wire harness" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
          </div>
        </div>
      </section>
    </div>
  );
};
