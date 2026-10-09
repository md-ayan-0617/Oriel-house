import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Moon, 
  Sun, 
  Compass, 
  Eye, 
  Check, 
  SlidersHorizontal, 
  Layers, 
  Download 
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from '../store/useStore';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { MATERIALS } from '../data/materials';
import { JOURNAL_ARTICLES } from '../data/journal';
import { DragRoom } from '../components/DragRoom';
import { TypingText } from '../components/TypingText';
import { LightCanvas } from '../components/three/LightCanvas';
import { LightReveal } from '../components/LightReveal';
import { useThemeShift } from '../hooks/useGsapAnimations';

gsap.registerPlugin(ScrollTrigger);

export const Home: React.FC = () => {
  const { setTheme, setCursor, resetCursor, formatPrice, addToBag } = useStore();
  const [isHeroLit, setIsHeroLit] = useState(false);
  const [activeMaterial, setActiveMaterial] = useState(MATERIALS[0]);
  const [materialLightMode, setMaterialLightMode] = useState<'day' | 'warm' | 'candle'>('warm');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [activeQuickProduct, setActiveQuickProduct] = useState<any | null>(null);
  
  // Domestic Scene Live HUD Tracker state
  const [domesticScene, setDomesticScene] = useState({
    sceneNo: '01',
    room: 'ROOM 01',
    time: '17:42',
    label: 'AFTERNOON PAVILION',
    ambient: '100%'
  });

  // Section Refs for GSAP
  const homeContainerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroNightImgRef = useRef<HTMLImageElement>(null);
  const heroHeadlineRef = useRef<HTMLDivElement>(null);
  const horizontalSectionRef = useRef<HTMLElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const wallLightsRef = useRef<HTMLElement>(null);
  const materialsRef = useRef<HTMLElement>(null);
  const closingRef = useRef<HTMLElement>(null);

  // Set initial and reactive themes
  useThemeShift(heroRef, 'afternoon', setTheme);
  useThemeShift(wallLightsRef, 'evening', setTheme);
  useThemeShift(materialsRef, 'golden', setTheme);
  useThemeShift(closingRef, 'midnight', setTheme);

  const signatureCharacters = PRODUCTS.slice(0, 6);
  const bestsellers = PRODUCTS.slice(0, 5);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Headline Parallax Depth
      if (heroHeadlineRef.current && heroRef.current) {
        gsap.to(heroHeadlineRef.current, {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
      }

      // 2. Day-to-Dusk Scroll scrub on Hero
      if (heroNightImgRef.current && heroRef.current && !isHeroLit) {
        gsap.to(heroNightImgRef.current, {
          opacity: 0.85,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '90% top',
            scrub: true
          }
        });
      }

      // 3. Pinned Horizontal Scroll Showcase for "The House Guests"
      if (horizontalSectionRef.current && horizontalTrackRef.current) {
        const track = horizontalTrackRef.current;
        const scrollAmount = track.scrollWidth - window.innerWidth + 120;
        
        gsap.to(track, {
          x: () => -scrollAmount,
          ease: 'none',
          scrollTrigger: {
            trigger: horizontalSectionRef.current,
            start: 'top top',
            end: () => `+=${scrollAmount * 1.2}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        });
      }

      // 4. Doorway clip-path reveal on Wall Lights
      const wallReveal = document.querySelector('.wall-lights-reveal');
      if (wallReveal && wallLightsRef.current) {
        gsap.fromTo(
          wallReveal,
          { clipPath: 'inset(10% 6% 10% 6%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'none',
            scrollTrigger: {
              trigger: wallLightsRef.current,
              start: 'top bottom',
              end: 'center center',
              scrub: true
            }
          }
        );
      }

      // 5. Scroll-linked Domestic Scene tracker
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const p = self.progress;
          if (p < 0.16) {
            setDomesticScene({ sceneNo: '01', room: 'ROOM 01', time: '17:42', label: 'AFTERNOON PAVILION', ambient: '100%' });
          } else if (p < 0.35) {
            setDomesticScene({ sceneNo: '02', room: 'ROOM 02', time: '19:15', label: 'THE DRAMATIS GALLERY', ambient: '78%' });
          } else if (p < 0.55) {
            setDomesticScene({ sceneNo: '03', room: 'ROOM 03', time: '20:30', label: 'DINNER THEATRE STAGE', ambient: '52%' });
          } else if (p < 0.78) {
            setDomesticScene({ sceneNo: '04', room: 'ROOM 04', time: '22:15', label: 'MATERIAL FOUNDRY', ambient: '34%' });
          } else {
            setDomesticScene({ sceneNo: '05', room: 'ROOM 05', time: '00:42', label: 'MIDNIGHT RETREAT', ambient: '10%' });
          }
        }
      });
    }, homeContainerRef);

    return () => ctx.revert();
  }, [isHeroLit]);

  return (
    <div ref={homeContainerRef} style={{ position: 'relative' }}>
      {/* =====================================================
          HOME 01 — HERO (100svh)
          Late afternoon -> Dusk interior transformation
          ===================================================== */}
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'clamp(28px, 4vw, 56px) clamp(24px, 5vw, 72px)',
          overflow: 'hidden',
          backgroundColor: isHeroLit ? '#18161A' : '#EDE4D4',
          color: isHeroLit ? '#F7F2E8' : '#1E1C1A',
          transition: 'background-color 1.2s cubic-bezier(0.25, 1, 0.5, 1), color 1.2s ease'
        }}
      >
        {/* Layered Architectural Interior SVG Background (Day/Night pair) */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img
            src="/images/hero_room_day.svg"
            alt="Living room in natural daylight"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: isHeroLit ? 0 : 1,
              transition: 'opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          />
          <img
            ref={heroNightImgRef}
            src="/images/hero_room_night.svg"
            alt="Living room with sculptural lamp illuminated at dusk"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: isHeroLit ? 1 : 0,
              transition: 'opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          />
        </div>

        {/* Selective Three.js volumetric beams and floating dust motes */}
        <LightCanvas isLit={isHeroLit} />

        {/* Hero Top Meta */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#E9C978', display: 'inline-block', boxShadow: '0 0 8px #E9C978' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em' }}>
              ROOM 01 // 17:42
            </span>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em' }}>
            LIVING PAVILION
          </span>
        </div>

        {/* Hero Asymmetric Headline & Interactive Switch */}
        <div
          ref={heroHeadlineRef}
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '1180px',
            margin: 'auto 0'
          }}
        >
          <div style={{ marginBottom: '16px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.25em', color: isHeroLit ? '#E9C978' : 'var(--oxblood)' }}>
              DOMESTIC THEATRE // SCENE 01
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-theater)',
              fontSize: 'var(--text-hero)',
              lineHeight: 0.94,
              letterSpacing: '-0.025em',
              marginBottom: '28px',
              color: isHeroLit ? '#FFE9C2' : 'inherit',
              transition: 'color 1s ease'
            }}
          >
            THE ROOM<br />
            CHANGES<br />
            WHEN THE<br />
            LIGHT DOES.
          </h1>

          {/* Signature Interactive Trigger: TURN ON THE LIGHT */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setIsHeroLit(!isHeroLit)}
              className={isHeroLit ? 'btn-primary' : 'btn-outline'}
              style={{
                padding: '16px 36px',
                backgroundColor: isHeroLit ? '#E9C978' : 'rgba(247, 242, 232, 0.9)',
                color: '#1E1C1A',
                border: '1px solid #1E1C1A',
                boxShadow: isHeroLit ? '0 0 35px rgba(233, 201, 120, 0.6)' : 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={() => setCursor(isHeroLit ? 'TURN OFF' : 'TURN ON', 'light')}
              onMouseLeave={resetCursor}
            >
              <Sparkles size={16} />
              <span>{isHeroLit ? 'LIGHT IS ACTIVE • TURN OFF' : 'TURN ON THE LIGHT →'}</span>
            </button>

            <span
              style={{
                fontFamily: 'var(--font-personality)',
                fontSize: '18px',
                fontStyle: 'italic',
                opacity: 0.9
              }}
            >
              {isHeroLit ? 'Eleanor floor lamp casting 2700K golden halo over plaster.' : 'Click to turn on the lamp or scroll into the evening.'}
            </span>
          </div>
        </div>

        {/* Hero Bottom Meta Scroll Prompt */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end'
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em' }}>
            SCULPTURAL LIGHT / OBJECTS FOR ROOMS
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em' }}>
            SCROLL AFTER DARK ↓
          </span>
        </div>
      </section>

      {/* =====================================================
          HOME 02 — TYPING MANTRA STATEMENT (INTEGRATED EDITORIAL)
          "LIGHT FOR DINNER... READING... WAITING... LIVING."
          ===================================================== */}
      <section
        style={{
          padding: 'clamp(64px, 8vw, 110px) 0',
          backgroundColor: '#201A16',
          color: '#F7F2E8',
          borderTop: '1px solid rgba(247, 242, 232, 0.12)',
          borderBottom: '1px solid rgba(247, 242, 232, 0.12)',
          textAlign: 'center'
        }}
      >
        <div className="container-wide">
          <div style={{ marginBottom: '16px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.25em', color: '#E9C978' }}>
              THE EVENING CADENCE
            </span>
          </div>
          <TypingText />
          <p style={{ fontFamily: 'var(--font-personality)', fontSize: '18px', fontStyle: 'italic', color: '#D7CDBD', marginTop: '20px', maxWidth: '580px', margin: '20px auto 0 auto' }}>
            Light is not an appliance. It changes who gathers closer, where shadows pool, and how time is felt.
          </p>
        </div>
      </section>

      {/* =====================================================
          HOME 03 — BRAND MANIFESTO (SPLIT TEXT REVEAL)
          "WE MAKE LIGHTS FOR the hours you want to keep."
          ===================================================== */}
      <section
        style={{
          padding: 'clamp(80px, 12vw, 160px) 0',
          backgroundColor: 'var(--parchment)',
          color: 'var(--ink)'
        }}
      >
        <div className="container-wide">
          <div style={{ maxWidth: '1240px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.2em',
                color: 'var(--oxblood)',
                display: 'block',
                marginBottom: '24px'
              }}
            >
              STUDIO INTENTION // MANIFESTO
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-theater)',
                fontSize: 'var(--text-h1)',
                lineHeight: 1.02,
                letterSpacing: '-0.02em',
                marginBottom: '40px'
              }}
            >
              WE MAKE LIGHTS FOR{' '}
              <em style={{ fontFamily: 'var(--font-personality)', fontWeight: 400, color: 'var(--oxblood)' }}>
                the hours you want to keep.
              </em>
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 'clamp(24px, 4vw, 56px)',
                alignItems: 'start'
              }}
            >
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-lg)', lineHeight: 1.6, opacity: 0.9 }}>
                Sculptural lighting made slowly, in small studio runs, for rooms where life actually happens. The work sits between lighting design, sculpture, interior architecture, craft, and domestic ritual.
              </p>

              <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--espresso)', opacity: 0.85 }}>
                A lamp is not merely an appliance. It changes how a plaster wall breathes, where the eye travels when the sun drops below the sill, and who gathers closer around the table.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          HOME 04 — PINNED HORIZONTAL GALLERY: "THE HOUSE GUESTS"
          GSAP Scrubbed Horizontal Track through signature characters
          ===================================================== */}
      <section
        ref={horizontalSectionRef}
        style={{
          position: 'relative',
          backgroundColor: '#1C1815',
          color: '#F7F2E8',
          overflow: 'hidden',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px 0'
        }}
      >
        <div className="container-wide" style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.25em', color: '#E9C978' }}>
                DRAMATIS PERSONAE // HORIZONTAL SCENE
              </span>
              <h2 style={{ fontFamily: 'var(--font-theater)', fontSize: 'clamp(40px, 5.5vw, 76px)', lineHeight: 1, marginTop: '8px' }}>
                The House Guests.
              </h2>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#AAA092', letterSpacing: '0.15em' }}>
              SCROLL DOWN TO TRAVERSE THE ROOMS →
            </div>
          </div>
        </div>

        {/* Pinned Horizontal Track */}
        <div
          ref={horizontalTrackRef}
          style={{
            display: 'flex',
            gap: '36px',
            paddingLeft: 'clamp(24px, 5vw, 72px)',
            width: 'max-content',
            willChange: 'transform'
          }}
        >
          {signatureCharacters.map((product, idx) => (
            <div
              key={product.id}
              style={{
                width: 'clamp(320px, 28vw, 420px)',
                flexShrink: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(233, 201, 120, 0.18)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {/* Image Container with ON/OFF Hover Crossfade */}
                <Link
                  to={`/product/${product.slug}`}
                  style={{ display: 'block', position: 'relative', width: '100%', aspectRatio: '1/1', overflow: 'hidden', backgroundColor: '#130F0D' }}
                  onMouseEnter={() => setCursor('LIGHT', 'light')}
                  onMouseLeave={resetCursor}
                >
                  <img
                    src={product.offImage}
                    alt={product.name}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'opacity 0.6s ease'
                    }}
                    className="fixture-off-img"
                  />
                  <img
                    src={product.onImage}
                    alt={`${product.name} lit`}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: 0,
                      transition: 'opacity 0.6s ease'
                    }}
                    className="fixture-on-img"
                  />
                </Link>

                <div style={{ marginTop: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#E9C978', letterSpacing: '0.15em' }}>
                    <span>GUEST 0{idx + 1}</span>
                    <span>{product.category.toUpperCase()}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-theater)', fontSize: '28px', marginTop: '6px' }}>
                    <Link to={`/product/${product.slug}`} style={{ color: '#F7F2E8' }}>
                      {product.name}
                    </Link>
                  </h3>
                  <p style={{ fontFamily: 'var(--font-personality)', fontStyle: 'italic', fontSize: '15px', color: '#D7CDBD', marginTop: '4px' }}>
                    &ldquo;{product.subtitle}&rdquo;
                  </p>
                </div>
              </div>

              <div style={{ marginTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', color: '#FFE9C2', fontWeight: 600 }}>
                  {formatPrice(product.price)}
                </span>
                <button
                  onClick={() => addToBag(product, product.finishes[0], 1)}
                  className="btn-outline"
                  style={{ padding: '8px 16px', fontSize: '11px', borderColor: '#E9C978', color: '#E9C978' }}
                  onMouseEnter={() => setCursor('ADD', 'add')}
                  onMouseLeave={resetCursor}
                >
                  + ADD TO BAG
                </button>
              </div>
            </div>
          ))}
        </div>

        <style>{`
          div:hover > div a .fixture-on-img {
            opacity: 1 !important;
          }
          div:hover > div a .fixture-off-img {
            opacity: 0 !important;
          }
        `}</style>
      </section>

      {/* =====================================================
          HOME 05 — FEATURED EDIT (WALL LIGHTS)
          Doorway clip-path reveal with interactive LightReveal
          ===================================================== */}
      <section
        ref={wallLightsRef}
        style={{
          padding: 'clamp(80px, 12vw, 160px) 0',
          backgroundColor: 'var(--oxblood)',
          color: 'var(--warm-ivory)'
        }}
      >
        <div className="container-wide">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(32px, 6vw, 80px)',
              alignItems: 'center'
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  color: 'var(--butter)',
                  display: 'block',
                  marginBottom: '16px'
                }}
              >
                EDITORIAL SUITE // WALL LIGHTS
              </span>

              <h2
                style={{
                  fontFamily: 'var(--font-theater)',
                  fontSize: 'var(--text-h1)',
                  lineHeight: 0.98,
                  marginBottom: '24px'
                }}
              >
                LIGHT<br />
                THAT<br />
                STAYS<br />
                CLOSE.
              </h2>

              <p style={{ fontSize: '18px', lineHeight: 1.6, opacity: 0.9, maxWidth: '480px', marginBottom: '32px' }}>
                A sconce does not aim for total illumination. Mounted at eye level along corridors or beside headboards, it washes lime plaster in intimate low pools of warmth.
              </p>

              <Link
                to="/shop/sconces"
                className="btn-primary"
                style={{
                  backgroundColor: 'var(--warm-ivory)',
                  color: 'var(--oxblood)',
                  borderColor: 'var(--warm-ivory)'
                }}
                onMouseEnter={() => setCursor('EXPLORE', 'view')}
                onMouseLeave={resetCursor}
              >
                <span>EXPLORE WALL LIGHTS</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* LightReveal Slider Component wrapped in GSAP door reveal */}
            <div className="wall-lights-reveal" style={{ overflow: 'hidden' }}>
              <LightReveal
                dayImage="/images/sconce_esme_off.svg"
                nightImage="/images/sconce_esme_on.svg"
                alt="Esme wall sconce lighting transition"
                aspectRatio="1/1"
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  opacity: 0.75,
                  display: 'block',
                  marginTop: '12px',
                  textAlign: 'center'
                }}
              >
                DRAG SLIDER • DAYLIGHT UNLIT vs. 2700K CAST HALO
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          HOME 06 — INTERACTIVE DINNER THEATRE ("SET THE ROOM")
          Signature DragRoom lighting stage
          ===================================================== */}
      <section style={{ padding: 'clamp(64px, 8vw, 110px) 0', backgroundColor: '#161311' }}>
        <div className="container-wide">
          <DragRoom />
        </div>
      </section>

      {/* =====================================================
          HOME 07 — THE COMPENDIUM INDEX
          Full width category rows with room previews on hover
          ===================================================== */}
      <section
        style={{
          padding: 'clamp(80px, 10vw, 140px) 0',
          backgroundColor: 'var(--warm-ivory)',
          color: 'var(--ink)'
        }}
      >
        <div className="container-wide">
          <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', color: 'var(--stone)' }}>
                THE COMPENDIUM
              </span>
              <h2 style={{ fontFamily: 'var(--font-theater)', fontSize: 'var(--text-h2)' }}>
                The Index.
              </h2>
            </div>
            <Link to="/shop" className="btn-text">
              VIEW FULL CATALOGUE &rarr;
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {CATEGORIES.filter((c) => c.slug !== 'all').map((cat, idx) => (
              <Link
                key={cat.slug}
                to={`/shop/${cat.slug}`}
                onMouseEnter={() => {
                  setHoveredCategory(cat.slug);
                  setCursor('ENTER', 'enter');
                }}
                onMouseLeave={() => {
                  setHoveredCategory(null);
                  resetCursor();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  padding: '24px 0',
                  borderBottom: '1px solid rgba(30, 28, 26, 0.12)',
                  transition: 'padding-left 0.3s ease, color 0.3s ease',
                  paddingLeft: hoveredCategory === cat.slug ? '16px' : '0',
                  color: hoveredCategory === cat.slug ? 'var(--oxblood)' : 'inherit'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '24px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--stone)' }}>
                    0{idx + 1}
                  </span>
                  <span style={{ fontFamily: 'var(--font-theater)', fontSize: 'clamp(28px, 4vw, 54px)', lineHeight: 1 }}>
                    {cat.name}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <span style={{ fontSize: '14px', fontFamily: 'var(--font-personality)', fontStyle: 'italic', display: 'none' }} className="cat-subtitle-desktop">
                    {cat.subtitle}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--stone)' }}>
                    [{cat.count}]
                  </span>
                  <ArrowRight size={18} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <style>{`
          @media (min-width: 768px) {
            .cat-subtitle-desktop {
              display: inline !important;
            }
          }
        `}</style>
      </section>

      {/* =====================================================
          HOME 08 — MATERIAL ARCHIVE & TACTILE PATINA
          Stone palette with macro inspection and live light test
          ===================================================== */}
      <section
        ref={materialsRef}
        style={{
          padding: 'clamp(80px, 12vw, 160px) 0',
          backgroundColor: 'var(--stone)',
          color: 'var(--ink)'
        }}
      >
        <div className="container-wide">
          <div style={{ maxWidth: '820px', marginBottom: 'clamp(40px, 6vw, 64px)' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.2em',
                color: 'var(--charcoal)',
                display: 'block',
                marginBottom: '12px'
              }}
            >
              MATERIAL ARCHIVE
            </span>
            <h2 style={{ fontFamily: 'var(--font-theater)', fontSize: 'var(--text-h1)', lineHeight: 1 }}>
              MADE OF<br />THINGS THAT<br />AGE WELL.
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(32px, 6vw, 64px)',
              alignItems: 'center'
            }}
          >
            {/* Macro Image with Light Test Filter */}
            <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', backgroundColor: '#2A2420', overflow: 'hidden' }}>
              <img
                src={activeMaterial.image}
                alt={activeMaterial.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: materialLightMode === 'candle' 
                    ? 'sepia(0.35) saturate(1.4) brightness(0.9)' 
                    : materialLightMode === 'warm' 
                    ? 'saturate(1.15) brightness(1.02)' 
                    : 'none',
                  transition: 'filter 0.5s ease'
                }}
              />
              <div style={{ position: 'absolute', bottom: '16px', left: '16px', backgroundColor: 'rgba(24, 20, 18, 0.85)', padding: '6px 12px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#E9C978' }}>
                LIGHT MODE: {materialLightMode.toUpperCase()}
              </div>
            </div>

            {/* Material selector tabs and live light test controls */}
            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                {MATERIALS.map((mat) => (
                  <button
                    key={mat.id}
                    onClick={() => setActiveMaterial(mat)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: activeMaterial.id === mat.id ? 'var(--ink)' : 'rgba(255, 255, 255, 0.4)',
                      color: activeMaterial.id === mat.id ? 'var(--warm-ivory)' : 'var(--ink)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      letterSpacing: '0.1em',
                      cursor: 'pointer'
                    }}
                  >
                    {mat.name.split(' ')[0]}
                  </button>
                ))}
              </div>

              <h3 style={{ fontFamily: 'var(--font-theater)', fontSize: '32px' }}>
                {activeMaterial.name}
              </h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--charcoal)', letterSpacing: '0.15em', marginTop: '4px' }}>
                ORIGIN: {activeMaterial.origin}
              </p>

              <p style={{ fontSize: '16px', lineHeight: 1.6, marginTop: '16px' }}>
                {activeMaterial.description}
              </p>

              {/* Live Light Test Selector */}
              <div style={{ marginTop: '24px', padding: '16px', backgroundColor: 'rgba(247, 242, 232, 0.65)', border: '1px solid rgba(30, 28, 26, 0.1)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', color: 'var(--oxblood)', display: 'block', marginBottom: '8px' }}>
                  INSPECT UNDER TEMPERATURE:
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setMaterialLightMode('day')}
                    style={{
                      padding: '6px 12px',
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      backgroundColor: materialLightMode === 'day' ? 'var(--oxblood)' : 'transparent',
                      color: materialLightMode === 'day' ? '#FFF' : 'inherit',
                      border: '1px solid rgba(30,28,26,0.2)',
                      cursor: 'pointer'
                    }}
                  >
                    5000K DAYLIGHT
                  </button>
                  <button
                    onClick={() => setMaterialLightMode('warm')}
                    style={{
                      padding: '6px 12px',
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      backgroundColor: materialLightMode === 'warm' ? 'var(--oxblood)' : 'transparent',
                      color: materialLightMode === 'warm' ? '#FFF' : 'inherit',
                      border: '1px solid rgba(30,28,26,0.2)',
                      cursor: 'pointer'
                    }}
                  >
                    2700K WARM LAMP
                  </button>
                  <button
                    onClick={() => setMaterialLightMode('candle')}
                    style={{
                      padding: '6px 12px',
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      backgroundColor: materialLightMode === 'candle' ? 'var(--oxblood)' : 'transparent',
                      color: materialLightMode === 'candle' ? '#FFF' : 'inherit',
                      border: '1px solid rgba(30,28,26,0.2)',
                      cursor: 'pointer'
                    }}
                  >
                    1800K CANDLE FLAME
                  </button>
                </div>
              </div>

              <div style={{ marginTop: '24px' }}>
                <Link to="/materials" className="btn-text">
                  VIEW FULL MATERIAL LIBRARY &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          HOME 09 — THE ATELIER WORKSHOP (MADE BY PEOPLE)
          Showing lathe turning, hand waxing, and bench wiring
          ===================================================== */}
      <section style={{ padding: 'clamp(80px, 10vw, 140px) 0', backgroundColor: '#201A16', color: '#F7F2E8' }}>
        <div className="container-wide">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', color: '#E9C978', display: 'block', marginBottom: '8px' }}>
                FOUNDRY &amp; BENCHWORK
              </span>
              <h2 style={{ fontFamily: 'var(--font-theater)', fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1.05 }}>
                Made By Hands.
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#D7CDBD', marginTop: '16px', lineHeight: 1.6 }}>
                Every fixture is shaped, hand-rubbed with unlacquered beeswax patina, and individually wired in our South London studio. We believe materials should age with the house, deepening over decades.
              </p>
              <div style={{ marginTop: '32px' }}>
                <Link to="/about" className="btn-primary" style={{ backgroundColor: '#E9C978', color: '#1E1C1A', border: 'none' }}>
                  OUR STUDIO STORY →
                </Link>
              </div>
            </div>

            <div>
              <img
                src="/images/craft_bench_brass.svg"
                alt="Craftsman bench and lathe turned brass lighting"
                style={{ width: '100%', height: 'auto', display: 'block', border: '1px solid rgba(233, 201, 120, 0.25)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
              />
              <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#AAA092' }}>
                <span>BENCH 04 // LATHE TURNING &amp; PATINA</span>
                <span>GRADE-CZ121 SOLID BRASS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          HOME 10 — PRIVATE RESIDENCES & TRADE SHOWCASE
          Real architecture projects: Cotswolds Manor & Mayfair Penthouse
          ===================================================== */}
      <section style={{ padding: 'clamp(80px, 10vw, 140px) 0', backgroundColor: 'var(--parchment)', color: 'var(--ink)' }}>
        <div className="container-wide">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', color: 'var(--oxblood)' }}>
                DOMESTIC ARCHITECTURE
              </span>
              <h2 style={{ fontFamily: 'var(--font-theater)', fontSize: 'clamp(36px, 5vw, 64px)' }}>
                Rooms That Live Well.
              </h2>
            </div>
            <Link to="/trade/projects" className="btn-text">
              VIEW ARCHITECTURAL ARCHIVE &rarr;
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {/* Project 1: Cotswolds */}
            <div style={{ border: '1px solid rgba(30, 28, 26, 0.12)', backgroundColor: 'var(--warm-ivory)', overflow: 'hidden' }}>
              <img
                src="/images/client_residence_1.svg"
                alt="Cotswolds stone residence with Bellamy pendant"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              <div style={{ padding: '24px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--stone)' }}>
                  PROJECT 01 // RESIDENTIAL
                </span>
                <h3 style={{ fontFamily: 'var(--font-theater)', fontSize: '24px', marginTop: '6px' }}>
                  The Cotswolds Stone Manor
                </h3>
                <p style={{ fontFamily: 'var(--font-personality)', fontStyle: 'italic', fontSize: '15px', color: 'var(--espresso)', marginTop: '4px' }}>
                  Bellamy Pendant centered over a 12-seat oak table in dusk light.
                </p>
                <div style={{ marginTop: '16px' }}>
                  <Link to="/rooms/dining" className="btn-outline" style={{ padding: '8px 16px', fontSize: '11px' }}>
                    EXPLORE DINING LIGHTING &rarr;
                  </Link>
                </div>
              </div>
            </div>

            {/* Project 2: Mayfair */}
            <div style={{ border: '1px solid rgba(30, 28, 26, 0.12)', backgroundColor: 'var(--warm-ivory)', overflow: 'hidden' }}>
              <img
                src="/images/client_residence_2.svg"
                alt="Mayfair penthouse salon with Esme sconce"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              <div style={{ padding: '24px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--stone)' }}>
                  PROJECT 02 // PRIVATE SALON
                </span>
                <h3 style={{ fontFamily: 'var(--font-theater)', fontSize: '24px', marginTop: '6px' }}>
                  The Mayfair Penthouse Salon
                </h3>
                <p style={{ fontFamily: 'var(--font-personality)', fontStyle: 'italic', fontSize: '15px', color: 'var(--espresso)', marginTop: '4px' }}>
                  Esme wall sconces and Margo table lamp creating warm perimeter glow.
                </p>
                <div style={{ marginTop: '16px' }}>
                  <Link to="/rooms/living" className="btn-outline" style={{ padding: '8px 16px', fontSize: '11px' }}>
                    EXPLORE SALON LIGHTING &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          HOME CLOSING — MIDNIGHT THEME
          "LEAVE ONE LIGHT ON."
          ===================================================== */}
      <section
        ref={closingRef}
        style={{
          position: 'relative',
          padding: 'clamp(100px, 16vw, 220px) 0',
          backgroundColor: '#0F1219',
          color: '#F7F2E8',
          textAlign: 'center',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 224, 163, 0.25) 0%, transparent 70%)',
            filter: 'blur(50px)',
            pointerEvents: 'none'
          }}
        />

        <div className="container-narrow" style={{ position: 'relative', zIndex: 1 }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.25em',
              color: 'var(--butter)',
              display: 'block',
              marginBottom: '20px'
            }}
          >
            MIDNIGHT CALL
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-theater)',
              fontSize: 'clamp(54px, 9vw, 120px)',
              lineHeight: 0.95,
              marginBottom: '36px'
            }}
          >
            LEAVE<br />ONE LIGHT<br />ON.
          </h2>

          <p style={{ fontFamily: 'var(--font-personality)', fontSize: '20px', fontStyle: 'italic', color: '#D7CDBD', maxWidth: '480px', margin: '0 auto 40px auto' }}>
            The signal that a house is alive, waiting, and welcoming.
          </p>

          <Link
            to="/shop"
            className="btn-primary"
            style={{
              backgroundColor: 'var(--butter)',
              color: 'var(--ink)',
              borderColor: 'var(--butter)',
              padding: '18px 42px'
            }}
            onMouseEnter={() => setCursor('SHOP', 'view')}
            onMouseLeave={resetCursor}
          >
            <span>SHOP THE HOUSE &rarr;</span>
          </Link>
        </div>
      </section>

      {/* Floating Domestic Theatre Ambient Scene Progress Indicator */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          zIndex: 90,
          backgroundColor: 'rgba(24, 20, 18, 0.92)',
          color: '#F7F2E8',
          padding: '10px 18px',
          border: '1px solid rgba(233, 201, 120, 0.35)',
          backdropFilter: 'blur(10px)',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          pointerEvents: 'auto'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#E9C978', display: 'inline-block', boxShadow: '0 0 10px #E9C978' }} />
          <span style={{ color: '#E9C978', letterSpacing: '0.15em', fontWeight: 600 }}>{domesticScene.room}</span>
        </div>
        <span style={{ opacity: 0.35 }}>|</span>
        <span style={{ letterSpacing: '0.1em' }}>{domesticScene.time} &bull; {domesticScene.label}</span>
        <span style={{ opacity: 0.35 }}>|</span>
        <span style={{ color: '#E9C978', letterSpacing: '0.1em' }}>AMBIENT: {domesticScene.ambient}</span>
      </div>
    </div>
  );
};
