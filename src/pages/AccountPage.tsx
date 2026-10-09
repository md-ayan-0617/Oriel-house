import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  FileText, 
  Compass, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  Sparkles, 
  Layers, 
  Eye, 
  Calendar, 
  Check, 
  SlidersHorizontal 
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from '../store/useStore';

gsap.registerPlugin(ScrollTrigger);

interface ProductionStage {
  step: number;
  title: string;
  sub: string;
  status: 'complete' | 'in-progress' | 'upcoming';
  date: string;
}

const DEMO_ORDERS = {
  'OH-8821': {
    id: 'OH-8821',
    project: 'Cotswolds Stone Residence',
    client: 'Studio Ilse & Partners',
    type: 'Trade Bespoke Commission',
    estimatedDispatch: '24 October 2026',
    artisan: 'Peter Vance (Master Finisher)',
    currentStage: 3,
    image: '/images/client_residence_1.svg',
    fixtures: [
      { name: 'Bellamy Pendant', finish: 'Aged Brass', qty: 2, room: 'Dining Pavilion', protocol: '0-10V Dimming' },
      { name: 'Lucien Candle Object', finish: 'Solid Cast Iron', qty: 4, room: 'Refectory Table', protocol: 'Natural Flame' },
      { name: 'Esme Sconce', finish: 'Limewash Plaster', qty: 6, room: 'Stone Corridor', protocol: 'DALI Phase 1' }
    ]
  },
  'OH-9043': {
    id: 'OH-9043',
    project: 'Mayfair Penthouse Salon',
    client: 'Lord & Lady Harrington',
    type: 'Private Residential Commission',
    estimatedDispatch: '04 November 2026',
    artisan: 'Evelyn Shaw (Studio Lead)',
    currentStage: 2,
    image: '/images/client_residence_2.svg',
    fixtures: [
      { name: 'Margo Table Lamp', finish: 'Dark Bronzed Umber', qty: 2, room: 'Salon Credenza', protocol: 'Rotary Dimmer' },
      { name: 'Esme Sconce', finish: 'Aged Brass & Opal Glass', qty: 4, room: 'Master Bedchamber', protocol: 'Trailing Edge' }
    ]
  }
};

const STAGES: ProductionStage[] = [
  { step: 1, title: 'CAD & Tooling Calibration', sub: 'Foundry patterns checked to ±0.2mm precision', status: 'complete', date: '02 Oct 2026' },
  { step: 2, title: 'Sand Casting & Lathe Turning', sub: 'Solid unlacquered brass ingots turned and faced', status: 'complete', date: '08 Oct 2026' },
  { step: 3, title: 'Artisan Patination & Hand Rubbing', sub: 'Hand-waxed living patina applied at the studio bench', status: 'in-progress', date: 'Active (Bench 04)' },
  { step: 4, title: 'High-Voltage Wiring & CE Certification', sub: 'Porcelain lamp-holders, braided silk cables & photometric testing', status: 'upcoming', date: '18 Oct 2026' },
  { step: 5, title: 'Archival Crate & White Glove Courier', sub: 'Custom foam cut-out, numbered studio certificate & dispatch', status: 'upcoming', date: '24 Oct 2026' }
];

export const AccountPage: React.FC = () => {
  const { setCursor, resetCursor } = useStore();
  const [selectedOrderId, setSelectedOrderId] = useState<'OH-8821' | 'OH-9043'>('OH-8821');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);
  const [sampleOrdered, setSampleOrdered] = useState(false);
  const [selectedSamples, setSelectedSamples] = useState<string[]>(['Aged Brass', 'Fluted Opal Glass']);
  const [bookingDate, setBookingDate] = useState('2026-10-22');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // GSAP animation refs
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const trackingCardRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLElement>(null);
  const vaultRef = useRef<HTMLElement>(null);
  const swatchRef = useRef<HTMLElement>(null);

  const order = DEMO_ORDERS[selectedOrderId];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Parallax
      if (heroBgRef.current && heroRef.current) {
        gsap.to(heroBgRef.current, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
      }

      // 2. Staggered reveal for tracking card
      if (trackingCardRef.current) {
        gsap.from(trackingCardRef.current, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: trackingCardRef.current,
            start: 'top 85%'
          }
        });
      }

      // 3. Room schedule items stagger
      if (scheduleRef.current) {
        const rows = scheduleRef.current.querySelectorAll('.schedule-row');
        gsap.from(rows, {
          x: -30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: scheduleRef.current,
            start: 'top 80%'
          }
        });
      }

      // 4. Download vault cards stagger
      if (vaultRef.current) {
        const cards = vaultRef.current.querySelectorAll('.vault-card');
        gsap.from(cards, {
          y: 35,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: vaultRef.current,
            start: 'top 80%'
          }
        });
      }

      // 5. Swatch box tilt reveal
      if (swatchRef.current) {
        gsap.from(swatchRef.current.querySelector('.swatch-container'), {
          scale: 0.96,
          opacity: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: swatchRef.current,
            start: 'top 80%'
          }
        });
      }
    }, pageContainerRef);

    return () => ctx.revert();
  }, [selectedOrderId]);

  const toggleSample = (name: string) => {
    if (selectedSamples.includes(name)) {
      setSelectedSamples(selectedSamples.filter(s => s !== name));
    } else {
      setSelectedSamples([...selectedSamples, name]);
    }
  };

  const handleDownload = (format: string, title: string) => {
    setDownloadNotice(`Generated ${format} package for "${title}" (Simulation). Initiating archive download...`);
    setTimeout(() => {
      setDownloadNotice(null);
    }, 4500);
  };

  return (
    <div ref={pageContainerRef} style={{ backgroundColor: 'var(--warm-ivory)', minHeight: '100vh', color: 'var(--ink)' }}>
      {/* =====================================================
          01. HERO — ATELIER PRIVATE PORTAL
          ===================================================== */}
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          minHeight: '65vh',
          display: 'flex',
          alignItems: 'flex-end',
          padding: 'clamp(80px, 12vw, 140px) 0 60px 0',
          overflow: 'hidden',
          backgroundColor: '#1E1A17',
          color: '#F7F2E8'
        }}
      >
        {/* Parallax Background: Private Architectural Salon SVG */}
        <div
          ref={heroBgRef}
          style={{
            position: 'absolute',
            inset: '-10% 0 -10% 0',
            zIndex: 0,
            backgroundImage: 'url(/images/account_portal_hero.svg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.42
          }}
        />

        {/* Ambient Dark Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, #1E1A17 0%, rgba(30, 26, 23, 0.75) 50%, rgba(30, 26, 23, 0.4) 100%)',
            zIndex: 1
          }}
        />

        <div className="container-wide" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '32px' }}>
            <div style={{ maxWidth: '780px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#E9C978', display: 'inline-block', boxShadow: '0 0 10px #E9C978' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.25em', color: '#E9C978' }}>
                  STUDIO BENCH ACTIVE &bull; LONDON 20:46 GMT
                </span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-theater)', fontSize: 'clamp(52px, 8vw, 110px)', lineHeight: 0.92, letterSpacing: '-0.02em' }}>
                The Atelier Ledger.
              </h1>
              <p style={{ fontFamily: 'var(--font-personality)', fontSize: 'clamp(18px, 2.2vw, 24px)', fontStyle: 'italic', color: '#D7CDBD', marginTop: '20px', maxWidth: '640px', lineHeight: 1.4 }}>
                Private access to live bronze casting benches, room lighting schedules, and CAD specification files.
              </p>
            </div>

            {/* Quick Project Switcher Demo Tabs */}
            <div
              style={{
                backgroundColor: 'rgba(24, 20, 18, 0.85)',
                border: '1px solid rgba(233, 201, 120, 0.25)',
                padding: '20px',
                backdropFilter: 'blur(8px)',
                minWidth: '280px'
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#AAA092', letterSpacing: '0.2em', marginBottom: '12px' }}>
                SWITCH ACTIVE COMMISSION
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  onClick={() => setSelectedOrderId('OH-8821')}
                  style={{
                    padding: '10px 14px',
                    textAlign: 'left',
                    backgroundColor: selectedOrderId === 'OH-8821' ? 'var(--oxblood)' : 'rgba(255, 255, 255, 0.05)',
                    color: '#F7F2E8',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontFamily: 'var(--font-body)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span><strong>OH-8821</strong> &bull; Cotswolds Stone</span>
                  {selectedOrderId === 'OH-8821' && <Check size={14} />}
                </button>
                <button
                  onClick={() => setSelectedOrderId('OH-9043')}
                  style={{
                    padding: '10px 14px',
                    textAlign: 'left',
                    backgroundColor: selectedOrderId === 'OH-9043' ? 'var(--oxblood)' : 'rgba(255, 255, 255, 0.05)',
                    color: '#F7F2E8',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontFamily: 'var(--font-body)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span><strong>OH-9043</strong> &bull; Mayfair Salon</span>
                  {selectedOrderId === 'OH-9043' && <Check size={14} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          02. COMMISSION STATUS BAR & SEARCH
          ===================================================== */}
      <section style={{ backgroundColor: 'var(--parchment)', borderBottom: '1px solid rgba(30, 28, 26, 0.1)', padding: '24px 0' }}>
        <div className="container-wide">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--stone)', letterSpacing: '0.15em', display: 'block' }}>COMMISSION ID</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', fontWeight: 600, color: 'var(--oxblood)' }}>{order.id}</span>
              </div>
              <div style={{ height: '32px', width: '1px', backgroundColor: 'rgba(30, 28, 26, 0.15)' }} />
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--stone)', letterSpacing: '0.15em', display: 'block' }}>CLIENT / STUDIO</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 500 }}>{order.client}</span>
              </div>
              <div style={{ height: '32px', width: '1px', backgroundColor: 'rgba(30, 28, 26, 0.15)' }} />
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--stone)', letterSpacing: '0.15em', display: 'block' }}>PROJECT RESIDENCE</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 500 }}>{order.project}</span>
              </div>
            </div>

            {/* Custom Order Lookup */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Enter custom order # (e.g. OH-7710)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: '10px 14px',
                  backgroundColor: 'var(--warm-ivory)',
                  border: '1px solid rgba(30, 28, 26, 0.2)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  width: '240px'
                }}
              />
              <button
                onClick={() => {
                  if (searchQuery.trim()) {
                    alert(`Commission ${searchQuery.toUpperCase()} found in archival database. Status: Bench Inspection Approved.`);
                  }
                }}
                className="btn-primary"
                style={{ padding: '10px 16px', fontSize: '11px' }}
              >
                LOCATE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Global simulated download alert message */}
      {downloadNotice && (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', backgroundColor: '#1E1C1A', color: '#F7F2E8', padding: '16px 24px', borderLeft: '4px solid #E9C978', zIndex: 1000, boxShadow: '0 10px 30px rgba(0,0,0,0.3)', maxWidth: '420px', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
          <Sparkles size={16} color="#E9C978" style={{ marginBottom: '6px' }} />
          <div>{downloadNotice}</div>
        </div>
      )}

      {/* =====================================================
          03. CRAFT & BENCH TIMELINE (INTERACTIVE)
          ===================================================== */}
      <section style={{ padding: 'clamp(64px, 8vw, 100px) 0' }}>
        <div className="container-wide">
          <div ref={trackingCardRef} style={{ backgroundColor: '#28201C', color: '#F7F2E8', border: '1px solid rgba(233, 201, 120, 0.2)', padding: 'clamp(32px, 5vw, 64px)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#E9C978', letterSpacing: '0.2em', display: 'block', marginBottom: '8px' }}>
                  ATELIER CRAFT TIMELINE // STAGE 0{order.currentStage} OF 05
                </span>
                <h2 style={{ fontFamily: 'var(--font-theater)', fontSize: 'clamp(36px, 4.5vw, 56px)', lineHeight: 1.05 }}>
                  At the Bench.
                </h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#D7CDBD', marginTop: '16px', lineHeight: 1.6 }}>
                  Every fixture is individually turned, finished, wired, and tested in small runs. Watch the progression of your commission as it moves across our South London benches.
                </p>

                <div style={{ marginTop: '28px', padding: '20px', backgroundColor: 'rgba(0, 0, 0, 0.35)', borderLeft: '3px solid #E9C978' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#E9C978', letterSpacing: '0.15em' }}>
                    BENCH NOTES FROM {order.artisan.toUpperCase()}
                  </div>
                  <p style={{ fontFamily: 'var(--font-personality)', fontStyle: 'italic', fontSize: '17px', color: '#F7F2E8', marginTop: '8px' }}>
                    &ldquo;Solid cast brass components turned on the lathe this morning. Currently applying our signature hand-rubbed wax finish to soften edges. Next: 48-hour continuous lux burn-in test.&rdquo;
                  </p>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#AAA092', marginTop: '12px' }}>
                    ESTIMATED DISPATCH: <strong style={{ color: '#F7F2E8' }}>{order.estimatedDispatch}</strong>
                  </div>
                </div>
              </div>

              {/* Bench Image Drawing SVG */}
              <div style={{ position: 'relative' }}>
                <div style={{ overflow: 'hidden', border: '1px solid rgba(233, 201, 120, 0.25)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
                  <img
                    src="/images/craft_bench_brass.svg"
                    alt="Craftsman bench and turned brass components"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
                <div style={{ position: 'absolute', bottom: '16px', left: '16px', backgroundColor: 'rgba(24, 20, 18, 0.9)', padding: '8px 14px', border: '1px solid #E9C978', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#E9C978' }}>
                  BENCH 04 // LIVE STATUS
                </div>
              </div>
            </div>

            {/* 5-Stage Step Progression Bar */}
            <div style={{ marginTop: '56px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '40px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                {STAGES.map((st) => {
                  const isCurrent = st.step === order.currentStage;
                  const isDone = st.step < order.currentStage;
                  return (
                    <div
                      key={st.step}
                      style={{
                        padding: '16px',
                        backgroundColor: isCurrent ? 'rgba(233, 201, 120, 0.1)' : 'transparent',
                        borderTop: isCurrent ? '3px solid #E9C978' : isDone ? '3px solid var(--oxblood)' : '1px solid rgba(255, 255, 255, 0.1)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: isCurrent ? '#E9C978' : isDone ? '#D7CDBD' : '#776E65' }}>
                          STAGE 0{st.step}
                        </span>
                        {isDone ? (
                          <CheckCircle2 size={16} color="var(--oxblood)" />
                        ) : isCurrent ? (
                          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#E9C978', display: 'inline-block', boxShadow: '0 0 8px #E9C978' }} />
                        ) : (
                          <Clock size={14} color="#554E46" />
                        )}
                      </div>
                      <div style={{ fontFamily: 'var(--font-theater)', fontSize: '17px', color: isCurrent ? '#FFE9C2' : '#F7F2E8', marginBottom: '6px' }}>
                        {st.title}
                      </div>
                      <div style={{ fontSize: '12px', color: '#AAA092', lineHeight: 1.5 }}>
                        {st.sub}
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: isCurrent ? '#E9C978' : '#776E65', marginTop: '10px' }}>
                        {st.date}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          04. ROOM-BY-ROOM LIGHTING SPECIFICATION SCHEDULE
          ===================================================== */}
      <section ref={scheduleRef} style={{ padding: '0 0 clamp(64px, 8vw, 100px) 0' }}>
        <div className="container-wide">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', color: 'var(--oxblood)', display: 'block', marginBottom: '8px' }}>
                PROJECT SCHEDULE
              </span>
              <h2 style={{ fontFamily: 'var(--font-theater)', fontSize: 'clamp(36px, 5vw, 64px)' }}>
                Room Lighting Schedule.
              </h2>
            </div>
            <button
              onClick={() => handleDownload('CSV / SPEC', `${order.project} Lighting Schedule`)}
              className="btn-outline"
              style={{ padding: '12px 24px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Download size={15} />
              <span>EXPORT SCHEDULE (XLS/CSV)</span>
            </button>
          </div>

          <div style={{ backgroundColor: 'var(--parchment)', border: '1px solid rgba(30, 28, 26, 0.12)', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(30, 28, 26, 0.15)', backgroundColor: 'rgba(30, 28, 26, 0.03)' }}>
                  <th style={{ padding: '16px 24px', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', color: 'var(--charcoal)' }}>ROOM / ZONE</th>
                  <th style={{ padding: '16px 24px', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', color: 'var(--charcoal)' }}>FIXTURE</th>
                  <th style={{ padding: '16px 24px', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', color: 'var(--charcoal)' }}>FINISH</th>
                  <th style={{ padding: '16px 24px', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', color: 'var(--charcoal)' }}>QTY</th>
                  <th style={{ padding: '16px 24px', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', color: 'var(--charcoal)' }}>CIRCUIT / DIMMING</th>
                  <th style={{ padding: '16px 24px', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', color: 'var(--charcoal)' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {order.fixtures.map((fx, idx) => (
                  <tr key={idx} className="schedule-row" style={{ borderBottom: '1px solid rgba(30, 28, 26, 0.08)' }}>
                    <td style={{ padding: '20px 24px', fontWeight: 600, fontFamily: 'var(--font-body)' }}>
                      {fx.room}
                    </td>
                    <td style={{ padding: '20px 24px', fontFamily: 'var(--font-theater)', fontSize: '20px', color: 'var(--oxblood)' }}>
                      {fx.name}
                    </td>
                    <td style={{ padding: '20px 24px', fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
                      {fx.finish}
                    </td>
                    <td style={{ padding: '20px 24px', fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 600 }}>
                      0{fx.qty}
                    </td>
                    <td style={{ padding: '20px 24px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--espresso)' }}>
                      {fx.protocol}
                    </td>
                    <td style={{ padding: '20px 24px' }}>
                      <Link
                        to={`/product/${fx.name.toLowerCase().replace(/ /g, '-')}`}
                        className="btn-outline"
                        style={{ padding: '6px 14px', fontSize: '11px' }}
                      >
                        VIEW SPEC &rarr;
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =====================================================
          05. ARCHITECTURAL CAD & BIM VAULT (ONE-CLICK DOWNLOADS)
          ===================================================== */}
      <section ref={vaultRef} style={{ backgroundColor: 'var(--parchment)', padding: 'clamp(64px, 8vw, 100px) 0', borderTop: '1px solid rgba(30, 28, 26, 0.1)', borderBottom: '1px solid rgba(30, 28, 26, 0.1)' }}>
        <div className="container-wide">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', color: 'var(--oxblood)', display: 'block', marginBottom: '8px' }}>
                SPECIFIER ASSET VAULT
              </span>
              <h2 style={{ fontFamily: 'var(--font-theater)', fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1.05 }}>
                BIM, CAD &amp; Photometrics.
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--espresso)', marginTop: '16px', lineHeight: 1.6 }}>
                Download validated 3D models for Revit, AutoCAD, and DIALux. All assets are calibrated with real-world lux distributions and accurate mounting tolerances.
              </p>

              {/* 4 Download Asset Cards */}
              <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div
                  className="vault-card"
                  onClick={() => handleDownload('Revit .RFA', 'Bespoke Revit BIM Family')}
                  style={{
                    padding: '20px',
                    backgroundColor: 'var(--warm-ivory)',
                    border: '1px solid rgba(30, 28, 26, 0.15)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={() => setCursor('DOWNLOAD', 'specify')}
                  onMouseLeave={resetCursor}
                >
                  <FileText size={22} color="var(--oxblood)" />
                  <div style={{ fontFamily: 'var(--font-theater)', fontSize: '18px', marginTop: '12px' }}>
                    Revit BIM (.RFA)
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--stone)', marginTop: '4px' }}>
                    Parametric / Revit 2024+
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px', fontSize: '11px', color: 'var(--oxblood)', fontWeight: 600 }}>
                    <Download size={13} />
                    <span>DOWNLOAD ASSET</span>
                  </div>
                </div>

                <div
                  className="vault-card"
                  onClick={() => handleDownload('AutoCAD .DWG', '2D/3D AutoCAD Drawing')}
                  style={{
                    padding: '20px',
                    backgroundColor: 'var(--warm-ivory)',
                    border: '1px solid rgba(30, 28, 26, 0.15)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={() => setCursor('DOWNLOAD', 'specify')}
                  onMouseLeave={resetCursor}
                >
                  <Compass size={22} color="var(--terracotta)" />
                  <div style={{ fontFamily: 'var(--font-theater)', fontSize: '18px', marginTop: '12px' }}>
                    AutoCAD (.DWG)
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--stone)', marginTop: '4px' }}>
                    2D Plan, Elevation &amp; 3D
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px', fontSize: '11px', color: 'var(--terracotta)', fontWeight: 600 }}>
                    <Download size={13} />
                    <span>DOWNLOAD ASSET</span>
                  </div>
                </div>

                <div
                  className="vault-card"
                  onClick={() => handleDownload('IES Raytrace', 'Photometric Raytrace Data')}
                  style={{
                    padding: '20px',
                    backgroundColor: 'var(--warm-ivory)',
                    border: '1px solid rgba(30, 28, 26, 0.15)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={() => setCursor('DOWNLOAD', 'specify')}
                  onMouseLeave={resetCursor}
                >
                  <Sparkles size={22} color="var(--brass)" />
                  <div style={{ fontFamily: 'var(--font-theater)', fontSize: '18px', marginTop: '12px' }}>
                    IES Photometrics
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--stone)', marginTop: '4px' }}>
                    DIALux &amp; Relux Curves
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px', fontSize: '11px', color: 'var(--brass)', fontWeight: 600 }}>
                    <Download size={13} />
                    <span>DOWNLOAD ASSET</span>
                  </div>
                </div>

                <div
                  className="vault-card"
                  onClick={() => handleDownload('Vector PDF', 'Complete Studio Spec Binder')}
                  style={{
                    padding: '20px',
                    backgroundColor: 'var(--warm-ivory)',
                    border: '1px solid rgba(30, 28, 26, 0.15)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={() => setCursor('DOWNLOAD', 'specify')}
                  onMouseLeave={resetCursor}
                >
                  <Layers size={22} color="var(--olive)" />
                  <div style={{ fontFamily: 'var(--font-theater)', fontSize: '18px', marginTop: '12px' }}>
                    Full Spec Binder
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--stone)', marginTop: '4px' }}>
                    300 DPI Vector PDF
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px', fontSize: '11px', color: 'var(--olive)', fontWeight: 600 }}>
                    <Download size={13} />
                    <span>DOWNLOAD ASSET</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Blueprint Illustration */}
            <div>
              <div style={{ border: '1px solid rgba(30, 28, 26, 0.2)', boxShadow: '0 15px 35px rgba(0,0,0,0.1)' }}>
                <img
                  src="/images/blueprint_elevation.svg"
                  alt="Architectural lighting elevation blueprint schematic"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
              <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--stone)' }}>
                <span>DWG NO: OH-SPEC-ELV-04</span>
                <span>CALIBRATED FOR 2700K WARM CRI 98</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          06. INTERACTIVE FINISH SWATCH TRAY ORDERING
          ===================================================== */}
      <section ref={swatchRef} style={{ padding: 'clamp(64px, 8vw, 100px) 0' }}>
        <div className="container-wide">
          <div className="swatch-container" style={{ backgroundColor: '#28201C', color: '#F7F2E8', padding: 'clamp(32px, 5vw, 64px)', border: '1px solid rgba(233, 201, 120, 0.25)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
              {/* Swatch Box Graphic */}
              <div>
                <img
                  src="/images/swatch_box.svg"
                  alt="Curated wooden swatch tray with brass and stone roundels"
                  style={{ width: '100%', height: 'auto', display: 'block', border: '1px solid rgba(233, 201, 120, 0.2)' }}
                />
              </div>

              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#E9C978', letterSpacing: '0.2em', display: 'block', marginBottom: '8px' }}>
                  MATERIAL SAMPLES FOR CLIENT PRESENTATIONS
                </span>
                <h2 style={{ fontFamily: 'var(--font-theater)', fontSize: 'clamp(36px, 4.5vw, 56px)', lineHeight: 1.05 }}>
                  The Atelier Sample Box.
                </h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#D7CDBD', marginTop: '16px', lineHeight: 1.6 }}>
                  Select material discs to be packed into a hand-numbered smoked oak presentation box and dispatched directly to your practice or client residence.
                </p>

                {/* Interactive Material Chips */}
                <div style={{ marginTop: '24px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {[
                    'Aged Brass',
                    'Dark Bronze',
                    'Fluted Opal Glass',
                    'Chalk Plaster',
                    'Raw Travertine',
                    'Blackened Steel',
                    'Smoked Oak'
                  ].map((mat) => {
                    const isSelected = selectedSamples.includes(mat);
                    return (
                      <button
                        key={mat}
                        onClick={() => toggleSample(mat)}
                        style={{
                          padding: '10px 18px',
                          backgroundColor: isSelected ? '#E9C978' : 'rgba(255, 255, 255, 0.08)',
                          color: isSelected ? '#1E1C1A' : '#F7F2E8',
                          border: isSelected ? '1px solid #E9C978' : '1px solid rgba(255, 255, 255, 0.15)',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontFamily: 'var(--font-mono)',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {isSelected ? '✓ ' : '+ '} {mat}
                      </button>
                    );
                  })}
                </div>

                <div style={{ marginTop: '32px' }}>
                  {sampleOrdered ? (
                    <div style={{ padding: '16px', backgroundColor: 'rgba(233, 201, 120, 0.15)', border: '1px solid #E9C978', color: '#FFE9C2', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                      ✓ Sample Box Dispatched via DHL Express. Tracking code: OH-SW-99201.
                    </div>
                  ) : (
                    <button
                      onClick={() => setSampleOrdered(true)}
                      className="btn-primary"
                      style={{ padding: '16px 36px', backgroundColor: '#E9C978', color: '#1E1C1A', border: 'none' }}
                    >
                      REQUEST SAMPLES FOR MY STUDIO ({selectedSamples.length} SELECTED)
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          07. CONCIERGE & BESPOKE COMMISSION SCHEDULER
          ===================================================== */}
      <section style={{ padding: '0 0 clamp(80px, 10vw, 140px) 0' }}>
        <div className="container-narrow">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.25em', color: 'var(--oxblood)', display: 'block', marginBottom: '8px' }}>
              DIRECT CONCIERGE
            </span>
            <h2 style={{ fontFamily: 'var(--font-theater)', fontSize: 'clamp(36px, 5vw, 64px)' }}>
              Schedule a Studio Consultation.
            </h2>
            <p style={{ fontFamily: 'var(--font-personality)', fontSize: '20px', fontStyle: 'italic', color: 'var(--espresso)', marginTop: '12px' }}>
              Visit our London foundry or meet with our lighting director via video consultation.
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--parchment)', padding: 'clamp(32px, 5vw, 48px)', border: '1px solid rgba(30, 28, 26, 0.12)' }}>
            {bookingSuccess ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <CheckCircle2 size={44} color="var(--oxblood)" style={{ margin: '0 auto 16px auto' }} />
                <h3 style={{ fontFamily: 'var(--font-theater)', fontSize: '28px' }}>
                  Consultation Confirmed.
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--espresso)', marginTop: '8px' }}>
                  Our Studio Director has reserved <strong>{bookingDate} at 15:00 GMT</strong>. A formal calendar invite and atelier location directions have been dispatched to your email.
                </p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', marginBottom: '8px', color: 'var(--charcoal)' }}>
                    PREFERRED DATE
                  </label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: 'var(--warm-ivory)',
                      border: '1px solid rgba(30, 28, 26, 0.2)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '13px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', marginBottom: '8px', color: 'var(--charcoal)' }}>
                    SESSION FORMAT
                  </label>
                  <select
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: 'var(--warm-ivory)',
                      border: '1px solid rgba(30, 28, 26, 0.2)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px'
                    }}
                  >
                    <option>In-Person: London Foundry &amp; Atelier</option>
                    <option>Virtual: 1-on-1 Lighting CAD Review (Zoom)</option>
                    <option>On-Site: Architectural Project Walkthrough</option>
                  </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <button
                    onClick={() => setBookingSuccess(true)}
                    className="btn-primary"
                    style={{ width: '100%', padding: '14px', fontSize: '12px' }}
                  >
                    CONFIRM CONSULTATION
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
