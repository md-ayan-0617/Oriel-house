import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, ShieldCheck, Clock } from 'lucide-react';
import { useStore } from '../store/useStore';

export const BagPage: React.FC = () => {
  const { bag, updateBagQuantity, removeFromBag, formatPrice, clearBag } = useStore();

  const subtotal = bag.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div style={{ backgroundColor: 'var(--warm-ivory)', minHeight: '100vh', paddingBottom: '120px' }}>
      <section style={{ padding: 'clamp(64px, 10vw, 120px) 0 clamp(32px, 4vw, 56px) 0', borderBottom: '1px solid rgba(30, 28, 26, 0.08)' }}>
        <div className="container-wide">
          <Link
            to="/shop"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.15em',
              color: 'var(--stone)',
              marginBottom: '20px'
            }}
          >
            <ArrowLeft size={14} />
            <span>CONTINUE SHOPPING</span>
          </Link>

          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.25em', color: 'var(--oxblood)', display: 'block', marginBottom: '12px' }}>
            STUDIO RESERVATION &bull; {bag.length} OBJECTS
          </span>

          <h1 style={{ fontFamily: 'var(--font-theater)', fontSize: 'var(--text-mega)', lineHeight: 0.92 }}>
            YOUR BAG.
          </h1>
        </div>
      </section>

      <section style={{ paddingTop: '56px' }}>
        <div className="container-wide">
          {bag.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ fontFamily: 'var(--font-personality)', fontSize: '24px', color: 'var(--espresso)' }}>
                Your bag is currently empty.
              </p>
              <Link to="/shop" className="btn-primary" style={{ marginTop: '24px' }}>
                <span>DISCOVER LIGHTING &rarr;</span>
              </Link>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.4fr 1fr',
                gap: 'clamp(32px, 6vw, 64px)',
                alignItems: 'start'
              }}
              className="editorial-card-grid"
            >
              {/* Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {bag.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      gap: '24px',
                      paddingBottom: '32px',
                      borderBottom: '1px solid rgba(30, 28, 26, 0.1)'
                    }}
                  >
                    <img
                      src={item.product.onImage}
                      alt={item.product.name}
                      style={{ width: '120px', height: '120px', objectFit: 'cover', backgroundColor: 'var(--parchment)' }}
                    />

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                          <Link to={`/product/${item.product.slug}`}>
                            <h3 style={{ fontFamily: 'var(--font-theater)', fontSize: '24px' }}>
                              {item.product.name}
                            </h3>
                          </Link>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', fontWeight: 600 }}>
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>

                        <p style={{ fontSize: '13px', color: 'var(--espresso)', marginTop: '4px' }}>
                          Finish: {item.finish.name}
                        </p>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', color: 'var(--terracotta)' }}>
                          <Clock size={13} />
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
                            Lead time: {item.product.leadTime}
                          </span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
                        <div style={{ display: 'inline-flex', border: '1px solid var(--ink)' }}>
                          <button onClick={() => updateBagQuantity(item.id, item.quantity - 1)} style={{ padding: '4px 12px' }}>-</button>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', padding: '0 10px' }}>{item.quantity}</span>
                          <button onClick={() => updateBagQuantity(item.id, item.quantity + 1)} style={{ padding: '4px 12px' }}>+</button>
                        </div>

                        <button onClick={() => removeFromBag(item.id)} style={{ color: 'var(--stone)', padding: '4px' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div
                style={{
                  padding: '36px',
                  backgroundColor: 'var(--parchment)',
                  border: '1px solid rgba(30, 28, 26, 0.12)'
                }}
              >
                <h3 style={{ fontFamily: 'var(--font-theater)', fontSize: '28px', marginBottom: '24px' }}>
                  Order Summary
                </h3>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '15px' }}>
                  <span>Subtotal</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{formatPrice(subtotal)}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '15px' }}>
                  <span>White-Glove Shipping</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--stone)' }}>Calculated at next step</span>
                </div>

                <div
                  style={{
                    paddingTop: '20px',
                    marginTop: '20px',
                    borderTop: '1px solid rgba(30, 28, 26, 0.12)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '18px',
                    fontWeight: 700
                  }}
                >
                  <span>Total</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>{formatPrice(subtotal)}</span>
                </div>

                <button
                  onClick={() => alert(`ORIEL HOUSE Checkout: Handcrafted studio ticket created for ${formatPrice(subtotal)}.`)}
                  className="btn-primary"
                  style={{ width: '100%', padding: '16px', marginTop: '28px' }}
                >
                  <span>PROCEED TO CHECKOUT &rarr;</span>
                </button>

                <div style={{ marginTop: '16px' }}>
                  <Link
                    to="/trade/apply"
                    className="btn-outline"
                    style={{ width: '100%', padding: '12px', fontSize: '12px', textAlign: 'center' }}
                  >
                    REQUEST TRADE INVOICE &amp; SPEC
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
