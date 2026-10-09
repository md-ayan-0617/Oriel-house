import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, ShoppingBag } from 'lucide-react';
import { useStore } from '../store/useStore';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlist } = useStore();
  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.slug));

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
            <span>CONTINUE BROWSING</span>
          </Link>

          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.25em', color: 'var(--oxblood)', display: 'block', marginBottom: '12px' }}>
            SAVED OBJECTS &bull; {savedProducts.length} FIXTURES
          </span>

          <h1 style={{ fontFamily: 'var(--font-theater)', fontSize: 'var(--text-mega)', lineHeight: 0.92 }}>
            THINGS FOR LATER.
          </h1>
        </div>
      </section>

      <section style={{ paddingTop: '56px' }}>
        <div className="container-wide">
          {savedProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ fontFamily: 'var(--font-personality)', fontSize: '24px', color: 'var(--espresso)' }}>
                Your saved wishlist is currently empty.
              </p>
              <p style={{ fontSize: '15px', color: 'var(--stone)', marginTop: '8px', marginBottom: '24px' }}>
                Save fixtures while exploring rooms and collections.
              </p>
              <Link to="/shop" className="btn-primary">
                <span>EXPLORE ALL LIGHTING &rarr;</span>
              </Link>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: 'clamp(32px, 5vw, 64px)'
              }}
            >
              {savedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
