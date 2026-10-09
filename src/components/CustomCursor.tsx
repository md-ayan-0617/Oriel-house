import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useStore } from '../store/useStore';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const { cursorText, cursorMode, theme } = useStore();

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const halo = haloRef.current;
    const text = textRef.current;
    if (!dot || !halo) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Instant dot update
      gsap.set(dot, { x: mouseX, y: mouseY });
      if (text) {
        gsap.set(text, { x: mouseX, y: mouseY + 26 });
      }

      // Smooth trailing halo
      gsap.to(halo, {
        x: mouseX,
        y: mouseY,
        duration: 0.35,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  // Adapt halo scale and color based on cursor mode
  const isDarkTheme = theme === 'evening' || theme === 'midnight';
  const hasText = Boolean(cursorText);

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{
          backgroundColor: isDarkTheme ? '#FFE0A3' : '#873B35',
          opacity: hasText ? 0 : 1
        }}
      />
      <div
        ref={haloRef}
        className="custom-cursor-halo"
        style={{
          width: hasText ? '64px' : '36px',
          height: hasText ? '64px' : '36px',
          borderColor: isDarkTheme ? 'rgba(255, 224, 163, 0.45)' : 'rgba(135, 59, 53, 0.35)',
          background: isDarkTheme
            ? 'radial-gradient(circle, rgba(255, 224, 163, 0.35) 0%, rgba(255, 224, 163, 0) 70%)'
            : 'radial-gradient(circle, rgba(233, 201, 120, 0.4) 0%, rgba(233, 201, 120, 0) 70%)'
        }}
      />
      {cursorText && (
        <div ref={textRef} className="custom-cursor-text">
          {cursorText}
        </div>
      )}
    </>
  );
};
