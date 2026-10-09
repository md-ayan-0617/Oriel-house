import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Moon, Globe } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useFooterLight } from '../hooks/useGsapAnimations';

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const { region, setRegion, setCursor, resetCursor } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [localTime, setLocalTime] = useState('');

  useFooterLight(footerRef);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setLocalTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer
      ref={footerRef}
      style={{
        position: 'relative',
        backgroundColor: '#121620', // deep midnight blue
        color: '#F7F2E8',
        padding: 'clamp(64px, 10vw, 120px) 0 40px 0',
        overflow: 'hidden'
      }}
    >
      {/* Virtual Lamp Illuminating Footer as user scrolls */}
      <div
        className="footer-lamp-glow"
        style={{
          position: 'absolute',
          top: '-10%',
          right: '15%',
          width: '720px',
          height: '720px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 223, 163, 0.45) 0%, rgba(244, 185, 104, 0.15) 45%, transparent 75%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        {/* HUGE WORDMARK */}
        <div style={{ marginBottom: 'clamp(48px, 8vw, 84px)' }}>
          <span
            style={{
              fontFamily: 'var(--font-theater)',
              fontSize: 'clamp(68px, 14vw, 210px)',
              lineHeight: 0.88,
              letterSpacing: '-0.03em',
              color: '#F7F2E8',
              display: 'block'
            }}
          >
            ORIEL
          </span>
          <span
            style={{
              fontFamily: 'var(--font-theater)',
              fontSize: 'clamp(68px, 14vw, 210px)',
              lineHeight: 0.88,
              letterSpacing: '-0.03em',
              color: '#F7F2E8',
              display: 'block'
            }}
          >
            HOUSE.
          </span>
        </div>

        {/* Mid Row: Newsletter & Grouped Links */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'clamp(32px, 5vw, 64px)',
            marginBottom: 'clamp(60px, 8vw, 96px)'
          }}
        >
          {/* Newsletter: The Evening Post */}
          <div style={{ gridColumn: 'span 2' }} className="newsletter-box">
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.2em',
                color: '#E9C978',
                display: 'block',
                marginBottom: '10px'
              }}
            >
              STUDIO CIRCULAR
            </span>
            <h4 style={{ fontFamily: 'var(--font-personality)', fontSize: '28px', lineHeight: 1.2 }}>
              The Evening Post.
            </h4>
            <p style={{ fontSize: '14px', color: '#AAA092', marginTop: '6px', maxWidth: '360px' }}>
              New fixtures, documentary studio notes, and domestic rooms worth seeing. Published monthly at dusk.
            </p>

            <form onSubmit={handleSubscribe} style={{ marginTop: '20px', maxWidth: '420px' }}>
              <div style={{ display: 'flex', borderBottom: '1px solid rgba(247, 242, 232, 0.3)' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#F7F2E8',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '14px',
                    padding: '12px 0',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#E9C978',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    padding: '0 8px'
                  }}
                  onMouseEnter={() => setCursor('SEND', 'enter')}
                  onMouseLeave={resetCursor}
                >
                  <span>SUBSCRIBE</span>
                  <ArrowRight size={14} />
                </button>
              </div>
              {subscribed && (
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#E9C978', display: 'block', marginTop: '8px' }}>
                  ✓ You have been entered into the Evening Post roll.
                </span>
              )}
            </form>
          </div>

          {/* Group 1: SHOP */}
          <div className="footer-link-group">
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.15em',
                color: '#AAA092',
                display: 'block',
                marginBottom: '16px'
              }}
            >
              SHOP
            </span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <li><Link to="/shop">All Lighting</Link></li>
              <li><Link to="/shop/sconces">Wall Sconces</Link></li>
              <li><Link to="/shop/pendants">Pendants</Link></li>
              <li><Link to="/shop/table">Table Lamps</Link></li>
              <li><Link to="/shop/floor">Floor Lamps</Link></li>
              <li><Link to="/shop/ceiling">Ceiling &amp; Mobiles</Link></li>
            </ul>
          </div>

          {/* Group 2: DISCOVER */}
          <div className="footer-link-group">
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.15em',
                color: '#AAA092',
                display: 'block',
                marginBottom: '16px'
              }}
            >
              DISCOVER
            </span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <li><Link to="/collections">Collections</Link></li>
              <li><Link to="/rooms">Shop by Room</Link></li>
              <li><Link to="/play">Interactive Room</Link></li>
              <li><Link to="/materials">Materials &amp; Finishes</Link></li>
              <li><Link to="/journal">Editorial Journal</Link></li>
              <li><Link to="/about">About Studio</Link></li>
            </ul>
          </div>

          {/* Group 3: PROFESSIONAL & CARE */}
          <div className="footer-link-group">
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.15em',
                color: '#AAA092',
                display: 'block',
                marginBottom: '16px'
              }}
            >
              PROFESSIONAL
            </span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <li><Link to="/trade">Trade Program</Link></li>
              <li><Link to="/trade/projects">Project Gallery</Link></li>
              <li><Link to="/trade/apply">Trade Application</Link></li>
              <li><Link to="/contact">Contact Atelier</Link></li>
              <li><a href="#installation" onClick={(e) => { e.preventDefault(); alert('Installation specifications and BIM downloads available under Trade portal.'); }}>Installation Guides</a></li>
              <li><a href="#care" onClick={(e) => { e.preventDefault(); alert('Brass and plaster care guide: Clean with soft goat-hair brush; living brass will naturally patina.'); }}>Material Care</a></li>
            </ul>
          </div>
        </div>

        {/* BOTTOM METADATA & REGION SELECTOR */}
        <div
          style={{
            paddingTop: '32px',
            borderTop: '1px solid rgba(247, 242, 232, 0.1)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            fontSize: '12px',
            color: '#8A8276'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <span>&copy; 2026 ORIEL HOUSE. All rights reserved.</span>
            <Link to="/about">Privacy</Link>
            <Link to="/about">Terms</Link>
            <Link to="/about">Accessibility</Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Live studio clock */}
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#E9C978' }}>
              LIGHTS ACTIVE // {localTime || '22:45'}
            </span>

            {/* Currency Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Globe size={13} />
              {(['USD', 'EUR', 'GBP'] as const).map((reg) => (
                <button
                  key={reg}
                  onClick={() => setRegion(reg)}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: region === reg ? 700 : 400,
                    color: region === reg ? '#F7F2E8' : '#6A645C',
                    padding: '2px 4px'
                  }}
                >
                  {reg}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
