import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import { ROOMS } from '../data/rooms';
import { useStore } from '../store/useStore';

export const Rooms: React.FC = () => {
  const { setCursor, resetCursor } = useStore();

  return (
    <div style={{ backgroundColor: '#1A1614', color: '#F7F2E8', minHeight: '100vh' }}>
      {/* Rooms Hero */}
      <section style={{ padding: 'clamp(80px, 12vw, 150px) 0 clamp(40px, 6vw, 80px) 0', borderBottom: '1px solid rgba(247, 242, 232, 0.1)' }}>
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
            SHOP THE ATMOSPHERE // DOMESTIC ARCHITECTURE
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-theater)',
              fontSize: 'var(--text-mega)',
              lineHeight: 0.92,
              letterSpacing: '-0.03em'
            }}
          >
            EVERY ROOM<br />NEEDS A<br />DIFFERENT<br />KIND OF<br />LIGHT.
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-personality)',
              fontSize: 'clamp(20px, 2.5vw, 30px)',
              fontStyle: 'italic',
              color: '#D7CDBD',
              marginTop: '24px',
              maxWidth: '820px'
            }}
          >
            Do not browse by bulb wattage. Browse by where dinner is served, where reading happens, and where the house falls asleep.
          </p>
        </div>
      </section>

      {/* Room Portals List */}
      <div>
        {ROOMS.map((room, idx) => (
          <section
            key={room.slug}
            style={{
              position: 'relative',
              minHeight: '80vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 80px)',
              borderBottom: '1px solid rgba(247, 242, 232, 0.12)',
              overflow: 'hidden'
            }}
            onMouseEnter={() => setCursor('ENTER', 'enter')}
            onMouseLeave={resetCursor}
          >
            <img
              src={room.heroImage}
              alt={room.name}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.45
              }}
            />

            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(16, 13, 12, 0.95) 0%, rgba(16, 13, 12, 0.25) 55%, rgba(16, 13, 12, 0.5) 100%)'
              }}
            />

            <div style={{ position: 'relative', zIndex: 2, maxWidth: '940px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--butter)', letterSpacing: '0.2em' }}>
                ROOM 0{idx + 1}
              </span>

              <h2
                style={{
                  fontFamily: 'var(--font-theater)',
                  fontSize: 'clamp(52px, 8vw, 110px)',
                  lineHeight: 0.95,
                  marginTop: '4px'
                }}
              >
                {room.name}
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-personality)',
                  fontSize: 'clamp(20px, 2.5vw, 30px)',
                  fontStyle: 'italic',
                  color: '#FFE2A8',
                  marginTop: '12px'
                }}
              >
                &ldquo;{room.headline}&rdquo;
              </p>

              <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#D7CDBD', marginTop: '16px', maxWidth: '640px' }}>
                {room.descriptor}
              </p>

              <div style={{ marginTop: '32px' }}>
                <Link
                  to={`/rooms/${room.slug}`}
                  className="btn-primary"
                  style={{
                    backgroundColor: 'var(--butter)',
                    color: '#1E1C1A',
                    borderColor: 'var(--butter)',
                    padding: '16px 36px'
                  }}
                >
                  <span>EXPLORE {room.name} LIGHTING &rarr;</span>
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
