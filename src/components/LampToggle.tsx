import React from 'react';
import { useStore } from '../store/useStore';

interface LampToggleProps {
  isOn: boolean;
  onToggle: (state: boolean) => void;
  label?: string;
}

export const LampToggle: React.FC<LampToggleProps> = ({
  isOn,
  onToggle,
  label = 'LIGHT'
}) => {
  const { setCursor, resetCursor } = useStore();

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        userSelect: 'none'
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--text-current)',
          opacity: 0.8
        }}
      >
        {label}
      </span>

      <button
        type="button"
        role="switch"
        aria-checked={isOn}
        onClick={() => onToggle(!isOn)}
        onMouseEnter={() => setCursor(isOn ? 'TURN OFF' : 'TURN ON', 'light')}
        onMouseLeave={resetCursor}
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '68px',
          height: '32px',
          padding: '3px',
          border: '1px solid var(--text-current)',
          backgroundColor: isOn ? '#1E1C1A' : 'transparent',
          position: 'relative',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
      >
        {/* Toggle Slide Block */}
        <div
          style={{
            width: '28px',
            height: '24px',
            backgroundColor: isOn ? '#E9C978' : 'var(--text-current)',
            transform: isOn ? 'translateX(32px)' : 'translateX(0)',
            transition: 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isOn ? '#1E1C1A' : 'var(--bg-current)',
            fontSize: '9px',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700
          }}
        >
          {isOn ? 'ON' : 'OFF'}
        </div>
      </button>
    </div>
  );
};
