import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart } from 'lucide-react';
import { Product } from '../data/products';
import { useStore } from '../store/useStore';

interface EditorialProductCardProps {
  product: Product;
  quote?: string;
  reverse?: boolean;
}

export const EditorialProductCard: React.FC<EditorialProductCardProps> = ({
  product,
  quote,
  reverse = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isInWishlist, toggleWishlist, formatPrice, setCursor, resetCursor } = useStore();

  const isSaved = isInWishlist(product.slug);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: reverse ? '1fr 1.2fr' : '1.2fr 1fr',
        gap: 'clamp(24px, 5vw, 64px)',
        alignItems: 'center',
        padding: 'clamp(32px, 6vw, 80px) 0'
      }}
      className="editorial-card-grid"
    >
      {/* Visual Media Column */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1/1',
          overflow: 'hidden',
          backgroundColor: 'var(--card-bg)',
          order: reverse ? 2 : 1
        }}
        onMouseEnter={() => {
          setIsHovered(true);
          setCursor('LIGHT', 'light');
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          resetCursor();
        }}
      >
        <Link to={`/product/${product.slug}`} style={{ display: 'block', width: '100%', height: '100%' }}>
          <img
            src={product.offImage}
            alt={`${product.name} daylight`}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: isHovered ? 0 : 1,
              transition: 'opacity 0.7s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          />
          <img
            src={product.onImage}
            alt={`${product.name} illuminated`}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.7s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          />
        </Link>

        {/* Ambient Halo */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle, rgba(255, 224, 163, 0.3) 0%, transparent 75%)',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.6s ease',
            pointerEvents: 'none'
          }}
        />

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product.slug)}
          aria-label={isSaved ? 'Saved' : 'Save'}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '40px',
            height: '40px',
            backgroundColor: 'rgba(247, 242, 232, 0.9)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isSaved ? 'var(--oxblood)' : 'var(--ink)'
          }}
        >
          <Heart size={18} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Editorial Content Column */}
      <div style={{ order: reverse ? 1 : 2 }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.2em',
            color: 'var(--terracotta)',
            display: 'block',
            marginBottom: '12px'
          }}
        >
          {product.categoryLabel.toUpperCase()} // EDITION
        </span>

        <h3
          style={{
            fontFamily: 'var(--font-theater)',
            fontSize: 'clamp(36px, 5vw, 68px)',
            lineHeight: 1.05
          }}
        >
          {product.name}
        </h3>

        <p
          style={{
            fontFamily: 'var(--font-personality)',
            fontSize: 'clamp(18px, 2.2vw, 24px)',
            fontStyle: 'italic',
            color: 'var(--oxblood)',
            marginTop: '8px',
            lineHeight: 1.3
          }}
        >
          "{product.subtitle}"
        </p>

        <p
          style={{
            fontSize: 'clamp(15px, 1.3vw, 17px)',
            lineHeight: 1.7,
            color: 'var(--espresso)',
            marginTop: '20px',
            maxWidth: '520px'
          }}
        >
          {product.description}
        </p>

        {quote && (
          <blockquote
            style={{
              fontFamily: 'var(--font-personality)',
              fontSize: '18px',
              borderLeft: '2px solid var(--accent-current)',
              paddingLeft: '16px',
              margin: '24px 0',
              fontStyle: 'italic',
              opacity: 0.9
            }}
          >
            {quote}
          </blockquote>
        )}

        <div style={{ marginTop: '28px', display: 'flex', alignItems: 'center', gap: '24px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 600 }}>
            {formatPrice(product.price)}
          </span>

          <Link
            to={`/product/${product.slug}`}
            className="btn-primary"
            style={{ padding: '14px 28px' }}
          >
            <span>STUDIO DETAILS</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .editorial-card-grid {
            grid-template-columns: 1fr !important;
          }
          .editorial-card-grid > div {
            order: initial !important;
          }
        }
      `}</style>
    </div>
  );
};
