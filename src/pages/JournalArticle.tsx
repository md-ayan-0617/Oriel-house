import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { JOURNAL_ARTICLES } from '../data/journal';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const JournalArticle: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = JOURNAL_ARTICLES.find((a) => a.slug === slug) || JOURNAL_ARTICLES[0];

  const featuredFixtures = PRODUCTS.filter((p) => article.featuredObjects.includes(p.slug));

  return (
    <article style={{ backgroundColor: 'var(--parchment)', color: 'var(--ink)', minHeight: '100vh', paddingBottom: '120px' }}>
      {/* Article Header & Lead */}
      <section style={{ padding: 'clamp(48px, 8vw, 96px) 0 clamp(32px, 4vw, 56px) 0' }}>
        <div className="container-narrow">
          <Link
            to="/journal"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.15em',
              color: 'var(--stone)',
              marginBottom: '28px'
            }}
          >
            <ArrowLeft size={14} />
            <span>BACK TO THE EVENING PAPER</span>
          </Link>

          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.2em',
              color: 'var(--oxblood)',
              display: 'block',
              marginBottom: '16px'
            }}
          >
            {article.category} &bull; {article.readTime}
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-theater)',
              fontSize: 'clamp(42px, 6.5vw, 84px)',
              lineHeight: 1.02,
              letterSpacing: '-0.02em',
              marginBottom: '28px'
            }}
          >
            {article.title}
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-personality)',
              fontSize: 'clamp(20px, 2.2vw, 28px)',
              fontStyle: 'italic',
              color: 'var(--espresso)',
              lineHeight: 1.4,
              marginBottom: '32px'
            }}
          >
            {article.content.lead}
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--stone)',
              paddingTop: '20px',
              borderTop: '1px solid rgba(30, 28, 26, 0.12)'
            }}
          >
            <div>WORDS BY: <strong>{article.author}</strong> ({article.authorRole})</div>
            <div>&bull;</div>
            <div>{article.date}</div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <div className="container-wide" style={{ marginBottom: 'clamp(48px, 8vw, 80px)' }}>
        <div style={{ width: '100%', aspectRatio: '16/9', maxHeight: '680px', backgroundColor: '#1E1C1A', overflow: 'hidden' }}>
          <img
            src={article.heroImage}
            alt={article.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Body Copy & Pull Quotes */}
      <div className="container-narrow">
        {article.content.sections.map((section, idx) => (
          <div key={idx} style={{ marginBottom: '48px' }}>
            {section.heading && (
              <h2
                style={{
                  fontFamily: 'var(--font-theater)',
                  fontSize: 'clamp(28px, 4vw, 44px)',
                  lineHeight: 1.1,
                  marginBottom: '20px'
                }}
              >
                {section.heading}
              </h2>
            )}

            {section.body.map((para, pIdx) => (
              <p
                key={pIdx}
                style={{
                  fontSize: 'clamp(17px, 1.4vw, 19px)',
                  lineHeight: 1.8,
                  color: 'var(--espresso)',
                  marginBottom: '20px'
                }}
              >
                {para}
              </p>
            ))}

            {section.pullQuote && (
              <blockquote
                style={{
                  fontFamily: 'var(--font-personality)',
                  fontSize: 'clamp(24px, 3.2vw, 36px)',
                  lineHeight: 1.25,
                  fontStyle: 'italic',
                  color: 'var(--oxblood)',
                  borderLeft: '3px solid var(--oxblood)',
                  paddingLeft: '28px',
                  margin: '48px 0'
                }}
              >
                &ldquo;{section.pullQuote}&rdquo;
              </blockquote>
            )}

            {section.caption && (
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--stone)', letterSpacing: '0.1em', marginTop: '12px' }}>
                FIG // {section.caption}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* OBJECTS IN THIS STORY */}
      {featuredFixtures.length > 0 && (
        <section
          style={{
            marginTop: '80px',
            paddingTop: '64px',
            borderTop: '1px solid rgba(30, 28, 26, 0.12)'
          }}
        >
          <div className="container-wide">
            <div style={{ marginBottom: '32px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', color: 'var(--stone)' }}>
                FEATURED IN THIS ESSAY
              </span>
              <h3 style={{ fontFamily: 'var(--font-theater)', fontSize: '38px', marginTop: '4px' }}>
                Objects in this Story.
              </h3>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 'clamp(24px, 4vw, 48px)'
              }}
            >
              {featuredFixtures.map((f) => (
                <ProductCard key={f.id} product={f} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
};
