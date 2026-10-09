import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { JOURNAL_ARTICLES } from '../data/journal';
import { useStore } from '../store/useStore';

const CATEGORIES = ['ALL', 'LIGHTING ESSAY', 'ARCHITECTURAL CRITIQUE', 'DOMESTIC RITUAL', 'PHOTO ESSAY'];

export const Journal: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState('ALL');
  const { setCursor, resetCursor } = useStore();

  const filteredArticles = selectedCat === 'ALL'
    ? JOURNAL_ARTICLES
    : JOURNAL_ARTICLES.filter((a) => a.category.toUpperCase() === selectedCat);

  const featured = filteredArticles[0] || JOURNAL_ARTICLES[0];
  const remaining = filteredArticles.slice(1);

  return (
    <div style={{ backgroundColor: 'var(--parchment)', color: 'var(--ink)', minHeight: '100vh', paddingBottom: '120px' }}>
      {/* Editorial Header */}
      <section style={{ padding: 'clamp(80px, 12vw, 150px) 0 clamp(40px, 5vw, 70px) 0', borderBottom: '1px solid rgba(30, 28, 26, 0.1)' }}>
        <div className="container-wide">
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.25em', color: 'var(--oxblood)', display: 'block', marginBottom: '14px' }}>
            HOUSE NOTES &bull; VOL. IV
          </span>

          <h1 style={{ fontFamily: 'var(--font-theater)', fontSize: 'var(--text-mega)', lineHeight: 0.92, letterSpacing: '-0.03em' }}>
            THE EVENING PAPER.
          </h1>

          <p style={{ fontFamily: 'var(--font-personality)', fontSize: 'clamp(20px, 2.5vw, 30px)', fontStyle: 'italic', color: 'var(--espresso)', marginTop: '20px', maxWidth: '780px' }}>
            Journal of light, rooms, objects, places, and the people who stay up late.
          </p>

          {/* Filter Categories Bar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '40px' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  padding: '6px 14px',
                  backgroundColor: selectedCat === cat ? 'var(--ink)' : 'transparent',
                  color: selectedCat === cat ? 'var(--warm-ivory)' : 'var(--ink)',
                  border: '1px solid var(--ink)',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Lead Story (Large Format) */}
      <section style={{ padding: 'clamp(48px, 8vw, 84px) 0', borderBottom: '1px solid rgba(30, 28, 26, 0.1)' }}>
        <div className="container-wide">
          <Link
            to={`/journal/${featured.slug}`}
            style={{
              display: 'grid',
              gridTemplateColumns: '1.4fr 1fr',
              gap: 'clamp(32px, 6vw, 64px)',
              alignItems: 'center'
            }}
            className="editorial-card-grid"
            onMouseEnter={() => setCursor('READ', 'read')}
            onMouseLeave={resetCursor}
          >
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10', backgroundColor: '#1E1C1A', overflow: 'hidden' }}>
              <img
                src={featured.heroImage}
                alt={featured.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', color: 'var(--oxblood)' }}>
                FEATURE ESSAY &bull; {featured.readTime}
              </span>

              <h2 style={{ fontFamily: 'var(--font-theater)', fontSize: 'clamp(32px, 4.5vw, 60px)', lineHeight: 1.05, marginTop: '8px' }}>
                {featured.title}
              </h2>

              <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--espresso)', marginTop: '16px' }}>
                {featured.excerpt}
              </p>

              <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--stone)' }}>
                <span>BY {featured.author.toUpperCase()}</span>
                <span>&bull;</span>
                <span>{featured.date}</span>
              </div>

              <div style={{ marginTop: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--oxblood)', fontWeight: 600, fontSize: '14px' }}>
                <span>READ COMPLETE ESSAY</span>
                <ArrowRight size={16} />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Editorial Grid: Varied layout styles */}
      {remaining.length > 0 && (
        <section style={{ paddingTop: '64px' }}>
          <div className="container-wide">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 'clamp(32px, 5vw, 56px)'
              }}
            >
              {remaining.map((article) => (
                <Link
                  key={article.slug}
                  to={`/journal/${article.slug}`}
                  style={{ display: 'flex', flexDirection: 'column' }}
                  onMouseEnter={() => setCursor('READ', 'read')}
                  onMouseLeave={resetCursor}
                >
                  <div style={{ width: '100%', aspectRatio: '4/3', overflow: 'hidden', backgroundColor: '#1E1C1A' }}>
                    <img
                      src={article.heroImage}
                      alt={article.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <div style={{ marginTop: '18px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--terracotta)', letterSpacing: '0.15em' }}>
                      {article.category} &bull; {article.readTime}
                    </span>

                    <h3 style={{ fontFamily: 'var(--font-theater)', fontSize: '26px', lineHeight: 1.15, marginTop: '6px' }}>
                      {article.title}
                    </h3>

                    <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--espresso)', opacity: 0.85, marginTop: '8px' }}>
                      {article.excerpt}
                    </p>

                    <div style={{ marginTop: '12px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--stone)' }}>
                      {article.author} &bull; {article.date}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
