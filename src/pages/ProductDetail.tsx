import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, Download, Heart, Shield, Clock, Box, Sparkles, Sliders } from 'lucide-react';
import { PRODUCTS, Product } from '../data/products';
import { useStore } from '../store/useStore';
import { LampToggle } from '../components/LampToggle';
import { LampViewer3D } from '../components/three/LampViewer3D';
import { ProductCard } from '../components/ProductCard';

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToBag, toggleWishlist, isInWishlist, addRecentlyViewed, formatPrice, setCursor, resetCursor } = useStore();

  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];

  const [selectedFinishIndex, setSelectedFinishIndex] = useState(0);
  const [isLit, setIsLit] = useState(true);
  const [timeState, setTimeState] = useState<'day' | 'dusk' | 'night'>('night');
  const [activeMediaTab, setActiveMediaTab] = useState<'photo' | '3d' | 'room'>('photo');
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string>('specs');

  // Track recently viewed
  useEffect(() => {
    if (product) {
      addRecentlyViewed(product.slug);
      window.scrollTo(0, 0);
    }
  }, [product, addRecentlyViewed]);

  const currentFinish = product.finishes[selectedFinishIndex] || product.finishes[0];
  const isSaved = isInWishlist(product.slug);

  const relatedProducts = PRODUCTS.filter((p) => product.relatedProducts?.includes(p.slug));

  const handleAdd = () => {
    addToBag(product, currentFinish, quantity);
  };

  return (
    <div style={{ backgroundColor: 'var(--warm-ivory)', minHeight: '100vh', paddingBottom: '120px' }}>
      {/* Top Breadcrumb */}
      <div className="container-wide" style={{ paddingTop: '32px', paddingBottom: '16px' }}>
        <Link
          to="/shop"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.1em',
            color: 'var(--stone)'
          }}
        >
          <ArrowLeft size={14} />
          <span>ALL LIGHTING // {product.categoryLabel.toUpperCase()}</span>
        </Link>
      </div>

      {/* Main Split Section: 60% Media / 40% Product Details */}
      <section className="container-wide" style={{ paddingTop: '16px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.3fr 1fr',
            gap: 'clamp(32px, 6vw, 84px)',
            alignItems: 'start'
          }}
          className="product-detail-grid"
        >
          {/* =====================================================
              LEFT COLUMN (60%): PRODUCT MEDIA GALLERY & 3D
              ===================================================== */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Media Mode Tabs (Photography / 3D Canvas / Room In-Situ) */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setActiveMediaTab('photo')}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  padding: '8px 16px',
                  border: activeMediaTab === 'photo' ? '1px solid var(--ink)' : '1px solid rgba(30, 28, 26, 0.15)',
                  backgroundColor: activeMediaTab === 'photo' ? 'var(--ink)' : 'transparent',
                  color: activeMediaTab === 'photo' ? 'var(--warm-ivory)' : 'inherit'
                }}
              >
                STUDIO PHOTOGRAPHY
              </button>

              {product.model3d && (
                <button
                  onClick={() => setActiveMediaTab('3d')}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    padding: '8px 16px',
                    border: activeMediaTab === '3d' ? '1px solid var(--ink)' : '1px solid rgba(30, 28, 26, 0.15)',
                    backgroundColor: activeMediaTab === '3d' ? 'var(--ink)' : 'transparent',
                    color: activeMediaTab === '3d' ? 'var(--warm-ivory)' : 'inherit',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Box size={14} />
                  <span>INTERACTIVE 3D</span>
                </button>
              )}

              {product.roomImages.length > 0 && (
                <button
                  onClick={() => setActiveMediaTab('room')}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    padding: '8px 16px',
                    border: activeMediaTab === 'room' ? '1px solid var(--ink)' : '1px solid rgba(30, 28, 26, 0.15)',
                    backgroundColor: activeMediaTab === 'room' ? 'var(--ink)' : 'transparent',
                    color: activeMediaTab === 'room' ? 'var(--warm-ivory)' : 'inherit'
                  }}
                >
                  ROOM CONTEXT
                </button>
              )}
            </div>

            {/* Primary Display Stage */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1/1',
                backgroundColor: isLit ? '#1E1A17' : '#F0E9DD',
                overflow: 'hidden',
                borderRadius: '2px',
                transition: 'background-color 0.8s ease'
              }}
            >
              {activeMediaTab === '3d' && product.model3d ? (
                <LampViewer3D finishColor={currentFinish.swatch} isLightOn={isLit} />
              ) : activeMediaTab === 'room' && product.roomImages[0] ? (
                <img
                  src={product.roomImages[0]}
                  alt={`${product.name} in room`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <>
                  {/* Daylight Unlit Image */}
                  <img
                    src={product.offImage}
                    alt={`${product.name} unlit`}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      padding: '40px',
                      opacity: isLit ? 0 : 1,
                      transition: 'opacity 0.7s cubic-bezier(0.25, 1, 0.5, 1)'
                    }}
                  />
                  {/* Evening Lit Image */}
                  <img
                    src={product.onImage}
                    alt={`${product.name} illuminated`}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      padding: '40px',
                      opacity: isLit ? 1 : 0,
                      transition: 'opacity 0.7s cubic-bezier(0.25, 1, 0.5, 1)'
                    }}
                  />
                </>
              )}

              {/* Bottom Interactive Control Strip (OFF / ON switch) */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  right: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: 'rgba(247, 242, 232, 0.88)',
                  backdropFilter: 'blur(8px)',
                  padding: '10px 16px',
                  borderRadius: '2px'
                }}
              >
                <LampToggle isOn={isLit} onToggle={setIsLit} />

                {/* Day / Dusk / Night quick ambiance */}
                <div style={{ display: 'flex', gap: '6px' }}>
                  {(['day', 'dusk', 'night'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setTimeState(t);
                        setIsLit(t !== 'day');
                      }}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        letterSpacing: '0.1em',
                        padding: '4px 8px',
                        textTransform: 'uppercase',
                        border: timeState === t ? '1px solid var(--ink)' : '1px solid transparent',
                        fontWeight: timeState === t ? 700 : 400
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Thumbnail Gallery Below */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
              <div
                onClick={() => { setActiveMediaTab('photo'); setIsLit(false); }}
                style={{
                  aspectRatio: '1/1',
                  backgroundColor: '#F0E9DD',
                  cursor: 'pointer',
                  border: !isLit && activeMediaTab === 'photo' ? '2px solid var(--oxblood)' : '1px solid rgba(0,0,0,0.1)'
                }}
              >
                <img src={product.offImage} alt="Unlit packshot" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              <div
                onClick={() => { setActiveMediaTab('photo'); setIsLit(true); }}
                style={{
                  aspectRatio: '1/1',
                  backgroundColor: '#1E1A17',
                  cursor: 'pointer',
                  border: isLit && activeMediaTab === 'photo' ? '2px solid var(--oxblood)' : '1px solid rgba(0,0,0,0.1)'
                }}
              >
                <img src={product.onImage} alt="Lit packshot" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {product.roomImages[0] && (
                <div
                  onClick={() => setActiveMediaTab('room')}
                  style={{
                    aspectRatio: '1/1',
                    backgroundColor: '#1E1A17',
                    cursor: 'pointer',
                    border: activeMediaTab === 'room' ? '2px solid var(--oxblood)' : '1px solid rgba(0,0,0,0.1)'
                  }}
                >
                  <img src={product.roomImages[0]} alt="Room environment" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}

              <div
                onClick={() => setActiveMediaTab('photo')}
                style={{
                  aspectRatio: '1/1',
                  backgroundColor: '#EAE1D1',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px',
                  textAlign: 'center'
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--stone)' }}>
                  SCALE &bull; SPECS
                </span>
                <span style={{ fontSize: '11px', fontWeight: 600, marginTop: '2px' }}>
                  {product.dimensions.split('(')[0]}
                </span>
              </div>
            </div>
          </div>

          {/* =====================================================
              RIGHT COLUMN (40%): PRODUCT SPEC & COMMERCE
              ===================================================== */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.2em',
                color: 'var(--stone)',
                display: 'block',
                marginBottom: '8px'
              }}
            >
              {product.categoryLabel.toUpperCase()} // {product.collectionLabel.toUpperCase()}
            </span>

            <h1
              style={{
                fontFamily: 'var(--font-theater)',
                fontSize: 'var(--text-product-hero)',
                lineHeight: 1
              }}
            >
              {product.name}
            </h1>

            <p
              style={{
                fontFamily: 'var(--font-personality)',
                fontSize: '22px',
                fontStyle: 'italic',
                color: 'var(--oxblood)',
                marginTop: '6px'
              }}
            >
              "{product.subtitle}"
            </p>

            {/* Price & Stock */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginTop: '20px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '26px', fontWeight: 600 }}>
                {formatPrice(product.price)}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--terracotta)', letterSpacing: '0.1em' }}>
                [{product.stockStatus.toUpperCase()}]
              </span>
            </div>

            <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--espresso)', marginTop: '20px' }}>
              {product.description}
            </p>

            {/* Finish Selector with Texture & Swatch */}
            <div style={{ marginTop: '32px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', display: 'block', marginBottom: '10px' }}>
                MATERIAL FINISH: <strong style={{ color: 'var(--oxblood)' }}>{currentFinish.name}</strong>
              </span>
              <div style={{ display: 'flex', gap: '12px' }}>
                {product.finishes.map((f, idx) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFinishIndex(idx)}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '2px',
                      backgroundColor: f.swatch,
                      border: selectedFinishIndex === idx ? '2px solid var(--ink)' : '1px solid rgba(0,0,0,0.2)',
                      boxShadow: selectedFinishIndex === idx ? '0 0 0 2px var(--warm-ivory)' : 'none',
                      position: 'relative'
                    }}
                    title={f.name}
                  >
                    {selectedFinishIndex === idx && (
                      <Check size={16} color={idx === 1 ? '#1E1C1A' : '#FFF'} style={{ margin: 'auto' }} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Lead Time Notice */}
            <div
              style={{
                marginTop: '28px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                backgroundColor: 'var(--parchment)',
                border: '1px solid rgba(30, 28, 26, 0.08)'
              }}
            >
              <Clock size={16} color="var(--terracotta)" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.05em' }}>
                PRODUCTION TIME: {product.leadTime} &bull; Handcrafted in studio
              </span>
            </div>

            {/* Purchase CTA Row */}
            <div style={{ marginTop: '28px', display: 'flex', gap: '12px', alignItems: 'center' }}>
              {/* Quantity */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid var(--text-current)',
                  height: '52px'
                }}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ padding: '0 14px', fontSize: '16px' }}
                >
                  -
                </button>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', padding: '0 8px' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ padding: '0 14px', fontSize: '16px' }}
                >
                  +
                </button>
              </div>

              {/* Add to Bag */}
              <button
                onClick={handleAdd}
                className="btn-primary"
                style={{ flex: 1, height: '52px' }}
                onMouseEnter={() => setCursor('ADD', 'add')}
                onMouseLeave={resetCursor}
              >
                <span>ADD TO BAG &bull; {formatPrice(product.price * quantity)}</span>
              </button>

              {/* Wishlist toggle */}
              <button
                onClick={() => toggleWishlist(product.slug)}
                style={{
                  width: '52px',
                  height: '52px',
                  border: '1px solid var(--text-current)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isSaved ? 'var(--oxblood)' : 'inherit'
                }}
                aria-label="Wishlist"
              >
                <Heart size={18} fill={isSaved ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Trade Spec Option */}
            <div style={{ marginTop: '16px' }}>
              <Link
                to="/trade/apply"
                className="btn-outline"
                style={{ width: '100%', padding: '12px', fontSize: '12px', textAlign: 'center' }}
              >
                REQUEST TRADE SPEC &amp; SAMPLES &rarr;
              </Link>
            </div>

            {/* Architectural Specification Accordions */}
            <div style={{ marginTop: '40px', borderTop: '1px solid rgba(30, 28, 26, 0.12)' }}>
              {[
                {
                  id: 'specs',
                  title: 'DIMENSIONS & WEIGHT',
                  content: (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <p><strong>Overall:</strong> {product.dimensions}</p>
                      <p><strong>Weight:</strong> {product.weight}</p>
                      <p><strong>Mounting:</strong> {product.voltage}</p>
                    </div>
                  )
                },
                {
                  id: 'electrical',
                  title: 'ELECTRICAL & ILLUMINATION',
                  content: (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <p><strong>Bulb Source:</strong> {product.bulb}</p>
                      <p><strong>Voltage:</strong> {product.voltage}</p>
                      <p><strong>Certifications:</strong> {product.certifications.join(', ')}</p>
                    </div>
                  )
                },
                {
                  id: 'care',
                  title: 'MATERIAL CARE & PATINA',
                  content: <p>{product.care}</p>
                },
                {
                  id: 'downloads',
                  title: 'SPECIFICATION DOWNLOADS',
                  content: (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <a
                        href={product.specSheet}
                        onClick={(e) => { e.preventDefault(); alert(`Downloading architectural cut-sheet: ${product.name}`); }}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'underline' }}
                      >
                        <Download size={14} />
                        <span>ARCHITECTURAL SPECIFICATION CUT-SHEET (PDF)</span>
                      </a>
                      <a
                        href={product.installationGuide}
                        onClick={(e) => { e.preventDefault(); alert(`Downloading installation guide: ${product.name}`); }}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'underline' }}
                      >
                        <Download size={14} />
                        <span>INSTALLATION &amp; WIRING MANUAL (PDF)</span>
                      </a>
                    </div>
                  )
                }
              ].map((section) => (
                <div key={section.id} style={{ borderBottom: '1px solid rgba(30, 28, 26, 0.12)' }}>
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === section.id ? '' : section.id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '16px 0',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      letterSpacing: '0.12em',
                      textAlign: 'left'
                    }}
                  >
                    <span>{section.title}</span>
                    <span>{activeAccordion === section.id ? '—' : '+'}</span>
                  </button>
                  {activeAccordion === section.id && (
                    <div style={{ paddingBottom: '18px', fontSize: '13px', lineHeight: 1.6, color: 'var(--espresso)' }}>
                      {section.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHERE THIS OBJECT LIVES WELL */}
      <section style={{ marginTop: '100px', padding: '80px 0', backgroundColor: 'var(--parchment)' }}>
        <div className="container-wide">
          <div style={{ maxWidth: '640px', marginBottom: '32px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', color: 'var(--oxblood)' }}>
              DOMESTIC SETTINGS
            </span>
            <h3 style={{ fontFamily: 'var(--font-theater)', fontSize: '38px', marginTop: '4px' }}>
              Where {product.name} Lives Well.
            </h3>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {product.recommendedRooms.map((room) => (
              <span
                key={room}
                style={{
                  padding: '12px 24px',
                  backgroundColor: 'var(--warm-ivory)',
                  border: '1px solid rgba(30, 28, 26, 0.12)',
                  fontFamily: 'var(--font-personality)',
                  fontSize: '18px'
                }}
              >
                &bull; {room}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* LIVES WELL WITH (COMPLEMENTARY FIXTURES) */}
      {relatedProducts.length > 0 && (
        <section style={{ marginTop: '80px' }}>
          <div className="container-wide">
            <div style={{ marginBottom: '40px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', color: 'var(--stone)' }}>
                HARMONIC SUITE
              </span>
              <h3 style={{ fontFamily: 'var(--font-theater)', fontSize: '38px', marginTop: '4px' }}>
                Lives Well With.
              </h3>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 'clamp(24px, 4vw, 48px)'
              }}
            >
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        @media (max-width: 900px) {
          .product-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
