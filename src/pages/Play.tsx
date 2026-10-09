import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sliders, Sun, Moon, Clock, Share2, ShoppingBag, Check } from 'lucide-react';
import { useStore } from '../store/useStore';
import { PRODUCTS } from '../data/products';

type TimeOfDay = '06:00' | '12:00' | '17:00' | '20:00' | '00:00';

export const Play: React.FC = () => {
  const [time, setTime] = useState<TimeOfDay>('20:00');
  const [wallColor, setWallColor] = useState<'plaster' | 'limewash' | 'espresso' | 'oxblood'>('plaster');
  const [activeLamp, setActiveLamp] = useState<'all' | 'pendant' | 'table' | 'sconce'>('all');
  const [savedMessage, setSavedMessage] = useState(false);

  const { setCursor, resetCursor } = useStore();

  const getTimeSettings = () => {
    switch (time) {
      case '06:00':
        return {
          sky: '#D4E4F0',
          windowLight: 0.85,
          lampWarmth: 0.2,
          ambientTone: '#ECE5DA',
          label: 'DAWN // 06:00 // NATURAL PALE WINDOW LIGHT'
        };
      case '12:00':
        return {
          sky: '#F0F6FA',
          windowLight: 1.0,
          lampWarmth: 0.1,
          ambientTone: '#F7F2E8',
          label: 'NOON // 12:00 // OVERHEAD ARCHITECTURAL DAYLIGHT'
        };
      case '17:00':
        return {
          sky: '#E5C9A3',
          windowLight: 0.6,
          lampWarmth: 0.5,
          ambientTone: '#EAD7BD',
          label: 'GOLDEN HOUR // 17:00 // GRAZING HORIZONTAL RAYS'
        };
      case '20:00':
        return {
          sky: '#1E2838',
          windowLight: 0.15,
          lampWarmth: 0.85,
          ambientTone: '#281F1A',
          label: 'BLUE HOUR DUSK // 20:00 // 2700K WARM GLOWS COMMAND THE ROOM'
        };
      case '00:00':
        return {
          sky: '#0A0E17',
          windowLight: 0.05,
          lampWarmth: 1.0,
          ambientTone: '#161210',
          label: 'MIDNIGHT // 00:00 // SOLITARY WARM READING POOLS'
        };
    }
  };

  const currentSettings = getTimeSettings();

  const getWallHex = () => {
    if (time === '00:00' || time === '20:00') {
      switch (wallColor) {
        case 'plaster': return '#261F1A';
        case 'limewash': return '#2B241E';
        case 'espresso': return '#1B1512';
        case 'oxblood': return '#381A18';
      }
    }
    switch (wallColor) {
      case 'plaster': return '#DFD4C0';
      case 'limewash': return '#EFE8DC';
      case 'espresso': return '#45352C';
      case 'oxblood': return '#873B35';
    }
  };

  const handleSaveScene = () => {
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2500);
  };

  return (
    <div style={{ backgroundColor: '#14110F', color: '#F7F2E8', minHeight: '100vh', paddingBottom: '120px' }}>
      {/* Play Studio Header */}
      <section style={{ padding: 'clamp(64px, 10vw, 120px) 0 clamp(32px, 4vw, 56px) 0', borderBottom: '1px solid rgba(247, 242, 232, 0.1)' }}>
        <div className="container-wide">
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.25em', color: 'var(--butter)', display: 'block', marginBottom: '12px' }}>
            LIGHTING PLAYGROUND // EXPERIMENTAL DIGITAL HOUSE
          </span>

          <h1 style={{ fontFamily: 'var(--font-theater)', fontSize: 'clamp(48px, 8vw, 110px)', lineHeight: 0.95 }}>
            MAKE YOURSELF AT HOME.
          </h1>

          <p style={{ fontFamily: 'var(--font-personality)', fontSize: '22px', fontStyle: 'italic', color: '#D7CDBD', marginTop: '16px', maxWidth: '720px' }}>
            Select your wall finish, dial the time of day, and test the transformative behavior of domestic light.
          </p>
        </div>
      </section>

      {/* Main Interactive Stage */}
      <section style={{ paddingTop: '40px' }}>
        <div className="container-wide">
          {/* Controls Bar: Time of day & Wall color */}
          <div
            style={{
              padding: '24px',
              backgroundColor: '#1C1714',
              border: '1px solid rgba(247, 242, 232, 0.15)',
              marginBottom: '24px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px'
            }}
          >
            {/* Time Slider */}
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', color: 'var(--butter)', display: 'block', marginBottom: '10px' }}>
                TIME OF DAY (DIAL CHRONOLOGY)
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                {(['06:00', '12:00', '17:00', '20:00', '00:00'] as TimeOfDay[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTime(t)}
                    style={{
                      padding: '8px 16px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      backgroundColor: time === t ? 'var(--butter)' : 'rgba(255, 255, 255, 0.05)',
                      color: time === t ? '#1E1C1A' : '#F7F2E8',
                      border: '1px solid rgba(247, 242, 232, 0.2)',
                      fontWeight: time === t ? 700 : 400,
                      cursor: 'pointer'
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Wall Color Finishes */}
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', color: 'var(--butter)', display: 'block', marginBottom: '10px' }}>
                ARCHITECTURAL WALL FINISH
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[
                  { id: 'plaster', label: 'LIME PLASTER', swatch: '#DFD4C0' },
                  { id: 'limewash', label: 'RAW CHALK', swatch: '#EFE8DC' },
                  { id: 'espresso', label: 'DARK TIMBER', swatch: '#45352C' },
                  { id: 'oxblood', label: 'OXBLOOD GLOSS', swatch: '#873B35' }
                ].map((w) => (
                  <button
                    key={w.id}
                    onClick={() => setWallColor(w.id as any)}
                    style={{
                      padding: '8px 14px',
                      fontSize: '11px',
                      fontFamily: 'var(--font-ui)',
                      backgroundColor: wallColor === w.id ? '#F7F2E8' : 'rgba(255, 255, 255, 0.05)',
                      color: wallColor === w.id ? '#1E1C1A' : '#F7F2E8',
                      border: '1px solid rgba(247, 242, 232, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: w.swatch }} />
                    <span>{w.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Lamp Mode Filter */}
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', color: 'var(--butter)', display: 'block', marginBottom: '10px' }}>
                FIXTURE ACTIVATION
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                {(['all', 'pendant', 'table', 'sconce'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setActiveLamp(mode)}
                    style={{
                      padding: '8px 14px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      backgroundColor: activeLamp === mode ? 'var(--oxblood)' : 'rgba(255, 255, 255, 0.05)',
                      color: '#F7F2E8',
                      border: '1px solid rgba(247, 242, 232, 0.2)'
                    }}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Room Canvas Visualizer */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/9',
              minHeight: '440px',
              backgroundColor: currentSettings.ambientTone,
              border: '1px solid rgba(247, 242, 232, 0.15)',
              overflow: 'hidden',
              transition: 'background-color 1s ease'
            }}
          >
            <svg viewBox="0 0 1200 680" width="100%" height="100%">
              <defs>
                <radialGradient id="lampWarmGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#FFE0A3" stop-opacity="0.95" />
                  <stop offset="35%" stop-color="#F4B968" stop-opacity="0.55" />
                  <stop offset="70%" stop-color="#B7694C" stop-opacity="0.2" />
                  <stop offset="100%" stop-color="#14110F" stop-opacity="0" />
                </radialGradient>
              </defs>

              {/* Plaster Wall */}
              <rect x="0" y="0" width="1200" height="480" fill={getWallHex()} />

              {/* Timber Floor */}
              <rect x="0" y="480" width="1200" height="200" fill="#201814" />
              <line x1="0" y1="480" x2="1200" y2="480" stroke="#3D2E26" stroke-width="3" />

              {/* French Arched Window (showing sky at chosen time) */}
              <path d="M 120 460 L 120 180 A 100 100 0 0 1 320 180 L 320 460 Z" fill={currentSettings.sky} stroke="#2D231D" stroke-width="12" />
              <line x1="220" y1="80" x2="220" y2="460" stroke="#2D231D" stroke-width="6" />

              {/* Sunlight Beam across floor (daytime) */}
              {currentSettings.windowLight > 0.4 && (
                <polygon points="180,180 320,180 620,580 340,580" fill="#FFFBE8" opacity={currentSettings.windowLight * 0.25} />
              )}

              {/* Dining Table Centerpiece */}
              <rect x="420" y="420" width="380" height="80" fill="#2E231C" rx="4" />
              <line x1="450" y1="500" x2="450" y2="580" stroke="#1D1612" stroke-width="8" />
              <line x1="770" y1="500" x2="770" y2="580" stroke="#1D1612" stroke-width="8" />

              {/* Credenza on Right */}
              <rect x="920" y="380" width="220" height="120" fill="#261C16" rx="2" />

              {/* BELLAMY PENDANT OVERHEAD */}
              {(activeLamp === 'all' || activeLamp === 'pendant') && (
                <g>
                  {currentSettings.lampWarmth > 0.2 && (
                    <polygon points="610,140 320,540 900,540" fill="url(#lampWarmGlow)" mix-blend-mode="screen" opacity={currentSettings.lampWarmth * 0.9} />
                  )}
                  <line x1="610" y1="0" x2="610" y2="120" stroke="#A67A43" stroke-width="4" />
                  <ellipse cx="610" cy="130" rx="44" ry="16" fill={currentSettings.lampWarmth > 0.2 ? '#FFE9BE' : '#8A7A66'} stroke="#A67A43" stroke-width="2" />
                </g>
              )}

              {/* ESME SCONCE ON WALL */}
              {(activeLamp === 'all' || activeLamp === 'sconce') && (
                <g>
                  {currentSettings.lampWarmth > 0.2 && (
                    <circle cx="390" cy="240" r="160" fill="url(#lampWarmGlow)" mix-blend-mode="screen" opacity={currentSettings.lampWarmth * 0.8} />
                  )}
                  <rect x="382" y="210" width="16" height="60" rx="8" fill="#ECE5DA" stroke="#A67A43" stroke-width="2" />
                </g>
              )}

              {/* MARGO TABLE LAMP ON CREDENZA */}
              {(activeLamp === 'all' || activeLamp === 'table') && (
                <g>
                  {currentSettings.lampWarmth > 0.2 && (
                    <circle cx="1020" cy="340" r="140" fill="url(#lampWarmGlow)" mix-blend-mode="screen" opacity={currentSettings.lampWarmth * 0.85} />
                  )}
                  <circle cx="1020" cy="340" r="24" fill={currentSettings.lampWarmth > 0.2 ? '#FFF2D6' : '#E0D6C5'} stroke="#A67A43" stroke-width="2" />
                  <rect x="1015" y="364" width="10" height="20" fill="#A67A43" />
                </g>
              )}

              {/* Info text stamp */}
              <text x="40" y="640" font-family="'IBM Plex Mono', monospace" font-size="12" fill="#8C7D6F" letter-spacing="2">
                ORIEL HOUSE PLAYGROUND // {currentSettings.label}
              </text>
            </svg>
          </div>

          {/* Action Row: Save Scene & Shop Room */}
          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--butter)' }}>
              {currentSettings.label}
            </span>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleSaveScene}
                className="btn-outline"
                style={{ padding: '12px 24px', fontSize: '11px', color: '#F7F2E8', borderColor: 'rgba(247, 242, 232, 0.3)' }}
              >
                {savedMessage ? <Check size={14} color="#E9C978" /> : <Share2 size={14} />}
                <span>{savedMessage ? 'ROOM SCENE SAVED' : 'SAVE ROOM'}</span>
              </button>

              <Link
                to="/shop"
                className="btn-primary"
                style={{ backgroundColor: 'var(--butter)', color: '#1E1C1A', borderColor: 'var(--butter)', padding: '12px 24px' }}
              >
                <ShoppingBag size={14} />
                <span>SHOP THIS ROOM &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
