/**
 * ADABEL STORES - CORE JAVASCRIPT
 * Adidas Aesthetics & Modern Web Functionality
 */

// Theme Management System (dark / light / system)
const ThemeManager = {
  STORAGE_KEY: 'adabel_theme_pref',

  getSavedTheme() {
    return localStorage.getItem(this.STORAGE_KEY) || 'system';
  },

  getSystemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  },

  applyTheme(pref) {
    const root = document.documentElement;
    if (pref === 'system') {
      const resolved = this.getSystemTheme();
      root.setAttribute('data-theme', resolved);
      root.setAttribute('data-theme-mode', 'system');
    } else {
      root.setAttribute('data-theme', pref);
      root.setAttribute('data-theme-mode', pref);
    }

    // Update active state on any theme switcher buttons on the page
    document.querySelectorAll('.theme-opt-btn').forEach(btn => {
      const mode = btn.getAttribute('data-theme-set');
      btn.classList.toggle('active', mode === pref);
      btn.setAttribute('aria-pressed', mode === pref ? 'true' : 'false');
    });
  },

  setTheme(pref) {
    localStorage.setItem(this.STORAGE_KEY, pref);
    this.applyTheme(pref);
    showToast(`Theme set to ${pref.toUpperCase()}`);
  },

  init() {
    const current = this.getSavedTheme();
    this.applyTheme(current);

    // Listen to OS system color changes dynamically
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => {
        if (this.getSavedTheme() === 'system') {
          this.applyTheme('system');
        }
      });
    }

    // Bind all theme switcher buttons
    document.querySelectorAll('.theme-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTheme = btn.getAttribute('data-theme-set');
        if (targetTheme) {
          this.setTheme(targetTheme);
        }
      });
    });
  }
};

// Initialize theme immediately to prevent layout / color flash
ThemeManager.applyTheme(ThemeManager.getSavedTheme());


// Central Product State
const PRODUCTS = [
  {
    id: 'adb-01',
    name: 'ADABEL PROTO-7 TRACK JACKET',
    category: 'Outerwear',
    price: 185,
    originalPrice: 220,
    tag: 'NEW DROP',
    isNew: true,
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80',
    description: 'Engineered waterproof technical nylon fabric with asymmetric 3-stripe reflective accent seams. Finished with laser-cut ventilation and matte black hardware.',
    sizes: ['S', 'M', 'L', 'XL'],
    rating: '4.9/5'
  },
  {
    id: 'adb-02',
    name: 'STRIKER HIGH-TOP RUNNER V2',
    category: 'Footwear',
    price: 240,
    originalPrice: 280,
    tag: 'BESTSELLER',
    isNew: false,
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=80',
    description: 'Sculpted responsive kinetic foam midsole clad in PrimeKnit breathable mono-mesh. Designed for maximum city cadence and street aesthetic.',
    sizes: ['US 8', 'US 9', 'US 10', 'US 11'],
    rating: '5.0/5'
  },
  {
    id: 'adb-03',
    name: 'MONOLITH HEAVYWEIGHT HOODIE',
    category: 'Sweatshirts',
    price: 145,
    originalPrice: 175,
    tag: 'HOT',
    isNew: false,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=900&q=80',
    description: '520 GSM loopback French Terry tailored with dropped shoulders and double-needle contrast stitching. Pre-shrunk industrial silhouette.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: '4.8/5'
  },
  {
    id: 'adb-04',
    name: 'VELOCITY UTILITY CARGO PANTS',
    category: 'Bottoms',
    price: 160,
    originalPrice: 195,
    tag: 'LIMITED',
    isNew: true,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80',
    description: 'Articulated knee construction with 6 magnetic utility pocket arrays and ankle shock-cords for variable tailoring between wide and tapered fit.',
    sizes: ['30', '32', '34', '36'],
    rating: '4.9/5'
  },
  {
    id: 'adb-05',
    name: 'NEO-ORIGINALS ZIP WINDBREAKER',
    category: 'Outerwear',
    price: 195,
    originalPrice: 230,
    tag: 'COLLECTION',
    isNew: false,
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=900&q=80',
    description: 'Archive-inspired windbreaker reimagined with lightweight recycled ripstop and neon electric color blocking. Packable into its own interior pouch.',
    sizes: ['S', 'M', 'L', 'XL'],
    rating: '4.7/5'
  },
  {
    id: 'adb-06',
    name: 'SOLAR FLARE OVERSIZED TEE',
    category: 'T-Shirts',
    price: 85,
    originalPrice: 105,
    tag: 'ESSENTIAL',
    isNew: true,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    description: 'Ultra-dense 280 GSM combed organic cotton with high ribbed collar and minimal high-gloss silicone Adabel badge branding on center chest.',
    sizes: ['S', 'M', 'L', 'XL'],
    rating: '4.9/5'
  },
  {
    id: 'adb-07',
    name: 'APEX FORM CROSSBODY PACK',
    category: 'Accessories',
    price: 90,
    originalPrice: 110,
    tag: 'NEW DROP',
    isNew: true,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
    description: 'Cordura ballistic nylon modular sling featuring quick-release aluminum cobra buckle and water-sealed YKK Aquaguard zips.',
    sizes: ['ONE SIZE'],
    rating: '4.8/5'
  },
  {
    id: 'adb-08',
    name: 'CLUB ELEVATION RETRO SNEAKER',
    category: 'Footwear',
    price: 210,
    originalPrice: 250,
    tag: 'COLLAB',
    isNew: false,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=80',
    description: 'Handcrafted full-grain leather upper paired with gum rubber herringbone tread. Timeless court aesthetic perfected for modern pavement.',
    sizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    rating: '5.0/5'
  }
];

// Cart State Manager
class CartState {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('adabel_cart') || '[]');
    this.listeners = [];
  }

  save() {
    localStorage.setItem('adabel_cart', JSON.stringify(this.items));
    this.notify();
  }

  addItem(productId, selectedSize = null) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const size = selectedSize || product.sizes[0];
    const existing = this.items.find(item => item.id === productId && item.size === size);

    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: size,
        quantity: 1
      });
    }

    this.save();
    showToast(`Added "${product.name}" (${size}) to cart`);
  }

  removeItem(index) {
    this.items.splice(index, 1);
    this.save();
  }

  updateQuantity(index, quantity) {
    if (quantity <= 0) {
      this.removeItem(index);
    } else {
      this.items[index].quantity = quantity;
      this.save();
    }
  }

  getTotalCount() {
    return this.items.reduce((acc, item) => acc + item.quantity, 0);
  }

  getSubtotal() {
    return this.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  subscribe(listener) {
    this.listeners.push(listener);
    listener(this);
  }

  notify() {
    this.listeners.forEach(fn => fn(this));
  }
}

const cart = new CartState();

// Wishlist Manager
const WishlistState = {
  get() {
    return JSON.parse(localStorage.getItem('adabel_wishlist') || '[]');
  },
  toggle(id) {
    let list = this.get();
    if (list.includes(id)) {
      list = list.filter(item => item !== id);
      showToast('Removed from wishlist');
    } else {
      list.push(id);
      showToast('Saved to your wishlist');
    }
    localStorage.setItem('adabel_wishlist', JSON.stringify(list));
    document.querySelectorAll(`[data-fav-id="${id}"]`).forEach(btn => {
      btn.classList.toggle('active', list.includes(id));
    });
  },
  has(id) {
    return this.get().includes(id);
  }
};

// UI Helpers
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="brand-stripes-mini"><span></span><span></span><span></span></span>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 350);
  }, 3200);
}

// Quick View Modal
function openQuickView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('quick-view-modal');
  if (!modal) return;

  const content = modal.querySelector('.modal-body-content');
  content.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
      <div style="background: var(--media-bg); overflow: hidden; border: 1px solid var(--border-subtle);">
        <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
      <div style="display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="color: var(--accent-text); font-family: var(--font-sub); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;">
            ${product.category} &bull; ${product.rating}
          </div>
          <h2 style="font-family: var(--font-display); font-size: 1.6rem; text-transform: uppercase; margin: 0.5rem 0 1rem; line-height: 1.1;">
            ${product.name}
          </h2>
          <div style="display: flex; align-items: baseline; gap: 1rem; margin-bottom: 1.25rem;">
            <span style="font-family: var(--font-display); font-size: 1.8rem; font-weight: 800; color: var(--text-primary);">$${product.price}</span>
            <span style="font-size: 1rem; color: var(--text-muted); text-decoration: line-through;">$${product.originalPrice}</span>
          </div>
          <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.5rem;">
            ${product.description}
          </p>
          <div style="margin-bottom: 1.5rem;">
            <label style="font-family: var(--font-sub); font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: var(--text-primary); display: block; margin-bottom: 0.5rem;">
              Select Size
            </label>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;" id="quick-view-sizes">
              ${product.sizes.map((s, idx) => `
                <button type="button" class="btn-size ${idx === 0 ? 'selected' : ''}" data-size="${s}" onclick="selectModalSize(this)">
                  ${s}
                </button>
              `).join('')}
            </div>
          </div>
        </div>
        <button type="button" class="btn btn-accent" style="width: 100%;" onclick="addFromModal('${product.id}')">
          Add To Bag &bull; $${product.price}
        </button>
      </div>
    </div>
  `;

  modal.showModal();
}

function selectModalSize(btn) {
  document.querySelectorAll('#quick-view-sizes button').forEach(b => {
    b.classList.remove('selected');
  });
  btn.classList.add('selected');
}

function addFromModal(productId) {
  const selectedBtn = document.querySelector('#quick-view-sizes button.selected');
  const size = selectedBtn ? selectedBtn.getAttribute('data-size') : null;
  cart.addItem(productId, size);
  const modal = document.getElementById('quick-view-modal');
  if (modal) modal.close();
  toggleCart(true);
}

// Drawer Controls
function toggleCart(open = null) {
  const drawer = document.getElementById('cart-drawer-overlay');
  if (!drawer) return;
  if (open === true) {
    drawer.classList.add('open');
  } else if (open === false) {
    drawer.classList.remove('open');
  } else {
    drawer.classList.toggle('open');
  }
}

// Initialize Global Handlers
document.addEventListener('DOMContentLoaded', () => {
  // Update Cart UI whenever cart changes
  cart.subscribe(c => {
    // Badges
    document.querySelectorAll('.cart-badge').forEach(badge => {
      badge.textContent = c.getTotalCount();
    });

    // Drawer list
    const itemsList = document.getElementById('cart-items-list');
    const subtotalEl = document.getElementById('cart-subtotal-val');
    if (subtotalEl) {
      subtotalEl.textContent = `$${c.getSubtotal().toFixed(2)}`;
    }

    if (itemsList) {
      if (c.items.length === 0) {
        itemsList.innerHTML = `
          <div style="text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
            <div style="font-family: var(--font-display); font-size: 1.4rem; text-transform: uppercase; margin-bottom: 0.5rem; color: var(--text-primary);">
              Your Bag is Empty
            </div>
            <p style="font-size: 0.85rem; margin-bottom: 1.5rem;">Explore our new drop and elevate your wardrobe.</p>
            <a href="catalog.html" class="btn btn-outline" style="font-size: 0.75rem; padding: 0.6rem 1.25rem;">Shop Products</a>
          </div>
        `;
      } else {
        itemsList.innerHTML = c.items.map((item, idx) => `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div>
              <div class="cart-item-title">${item.name}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">Size: ${item.size}</div>
              <div class="cart-item-price">$${item.price} &times; ${item.quantity}</div>
            </div>
            <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.5rem;">
              <button onclick="cart.removeItem(${idx})" style="background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 1.1rem;" title="Remove">&times;</button>
              <div style="display: flex; align-items: center; border: 1px solid var(--border-bold); background: var(--bg-surface);">
                <button onclick="cart.updateQuantity(${idx}, ${item.quantity - 1})" style="background: none; border: none; color: var(--text-primary); width: 24px; height: 24px; cursor: pointer;">-</button>
                <span style="font-size: 0.8rem; padding: 0 4px; min-width: 18px; text-align: center;">${item.quantity}</span>
                <button onclick="cart.updateQuantity(${idx}, ${item.quantity + 1})" style="background: none; border: none; color: var(--text-primary); width: 24px; height: 24px; cursor: pointer;">+</button>
              </div>
            </div>
          </div>
        `).join('');
      }
    }
  });

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
    });
  }

  // Initialize Theme System
  ThemeManager.init();

  // Newsletter Forms
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      if (input && input.value) {
        showToast(`Welcome to the Adabel Club, ${input.value}`);
        input.value = '';
      }
    });
  });
});
