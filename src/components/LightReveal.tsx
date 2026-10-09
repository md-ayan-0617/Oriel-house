import React, { useState, useRef } from 'react';

interface LightRevealProps {
  dayImage: string;
  nightImage: string;
  alt: string;
  aspectRatio?: string;
  initialLit?: boolean;
}

export const LightReveal: React.FC<LightRevealProps> = ({
  dayImage,
  nightImage,
  alt,
  aspectRatio = '16/9',
  initialLit = false
}) => {
  const [sliderPos, setSliderPos] = useState(initialLit ? 100 : 0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handlePointerMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPos(percent);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    handlePointerMove(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handlePointerMove(e.clientX);
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handlePointerMove(e.touches[0].clientX);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchMove={onTouchMove}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio,
        overflow: 'hidden',
        userSelect: 'none',
        cursor: 'ew-resize'
      }}
    >
      {/* 1. Underlying Night / Lit Image */}
      <img
        src={nightImage}
        alt={`${alt} lit after dark`}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />

      {/* 2. Overlying Day Image clipped according to sliderPos */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          clipPath: `polygon(0 0, ${100 - sliderPos}% 0, ${100 - sliderPos}% 100%, 0 100%)`,
          transition: isDragging.current ? 'none' : 'clip-path 0.15s ease'
        }}
      >
        <img
          src={dayImage}
          alt={`${alt} daylight`}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>

      {/* 3. Divider Line & Tactile Dimmer Knob */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${100 - sliderPos}%`,
          width: '2px',
          backgroundColor: '#FFE0A3',
          boxShadow: '0 0 12px rgba(255, 224, 163, 0.8)',
          pointerEvents: 'none',
          transform: 'translateX(-50%)',
          transition: isDragging.current ? 'none' : 'left 0.15s ease'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#1E1C1A',
            border: '2px solid #FFE0A3',
            boxShadow: '0 0 15px rgba(244, 185, 104, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFE0A3',
            fontSize: '9px',
            fontFamily: 'var(--font-mono)',
            fontWeight: 600
          }}
        >
          {sliderPos > 50 ? 'NIGHT' : 'DAY'}
        </div>
      </div>

      {/* Subtle Bottom Badges */}
      <div
        style={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          letterSpacing: '0.15em',
          color: '#1E1C1A',
          backgroundColor: 'rgba(247, 242, 232, 0.75)',
          padding: '4px 8px',
          pointerEvents: 'none'
        }}
      >
        DAYLIGHT 15:30
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          letterSpacing: '0.15em',
          color: '#FFE0A3',
          backgroundColor: 'rgba(20, 18, 16, 0.75)',
          padding: '4px 8px',
          pointerEvents: 'none'
        }}
      >
        DUSK 22:45
      </div>
    </div>
  );
};
