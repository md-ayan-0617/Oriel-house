import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Layers, Sliders, Check } from 'lucide-react';
import { ROOMS } from '../data/rooms';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const RoomDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const room = ROOMS.find((r) => r.slug === slug) || ROOMS[0];

  // Interactive Lighting Diagram Layer Toggles
  const [activeLayers, setActiveLayers] = useState<{
    overhead: boolean;
    wall: boolean;
    table: boolean;
    candle: boolean;
  }>({
    overhead: true,
    wall: true,
    table: true,
    candle: true
  });

  const toggleLayer = (layer: 'overhead' | 'wall' | 'table' | 'candle') => {
    setActiveLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  const recommendedProducts = PRODUCTS.filter((p) => room.recommendedProducts.includes(p.slug));

  return (
    <div style={{ backgroundColor: 'var(--warm-ivory)', minHeight: '100vh', paddingBottom: '120px' }}>
      {/* Room Hero Header */}
      <section
        style={{
          position: 'relative',
          minHeight: '65vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'clamp(48px, 6vw, 96px) clamp(20px, 4vw, 64px)',
          backgroundColor: '#1E1916',
          color: '#F7F2E8',
          overflow: 'hidden'
        }}
      >
        <img
          src={room.heroImage}
          alt={room.name}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(18, 14, 12, 0.95) 0%, rgba(18, 14, 12, 0.2) 65%)' }} />

        <div className="container-wide" style={{ position: 'relative', zIndex: 2 }}>
          <Link
            to="/rooms"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.15em',
              color: 'var(--butter)',
              marginBottom: '16px'
            }}
          >
            <ArrowLeft size={14} />
            <span>ALL ROOM STORIES</span>
          </Link>

          <h1 style={{ fontFamily: 'var(--font-theater)', fontSize: 'clamp(48px, 7vw, 100px)', lineHeight: 0.96 }}>
            {room.name}.
          </h1>

          <p style={{ fontFamily: 'var(--font-personality)', fontSize: 'clamp(20px, 2.4vw, 30px)', fontStyle: 'italic', color: '#FFE2A8', marginTop: '12px' }}>
            &ldquo;{room.headline}&rdquo;
          </p>

          <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#D7CDBD', maxWidth: '640px', marginTop: '16px' }}>
            {room.advice}
          </p>
        </div>
      </section>

      {/* =====================================================
          INTERACTIVE ARCHITECTURAL LIGHTING DIAGRAM
          Floorplan Elevation with Light Pool Layer Toggles
          ===================================================== */}
      <section style={{ padding: 'clamp(64px, 8vw, 110px) 0', borderBottom: '1px solid rgba(30, 28, 26, 0.1)' }}>
        <div className="container-wide">
          <div style={{ maxWidth: '720px', marginBottom: '32px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', color: 'var(--oxblood)' }}>
              ARCHITECTURAL ELEVATION &bull; LIGHT POOLS
            </span>
            <h2 style={{ fontFamily: 'var(--font-theater)', fontSize: '38px', marginTop: '6px' }}>
              The Four Lighting Layers.
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--espresso)', marginTop: '8px' }}>
              Toggle individual fixture circuits to understand how directional pools of light assemble the room's atmosphere.
            </p>
          </div>

          {/* Layer Toggle Controls */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '24px' }}>
            {(
              [
                { key: 'overhead', label: '1. OVERHEAD SUSPENSION' },
                { key: 'wall', label: '2. WALL SCONCES' },
                { key: 'table', label: '3. LOW TABLE LIGHT' },
                { key: 'candle', label: '4. CANDLE ACCENT' }
              ] as const
            ).map((l) => (
              <button
                key={l.key}
                onClick={() => toggleLayer(l.key)}
                style={{
                  padding: '10px 18px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  fontWeight: 600,
                  backgroundColor: activeLayers[l.key] ? 'var(--ink)' : 'transparent',
                  color: activeLayers[l.key] ? 'var(--warm-ivory)' : 'var(--ink)',
                  border: '1px solid var(--ink)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.25s ease'
                }}
              >
                {activeLayers[l.key] && <Check size={14} />}
                <span>{l.label}</span>
              </button>
            ))}
          </div>

          {/* Interactive Illustrated Diagram SVG */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/9',
              maxHeight: '520px',
              backgroundColor: '#1E1916',
              border: '1px solid rgba(30, 28, 26, 0.2)',
              overflow: 'hidden'
            }}
          >
            <svg viewBox="0 0 1000 560" width="100%" height="100%">
              <defs>
                {/* Overhead Pendant Beam */}
                <radialGradient id="diagOverhead" cx="50%" cy="15%" r="70%">
                  <stop offset="0%" stop-color="#FFE7B8" stop-opacity="0.95" />
                  <stop offset="35%" stop-color="#F4B968" stop-opacity="0.55" />
                  <stop offset="70%" stop-color="#B7694C" stop-opacity="0.15" />
                  <stop offset="100%" stop-color="#1E1916" stop-opacity="0" />
                </radialGradient>
                {/* Wall Sconce Glow */}
                <radialGradient id="diagWall" cx="20%" cy="40%" r="45%">
                  <stop offset="0%" stop-color="#FFE7B8" stop-opacity="0.9" />
                  <stop offset="40%" stop-color="#F4B968" stop-opacity="0.45" />
                  <stop offset="80%" stop-color="#1E1916" stop-opacity="0" />
                </radialGradient>
                {/* Table Lamp Pool */}
                <radialGradient id="diagTable" cx="80%" cy="50%" r="40%">
                  <stop offset="0%" stop-color="#FFF0CC" stop-opacity="0.9" />
                  <stop offset="45%" stop-color="#F4B968" stop-opacity="0.4" />
                  <stop offset="85%" stop-color="#1E1916" stop-opacity="0" />
                </radialGradient>
                {/* Candle Point */}
                <radialGradient id="diagCandle" cx="50%" cy="60%" r="30%">
                  <stop offset="0%" stop-color="#FFEBBF" stop-opacity="0.95" />
                  <stop offset="30%" stop-color="#F4B968" stop-opacity="0.6" />
                  <stop offset="70%" stop-color="#1E1916" stop-opacity="0" />
                </radialGradient>
              </defs>

              {/* Architectural Wall & Floor Lines */}
              <line x1="0" y1="420" x2="1000" y2="420" stroke="#3D322B" stroke-width="2" />
              <rect x="0" y="420" width="1000" height="140" fill="#14100E" />

              {/* Table Geometry Silhouette */}
              <rect x="360" y="360" width="280" height="60" fill="#2E241E" rx="2" />
              <line x1="390" y1="420" x2="390" y2="480" stroke="#241C17" stroke-width="6" />
              <line x1="610" y1="420" x2="610" y2="480" stroke="#241C17" stroke-width="6" />

              {/* Credenza on Right */}
              <rect x="760" y="340" width="160" height="80" fill="#261E19" rx="2" />

              {/* LAYER 1: Overhead Light Pool */}
              {activeLayers.overhead && (
                <g>
                  <polygon points="500,110 240,480 760,480" fill="url(#diagOverhead)" mix-blend-mode="screen" />
                  <line x1="500" y1="0" x2="500" y2="100" stroke="#A67A43" stroke-width="3" />
                  <circle cx="500" cy="105" r="14" fill="#FFF2D6" />
                </g>
              )}

              {/* LAYER 2: Wall Sconce Pool */}
              {activeLayers.wall && (
                <g>
                  <circle cx="200" cy="220" r="160" fill="url(#diagWall)" mix-blend-mode="screen" />
                  <rect x="192" y="190" width="16" height="60" rx="8" fill="#ECE5DA" stroke="#A67A43" stroke-width="2" />
                </g>
              )}

              {/* LAYER 3: Low Table Lamp Pool */}
              {activeLayers.table && (
                <g>
                  <circle cx="840" cy="310" r="140" fill="url(#diagTable)" mix-blend-mode="screen" />
                  <circle cx="840" cy="310" r="22" fill="#FFF2D6" stroke="#A67A43" stroke-width="2" />
                  <rect x="836" y="332" width="8" height="18" fill="#A67A43" />
                </g>
              )}

              {/* LAYER 4: Candle Flame */}
              {activeLayers.candle && (
                <g>
                  <circle cx="500" cy="350" r="90" fill="url(#diagCandle)" mix-blend-mode="screen" />
                  <rect x="496" y="348" width="8" height="14" fill="#3A271E" />
                  <circle cx="500" cy="342" r="4" fill="#FFEBBF" />
                </g>
              )}

              {/* Text labels in SVG */}
              <text x="40" y="520" font-family="'IBM Plex Mono', monospace" font-size="12" fill="#8C7F72" letter-spacing="2">
                ROOM ELEVATION // {room.name.toUpperCase()} // 2700K STUDY
              </text>
            </svg>
          </div>

          {/* Layer Descriptions Breakdown */}
          <div
            style={{
              marginTop: '40px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px'
            }}
          >
            {[
              { num: '01', ...room.lightingLayers.overhead },
              { num: '02', ...room.lightingLayers.wall },
              { num: '03', ...room.lightingLayers.low },
              { num: '04', ...room.lightingLayers.candle }
            ].map((layer) => (
              <div
                key={layer.num}
                style={{
                  padding: '20px',
                  backgroundColor: 'var(--parchment)',
                  border: '1px solid rgba(30, 28, 26, 0.1)'
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--terracotta)', letterSpacing: '0.15em' }}>
                  LAYER {layer.num}
                </span>
                <h4 style={{ fontFamily: 'var(--font-theater)', fontSize: '20px', marginTop: '4px' }}>
                  {layer.title}
                </h4>
                <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--espresso)', marginTop: '8px' }}>
                  {layer.desc}
                </p>
                <Link
                  to={`/product/${layer.slug}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--oxblood)',
                    marginTop: '12px',
                    textDecoration: 'underline'
                  }}
                >
                  <span>VIEW FIXTURE</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECOMMENDED FIXTURES FOR THIS ROOM */}
      <section style={{ paddingTop: '80px' }}>
        <div className="container-wide">
          <div style={{ marginBottom: '40px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', color: 'var(--stone)' }}>
              FIXTURES SPECIFIED
            </span>
            <h3 style={{ fontFamily: 'var(--font-theater)', fontSize: '38px', marginTop: '4px' }}>
              The {room.name} Lighting Suite.
            </h3>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: 'clamp(32px, 5vw, 64px)'
            }}
          >
            {recommendedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
