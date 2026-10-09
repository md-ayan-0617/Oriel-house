import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetail } from './pages/ProductDetail';
import { Collections } from './pages/Collections';
import { CollectionDetail } from './pages/CollectionDetail';
import { Rooms } from './pages/Rooms';
import { RoomDetail } from './pages/RoomDetail';
import { Play } from './pages/Play';
import { About } from './pages/About';
import { MaterialsPage } from './pages/MaterialsPage';
import { Journal } from './pages/Journal';
import { JournalArticle } from './pages/JournalArticle';
import { Trade } from './pages/Trade';
import { TradeProjects } from './pages/TradeProjects';
import { TradeApply } from './pages/TradeApply';
import { Contact } from './pages/Contact';
import { WishlistPage } from './pages/WishlistPage';
import { BagPage } from './pages/BagPage';
import { AccountPage } from './pages/AccountPage';
import { NotFound } from './pages/NotFound';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop/:category" element={<CategoryPage />} />
          <Route path="product/:slug" element={<ProductDetail />} />
          <Route path="collections" element={<Collections />} />
          <Route path="collections/:slug" element={<CollectionDetail />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="rooms/:slug" element={<RoomDetail />} />
          <Route path="play" element={<Play />} />
          <Route path="about" element={<About />} />
          <Route path="materials" element={<MaterialsPage />} />
          <Route path="journal" element={<Journal />} />
          <Route path="journal/:slug" element={<JournalArticle />} />
          <Route path="trade" element={<Trade />} />
          <Route path="trade/projects" element={<TradeProjects />} />
          <Route path="trade/apply" element={<TradeApply />} />
          <Route path="contact" element={<Contact />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="bag" element={<BagPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
