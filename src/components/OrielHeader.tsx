import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, Moon, Sun } from 'lucide-react';
import { useStore, ThemeState } from '../store/useStore';

export const OrielHeader: React.FC = () => {
  const location = useLocation();
  const {
    bag,
    wishlist,
    theme,
    setTheme,
    toggleCart,
    toggleWishlistDrawer,
    toggleSearch,
    toggleMenu,
    setCursor,
    resetCursor
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const totalItems = bag.reduce((sum, item) => sum + item.quantity, 0);
  const isDark = theme === 'evening' || theme === 'midnight';

  // Toggle quick day/night atmosphere
  const cycleTheme = () => {
    const sequence: ThemeState[] = ['afternoon', 'golden', 'evening', 'midnight', 'morning'];
    const nextIndex = (sequence.indexOf(theme) + 1) % sequence.length;
    setTheme(sequence[nextIndex]);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 500,
        width: '100%',
        backgroundColor: isScrolled
          ? isDark
            ? 'rgba(40, 32, 28, 0.92)'
            : 'rgba(247, 242, 232, 0.92)'
          : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: isScrolled
          ? `1px solid ${isDark ? 'rgba(247, 242, 232, 0.1)' : 'rgba(30, 28, 26, 0.08)'}`
          : '1px solid transparent',
        transition: 'background-color 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease'
      }}
    >
      <div
        className="container-wide"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '84px'
        }}
      >
        {/* LEFT: Wordmark */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '8px',
            color: 'var(--text-current)'
          }}
          onMouseEnter={() => setCursor('ORIEL', 'view')}
          onMouseLeave={resetCursor}
        >
          <span
            style={{
              fontFamily: 'var(--font-theater)',
              fontSize: '32px',
              lineHeight: 1,
              letterSpacing: '-0.02em'
            }}
          >
            Oriel
          </span>
          <span
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.24em',
              textTransform: 'uppercase'
            }}
          >
            HOUSE
          </span>
        </Link>

        {/* CENTER: Main Editorial Navigation (Desktop) */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: 'clamp(24px, 3vw, 44px)'
          }}
          className="desktop-nav"
        >
          {[
            { label: 'SHOP', path: '/shop' },
            { label: 'COLLECTIONS', path: '/collections' },
            { label: 'ROOMS', path: '/rooms' },
            { label: 'PLAY', path: '/play' },
            { label: 'JOURNAL', path: '/journal' },
            { label: 'TRADE', path: '/trade' }
          ].map((link) => {
            const isActive = location.pathname === link.path || location.pathname.startsWith(`${link.path}/`);
            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--text-current)',
                  position: 'relative',
                  padding: '6px 0',
                  opacity: isActive ? 1 : 0.82
                }}
                onMouseEnter={() => setCursor('ENTER', 'enter')}
                onMouseLeave={resetCursor}
              >
                {link.label}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '1.5px',
                      backgroundColor: 'var(--accent-current)',
                      borderRadius: '1px'
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT: Actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(12px, 1.8vw, 24px)'
          }}
        >
          {/* Theme State Switcher button */}
          <button
            onClick={cycleTheme}
            title={`Current theme: ${theme}. Click to change lighting.`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.08em',
              padding: '6px 10px',
              border: `1px solid ${isDark ? 'rgba(247, 242, 232, 0.2)' : 'rgba(30, 28, 26, 0.15)'}`
            }}
            onMouseEnter={() => setCursor('LIGHT', 'light')}
            onMouseLeave={resetCursor}
          >
            {isDark ? <Moon size={13} /> : <Sun size={13} />}
            <span style={{ textTransform: 'uppercase', display: 'none' }} className="theme-text-desktop">
              {theme}
            </span>
          </button>

          {/* Search Trigger */}
          <button
            onClick={() => toggleSearch(true)}
            aria-label="Search"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 500
            }}
            onMouseEnter={() => setCursor('SEARCH', 'view')}
            onMouseLeave={resetCursor}
          >
            <Search size={17} />
            <span style={{ display: 'none', letterSpacing: '0.08em' }} className="header-label-desktop">
              SEARCH
            </span>
          </button>

          {/* Wishlist Link */}
          <button
            onClick={() => toggleWishlistDrawer(true)}
            aria-label="Wishlist"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              position: 'relative'
            }}
            onMouseEnter={() => setCursor('SAVED', 'view')}
            onMouseLeave={resetCursor}
          >
            <Heart size={17} />
            {wishlist.length > 0 && (
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  fontWeight: 600,
                  color: 'var(--oxblood)'
                }}
              >
                ({wishlist.length})
              </span>
            )}
          </button>

          {/* Bag Drawer Trigger */}
          <button
            onClick={() => toggleCart(true)}
            aria-label="Shopping Bag"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.06em'
            }}
            onMouseEnter={() => setCursor('BAG', 'add')}
            onMouseLeave={resetCursor}
          >
            <ShoppingBag size={17} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
              ({totalItems})
            </span>
          </button>

          {/* Mega Menu Toggle */}
          <button
            onClick={() => toggleMenu(true)}
            aria-label="Open navigation menu"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12px',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.1em',
              padding: '8px 14px',
              border: `1px solid ${isDark ? 'rgba(247, 242, 232, 0.25)' : 'rgba(30, 28, 26, 0.2)'}`
            }}
            onMouseEnter={() => setCursor('MENU', 'enter')}
            onMouseLeave={resetCursor}
          >
            <Menu size={16} />
            <span>MENU</span>
          </button>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .header-label-desktop {
            display: inline !important;
          }
          .theme-text-desktop {
            display: inline !important;
          }
        }
      `}</style>
    </header>
  );
};
