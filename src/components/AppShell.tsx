import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { OrielHeader } from './OrielHeader';
import { MegaMenu } from './MegaMenu';
import { SearchOverlay } from './SearchOverlay';
import { CartDrawer } from './CartDrawer';
import { WishlistDrawer } from './WishlistDrawer';
import { ProductQuickView } from './ProductQuickView';
import { CustomCursor } from './CustomCursor';
import { Preloader } from './Preloader';
import { Footer } from './Footer';
import { SmoothScrollProvider } from './SmoothScrollProvider';

export const AppShell: React.FC = () => {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <SmoothScrollProvider>
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}
      
      <CustomCursor />
      <OrielHeader />
      <MegaMenu />
      <SearchOverlay />
      <CartDrawer />
      <WishlistDrawer />
      <ProductQuickView />

      <main style={{ minHeight: '80vh', position: 'relative' }}>
        <Outlet />
      </main>

      <Footer />
    </SmoothScrollProvider>
  );
};
