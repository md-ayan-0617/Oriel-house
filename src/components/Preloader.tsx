import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress 0 to 100
    const obj = { count: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        // Zoom-in light expansion transition
        gsap.to('.preloader-container', {
          opacity: 0,
          scale: 1.08,
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete
        });
      }
    });

    tl.to(obj, {
      count: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        setProgress(Math.round(obj.count));
      }
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  // Brightness factor from progress
  const glowOpacity = Math.max(0, (progress - 20) / 80);
  const roomVisibility = Math.max(0, (progress - 50) / 50);

  return (
    <div
      className="preloader-container"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#0F131C', // deep evening blue
        color: '#F7F2E8',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Background Room Atmosphere revealing at 60-100% */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: roomVisibility * 0.4,
          background: 'radial-gradient(circle at 50% 50%, #26344A 0%, #0F131C 75%)',
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none'
        }}
      />

      {/* Radiant warm light pool expanding as lamp turns on */}
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #FFE0A3 0%, rgba(244, 185, 104, 0.4) 40%, rgba(135, 59, 53, 0) 70%)',
          opacity: glowOpacity * 0.85,
          filter: 'blur(50px)',
          pointerEvents: 'none',
          transform: `scale(${0.6 + (progress / 100) * 0.6})`,
          transition: 'transform 0.2s ease, opacity 0.2s ease'
        }}
      />

      {/* Center Table Lamp Architectural SVG Outline */}
      <div style={{ position: 'relative', width: '220px', height: '260px', zIndex: 2 }}>
        <svg viewBox="0 0 200 240" width="100%" height="100%">
          {/* Base */}
          <rect
            x="70"
            y="200"
            width="60"
            height="18"
            rx="4"
            fill={progress > 60 ? '#8A6836' : '#2A2420'}
            stroke="#D7CDBD"
            strokeWidth="1.5"
            opacity={0.4 + (progress / 100) * 0.6}
          />
          {/* Stem */}
          <line
            x1="100"
            y1="200"
            x2="100"
            y2="120"
            stroke={progress > 50 ? '#C59B58' : '#4E433C'}
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Lamp Dome Shade */}
          <path
            d="M 40 120 C 40 60 70 45 100 45 C 130 45 160 60 160 120 Z"
            fill={glowOpacity > 0 ? `rgba(255, 244, 219, ${0.1 + glowOpacity * 0.9})` : 'none'}
            stroke="#D7CDBD"
            strokeWidth="2"
            style={{
              filter: glowOpacity > 0.4 ? 'drop-shadow(0 0 25px #FFE0A3)' : 'none',
              transition: 'all 0.3s ease'
            }}
          />
          {/* Finial Cap */}
          <circle cx="100" cy="42" r="5" fill="#E9C978" opacity={0.6 + (progress / 100) * 0.4} />
        </svg>
      </div>

      {/* Meta Text below lamp */}
      <div
        style={{
          marginTop: '36px',
          textAlign: 'center',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <span
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: '18px',
            letterSpacing: '0.15em',
            color: '#F7F2E8',
            opacity: 0.9
          }}
        >
          ORIEL HOUSE
        </span>
        <span
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.2em',
            color: '#91A8BB',
            textTransform: 'uppercase'
          }}
        >
          LOADING THE ROOM
        </span>
        <span
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '13px',
            fontWeight: 500,
            color: '#E9C978',
            letterSpacing: '0.1em'
          }}
        >
          {String(progress).padStart(2, '0')}%
        </span>
      </div>
    </div>
  );
};
