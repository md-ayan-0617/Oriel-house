import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight, Check, Shield, Clock } from 'lucide-react';
import { useStore } from '../store/useStore';
import { LampToggle } from './LampToggle';
import { LampViewer3D } from './three/LampViewer3D';

export const ProductQuickView: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToBag,
    formatPrice,
    setCursor,
    resetCursor
  } = useStore();

  const [selectedFinishIndex, setSelectedFinishIndex] = useState(0);
  const [isLit, setIsLit] = useState(true);
  const [show3D, setShow3D] = useState(false);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const currentFinish = product.finishes[selectedFinishIndex] || product.finishes[0];

  const handleAdd = () => {
    addToBag(product, currentFinish, 1);
    setQuickViewProduct(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} Quick View`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: 'rgba(20, 18, 16, 0.75)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.25s ease'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setQuickViewProduct(null);
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '920px',
          maxHeight: '90vh',
          backgroundColor: 'var(--warm-ivory)',
          color: 'var(--ink)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflowY: 'auto',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 10,
            padding: '8px',
            border: '1px solid rgba(30, 28, 26, 0.2)',
            backgroundColor: 'var(--warm-ivory)'
          }}
          onMouseEnter={() => setCursor('CLOSE', 'view')}
          onMouseLeave={resetCursor}
        >
          <X size={18} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))' }}>
          {/* Left Media Column */}
          <div
            style={{
              position: 'relative',
              backgroundColor: isLit ? 'var(--espresso)' : 'var(--parchment)',
              minHeight: '420px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
              transition: 'background-color 0.5s ease'
            }}
          >
            {show3D && product.model3d ? (
              <LampViewer3D finishColor={currentFinish.swatch} isLightOn={isLit} />
            ) : (
              <img
                src={isLit ? product.onImage : product.offImage}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  maxHeight: '460px',
                  objectFit: 'contain',
                  transition: 'opacity 0.4s ease'
                }}
              />
            )}

            {/* Bottom Media Controls */}
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'rgba(247, 242, 232, 0.85)',
                padding: '8px 12px',
                borderRadius: '2px'
              }}
            >
              <LampToggle isOn={isLit} onToggle={setIsLit} />

              {product.model3d && (
                <button
                  onClick={() => setShow3D(!show3D)}
                  style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.08em',
                    textDecoration: 'underline'
                  }}
                >
                  {show3D ? 'VIEW IMAGE' : 'INTERACTIVE 3D'}
                </button>
              )}
            </div>
          </div>

          {/* Right Product Details Column */}
          <div style={{ padding: 'clamp(24px, 4vw, 44px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', color: 'var(--stone)' }}>
                {product.categoryLabel.toUpperCase()} &bull; {product.collectionLabel.toUpperCase()}
              </span>

              <h2 style={{ fontFamily: 'var(--font-theater)', fontSize: '38px', lineHeight: 1.05, marginTop: '4px' }}>
                {product.name}
              </h2>

              <p style={{ fontFamily: 'var(--font-personality)', fontSize: '16px', fontStyle: 'italic', color: 'var(--espresso)', marginTop: '4px' }}>
                "{product.subtitle}"
              </p>

              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', fontWeight: 600, marginTop: '16px' }}>
                {formatPrice(product.price)}
              </p>

              <p style={{ fontSize: '14px', lineHeight: 1.6, marginTop: '16px', opacity: 0.85 }}>
                {product.description}
              </p>

              {/* Finish Selector */}
              <div style={{ marginTop: '24px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em', display: 'block', marginBottom: '8px' }}>
                  SELECT FINISH: <strong style={{ color: 'var(--oxblood)' }}>{currentFinish.name}</strong>
                </span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {product.finishes.map((f, idx) => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFinishIndex(idx)}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '2px',
                        backgroundColor: f.swatch,
                        border: selectedFinishIndex === idx ? '2px solid var(--ink)' : '1px solid rgba(0,0,0,0.15)',
                        boxShadow: selectedFinishIndex === idx ? '0 0 0 2px var(--warm-ivory)' : 'none',
                        position: 'relative'
                      }}
                      title={f.name}
                    >
                      {selectedFinishIndex === idx && (
                        <Check size={14} color={idx === 1 ? '#1E1C1A' : '#FFF'} style={{ margin: 'auto' }} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specs Snapshot */}
              <div
                style={{
                  marginTop: '20px',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(30, 28, 26, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--stone)'
                }}
              >
                <div>DIMENSIONS: {product.dimensions}</div>
                <div>BULB: {product.bulb}</div>
                <div>LEAD TIME: {product.leadTime}</div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={handleAdd}
                className="btn-primary"
                style={{ width: '100%', padding: '16px' }}
              >
                ADD TO BAG &bull; {formatPrice(product.price)}
              </button>

              <Link
                to={`/product/${product.slug}`}
                onClick={() => setQuickViewProduct(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.08em',
                  padding: '8px',
                  color: 'var(--espresso)',
                  textDecoration: 'underline'
                }}
              >
                <span>VIEW FULL ARCHITECTURAL SPECIFICATION</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
