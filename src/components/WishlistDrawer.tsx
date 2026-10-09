import React from 'react';
import { Link } from 'react-router-dom';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { PRODUCTS } from '../data/products';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    toggleWishlistDrawer,
    toggleWishlist,
    addToBag,
    formatPrice,
    setCursor,
    resetCursor
  } = useStore();

  if (!isWishlistOpen) return null;

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.slug));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Wishlist"
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
        if (e.target === e.currentTarget) toggleWishlistDrawer(false);
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
              Things For Later
            </h3>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--stone)', letterSpacing: '0.1em' }}>
              {savedProducts.length} {savedProducts.length === 1 ? 'OBJECT' : 'OBJECTS'} SAVED
            </span>
          </div>

          <button
            onClick={() => toggleWishlistDrawer(false)}
            aria-label="Close wishlist"
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

        {/* Content */}
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
          {savedProducts.length === 0 ? (
            <div style={{ margin: 'auto 0', textAlign: 'center', padding: '40px 0' }}>
              <p style={{ fontFamily: 'var(--font-personality)', fontSize: '22px', color: 'var(--espresso)' }}>
                No fixtures saved yet.
              </p>
              <p style={{ fontSize: '14px', color: 'var(--stone)', marginTop: '8px', marginBottom: '24px' }}>
                Save lighting objects while exploring the catalogue.
              </p>
              <Link
                to="/shop"
                onClick={() => toggleWishlistDrawer(false)}
                className="btn-primary"
                style={{ display: 'inline-flex' }}
              >
                DISCOVER LIGHTING &rarr;
              </Link>
            </div>
          ) : (
            savedProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  display: 'flex',
                  gap: '20px',
                  paddingBottom: '24px',
                  borderBottom: '1px solid rgba(30, 28, 26, 0.08)'
                }}
              >
                <img
                  src={product.onImage}
                  alt={product.name}
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
                      <Link
                        to={`/product/${product.slug}`}
                        onClick={() => toggleWishlistDrawer(false)}
                      >
                        <h4 style={{ fontFamily: 'var(--font-theater)', fontSize: '20px' }}>
                          {product.name}
                        </h4>
                      </Link>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 600 }}>
                        {formatPrice(product.price)}
                      </span>
                    </div>

                    <p style={{ fontFamily: 'var(--font-personality)', fontSize: '12px', fontStyle: 'italic', color: 'var(--espresso)', marginTop: '2px' }}>
                      {product.subtitle}
                    </p>

                    <p style={{ fontSize: '12px', color: 'var(--stone)', marginTop: '4px' }}>
                      {product.categoryLabel} &bull; {product.finishes[0].name}
                    </p>
                  </div>

                  {/* Actions: Move to Bag & Remove */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
                    <button
                      onClick={() => {
                        addToBag(product, product.finishes[0], 1);
                        toggleWishlist(product.slug);
                      }}
                      className="btn-outline"
                      style={{ padding: '6px 14px', fontSize: '11px', display: 'inline-flex', gap: '6px' }}
                    >
                      <ShoppingBag size={13} />
                      <span>MOVE TO BAG</span>
                    </button>

                    <button
                      onClick={() => toggleWishlist(product.slug)}
                      style={{ color: 'var(--stone)', padding: '4px', opacity: 0.8 }}
                      title="Remove from saved"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
