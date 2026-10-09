import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X, Search, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { PRODUCTS } from '../data/products';
import { COLLECTIONS } from '../data/collections';
import { ROOMS } from '../data/rooms';
import { JOURNAL_ARTICLES } from '../data/journal';

export const SearchOverlay: React.FC = () => {
  const { isSearchOpen, toggleSearch, formatPrice, setCursor, resetCursor } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        toggleSearch(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, toggleSearch]);

  if (!isSearchOpen) return null;

  const q = query.trim().toLowerCase();

  const matchedProducts = q
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.materials.some((m) => m.toLowerCase().includes(q)) ||
          p.finishes.some((f) => f.name.toLowerCase().includes(q)) ||
          p.description.toLowerCase().includes(q)
      )
    : [];

  const matchedCollections = q
    ? COLLECTIONS.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.descriptor.toLowerCase().includes(q) ||
          c.originStory.toLowerCase().includes(q)
      )
    : [];

  const matchedRooms = q
    ? ROOMS.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.descriptor.toLowerCase().includes(q) ||
          r.headline.toLowerCase().includes(q)
      )
    : [];

  const matchedJournal = q
    ? JOURNAL_ARTICLES.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.excerpt.toLowerCase().includes(q) ||
          j.category.toLowerCase().includes(q)
      )
    : [];

  const hasResults =
    matchedProducts.length > 0 ||
    matchedCollections.length > 0 ||
    matchedRooms.length > 0 ||
    matchedJournal.length > 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: 'rgba(30, 28, 26, 0.95)',
        backdropFilter: 'blur(16px)',
        color: '#F7F2E8',
        display: 'flex',
        flexDirection: 'column',
        padding: '32px clamp(20px, 5vw, 80px)',
        overflowY: 'auto'
      }}
    >
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', color: '#E9C978' }}>
          SEARCH ARCHIVE // ORIEL HOUSE
        </span>
        <button
          onClick={() => toggleSearch(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            fontFamily: 'var(--font-mono)',
            padding: '8px 16px',
            border: '1px solid rgba(247, 242, 232, 0.25)',
            color: '#F7F2E8'
          }}
          onMouseEnter={() => setCursor('CLOSE', 'view')}
          onMouseLeave={resetCursor}
        >
          <span>CLOSE</span>
          <X size={16} />
        </button>
      </div>

      {/* Big Search Input */}
      <div style={{ position: 'relative', maxWidth: '1000px', width: '100%', margin: '0 auto 48px auto' }}>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="WHAT ARE YOU LOOKING FOR?"
          style={{
            width: '100%',
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: '2px solid rgba(247, 242, 232, 0.3)',
            color: '#F7F2E8',
            fontFamily: 'var(--font-theater)',
            fontSize: 'clamp(28px, 4.5vw, 56px)',
            padding: '16px 0',
            outline: 'none',
            letterSpacing: '-0.01em'
          }}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', opacity: 0.7 }}
          >
            <X size={24} />
          </button>
        )}
      </div>

      {/* Suggested / Popular searches if no query */}
      {!q && (
        <div style={{ maxWidth: '1000px', width: '100%', margin: '0 auto' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.15em',
              color: '#AAA092',
              display: 'block',
              marginBottom: '16px'
            }}
          >
            FREQUENT INQUIRIES
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {['SCONCES', 'DINING PENDANT', 'AGED BRASS', 'TABLE LAMP', 'VILLA ROSA', 'ALABASTER'].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                style={{
                  padding: '8px 18px',
                  border: '1px solid rgba(247, 242, 232, 0.2)',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '13px',
                  letterSpacing: '0.05em',
                  color: '#F7F2E8'
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Live Grouped Results */}
      {q && (
        <div style={{ maxWidth: '1000px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {!hasResults && (
            <div style={{ padding: '40px 0', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-personality)', fontSize: '24px', color: '#D7CDBD' }}>
                No fixtures or stories found for "{query}".
              </p>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: '14px', color: '#AAA092', marginTop: '8px' }}>
                Try searching by finish (e.g., "brass", "plaster") or room (e.g., "dining", "bedside").
              </p>
            </div>
          )}

          {/* 1. Products Result Group */}
          {matchedProducts.length > 0 && (
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  color: '#E9C978',
                  display: 'block',
                  marginBottom: '20px'
                }}
              >
                LIGHTING OBJECTS ({matchedProducts.length})
              </span>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: '24px'
                }}
              >
                {matchedProducts.map((p) => (
                  <Link
                    key={p.id}
                    to={`/product/${p.slug}`}
                    onClick={() => toggleSearch(false)}
                    style={{
                      display: 'flex',
                      gap: '16px',
                      padding: '16px',
                      backgroundColor: 'rgba(40, 32, 28, 0.6)',
                      border: '1px solid rgba(247, 242, 232, 0.1)'
                    }}
                  >
                    <img
                      src={p.onImage}
                      alt={p.name}
                      style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    />
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-theater)', fontSize: '20px', lineHeight: 1.1 }}>
                        {p.name}
                      </h4>
                      <p style={{ fontFamily: 'var(--font-personality)', fontSize: '12px', fontStyle: 'italic', opacity: 0.8 }}>
                        {p.subtitle}
                      </p>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#E9C978', marginTop: '6px' }}>
                        {formatPrice(p.price)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 2. Collections Result Group */}
          {matchedCollections.length > 0 && (
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  color: '#E9C978',
                  display: 'block',
                  marginBottom: '16px'
                }}
              >
                COLLECTIONS ({matchedCollections.length})
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {matchedCollections.map((c) => (
                  <Link
                    key={c.slug}
                    to={`/collections/${c.slug}`}
                    onClick={() => toggleSearch(false)}
                    style={{
                      padding: '16px 20px',
                      backgroundColor: 'rgba(40, 32, 28, 0.4)',
                      border: '1px solid rgba(247, 242, 232, 0.1)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-personality)', fontSize: '22px' }}>{c.name}</h4>
                      <p style={{ fontSize: '13px', color: '#D7CDBD' }}>{c.descriptor}</p>
                    </div>
                    <ArrowRight size={18} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 3. Rooms Result Group */}
          {matchedRooms.length > 0 && (
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  color: '#E9C978',
                  display: 'block',
                  marginBottom: '16px'
                }}
              >
                ROOM STORIES ({matchedRooms.length})
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {matchedRooms.map((r) => (
                  <Link
                    key={r.slug}
                    to={`/rooms/${r.slug}`}
                    onClick={() => toggleSearch(false)}
                    style={{
                      padding: '16px 20px',
                      backgroundColor: 'rgba(40, 32, 28, 0.4)',
                      border: '1px solid rgba(247, 242, 232, 0.1)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-theater)', fontSize: '20px' }}>{r.name}</h4>
                      <p style={{ fontSize: '13px', color: '#D7CDBD' }}>{r.headline}</p>
                    </div>
                    <ArrowRight size={18} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 4. Journal Result Group */}
          {matchedJournal.length > 0 && (
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  color: '#E9C978',
                  display: 'block',
                  marginBottom: '16px'
                }}
              >
                JOURNAL ESSAYS ({matchedJournal.length})
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {matchedJournal.map((j) => (
                  <Link
                    key={j.slug}
                    to={`/journal/${j.slug}`}
                    onClick={() => toggleSearch(false)}
                    style={{
                      padding: '16px 20px',
                      backgroundColor: 'rgba(40, 32, 28, 0.4)',
                      border: '1px solid rgba(247, 242, 232, 0.1)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#91A8BB' }}>
                        {j.category} &bull; {j.readTime}
                      </span>
                      <h4 style={{ fontFamily: 'var(--font-theater)', fontSize: '20px', marginTop: '4px' }}>
                        {j.title}
                      </h4>
                    </div>
                    <ArrowRight size={18} />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
