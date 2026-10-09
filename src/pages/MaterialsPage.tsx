import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sun, Moon, Flame } from 'lucide-react';
import { MATERIALS, MaterialInfo } from '../data/materials';

export const MaterialsPage: React.FC = () => {
  const [selectedMat, setSelectedMat] = useState<MaterialInfo>(MATERIALS[0]);
  const [lightMode, setLightMode] = useState<'morning' | 'warmLamp' | 'candle' | 'coolDaylight'>('warmLamp');

  return (
    <div style={{ backgroundColor: 'var(--stone)', color: 'var(--ink)', minHeight: '100vh', paddingBottom: '120px' }}>
      {/* Header */}
      <section style={{ padding: 'clamp(64px, 10vw, 120px) 0 clamp(32px, 4vw, 56px) 0', borderBottom: '1px solid rgba(30, 28, 26, 0.15)' }}>
        <div className="container-wide">
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.25em', color: 'var(--oxblood)', display: 'block', marginBottom: '12px' }}>
            MATERIAL LIBRARY &bull; TACTILITY
          </span>

          <h1 style={{ fontFamily: 'var(--font-theater)', fontSize: 'var(--text-mega)', lineHeight: 0.92, letterSpacing: '-0.03em' }}>
            TOUCH WITHOUT TOUCHING.
          </h1>

          <p style={{ fontFamily: 'var(--font-personality)', fontSize: 'clamp(20px, 2.5vw, 28px)', fontStyle: 'italic', color: 'var(--espresso)', marginTop: '20px', maxWidth: '720px' }}>
            Unlacquered brass, mineral lime plaster, mouth-blown opal glass, and honed Italian marble. Materials that age with domestic life rather than expiring.
          </p>
        </div>
      </section>

      {/* Material Index & Detail Explorer */}
      <section style={{ paddingTop: '64px' }}>
        <div className="container-wide">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              gap: 'clamp(32px, 6vw, 84px)',
              alignItems: 'start'
            }}
            className="editorial-card-grid"
          >
            {/* Left: Material Macro Preview & Light Test Simulation */}
            <div>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', backgroundColor: '#241E1A', overflow: 'hidden' }}>
                <img
                  src={selectedMat.image}
                  alt={selectedMat.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {/* Light Test Overlay simulation */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    background:
                      lightMode === 'warmLamp'
                        ? 'radial-gradient(circle, rgba(255, 224, 163, 0.25) 0%, transparent 70%)'
                        : lightMode === 'candle'
                        ? 'radial-gradient(circle, rgba(244, 185, 104, 0.35) 0%, transparent 65%)'
                        : lightMode === 'morning'
                        ? 'linear-gradient(to bottom, rgba(255, 248, 235, 0.15) 0%, transparent 70%)'
                        : 'linear-gradient(to bottom, rgba(190, 215, 235, 0.1) 0%, transparent 80%)',
                    transition: 'background 0.5s ease'
                  }}
                />
              </div>

              {/* LIGHT TEST SELECTOR */}
              <div
                style={{
                  marginTop: '20px',
                  padding: '20px',
                  backgroundColor: 'rgba(247, 242, 232, 0.7)',
                  border: '1px solid rgba(30, 28, 26, 0.12)'
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', color: 'var(--oxblood)', display: 'block', marginBottom: '12px' }}>
                  LIGHT TEST &bull; SURFACE BEHAVIOR UNDER EMISSION
                </span>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
                  {[
                    { id: 'morning', label: 'MORNING SUN' },
                    { id: 'warmLamp', label: 'WARM 2700K LAMP' },
                    { id: 'candle', label: 'CANDLE FLAME' },
                    { id: 'coolDaylight', label: 'COOL DAYLIGHT' }
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setLightMode(btn.id as any)}
                      style={{
                        padding: '6px 12px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        backgroundColor: lightMode === btn.id ? 'var(--ink)' : 'transparent',
                        color: lightMode === btn.id ? 'var(--warm-ivory)' : 'var(--ink)',
                        border: '1px solid var(--ink)'
                      }}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>

                <p style={{ fontFamily: 'var(--font-personality)', fontSize: '15px', color: 'var(--espresso)', fontStyle: 'italic' }}>
                  &ldquo;{selectedMat.lightTests[lightMode]}&rdquo;
                </p>
              </div>
            </div>

            {/* Right: Material List & Narrative */}
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', color: 'var(--charcoal)', display: 'block', marginBottom: '12px' }}>
                SELECT MATERIAL SPECIFICATION
              </span>

              {/* Material tabs */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
                {MATERIALS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMat(m)}
                    style={{
                      padding: '10px 16px',
                      backgroundColor: selectedMat.id === m.id ? 'var(--ink)' : 'rgba(247, 242, 232, 0.65)',
                      color: selectedMat.id === m.id ? 'var(--warm-ivory)' : 'var(--ink)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      letterSpacing: '0.08em',
                      border: '1px solid rgba(30, 28, 26, 0.15)'
                    }}
                  >
                    {m.name}
                  </button>
                ))}
              </div>

              <h2 style={{ fontFamily: 'var(--font-theater)', fontSize: '42px', lineHeight: 1.05 }}>
                {selectedMat.name}
              </h2>

              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--charcoal)', letterSpacing: '0.1em', marginTop: '6px' }}>
                ORIGIN: {selectedMat.origin}
              </p>

              <p style={{ fontSize: '16px', lineHeight: 1.7, marginTop: '20px' }}>
                {selectedMat.description}
              </p>

              <div style={{ marginTop: '28px', padding: '20px', backgroundColor: 'rgba(247, 242, 232, 0.7)', border: '1px solid rgba(30, 28, 26, 0.1)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--oxblood)', letterSpacing: '0.15em', display: 'block' }}>
                  HOW IT EVOLVES OVER TIME
                </span>
                <p style={{ fontSize: '14px', lineHeight: 1.6, marginTop: '8px' }}>
                  {selectedMat.patinaBehavior}
                </p>
              </div>

              <div style={{ marginTop: '20px', padding: '20px', backgroundColor: 'rgba(247, 242, 232, 0.7)', border: '1px solid rgba(30, 28, 26, 0.1)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--charcoal)', letterSpacing: '0.15em', display: 'block' }}>
                  CARE &amp; CONSERVATION
                </span>
                <p style={{ fontSize: '14px', lineHeight: 1.6, marginTop: '8px' }}>
                  {selectedMat.care}
                </p>
              </div>

              <div style={{ marginTop: '32px' }}>
                <Link to="/shop" className="btn-primary">
                  <span>DISCOVER FIXTURES IN THIS FINISH &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
