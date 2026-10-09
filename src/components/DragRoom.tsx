import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { Copy, Check, Sparkles, Moon, Sun, Sliders } from 'lucide-react';
import { useStore } from '../store/useStore';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Draggable);
}

type MoodType = 'DINNER' | 'READING' | 'COCKTAILS' | 'QUIET';

interface ZoneSlot {
  id: string;
  name: string;
  type: 'ceiling' | 'wall' | 'table' | 'floor' | 'center';
  x: number; // percentage
  y: number; // percentage
  allowedItems: string[];
}

const ZONES: ZoneSlot[] = [
  { id: 'zone-ceiling', name: 'Overhead Ceiling', type: 'ceiling', x: 50, y: 18, allowedItems: ['bellamy'] },
  { id: 'zone-wall', name: 'Left Plaster Wall', type: 'wall', x: 22, y: 35, allowedItems: ['esme'] },
  { id: 'zone-table', name: 'Dining Table Center', type: 'table', x: 50, y: 58, allowedItems: ['lucien', 'margo'] },
  { id: 'zone-sideboard', name: 'Credenza Surface', type: 'table', x: 78, y: 52, allowedItems: ['margo', 'isla'] },
  { id: 'zone-corner', name: 'Reading Corner', type: 'floor', x: 86, y: 72, allowedItems: ['eleanor'] }
];

export const DragRoom: React.FC = () => {
  const [mood, setMood] = useState<MoodType>('DINNER');
  const [placements, setPlacements] = useState<{ [itemId: string]: string }>({
    bellamy: 'zone-ceiling',
    esme: 'zone-wall',
    lucien: 'zone-table',
    margo: 'zone-sideboard',
    eleanor: 'zone-corner'
  });
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { setCursor, resetCursor } = useStore();

  // Mood configuration: lighting contribution and intensities
  const getMoodLighting = () => {
    switch (mood) {
      case 'DINNER':
        return {
          ambientBg: '#211815',
          pendantGlow: 0.85,
          sconceGlow: 0.5,
          candleGlow: 0.95,
          tableGlow: 0.3,
          floorGlow: 0.1,
          warmth: '#FFE2A8',
          note: 'Pendant casts warm 60% pool over linen; candles active; perimeter rests in soft dusk.'
        };
      case 'READING':
        return {
          ambientBg: '#181412',
          pendantGlow: 0.15,
          sconceGlow: 0.25,
          candleGlow: 0.1,
          tableGlow: 0.6,
          floorGlow: 1.0,
          warmth: '#FFDFA3',
          note: 'Eleanor floor fixture at 100% focused reading pool; ambient down to 20%.'
        };
      case 'COCKTAILS':
        return {
          ambientBg: '#281E19',
          pendantGlow: 0.45,
          sconceGlow: 0.75,
          candleGlow: 0.8,
          tableGlow: 0.85,
          floorGlow: 0.35,
          warmth: '#F4B968',
          note: 'Margo table lamp and wall sconces active; long dramatic grazing shadows across walls.'
        };
      case 'QUIET':
        return {
          ambientBg: '#14100E',
          pendantGlow: 0.05,
          sconceGlow: 0.2,
          candleGlow: 1.0,
          tableGlow: 0.3,
          floorGlow: 0.1,
          warmth: '#F4B968',
          note: 'Single flickering candle point and whisper glow on credenza; total domestic stillness.'
        };
    }
  };

  const lighting = getMoodLighting();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: lighting.ambientBg,
        color: '#F7F2E8',
        padding: 'clamp(32px, 5vw, 64px) clamp(20px, 4vw, 48px)',
        borderRadius: '2px',
        overflow: 'hidden',
        transition: 'background-color 0.8s ease'
      }}
    >
      {/* Header Info */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '36px', gap: '20px' }}>
        <div>
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
            INTERACTIVE DOMESTIC THEATRE
          </span>
          <h3 style={{ fontFamily: 'var(--font-theater)', fontSize: 'clamp(36px, 5vw, 60px)', lineHeight: 1 }}>
            Set The Room.
          </h3>
          <p style={{ fontFamily: 'var(--font-personality)', fontSize: '18px', fontStyle: 'italic', color: '#D7CDBD', marginTop: '6px' }}>
            Dinner starts in twenty minutes. Adjust the lighting scene.
          </p>
        </div>

        {/* Mood Selector Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {(['DINNER', 'READING', 'COCKTAILS', 'QUIET'] as MoodType[]).map((m) => (
            <button
              key={m}
              onClick={() => setMood(m)}
              style={{
                padding: '10px 18px',
                border: mood === m ? '1px solid var(--butter)' : '1px solid rgba(247, 242, 232, 0.2)',
                backgroundColor: mood === m ? 'var(--butter)' : 'rgba(30, 28, 26, 0.4)',
                color: mood === m ? '#1E1C1A' : '#F7F2E8',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={() => setCursor(`MOOD: ${m}`, 'light')}
              onMouseLeave={resetCursor}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Stylized Room Stage Visualizer */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          maxHeight: '620px',
          minHeight: '380px',
          backgroundColor: '#191513',
          border: '1px solid rgba(247, 242, 232, 0.15)',
          overflow: 'hidden'
        }}
      >
        {/* Parquet Floor Horizon */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '42%',
            backgroundColor: '#110D0B',
            borderTop: '1px solid rgba(247, 242, 232, 0.1)'
          }}
        />

        {/* Wall Plaster Texture Background */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '58%',
            background: 'linear-gradient(to bottom, #201A17 0%, #171311 100%)'
          }}
        />

        {/* Central Dining Table & Chairs Silhouette */}
        <div
          style={{
            position: 'absolute',
            bottom: '22%',
            left: '32%',
            right: '32%',
            height: '18%',
            backgroundColor: '#271F1B',
            borderRadius: '4px',
            border: '1px solid rgba(247, 242, 232, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Tablecloth Runner */}
          <div style={{ width: '80%', height: '8px', backgroundColor: '#E0D6C5', opacity: 0.3, borderRadius: '2px' }} />
        </div>

        {/* Credenza on Right */}
        <div
          style={{
            position: 'absolute',
            bottom: '28%',
            right: '12%',
            width: '16%',
            height: '14%',
            backgroundColor: '#221915',
            border: '1px solid rgba(247, 242, 232, 0.08)'
          }}
        />

        {/* Left Wall Sconce Light Glow (ESME) */}
        {placements.esme && (
          <div
            style={{
              position: 'absolute',
              left: '22%',
              top: '35%',
              transform: 'translate(-50%, -50%)',
              zIndex: 3
            }}
          >
            {/* Ambient Wall Wash */}
            <div
              style={{
                position: 'absolute',
                width: '260px',
                height: '260px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${lighting.warmth} 0%, rgba(244, 185, 104, 0.4) 40%, transparent 70%)`,
                transform: 'translate(-50%, -50%)',
                opacity: lighting.sconceGlow,
                filter: 'blur(30px)',
                pointerEvents: 'none',
                transition: 'opacity 0.6s ease'
              }}
            />
            {/* Sconce Icon Object */}
            <div
              style={{
                position: 'relative',
                width: '28px',
                height: '60px',
                backgroundColor: '#ECE5DA',
                border: '2px solid #A67A43',
                borderRadius: '14px',
                boxShadow: lighting.sconceGlow > 0.3 ? '0 0 20px #FFE0A3' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Esme Sconce"
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#A67A43' }} />
            </div>
            <span style={{ position: 'absolute', top: '70px', left: '-20px', fontSize: '9px', fontFamily: 'var(--font-mono)', color: '#D7CDBD', whiteSpace: 'nowrap' }}>
              ESME (WALL)
            </span>
          </div>
        )}

        {/* Ceiling Pendant Light Cone (BELLAMY) */}
        {placements.bellamy && (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '18%',
              transform: 'translate(-50%, 0)',
              zIndex: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            {/* Cord Drop */}
            <div style={{ width: '2px', height: '60px', backgroundColor: '#A67A43' }} />
            {/* Shade */}
            <div
              style={{
                width: '64px',
                height: '24px',
                backgroundColor: '#F5D38A',
                borderRadius: '4px 4px 12px 12px',
                border: '1px solid #FFE0A3',
                boxShadow: lighting.pendantGlow > 0.3 ? '0 0 25px #FFE0A3' : 'none'
              }}
              title="Bellamy Pendant"
            />
            {/* Luminous Table Cone */}
            <div
              style={{
                position: 'absolute',
                top: '74px',
                width: '420px',
                height: '320px',
                background: `radial-gradient(ellipse at 50% 20%, ${lighting.warmth} 0%, rgba(244, 185, 104, 0.4) 45%, transparent 75%)`,
                opacity: lighting.pendantGlow * 0.85,
                filter: 'blur(35px)',
                pointerEvents: 'none',
                transition: 'opacity 0.6s ease'
              }}
            />
            <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: '#D7CDBD', marginTop: '4px' }}>
              BELLAMY (PENDANT)
            </span>
          </div>
        )}

        {/* Table Center Candle (LUCIEN) */}
        {placements.lucien && (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '64%',
              transform: 'translate(-50%, -50%)',
              zIndex: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            {/* Flickering Flame Aura */}
            <div
              style={{
                position: 'absolute',
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #FFE0A3 0%, rgba(244, 185, 104, 0.5) 40%, transparent 70%)',
                opacity: lighting.candleGlow * 0.9,
                filter: 'blur(16px)',
                pointerEvents: 'none',
                transition: 'opacity 0.6s ease'
              }}
            />
            {/* Candle Object */}
            <div
              style={{
                width: '18px',
                height: '24px',
                backgroundColor: '#3A271E',
                border: '1px solid #5E4032',
                borderRadius: '2px',
                display: 'flex',
                justifyContent: 'center',
                position: 'relative'
              }}
              title="Lucien Candle"
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-10px',
                  width: '6px',
                  height: '10px',
                  backgroundColor: '#FFEBBF',
                  borderRadius: '50% 50% 30% 30%',
                  boxShadow: '0 0 10px #FFDFA3'
                }}
              />
            </div>
            <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: '#D7CDBD', marginTop: '4px' }}>
              LUCIEN (CANDLE)
            </span>
          </div>
        )}

        {/* Credenza Table Lamp (MARGO) */}
        {placements.margo && (
          <div
            style={{
              position: 'absolute',
              right: '18%',
              top: '56%',
              transform: 'translate(50%, -50%)',
              zIndex: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            {/* Radial Glow */}
            <div
              style={{
                position: 'absolute',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${lighting.warmth} 0%, rgba(244, 185, 104, 0.35) 45%, transparent 70%)`,
                opacity: lighting.tableGlow,
                filter: 'blur(22px)',
                pointerEvents: 'none',
                transition: 'opacity 0.6s ease'
              }}
            />
            <div
              style={{
                width: '32px',
                height: '38px',
                backgroundColor: '#EDE6DA',
                borderRadius: '16px 16px 2px 2px',
                border: '1.5px solid #A67A43',
                boxShadow: lighting.tableGlow > 0.3 ? '0 0 18px #FFE0A3' : 'none'
              }}
              title="Margo Table Lamp"
            />
            <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: '#D7CDBD', marginTop: '4px' }}>
              MARGO (CREDENZA)
            </span>
          </div>
        )}

        {/* Corner Floor Lamp (ELEANOR) */}
        {placements.eleanor && (
          <div
            style={{
              position: 'absolute',
              right: '8%',
              bottom: '12%',
              transform: 'translate(50%, 0)',
              zIndex: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            {/* Reading Pool Glow */}
            <div
              style={{
                position: 'absolute',
                top: '-40px',
                width: '240px',
                height: '240px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${lighting.warmth} 0%, rgba(244, 185, 104, 0.4) 40%, transparent 70%)`,
                opacity: lighting.floorGlow,
                filter: 'blur(25px)',
                pointerEvents: 'none',
                transition: 'opacity 0.6s ease'
              }}
            />
            <div style={{ width: '4px', height: '120px', backgroundColor: '#A67A43', transform: 'rotate(-8deg)' }} />
            <div style={{ width: '28px', height: '14px', backgroundColor: '#EDE6DA', borderRadius: '4px 4px 10px 10px' }} />
            <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: '#D7CDBD', marginTop: '6px' }}>
              ELEANOR (CORNER)
            </span>
          </div>
        )}
      </div>

      {/* Atmospheric Note & Save Room Controls */}
      <div
        style={{
          marginTop: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-personality)',
            fontSize: '15px',
            color: 'var(--butter)',
            maxWidth: '600px',
            lineHeight: 1.4
          }}
        >
          &ldquo;{lighting.note}&rdquo;
        </p>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handleCopyLink}
            className="btn-outline"
            style={{
              padding: '10px 20px',
              fontSize: '11px',
              color: '#F7F2E8',
              borderColor: 'rgba(247, 242, 232, 0.3)',
              display: 'inline-flex',
              gap: '8px'
            }}
          >
            {copied ? <Check size={14} color="#E9C978" /> : <Copy size={14} />}
            <span>{copied ? 'ROOM SCENE COPIED' : 'SHARE THIS SCENE'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
