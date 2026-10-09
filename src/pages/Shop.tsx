import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Grid, LayoutGrid, List, X, Check, Heart, Eye } from 'lucide-react';
import { useStore } from '../store/useStore';
import { PRODUCTS, CATEGORIES, Product } from '../data/products';
import { ProductCard } from '../components/ProductCard';

type ViewMode = 'GRID' | 'ROOM' | 'INDEX';

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const [viewMode, setViewMode] = useState<ViewMode>('GRID');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter States
  const [selectedFinishes, setSelectedFinishes] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(4000);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);

  const { formatPrice, toggleWishlist, isInWishlist, setQuickViewProduct, setCursor, resetCursor } = useStore();

  // Extract unique filter facets
  const allFinishes = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach((p) => p.finishes.forEach((f) => set.add(f.name)));
    return Array.from(set);
  }, []);

  const allMaterials = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach((p) => p.materials.forEach((m) => set.add(m)));
    return Array.from(set);
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (activeCategory !== 'all' && p.category !== activeCategory) return false;
      if (selectedFinishes.length > 0 && !p.finishes.some((f) => selectedFinishes.includes(f.name))) return false;
      if (selectedMaterials.length > 0 && !p.materials.some((m) => selectedMaterials.includes(m))) return false;
      if (p.price > maxPrice) return false;
      if (onlyInStock && p.stockStatus !== 'In Stock') return false;
      return true;
    });
  }, [activeCategory, selectedFinishes, selectedMaterials, maxPrice, onlyInStock]);

  const handleCategorySelect = (catSlug: string) => {
    if (catSlug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catSlug);
    }
    setSearchParams(searchParams);
  };

  const toggleFinishFilter = (finish: string) => {
    setSelectedFinishes((prev) =>
      prev.includes(finish) ? prev.filter((f) => f !== finish) : [...prev, finish]
    );
  };

  const toggleMaterialFilter = (material: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(material) ? prev.filter((m) => m !== material) : [...prev, material]
    );
  };

  const clearAllFilters = () => {
    setSelectedFinishes([]);
    setSelectedMaterials([]);
    setMaxPrice(4000);
    setOnlyInStock(false);
  };

  const activeFilterCount =
    selectedFinishes.length + selectedMaterials.length + (onlyInStock ? 1 : 0) + (maxPrice < 4000 ? 1 : 0);

  return (
    <div style={{ backgroundColor: 'var(--warm-ivory)', minHeight: '100vh', paddingBottom: '120px' }}>
      {/* SHOP HERO */}
      <section style={{ padding: 'clamp(64px, 8vw, 110px) 0 clamp(32px, 4vw, 56px) 0', borderBottom: '1px solid rgba(30, 28, 26, 0.08)' }}>
        <div className="container-wide">
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
            LIGHTING FOR LIVED-IN ROOMS // CATALOGUE
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-theater)',
              fontSize: 'var(--text-h1)',
              lineHeight: 0.96,
              letterSpacing: '-0.025em'
            }}
          >
            ALL LIGHTING.
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-personality)',
              fontSize: 'clamp(18px, 2vw, 24px)',
              fontStyle: 'italic',
              color: 'var(--espresso)',
              marginTop: '16px',
              maxWidth: '680px'
            }}
          >
            Sculptural sconces, pendants, chandeliers, table and floor lamps designed to change how domestic rooms behave after sunset.
          </p>

          {/* CATEGORY HORIZONTAL BAR */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(16px, 2.5vw, 36px)',
              overflowX: 'auto',
              marginTop: '48px',
              paddingBottom: '12px'
            }}
          >
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => handleCategorySelect(cat.slug)}
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '13px',
                    fontWeight: isSelected ? 700 : 500,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: isSelected ? 'var(--oxblood)' : 'var(--text-current)',
                    position: 'relative',
                    padding: '8px 0',
                    whiteSpace: 'nowrap',
                    opacity: isSelected ? 1 : 0.75,
                    transition: 'all 0.3s ease'
                  }}
                >
                  {cat.name} ({cat.count})
                  {isSelected && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        backgroundColor: 'var(--oxblood)'
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FILTER & VIEW CONTROLS TOOLBAR */}
      <div
        style={{
          position: 'sticky',
          top: '84px',
          zIndex: 40,
          backgroundColor: 'rgba(247, 242, 232, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(30, 28, 26, 0.08)',
          padding: '16px 0'
        }}
      >
        <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Filter Drawer Trigger */}
          <button
            onClick={() => setIsFilterOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              letterSpacing: '0.08em',
              padding: '8px 16px',
              border: '1px solid rgba(30, 28, 26, 0.2)'
            }}
            onMouseEnter={() => setCursor('FILTER', 'view')}
            onMouseLeave={resetCursor}
          >
            <SlidersHorizontal size={14} />
            <span>FILTERS</span>
            {activeFilterCount > 0 && (
              <span style={{ backgroundColor: 'var(--oxblood)', color: '#FFF', borderRadius: '50%', padding: '1px 6px', fontSize: '10px' }}>
                {activeFilterCount}
              </span>
            )}
          </button>

          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--stone)' }}>
            SHOWING {filteredProducts.length} FIXTURES
          </span>

          {/* View Modes: GRID / ROOM / INDEX */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setViewMode('GRID')}
              title="Grid View"
              style={{
                padding: '8px',
                border: viewMode === 'GRID' ? '1px solid var(--ink)' : '1px solid transparent',
                opacity: viewMode === 'GRID' ? 1 : 0.5
              }}
            >
              <LayoutGrid size={16} />
            </button>

            <button
              onClick={() => setViewMode('ROOM')}
              title="Room Context View"
              style={{
                padding: '8px',
                border: viewMode === 'ROOM' ? '1px solid var(--ink)' : '1px solid transparent',
                opacity: viewMode === 'ROOM' ? 1 : 0.5
              }}
            >
              <Grid size={16} />
            </button>

            <button
              onClick={() => setViewMode('INDEX')}
              title="Text Index View"
              style={{
                padding: '8px',
                border: viewMode === 'INDEX' ? '1px solid var(--ink)' : '1px solid transparent',
                opacity: viewMode === 'INDEX' ? 1 : 0.5
              }}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* FILTER DRAWER (SLIDE-IN SIDE PANEL) */}
      {isFilterOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(20, 18, 16, 0.65)',
            display: 'flex',
            justifyContent: 'flex-start'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsFilterOpen(false);
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '420px',
              height: '100%',
              backgroundColor: 'var(--warm-ivory)',
              color: 'var(--ink)',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '10px 0 35px rgba(0, 0, 0, 0.25)',
              padding: '32px',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h3 style={{ fontFamily: 'var(--font-theater)', fontSize: '28px' }}>Filters</h3>
              <button onClick={() => setIsFilterOpen(false)} style={{ padding: '4px' }}>
                <X size={20} />
              </button>
            </div>

            {/* Finishes */}
            <div style={{ marginBottom: '32px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', display: 'block', marginBottom: '12px', color: 'var(--stone)' }}>
                FINISHES
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {allFinishes.map((finish) => (
                  <label
                    key={finish}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', cursor: 'pointer' }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedFinishes.includes(finish)}
                      onChange={() => toggleFinishFilter(finish)}
                    />
                    <span>{finish}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Materials */}
            <div style={{ marginBottom: '32px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', display: 'block', marginBottom: '12px', color: 'var(--stone)' }}>
                PRIMARY MATERIALS
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {allMaterials.map((mat) => (
                  <label
                    key={mat}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', cursor: 'pointer' }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedMaterials.includes(mat)}
                      onChange={() => toggleMaterialFilter(mat)}
                    />
                    <span>{mat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Stock status */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                />
                <span>Only In Stock (Ready to dispatch)</span>
              </label>
            </div>

            {/* Footer action */}
            <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid rgba(30, 28, 26, 0.1)', display: 'flex', gap: '12px' }}>
              <button onClick={clearAllFilters} className="btn-outline" style={{ flex: 1, padding: '12px' }}>
                CLEAR ALL
              </button>
              <button onClick={() => setIsFilterOpen(false)} className="btn-primary" style={{ flex: 1, padding: '12px' }}>
                APPLY ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PRODUCTS DISPLAY BASED ON VIEW MODE */}
      <section style={{ paddingTop: '48px' }}>
        <div className="container-wide">
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ fontFamily: 'var(--font-personality)', fontSize: '24px', color: 'var(--espresso)' }}>
                No lighting matches the selected criteria.
              </p>
              <button onClick={clearAllFilters} className="btn-primary" style={{ marginTop: '16px' }}>
                RESET FILTERS
              </button>
            </div>
          ) : viewMode === 'GRID' ? (
            /* 1. GRID MODE: Varied rhythm of borderless packshots */
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: 'clamp(32px, 5vw, 64px)'
              }}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : viewMode === 'ROOM' ? (
            /* 2. ROOM MODE: Show fixtures in real environmental room context */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
              {filteredProducts.map((product, idx) => (
                <div
                  key={product.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: idx % 2 === 0 ? '1.4fr 1fr' : '1fr 1.4fr',
                    gap: 'clamp(24px, 5vw, 64px)',
                    alignItems: 'center'
                  }}
                  className="editorial-card-grid"
                >
                  <div style={{ order: idx % 2 === 0 ? 1 : 2, width: '100%', aspectRatio: '16/10', backgroundColor: '#1E1C1A' }}>
                    <img
                      src={product.roomImages[0] || product.onImage}
                      alt={`${product.name} in room environment`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <div style={{ order: idx % 2 === 0 ? 2 : 1 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--oxblood)', letterSpacing: '0.2em' }}>
                      ENVIRONMENTAL CONTEXT
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-theater)', fontSize: 'clamp(32px, 4vw, 52px)', marginTop: '6px' }}>
                      {product.name}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-personality)', fontSize: '18px', fontStyle: 'italic', color: 'var(--espresso)', marginTop: '4px' }}>
                      "{product.subtitle}"
                    </p>
                    <p style={{ fontSize: '15px', lineHeight: 1.6, marginTop: '16px', color: 'var(--espresso)' }}>
                      {product.description}
                    </p>
                    <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', fontWeight: 600 }}>
                        {formatPrice(product.price)}
                      </span>
                      <Link to={`/product/${product.slug}`} className="btn-primary" style={{ padding: '12px 24px' }}>
                        VIEW OBJECT &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* 3. INDEX MODE: Pure text-driven architectural specification list */
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1.5fr 1.5fr 1fr 1fr',
                  padding: '16px 0',
                  borderBottom: '2px solid var(--ink)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  color: 'var(--stone)'
                }}
              >
                <span>NAME / SUBTITLE</span>
                <span>CATEGORY</span>
                <span>FINISH</span>
                <span>LEAD TIME</span>
                <span style={{ textAlign: 'right' }}>PRICE</span>
              </div>

              {filteredProducts.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.slug}`}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1.5fr 1.5fr 1fr 1fr',
                    padding: '24px 0',
                    borderBottom: '1px solid rgba(30, 28, 26, 0.1)',
                    alignItems: 'baseline',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={() => setCursor('VIEW', 'view')}
                  onMouseLeave={resetCursor}
                >
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-theater)', fontSize: '24px' }}>{p.name}</h4>
                    <p style={{ fontFamily: 'var(--font-personality)', fontSize: '13px', fontStyle: 'italic', color: 'var(--stone)' }}>
                      "{p.subtitle}"
                    </p>
                  </div>
                  <span style={{ fontSize: '13px', textTransform: 'uppercase' }}>{p.categoryLabel}</span>
                  <span style={{ fontSize: '13px' }}>{p.finishes[0].name}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--terracotta)' }}>{p.leadTime}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 600, textAlign: 'right' }}>
                    {formatPrice(p.price)}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
