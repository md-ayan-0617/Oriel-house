import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, Plus } from 'lucide-react';
import { Product } from '../data/products';
import { useStore } from '../store/useStore';

interface ProductCardProps {
  product: Product;
  aspectRatio?: string;
  showCategory?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  aspectRatio = '4/5',
  showCategory = true
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const {
    isInWishlist,
    toggleWishlist,
    addToBag,
    formatPrice,
    setQuickViewProduct,
    setCursor,
    resetCursor
  } = useStore();

  const isSaved = isInWishlist(product.slug);

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: 'transparent'
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
      {/* Visual Image Container (Borderless, with OFF -> ON transition) */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio,
          overflow: 'hidden',
          backgroundColor: 'var(--card-bg)',
          transition: 'box-shadow 0.6s ease'
        }}
      >
        <Link to={`/product/${product.slug}`} style={{ display: 'block', width: '100%', height: '100%' }}>
          {/* Unlit Packshot (Day) */}
          <img
            src={product.offImage}
            alt={`${product.name} unlit`}
            loading="lazy"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: isHovered ? 0 : 1,
              transform: isHovered ? 'scale(1.03)' : 'scale(1)',
              transition: 'opacity 0.65s cubic-bezier(0.25, 1, 0.5, 1), transform 0.65s ease'
            }}
          />

          {/* Lit Packshot (Night / Evening glow) */}
          <img
            src={product.onImage}
            alt={`${product.name} illuminated`}
            loading="lazy"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'scale(1)' : 'scale(0.98)',
              transition: 'opacity 0.65s cubic-bezier(0.25, 1, 0.5, 1), transform 0.65s ease'
            }}
          />
        </Link>

        {/* Ambient Halo behind product on hover */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(255, 224, 163, 0.25) 0%, transparent 70%)',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.6s ease',
            pointerEvents: 'none'
          }}
        />

        {/* Top Badges (NEW / 3D Available) */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            display: 'flex',
            gap: '6px',
            pointerEvents: 'none'
          }}
        >
          {product.new && (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                letterSpacing: '0.15em',
                backgroundColor: 'var(--oxblood)',
                color: '#F7F2E8',
                padding: '3px 7px'
              }}
            >
              NEW
            </span>
          )}
          {product.model3d && (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                letterSpacing: '0.12em',
                backgroundColor: 'rgba(30, 28, 26, 0.6)',
                color: '#F7F2E8',
                padding: '3px 7px'
              }}
            >
              3D VIEW
            </span>
          )}
        </div>

        {/* Wishlist Button (Top Right) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.slug);
          }}
          aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '34px',
            height: '34px',
            backgroundColor: 'rgba(247, 242, 232, 0.85)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isSaved ? 'var(--oxblood)' : 'var(--ink)',
            transition: 'transform 0.2s ease, background-color 0.2s ease'
          }}
        >
          <Heart size={16} fill={isSaved ? 'currentColor' : 'none'} />
        </button>

        {/* Quick View Button (Reveals on Hover) */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            right: '12px',
            display: 'flex',
            gap: '8px',
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease'
          }}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              setQuickViewProduct(product);
            }}
            style={{
              flex: 1,
              padding: '10px 14px',
              backgroundColor: 'rgba(30, 28, 26, 0.88)',
              color: '#F7F2E8',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.1em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Eye size={13} />
            <span>QUICK VIEW</span>
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              addToBag(product, product.finishes[0], 1);
            }}
            style={{
              padding: '10px 14px',
              backgroundColor: 'var(--butter)',
              color: 'var(--ink)',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.1em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Add directly to bag"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Link to={`/product/${product.slug}`}>
            <h3
              style={{
                fontFamily: 'var(--font-theater)',
                fontSize: '24px',
                lineHeight: 1.1,
                transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                transition: 'transform 0.4s ease, color 0.4s ease',
                color: isHovered ? 'var(--oxblood)' : 'inherit'
              }}
            >
              {product.name}
            </h3>
          </Link>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 600 }}>
            {formatPrice(product.price)}
          </span>
        </div>

        <p
          style={{
            fontFamily: 'var(--font-personality)',
            fontSize: '13px',
            fontStyle: 'italic',
            opacity: 0.8,
            marginTop: '2px'
          }}
        >
          {product.subtitle}
        </p>

        {showCategory && (
          <div
            style={{
              marginTop: '6px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--stone)', letterSpacing: '0.08em' }}>
              {product.categoryLabel.toUpperCase()} &bull; {product.materials[0]}
            </span>

            {/* Small Finish Swatch Dots */}
            <div style={{ display: 'flex', gap: '4px' }}>
              {product.finishes.map((f) => (
                <span
                  key={f.id}
                  title={f.name}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: f.swatch,
                    border: '1px solid rgba(0,0,0,0.2)'
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
