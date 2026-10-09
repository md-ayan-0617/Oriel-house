import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';

export const NotFound: React.FC = () => {
  const [isLit, setIsLit] = useState(false);
  const { setCursor, resetCursor } = useStore();

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: isLit ? '#1D1714' : '#0B0908',
        color: '#F7F2E8',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        textAlign: 'center',
        overflow: 'hidden',
        transition: 'background-color 0.8s cubic-bezier(0.25, 1, 0.5, 1)'
      }}
    >
      {/* Lamp Glow Pool when lit */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '580px',
          height: '580px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 224, 163, 0.4) 0%, rgba(244, 185, 104, 0.15) 45%, transparent 70%)',
          filter: 'blur(50px)',
          opacity: isLit ? 1 : 0.05,
          pointerEvents: 'none',
          transition: 'opacity 0.8s ease'
        }}
      />

      {/* Center Lamp Outline */}
      <div
        style={{
          position: 'relative',
          width: '120px',
          height: '140px',
          marginBottom: '32px',
          cursor: 'pointer'
        }}
        onClick={() => setIsLit(!isLit)}
        onMouseEnter={() => setCursor(isLit ? 'OFF' : 'ON', 'light')}
        onMouseLeave={resetCursor}
      >
        <svg viewBox="0 0 100 120" width="100%" height="100%">
          <rect x="35" y="100" width="30" height="10" fill={isLit ? '#A67A43' : '#2A201A'} />
          <line x1="50" y1="100" x2="50" y2="60" stroke={isLit ? '#D4A35B' : '#3D2F27'} strokeWidth="3" />
          <path
            d="M 20 60 C 20 30 35 22 50 22 C 65 22 80 30 80 60 Z"
            fill={isLit ? '#FFF4D6' : '#1C1512'}
            stroke={isLit ? '#E9C978' : '#3D2F27'}
            strokeWidth="2"
            style={{ filter: isLit ? 'drop-shadow(0 0 15px #FFE0A3)' : 'none' }}
          />
        </svg>
      </div>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '640px' }}>
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
          ROOM UNLIT // ERROR 404
        </span>

        <h1
          style={{
            fontFamily: 'var(--font-theater)',
            fontSize: 'clamp(48px, 8vw, 100px)',
            lineHeight: 0.95,
            marginBottom: '24px'
          }}
        >
          CAN'T<br />FIND THE<br />SWITCH.
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-personality)',
            fontSize: '18px',
            fontStyle: 'italic',
            color: '#D7CDBD',
            marginBottom: '36px'
          }}
        >
          The room you are trying to enter is currently in darkness.
        </p>

        {/* Small CTA: Turn the light on */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => setIsLit(!isLit)}
            className="btn-outline"
            style={{
              borderColor: isLit ? 'var(--butter)' : 'rgba(247, 242, 232, 0.3)',
              color: isLit ? 'var(--butter)' : '#F7F2E8',
              padding: '14px 28px'
            }}
          >
            <Sparkles size={15} />
            <span>{isLit ? 'LIGHT IS ACTIVE' : 'TURN THE LIGHT ON'}</span>
          </button>

          {/* Secondary CTA: Back Home */}
          <Link
            to="/"
            className="btn-primary"
            style={{
              backgroundColor: 'var(--butter)',
              color: '#1E1C1A',
              borderColor: 'var(--butter)',
              padding: '14px 28px'
            }}
          >
            <span>BACK TO THE HOUSE &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
