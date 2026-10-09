import React from 'react';
import { Link } from 'react-router-dom';
import { X, Trash2, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { useStore } from '../store/useStore';

export const CartDrawer: React.FC = () => {
  const {
    bag,
    isCartOpen,
    toggleCart,
    removeFromBag,
    updateBagQuantity,
    formatPrice,
    setCursor,
    resetCursor
  } = useStore();

  if (!isCartOpen) return null;

  const subtotal = bag.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: 'rgba(20, 18, 16, 0.65)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        justifyContent: 'flex-end',
        animation: 'fadeIn 0.3s ease'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) toggleCart(false);
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '520px',
          height: '100%',
          backgroundColor: 'var(--warm-ivory)',
          color: 'var(--ink)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 35px rgba(0, 0, 0, 0.25)',
          animation: 'slideInRight 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '28px 32px',
            borderBottom: '1px solid rgba(30, 28, 26, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <h3 style={{ fontFamily: 'var(--font-theater)', fontSize: '28px', lineHeight: 1 }}>
              Your Bag
            </h3>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--stone)', letterSpacing: '0.1em' }}>
              {bag.length} {bag.length === 1 ? 'OBJECT' : 'OBJECTS'} RESERVED
            </span>
          </div>

          <button
            onClick={() => toggleCart(false)}
            aria-label="Close bag"
            style={{
              padding: '8px',
              border: '1px solid rgba(30, 28, 26, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={() => setCursor('CLOSE', 'view')}
            onMouseLeave={resetCursor}
          >
            <X size={18} />
          </button>
        </div>

        {/* Bag Items List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}
        >
          {bag.length === 0 ? (
            <div style={{ margin: 'auto 0', textAlign: 'center', padding: '40px 0' }}>
              <p style={{ fontFamily: 'var(--font-personality)', fontSize: '22px', color: 'var(--espresso)' }}>
                Your bag is currently empty.
              </p>
              <p style={{ fontSize: '14px', color: 'var(--stone)', marginTop: '8px', marginBottom: '24px' }}>
                Explore signature sconces, pendants, and table lights.
              </p>
              <Link
                to="/shop"
                onClick={() => toggleCart(false)}
                className="btn-primary"
                style={{ display: 'inline-flex' }}
              >
                BROWSE LIGHTING &rarr;
              </Link>
            </div>
          ) : (
            bag.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  gap: '20px',
                  paddingBottom: '24px',
                  borderBottom: '1px solid rgba(30, 28, 26, 0.08)'
                }}
              >
                <img
                  src={item.product.onImage}
                  alt={item.product.name}
                  style={{
                    width: '96px',
                    height: '96px',
                    objectFit: 'cover',
                    backgroundColor: 'var(--parchment)'
                  }}
                />

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <h4 style={{ fontFamily: 'var(--font-theater)', fontSize: '20px' }}>
                        {item.product.name}
                      </h4>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 600 }}>
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>

                    <p style={{ fontSize: '12px', color: 'var(--espresso)', marginTop: '2px' }}>
                      Finish: {item.finish.name}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', color: 'var(--terracotta)' }}>
                      <Clock size={12} />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.05em' }}>
                        Lead time: {item.product.leadTime}
                      </span>
                    </div>
                  </div>

                  {/* Quantity and Remove */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        border: '1px solid rgba(30, 28, 26, 0.2)'
                      }}
                    >
                      <button
                        onClick={() => updateBagQuantity(item.id, item.quantity - 1)}
                        style={{ padding: '4px 10px', fontSize: '14px' }}
                      >
                        -
                      </button>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', padding: '0 8px' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateBagQuantity(item.id, item.quantity + 1)}
                        style={{ padding: '4px 10px', fontSize: '14px' }}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromBag(item.id)}
                      style={{ color: 'var(--stone)', padding: '4px', opacity: 0.8 }}
                      title="Remove item"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Subtotal & Action */}
        {bag.length > 0 && (
          <div
            style={{
              padding: '24px 32px',
              borderTop: '1px solid rgba(30, 28, 26, 0.1)',
              backgroundColor: 'rgba(240, 233, 221, 0.5)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                SUBTOTAL
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 600 }}>
                {formatPrice(subtotal)}
              </span>
            </div>

            <p style={{ fontSize: '11px', color: 'var(--stone)', marginBottom: '16px' }}>
              Taxes calculated at dispatch. White-glove insured delivery available.
            </p>

            <button
              onClick={() => {
                alert(`ORIEL HOUSE Order Placed for ${formatPrice(subtotal)}. Thank you! Handcrafted studio production ticket generated.`);
              }}
              className="btn-primary"
              style={{ width: '100%', padding: '16px', marginBottom: '10px' }}
            >
              PROCEED TO CHECKOUT &rarr;
            </button>

            <Link
              to="/trade/apply"
              onClick={() => toggleCart(false)}
              className="btn-outline"
              style={{ width: '100%', padding: '12px', fontSize: '12px', textAlign: 'center' }}
            >
              REQUEST TRADE SPEC &amp; QUOTE
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
