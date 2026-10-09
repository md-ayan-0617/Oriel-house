import { create } from 'zustand';
import { Product, Finish, PRODUCTS } from '../data/products';

export interface BagItem {
  id: string; // unique item id (productId + finishId)
  product: Product;
  finish: Finish;
  quantity: number;
}

export type ThemeState = 'morning' | 'afternoon' | 'golden' | 'evening' | 'midnight';

export type CursorMode = 'default' | 'view' | 'light' | 'drag' | 'enter' | 'read' | 'specify' | 'add' | 'try' | 'toggle';

interface StoreState {
  // Bag & Commerce
  bag: BagItem[];
  addToBag: (product: Product, finish: Finish, quantity?: number) => void;
  removeFromBag: (itemId: string) => void;
  updateBagQuantity: (itemId: string, quantity: number) => void;
  clearBag: () => void;
  
  // Wishlist
  wishlist: string[]; // slugs
  toggleWishlist: (slug: string) => void;
  isInWishlist: (slug: string) => boolean;

  // Recently Viewed
  recentlyViewed: string[]; // slugs
  addRecentlyViewed: (slug: string) => void;

  // Region / Currency
  region: 'USD' | 'EUR' | 'GBP';
  setRegion: (region: 'USD' | 'EUR' | 'GBP') => void;
  formatPrice: (amount: number) => string;

  // Theme
  theme: ThemeState;
  setTheme: (theme: ThemeState) => void;

  // Modals & Drawers
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isSearchOpen: boolean;
  isMenuOpen: boolean;
  quickViewProduct: Product | null;
  toggleCart: (open?: boolean) => void;
  toggleWishlistDrawer: (open?: boolean) => void;
  toggleSearch: (open?: boolean) => void;
  toggleMenu: (open?: boolean) => void;
  setQuickViewProduct: (product: Product | null) => void;

  // Custom Cursor
  cursorText: string;
  cursorMode: CursorMode;
  setCursor: (text: string, mode?: CursorMode) => void;
  resetCursor: () => void;
}

// Helper to safely read from localStorage
const getLocal = <T>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(`oriel_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

const setLocal = <T>(key: string, value: T) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`oriel_${key}`, JSON.stringify(value));
  } catch {}
};

export const useStore = create<StoreState>((set, get) => ({
  // Initialize with local storage
  bag: getLocal<BagItem[]>('bag', []),
  wishlist: getLocal<string[]>('wishlist', ['esme-sconce', 'margo-table-lamp']),
  recentlyViewed: getLocal<string[]>('recently_viewed', ['esme-sconce']),
  region: getLocal<'USD' | 'EUR' | 'GBP'>('region', 'USD'),
  theme: 'afternoon',

  addToBag: (product, finish, quantity = 1) => {
    const itemId = `${product.id}-${finish.id}`;
    const currentBag = get().bag;
    const existingIndex = currentBag.findIndex((item) => item.id === itemId);

    let updatedBag: BagItem[];
    if (existingIndex > -1) {
      updatedBag = currentBag.map((item, idx) =>
        idx === existingIndex ? { ...item, quantity: item.quantity + quantity } : item
      );
    } else {
      updatedBag = [...currentBag, { id: itemId, product, finish, quantity }];
    }

    setLocal('bag', updatedBag);
    set({ bag: updatedBag, isCartOpen: true });
  },

  removeFromBag: (itemId) => {
    const updatedBag = get().bag.filter((item) => item.id !== itemId);
    setLocal('bag', updatedBag);
    set({ bag: updatedBag });
  },

  updateBagQuantity: (itemId, quantity) => {
    if (quantity <= 0) {
      get().removeFromBag(itemId);
      return;
    }
    const updatedBag = get().bag.map((item) =>
      item.id === itemId ? { ...item, quantity } : item
    );
    setLocal('bag', updatedBag);
    set({ bag: updatedBag });
  },

  clearBag: () => {
    setLocal('bag', []);
    set({ bag: [] });
  },

  toggleWishlist: (slug) => {
    const current = get().wishlist;
    const exists = current.includes(slug);
    const updated = exists ? current.filter((s) => s !== slug) : [...current, slug];
    setLocal('wishlist', updated);
    set({ wishlist: updated });
  },

  isInWishlist: (slug) => {
    return get().wishlist.includes(slug);
  },

  addRecentlyViewed: (slug) => {
    const current = get().recentlyViewed.filter((s) => s !== slug);
    const updated = [slug, ...current].slice(0, 8);
    setLocal('recently_viewed', updated);
    set({ recentlyViewed: updated });
  },

  setRegion: (region) => {
    setLocal('region', region);
    set({ region });
  },

  formatPrice: (amount: number) => {
    const { region } = get();
    if (region === 'EUR') return `€${Math.round(amount * 0.92).toLocaleString()}`;
    if (region === 'GBP') return `£${Math.round(amount * 0.78).toLocaleString()}`;
    return `$${amount.toLocaleString()}`;
  },

  setTheme: (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    set({ theme });
  },

  isCartOpen: false,
  isWishlistOpen: false,
  isSearchOpen: false,
  isMenuOpen: false,
  quickViewProduct: null,

  toggleCart: (open) => set((s) => ({ isCartOpen: open !== undefined ? open : !s.isCartOpen })),
  toggleWishlistDrawer: (open) => set((s) => ({ isWishlistOpen: open !== undefined ? open : !s.isWishlistOpen })),
  toggleSearch: (open) => set((s) => ({ isSearchOpen: open !== undefined ? open : !s.isSearchOpen })),
  toggleMenu: (open) => set((s) => ({ isMenuOpen: open !== undefined ? open : !s.isMenuOpen })),
  setQuickViewProduct: (product) => set({ quickViewProduct: product }),

  cursorText: '',
  cursorMode: 'default',
  setCursor: (text, mode = 'default') => set({ cursorText: text, cursorMode: mode }),
  resetCursor: () => set({ cursorText: '', cursorMode: 'default' })
}));
