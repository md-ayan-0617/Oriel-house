import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { COLLECTIONS } from '../data/collections';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const CollectionDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const collection = COLLECTIONS.find((c) => c.slug === slug) || COLLECTIONS[0];

  const collectionProducts = PRODUCTS.filter((p) => p.collection === collection.slug);

  return (
    <div style={{ backgroundColor: 'var(--warm-ivory)', minHeight: '100vh', paddingBottom: '120px' }}>
      {/* Top Hero Banner */}
      <section
        style={{
          position: 'relative',
          minHeight: '65vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'clamp(48px, 6vw, 96px) clamp(20px, 4vw, 64px)',
          backgroundColor: '#1E1C1A',
          color: '#F7F2E8',
          overflow: 'hidden'
        }}
      >
        <img
          src={collection.heroImage}
          alt={collection.name}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.55
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(20, 18, 16, 0.95) 0%, rgba(20, 18, 16, 0.2) 65%)'
          }}
        />

        <div className="container-wide" style={{ position: 'relative', zIndex: 2 }}>
          <Link
            to="/collections"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.15em',
              color: 'var(--butter)',
              marginBottom: '20px'
            }}
          >
            <ArrowLeft size={14} />
            <span>ALL COLLECTIONS</span>
          </Link>

          <h1
            style={{
              fontFamily: 'var(--font-theater)',
              fontSize: 'clamp(52px, 8vw, 110px)',
              lineHeight: 0.95
            }}
          >
            {collection.name}.
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-personality)',
              fontSize: 'clamp(20px, 2.5vw, 28px)',
              fontStyle: 'italic',
              color: '#FFE2A8',
              marginTop: '12px',
              maxWidth: '680px'
            }}
          >
            &ldquo;{collection.editorialQuote}&rdquo;
          </p>
        </div>
      </section>

      {/* Origin Story & Material Palette Section */}
      <section style={{ padding: 'clamp(64px, 8vw, 100px) 0', borderBottom: '1px solid rgba(30, 28, 26, 0.1)' }}>
        <div className="container-wide">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(32px, 6vw, 64px)',
              alignItems: 'start'
            }}
          >
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', color: 'var(--oxblood)' }}>
                ORIGIN &amp; NARRATIVE
              </span>
              <h3 style={{ fontFamily: 'var(--font-theater)', fontSize: '36px', marginTop: '6px' }}>
                Conceived in Domestic Silence.
              </h3>
              <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--espresso)', marginTop: '16px' }}>
                {collection.originStory}
              </p>
            </div>

            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', color: 'var(--stone)' }}>
                MATERIAL CONSTELLATION
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
                {collection.materialsPalette.map((mat) => (
                  <div
                    key={mat}
                    style={{
                      padding: '14px 20px',
                      backgroundColor: 'var(--parchment)',
                      border: '1px solid rgba(30, 28, 26, 0.1)',
                      fontFamily: 'var(--font-personality)',
                      fontSize: '17px'
                    }}
                  >
                    &bull; {mat}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Suite Products Grid */}
      <section style={{ paddingTop: '80px' }}>
        <div className="container-wide">
          <div style={{ marginBottom: '40px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', color: 'var(--stone)' }}>
              OBJECTS IN THIS SUITE
            </span>
            <h3 style={{ fontFamily: 'var(--font-theater)', fontSize: '38px', marginTop: '4px' }}>
              The {collection.name} Fixtures.
            </h3>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: 'clamp(32px, 5vw, 64px)'
            }}
          >
            {collectionProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
