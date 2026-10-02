/**
 * AURORA COFFEE ROASTERS - MAIN JAVASCRIPT
 * Full interactive features: Cart management, interactive quiz,
 * menu filtering, table reservations, theme toggle, lightbox, and live open status.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. DATA: ARTISANAL MENU ITEMS
  // ------------------------------------------------------------------------
  const menuItems = [
    {
      id: 'menu-1',
      name: 'Single Origin Espresso',
      category: 'espresso',
      price: 4.25,
      desc: 'Double shot extracted from Colombian Huila micro-lot with notes of dark plum and bittersweet cocoa.',
      image: 'images/coffee-2.jpg',
      badges: ['Single Origin', 'Direct Trade']
    },
    {
      id: 'menu-2',
      name: 'Velvet Crema Cortado',
      category: 'espresso',
      price: 5.25,
      desc: '1:1 ratio of rich espresso and silky steamed milk microfoam with warm hazelnut undertones.',
      image: 'images/coffee-2.jpg',
      badges: ['Most Popular', 'Organic Milk']
    },
    {
      id: 'menu-3',
      name: 'Artisan Flat White',
      category: 'espresso',
      price: 5.50,
      desc: 'Double ristretto blended seamlessly with glossy textured microfoam and custom rosetta latte art.',
      image: 'images/hero-coffee.jpg',
      badges: ['House Signature']
    },
    {
      id: 'menu-4',
      name: 'V60 Precision Pour-Over',
      category: 'filter',
      price: 6.50,
      desc: 'Hand-poured Ethiopian Yirgacheffe revealing delicate jasmine blossom, bergamot, and sweet peach nectar.',
      image: 'images/coffee-1.jpg',
      badges: ['Single Origin', 'Award Winner']
    },
    {
      id: 'menu-5',
      name: 'Chemex Batch for Two',
      category: 'filter',
      price: 9.75,
      desc: 'Clean, triple-filtered pour-over showcasing Guatemala Antigua caramel and toasted pecan notes.',
      image: 'images/coffee-1.jpg',
      badges: ['Shareable', 'Clean Cup']
    },
    {
      id: 'menu-6',
      name: '18-Hour Kyoto Cold Drip',
      category: 'cold',
      price: 5.95,
      desc: 'Slow glass-tower cold steep resulting in a silky, low-acid elixir with Madagascar bourbon vanilla.',
      image: 'images/coffee-3.jpg',
      badges: ['Cold Steep', 'Low Acid']
    },
    {
      id: 'menu-7',
      name: 'Cascara Nitro Cold Brew',
      category: 'cold',
      price: 6.25,
      desc: 'Nitrogen-infused iced cold brew with dried coffee cherry husk syrup and a creamy cascading head.',
      image: 'images/coffee-3.jpg',
      badges: ['Nitro Infused', 'Super Refreshing']
    },
    {
      id: 'menu-8',
      name: 'Golden Honey Cardamom Latte',
      category: 'espresso',
      price: 6.25,
      desc: 'Espresso infused with raw wildflower honey, crushed green cardamom pods, and organic oat milk.',
      image: 'images/hero-coffee.jpg',
      badges: ['Specialty Craft', 'Vegan Opt']
    },
    {
      id: 'menu-9',
      name: 'French Butter Croissant',
      category: 'pastries',
      price: 4.75,
      desc: 'Laminated with cultured Normandy butter for ultra-flaky golden layers. Baked fresh every morning.',
      image: 'images/gallery/gallery-4.jpg',
      badges: ['Fresh Baked', 'Vegetarian']
    },
    {
      id: 'menu-10',
      name: 'Cinnamon Brioche Swirl',
      category: 'pastries',
      price: 5.25,
      desc: 'Pillow-soft brioche layered with Ceylon cinnamon and cream cheese vanilla drizzle.',
      image: 'images/gallery/gallery-4.jpg',
      badges: ['House Recipe']
    },
    {
      id: 'menu-11',
      name: 'Boquete Geisha Micro-Lot (250g)',
      category: 'beans',
      price: 24.00,
      desc: 'Whole bean retail bag. Panama Boquete, washed process. Notes of jasmine, bergamot, golden honey.',
      image: 'images/gallery/gallery-2.jpg',
      badges: ['Whole Bean', 'Limited Batch']
    },
    {
      id: 'menu-12',
      name: 'Ethiopia Honey Yirgacheffe (250g)',
      category: 'beans',
      price: 19.50,
      desc: 'Whole bean retail bag. Honey process, high elevation. Notes of wild blueberries and lavender.',
      image: 'images/gallery/gallery-2.jpg',
      badges: ['Whole Bean', 'Direct Trade']
    }
  ];

  // ------------------------------------------------------------------------
  // 2. STATE MANAGEMENT (CART & PROMO)
  // ------------------------------------------------------------------------
  let cart = [];
  let appliedPromo = null; // { code: 'AURORA10', discountRate: 0.10 }
  let selectedOrderType = 'Dine-in';

  // Load cart from LocalStorage if available
  try {
    const savedCart = localStorage.getItem('aurora_cart');
    if (savedCart) {
      cart = JSON.parse(savedCart);
    }
  } catch (e) {
    console.error('Error loading cart:', e);
  }

  // ------------------------------------------------------------------------
  // 3. LIVE STORE STATUS & CURRENT YEAR
  // ------------------------------------------------------------------------
  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  function updateLiveStoreStatus() {
    const statusBadge = document.getElementById('status-badge');
    const statusText = document.getElementById('live-status-text');
    if (!statusBadge || !statusText) return;

    const now = new Date();
    const day = now.getDay(); // 0 is Sunday, 6 is Saturday
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    // Opening hours in minutes from midnight
    // Mon-Fri: 7:00 AM (420) - 8:00 PM (1200)
    // Sat: 7:30 AM (450) - 9:00 PM (1260)
    // Sun: 7:30 AM (450) - 7:00 PM (1140)
    let openMin = 420;
    let closeMin = 1200;
    let scheduleStr = '7:00 AM – 8:00 PM';

    if (day === 6) {
      openMin = 450;
      closeMin = 1260;
      scheduleStr = '7:30 AM – 9:00 PM';
    } else if (day === 0) {
      openMin = 450;
      closeMin = 1140;
      scheduleStr = '7:30 AM – 7:00 PM';
    }

    if (currentMinutes >= openMin && currentMinutes < closeMin) {
      statusBadge.textContent = 'Open Now';
      statusBadge.classList.remove('closed');
      statusText.textContent = scheduleStr;
    } else {
      statusBadge.textContent = 'Closed Now';
      statusBadge.classList.add('closed');
      statusText.textContent = `Opens Tomorrow at ${day === 5 || day === 6 ? '7:30 AM' : '7:00 AM'}`;
    }
  }
  updateLiveStoreStatus();

  // Announcement bar dismiss
  const closeAnnouncementBtn = document.getElementById('close-announcement');
  const announcementBar = document.getElementById('announcement-bar');
  if (closeAnnouncementBtn && announcementBar) {
    closeAnnouncementBtn.addEventListener('click', () => {
      announcementBar.classList.add('hidden');
    });
  }

  // ------------------------------------------------------------------------
  // 4. THEME TOGGLER (DARK / LIGHT)
  // ------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or default to dark
  const savedTheme = localStorage.getItem('aurora_theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('aurora_theme', newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Espresso Dark' : 'Cream Light'} Mode`, 'info');
    });
  }

  // ------------------------------------------------------------------------
  // 5. STICKY HEADER & SCROLL BEHAVIOR
  // ------------------------------------------------------------------------
  const siteHeader = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  });

  // Smooth active nav highlight on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // ------------------------------------------------------------------------
  // 6. MOBILE DRAWER NAVIGATION
  // ------------------------------------------------------------------------
  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const mobileReserveTrigger = document.getElementById('mobile-reserve-trigger');

  function openMobileDrawer() {
    mobileDrawer?.classList.add('open');
    drawerOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileDrawer() {
    mobileDrawer?.classList.remove('open');
    drawerOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  mobileToggleBtn?.addEventListener('click', openMobileDrawer);
  drawerCloseBtn?.addEventListener('click', closeMobileDrawer);
  drawerOverlay?.addEventListener('click', closeMobileDrawer);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileDrawer);
  });

  if (mobileReserveTrigger) {
    mobileReserveTrigger.addEventListener('click', () => {
      closeMobileDrawer();
      const contactSection = document.getElementById('contact');
      contactSection?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ------------------------------------------------------------------------
  // 7. MENU RENDERING & FILTERING
  // ------------------------------------------------------------------------
  const menuItemsGrid = document.getElementById('menu-items-grid');
  const menuTabBtns = document.querySelectorAll('.menu-tab-btn');

  function renderMenuItems(category = 'all') {
    if (!menuItemsGrid) return;
    menuItemsGrid.innerHTML = '';

    const filtered = category === 'all'
      ? menuItems
      : menuItems.filter(item => item.category === category);

    filtered.forEach(item => {
      const card = document.createElement('article');
      card.className = 'menu-item-card';
      card.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="menu-item-img" loading="lazy">
        <div class="menu-item-info">
          <div class="menu-item-top">
            <h4 class="menu-item-name">${item.name}</h4>
            <span class="menu-item-price">$${item.price.toFixed(2)}</span>
          </div>
          <p class="menu-item-desc">${item.desc}</p>
          <div class="menu-item-bottom">
            <div class="menu-badges">
              ${item.badges.map(b => `<span class="mini-badge">${b}</span>`).join('')}
            </div>
            <button class="add-menu-btn" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" data-img="${item.image}" aria-label="Add ${item.name} to order">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      `;
      menuItemsGrid.appendChild(card);
    });

    // Attach listeners to newly added menu item buttons
    menuItemsGrid.querySelectorAll('.add-menu-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget;
        const id = target.getAttribute('data-id');
        const name = target.getAttribute('data-name');
        const price = parseFloat(target.getAttribute('data-price'));
        const img = target.getAttribute('data-img');
        addToCart(id, name, price, img);
      });
    });
  }

  // Initial render
  renderMenuItems('all');

  // Menu tab switching
  menuTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      menuTabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const category = btn.getAttribute('data-category');
      renderMenuItems(category);
    });
  });

  // Footer category links quick filter
  document.querySelectorAll('.footer-links [data-filter]').forEach(link => {
    link.addEventListener('click', (e) => {
      const filterCat = link.getAttribute('data-filter');
      const targetBtn = document.querySelector(`.menu-tab-btn[data-category="${filterCat}"]`);
      if (targetBtn) {
        targetBtn.click();
      }
    });
  });

  // ------------------------------------------------------------------------
  // 8. SHOPPING CART LOGIC
  // ------------------------------------------------------------------------
  const cartTriggerBtn = document.getElementById('cart-trigger-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartCloseBtn = document.getElementById('cart-close-btn');
  const cartCountBadge = document.getElementById('cart-count-badge');
  const cartDrawerCount = document.getElementById('cart-drawer-count');
  const cartItemsList = document.getElementById('cart-items-list');
  const emptyCartState = document.getElementById('empty-cart-state');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const cartDiscountEl = document.getElementById('cart-discount');
  const discountRow = document.getElementById('discount-row');
  const cartTaxEl = document.getElementById('cart-tax');
  const cartTotalEl = document.getElementById('cart-total');
  const btnTotalPrice = document.getElementById('btn-total-price');
  const promoCodeInput = document.getElementById('promo-code-input');
  const applyPromoBtn = document.getElementById('apply-promo-btn');
  const promoFeedback = document.getElementById('promo-feedback');
  const checkoutBtn = document.getElementById('checkout-btn');
  const startOrderingBtn = document.getElementById('start-ordering-btn');

  function openCartDrawer() {
    cartDrawer?.classList.add('open');
    cartOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCartDrawer() {
    cartDrawer?.classList.remove('open');
    cartOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  cartTriggerBtn?.addEventListener('click', openCartDrawer);
  cartCloseBtn?.addEventListener('click', closeCartDrawer);
  cartOverlay?.addEventListener('click', closeCartDrawer);

  if (startOrderingBtn) {
    startOrderingBtn.addEventListener('click', () => {
      closeCartDrawer();
      document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  function saveCart() {
    try {
      localStorage.setItem('aurora_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Save cart error:', e);
    }
  }

  function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Update Badges
    if (cartCountBadge) {
      cartCountBadge.textContent = totalItems;
      cartCountBadge.classList.add('bounce');
      setTimeout(() => cartCountBadge.classList.remove('bounce'), 300);
    }
    if (cartDrawerCount) {
      cartDrawerCount.textContent = `(${totalItems} item${totalItems === 1 ? '' : 's'})`;
    }

    // Toggle Empty State vs Items List
    if (cart.length === 0) {
      if (emptyCartState) emptyCartState.style.display = 'flex';
      if (cartItemsList) cartItemsList.innerHTML = '';
      if (cartSubtotalEl) cartSubtotalEl.textContent = '$0.00';
      if (cartDiscountEl) cartDiscountEl.textContent = '-$0.00';
      if (discountRow) discountRow.style.display = 'none';
      if (cartTaxEl) cartTaxEl.textContent = '$0.00';
      if (cartTotalEl) cartTotalEl.textContent = '$0.00';
      if (btnTotalPrice) btnTotalPrice.textContent = '$0.00';
      return;
    }

    if (emptyCartState) emptyCartState.style.display = 'none';

    // Render Cart Items
    if (cartItemsList) {
      cartItemsList.innerHTML = cart.map(item => `
        <div class="cart-item-row" data-id="${item.id}">
          <img src="${item.img}" alt="${item.name}" class="cart-item-thumb">
          <div class="cart-item-details">
            <h5 class="cart-item-name">${item.name}</h5>
            <span class="cart-item-unit-price">$${(item.price * item.quantity).toFixed(2)}</span>
            <div class="cart-item-controls">
              <button class="qty-btn minus-btn" data-id="${item.id}" aria-label="Decrease quantity">−</button>
              <span class="qty-display">${item.quantity}</span>
              <button class="qty-btn plus-btn" data-id="${item.id}" aria-label="Increase quantity">+</button>
              <button class="cart-item-remove" data-id="${item.id}" title="Remove item" aria-label="Remove item">
                <i class="fa-regular fa-trash-can"></i>
              </button>
            </div>
          </div>
        </div>
      `).join('');

      // Attach item quantity handlers
      cartItemsList.querySelectorAll('.minus-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          decrementItem(id);
        });
      });

      cartItemsList.querySelectorAll('.plus-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          incrementItem(id);
        });
      });

      cartItemsList.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          removeFromCart(id);
        });
      });
    }

    // Calculate Financials
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discount = 0;

    if (appliedPromo) {
      discount = subtotal * appliedPromo.discountRate;
      if (discountRow) discountRow.style.display = 'flex';
      if (cartDiscountEl) cartDiscountEl.textContent = `-$${discount.toFixed(2)}`;
    } else {
      if (discountRow) discountRow.style.display = 'none';
    }

    const taxedAmount = (subtotal - discount) * 0.08;
    const finalTotal = Math.max(0, subtotal - discount + taxedAmount);

    if (cartSubtotalEl) cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (cartTaxEl) cartTaxEl.textContent = `$${taxedAmount.toFixed(2)}`;
    if (cartTotalEl) cartTotalEl.textContent = `$${finalTotal.toFixed(2)}`;
    if (btnTotalPrice) btnTotalPrice.textContent = `$${finalTotal.toFixed(2)}`;

    saveCart();
  }

  function addToCart(id, name, price, img) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ id, name, price, img, quantity: 1 });
    }
    updateCartUI();
    showToast(`Added "${name}" to your order!`, 'success');
  }

  function incrementItem(id) {
    const item = cart.find(i => i.id === id);
    if (item) {
      item.quantity += 1;
      updateCartUI();
    }
  }

  function decrementItem(id) {
    const itemIndex = cart.findIndex(i => i.id === id);
    if (itemIndex > -1) {
      if (cart[itemIndex].quantity > 1) {
        cart[itemIndex].quantity -= 1;
      } else {
        cart.splice(itemIndex, 1);
      }
      updateCartUI();
    }
  }

  function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    updateCartUI();
  }

  // Order Type selector tabs (Dine-in, Takeaway, Delivery)
  document.querySelectorAll('.order-type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.order-type-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedOrderType = btn.getAttribute('data-type');
      showToast(`Order preference set to: ${selectedOrderType}`, 'info');
    });
  });

  // Promo code verification
  if (applyPromoBtn && promoCodeInput && promoFeedback) {
    applyPromoBtn.addEventListener('click', () => {
      const code = promoCodeInput.value.trim().toUpperCase();
      if (!code) return;

      if (code === 'AURORA10') {
        appliedPromo = { code: 'AURORA10', discountRate: 0.10 };
        promoFeedback.className = 'promo-feedback success';
        promoFeedback.textContent = '✓ 10% discount applied to your order!';
        updateCartUI();
      } else if (code === 'WELCOME15') {
        appliedPromo = { code: 'WELCOME15', discountRate: 0.15 };
        promoFeedback.className = 'promo-feedback success';
        promoFeedback.textContent = '✓ 15% Welcome discount applied!';
        updateCartUI();
      } else {
        promoFeedback.className = 'promo-feedback error';
        promoFeedback.textContent = 'Invalid promo code. Try "AURORA10"';
      }
    });
  }

  // ------------------------------------------------------------------------
  // 8.1 ORDER REPORT & RECEIPT STATE & PERSISTENCE
  // ------------------------------------------------------------------------
  let orderHistory = [];
  try {
    const savedOrders = localStorage.getItem('aurora_order_history');
    if (savedOrders) {
      orderHistory = JSON.parse(savedOrders);
    } else {
      // Sample starter orders for immediate report visual demonstration
      orderHistory = [
        {
          orderId: 'AUR-20261001-1042',
          timestamp: '01/10/2026, 08:15 AM',
          customerName: 'Sokha Meng (ម៉េង សុខា)',
          phone: '012 889 977',
          orderType: 'Dine-in',
          locationInfo: 'Table #02',
          paymentMethod: 'ABA KHQR',
          notes: 'Extra hot microfoam, less sugar',
          items: [
            { name: 'Velvet Crema Cortado', quantity: 2, price: 5.25, total: 10.50 },
            { name: 'French Butter Croissant', quantity: 2, price: 4.75, total: 9.50 }
          ],
          subtotal: 20.00,
          discount: 2.00,
          promoCode: 'AURORA10',
          tax: 1.44,
          total: 19.44,
          khrTotal: 79700
        },
        {
          orderId: 'AUR-20261001-0985',
          timestamp: '01/10/2026, 07:45 AM',
          customerName: 'Dara Chan (ចាន់ ដារ៉ា)',
          phone: '098 765 432',
          orderType: 'Takeaway',
          locationInfo: 'Counter Pickup',
          paymentMethod: 'Cash',
          notes: 'Oat milk substitute',
          items: [
            { name: 'V60 Precision Pour-Over', quantity: 1, price: 6.50, total: 6.50 },
            { name: 'Boquete Geisha Micro-Lot (250g)', quantity: 1, price: 24.00, total: 24.00 }
          ],
          subtotal: 30.50,
          discount: 0.00,
          promoCode: null,
          tax: 2.44,
          total: 32.94,
          khrTotal: 135000
        }
      ];
      localStorage.setItem('aurora_order_history', JSON.stringify(orderHistory));
    }
  } catch (e) {
    console.error('Error loading order history:', e);
  }

  let activeOrderForReceipt = null;

  // Modals & Triggers
  const checkoutModal = document.getElementById('checkout-modal');
  const closeCheckoutModalBtn = document.getElementById('close-checkout-modal-btn');
  const checkoutForm = document.getElementById('checkout-form');
  const checkoutModalItemsCount = document.getElementById('checkout-modal-items-count');
  const checkoutModalTotal = document.getElementById('checkout-modal-total');
  const orderServiceType = document.getElementById('order-service-type');
  const tableNumberGroup = document.getElementById('table-number-group');
  const deliveryAddressGroup = document.getElementById('delivery-address-group');
  const orderDeliveryAddress = document.getElementById('order-delivery-address');

  const orderReceiptModal = document.getElementById('order-receipt-modal');
  const closeReceiptModalBtn = document.getElementById('close-receipt-modal-btn');
  const printReceiptBtn = document.getElementById('print-receipt-btn');
  const downloadReceiptBtn = document.getElementById('download-receipt-btn');
  const newOrderBtn = document.getElementById('new-order-btn');

  const ordersDashboardModal = document.getElementById('orders-report-dashboard-modal');
  const openReportBtn = document.getElementById('open-report-btn');
  const mobileReportsLink = document.getElementById('mobile-reports-link');
  const closeDashboardModalBtn = document.getElementById('close-dashboard-modal-btn');
  const printAllReportsBtn = document.getElementById('print-all-reports-btn');
  const exportCsvBtn = document.getElementById('export-csv-btn');
  const clearOrdersBtn = document.getElementById('clear-orders-btn');

  // Service Type switch (Dine-in vs Delivery vs Takeaway)
  orderServiceType?.addEventListener('change', () => {
    const val = orderServiceType.value;
    if (val === 'Delivery') {
      if (deliveryAddressGroup) deliveryAddressGroup.style.display = 'block';
      if (tableNumberGroup) tableNumberGroup.style.display = 'none';
      if (orderDeliveryAddress) orderDeliveryAddress.required = true;
    } else if (val === 'Dine-in') {
      if (deliveryAddressGroup) deliveryAddressGroup.style.display = 'none';
      if (tableNumberGroup) tableNumberGroup.style.display = 'block';
      if (orderDeliveryAddress) orderDeliveryAddress.required = false;
    } else {
      if (deliveryAddressGroup) deliveryAddressGroup.style.display = 'none';
      if (tableNumberGroup) tableNumberGroup.style.display = 'none';
      if (orderDeliveryAddress) orderDeliveryAddress.required = false;
    }
  });

  // Payment Method card selection
  document.querySelectorAll('.payment-method-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.payment-method-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });

  // Open Checkout Modal from Cart Drawer
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('Your order is currently empty! សូមជ្រើសរើសភេសជ្ជៈមុននឹងកម្មង់', 'error');
        return;
      }

      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      const totalAmount = cartTotalEl?.textContent || '$0.00';

      if (checkoutModalItemsCount) checkoutModalItemsCount.textContent = totalItems;
      if (checkoutModalTotal) checkoutModalTotal.textContent = totalAmount;

      if (orderServiceType) {
        orderServiceType.value = selectedOrderType;
        orderServiceType.dispatchEvent(new Event('change'));
      }

      closeCartDrawer();
      checkoutModal?.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeCheckoutModal() {
    checkoutModal?.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeCheckoutModalBtn?.addEventListener('click', closeCheckoutModal);
  checkoutModal?.addEventListener('click', (e) => {
    if (e.target === checkoutModal) closeCheckoutModal();
  });

  // ------------------------------------------------------------------------
  // 8.2 CHECKOUT FORM SUBMISSION & GENERATING ORDER REPORT
  // ------------------------------------------------------------------------
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (cart.length === 0) {
        showToast('Your order is empty!', 'error');
        closeCheckoutModal();
        return;
      }

      const custName = document.getElementById('order-cust-name').value.trim();
      const custPhone = document.getElementById('order-cust-phone').value.trim();
      const serviceType = orderServiceType?.value || selectedOrderType;
      let locationInfo = '';

      if (serviceType === 'Dine-in') {
        locationInfo = document.getElementById('order-table-num')?.value.trim() || 'Table #01';
      } else if (serviceType === 'Delivery') {
        locationInfo = document.getElementById('order-delivery-address')?.value.trim() || 'Delivery Address';
      } else {
        locationInfo = 'Counter Pickup';
      }

      const paymentRadio = document.querySelector('input[name="payment-method"]:checked');
      const paymentMethod = paymentRadio ? paymentRadio.value : 'Cash';
      const notes = document.getElementById('order-notes')?.value.trim() || 'Standard preparation';

      // Financials
      const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const discount = appliedPromo ? subtotal * appliedPromo.discountRate : 0;
      const tax = (subtotal - discount) * 0.08;
      const grandTotal = Math.max(0, subtotal - discount + tax);
      const khrTotal = Math.round(grandTotal * 4100);

      // Order ID & Timestamp
      const now = new Date();
      const datePart = now.getFullYear().toString() +
        String(now.getMonth() + 1).padStart(2, '0') +
        String(now.getDate()).padStart(2, '0');
      const randNum = Math.floor(1000 + Math.random() * 9000);
      const orderId = `AUR-${datePart}-${randNum}`;

      const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
      const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
      const formattedTimestamp = `${now.toLocaleDateString('en-GB', dateOptions)}, ${now.toLocaleTimeString('en-US', timeOptions)}`;

      // Create Complete Order Report Object
      const newOrder = {
        orderId,
        timestamp: formattedTimestamp,
        customerName: custName,
        phone: custPhone,
        orderType: serviceType,
        locationInfo,
        paymentMethod,
        notes,
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          total: item.price * item.quantity
        })),
        subtotal,
        discount,
        promoCode: appliedPromo ? appliedPromo.code : null,
        tax,
        total: grandTotal,
        khrTotal
      };

      // Persist in Order History
      orderHistory.unshift(newOrder);
      try {
        localStorage.setItem('aurora_order_history', JSON.stringify(orderHistory));
      } catch (err) {
        console.error('Error saving order history:', err);
      }

      // Reset Cart
      cart = [];
      appliedPromo = null;
      if (promoFeedback) promoFeedback.textContent = '';
      if (promoCodeInput) promoCodeInput.value = '';
      updateCartUI();

      // Close Checkout Modal & Open Order Receipt Report
      closeCheckoutModal();
      checkoutForm.reset();

      activeOrderForReceipt = newOrder;
      displayOrderReceipt(newOrder);

      showToast(`🎉 ការកម្មង់ជោគជ័យ! បង្កើតរបាយការណ៍វិក្កយបត្រ #${orderId} រួចរាល់។`, 'success');
    });
  }

  // ------------------------------------------------------------------------
  // 8.3 RENDER ORDER RECEIPT & REPORT MODAL
  // ------------------------------------------------------------------------
  function displayOrderReceipt(order) {
    activeOrderForReceipt = order;

    const receiptMetaGrid = document.getElementById('receipt-meta-grid');
    const receiptItemsTbody = document.getElementById('receipt-items-tbody');
    const receiptTotals = document.getElementById('receipt-totals');
    const receiptBarcodeCode = document.getElementById('receipt-barcode-code');

    if (receiptBarcodeCode) {
      receiptBarcodeCode.textContent = order.orderId;
    }

    if (receiptMetaGrid) {
      receiptMetaGrid.innerHTML = `
        <div><strong>លេខវិក្កយបត្រ / Order:</strong> ${order.orderId}</div>
        <div><strong>កាលបរិច្ឆេទ / Date:</strong> ${order.timestamp}</div>
        <div><strong>អតិថិជន / Customer:</strong> ${order.customerName}</div>
        <div><strong>ទូរស័ព្ទ / Phone:</strong> ${order.phone}</div>
        <div><strong>សេវាកម្ម / Type:</strong> ${order.orderType} (${order.locationInfo})</div>
        <div><strong>ការទូទាត់ / Payment:</strong> ${order.paymentMethod}</div>
        <div style="grid-column: span 2; margin-top: 0.2rem; font-size: 0.72rem; color: #555;">
          <strong>ចំណាំ / Note:</strong> ${order.notes}
        </div>
      `;
    }

    if (receiptItemsTbody) {
      receiptItemsTbody.innerHTML = order.items.map(item => `
        <tr>
          <td class="col-item">${item.name}</td>
          <td class="col-qty">${item.quantity}</td>
          <td class="col-price">$${item.price.toFixed(2)}</td>
          <td class="col-total">$${item.total.toFixed(2)}</td>
        </tr>
      `).join('');
    }

    if (receiptTotals) {
      const discountRow = order.discount > 0
        ? `<div class="receipt-total-row" style="color: #16a34a;">
             <span>បញ្ចុះតម្លៃ / Discount (${order.promoCode || 'PROMO'}):</span>
             <span>-$${order.discount.toFixed(2)}</span>
           </div>`
        : '';

      receiptTotals.innerHTML = `
        <div class="receipt-total-row">
          <span>សរុបរង / Subtotal:</span>
          <span>$${order.subtotal.toFixed(2)}</span>
        </div>
        ${discountRow}
        <div class="receipt-total-row">
          <span>ពន្ធអាករ / Estimated Tax (8%):</span>
          <span>$${order.tax.toFixed(2)}</span>
        </div>
        <div class="receipt-total-row receipt-grand-total">
          <span>សរុបរួម / GRAND TOTAL:</span>
          <span>$${order.total.toFixed(2)} USD</span>
        </div>
        <div class="receipt-total-row receipt-khr-total">
          <span>ប្រាក់រៀល / Total KHR:</span>
          <span>~ ${order.khrTotal.toLocaleString()} ៛</span>
        </div>
        <div class="receipt-total-row" style="margin-top: 0.35rem; font-size: 0.75rem; color: #16a34a; font-weight: 700;">
          <span>ស្ថានភាព / Status:</span>
          <span>✓ PAID (${order.paymentMethod})</span>
        </div>
      `;
    }

    orderReceiptModal?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeReceiptModal() {
    orderReceiptModal?.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeReceiptModalBtn?.addEventListener('click', closeReceiptModal);
  orderReceiptModal?.addEventListener('click', (e) => {
    if (e.target === orderReceiptModal) closeReceiptModal();
  });

  // Print Receipt Button (Triggers window.print())
  printReceiptBtn?.addEventListener('click', () => {
    window.print();
  });

  // Download Order Report as Clean Formatted Text File
  downloadReceiptBtn?.addEventListener('click', () => {
    if (!activeOrderForReceipt) return;
    const ord = activeOrderForReceipt;

    let reportText = `=================================================================\n`;
    reportText += `                   AURORA COFFEE ROASTERS\n`;
    reportText += `       ORDER REPORT & OFFICIAL RECEIPT / វិក្កយបត្រការកម្មង់\n`;
    reportText += `=================================================================\n`;
    reportText += `Order ID        : ${ord.orderId}\n`;
    reportText += `Date & Time     : ${ord.timestamp}\n`;
    reportText += `Customer Name   : ${ord.customerName}\n`;
    reportText += `Phone Number    : ${ord.phone}\n`;
    reportText += `Service Type    : ${ord.orderType} (${ord.locationInfo})\n`;
    reportText += `Payment Method  : ${ord.paymentMethod} (PAID)\n`;
    reportText += `Special Notes   : ${ord.notes}\n`;
    reportText += `-----------------------------------------------------------------\n`;
    reportText += `ITEMIZED ORDER LIST:\n`;
    ord.items.forEach((item, idx) => {
      const line = `${idx + 1}. ${item.name} x ${item.quantity}`;
      const priceStr = `$${item.total.toFixed(2)}`;
      reportText += `   ${line.padEnd(45, ' ')} : ${priceStr}\n`;
    });
    reportText += `-----------------------------------------------------------------\n`;
    reportText += `Subtotal        : $${ord.subtotal.toFixed(2)}\n`;
    if (ord.discount > 0) {
      reportText += `Discount (${ord.promoCode}) : -$${ord.discount.toFixed(2)}\n`;
    }
    reportText += `Tax (8%)        : $${ord.tax.toFixed(2)}\n`;
    reportText += `GRAND TOTAL     : $${ord.total.toFixed(2)} USD\n`;
    reportText += `TOTAL IN KHR    : ~ ${ord.khrTotal.toLocaleString()} KHR (៛)\n`;
    reportText += `=================================================================\n`;
    reportText += `        សូមអរគុណចំពោះការគាំទ្រ! THANK YOU FOR YOUR VISIT!\n`;
    reportText += `           482 Artisan Way, Portland, OR • Tel: (555) 234-ROAST\n`;
    reportText += `=================================================================\n`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Order-Report-${ord.orderId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    showToast('📄 បានទាញយករបាយការណ៍ការកម្មង់ជាជោគជ័យ!', 'success');
  });

  // Start New Order Button inside receipt modal
  newOrderBtn?.addEventListener('click', () => {
    closeReceiptModal();
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  });

  // ------------------------------------------------------------------------
  // 8.4 SALES & ORDER REPORTS DASHBOARD
  // ------------------------------------------------------------------------
  const reportSearchInput = document.getElementById('report-search-input');
  const reportTypeFilter = document.getElementById('report-type-filter');
  const currentCartReportPanel = document.getElementById('current-cart-report-panel');
  const cartReportCount = document.getElementById('cart-report-count');
  const cartReportTotal = document.getElementById('cart-report-total');
  const cartReportItemsGrid = document.getElementById('cart-report-items-grid');
  const checkoutFromReportBtn = document.getElementById('checkout-from-report-btn');

  function renderOrderReportsDashboard() {
    const totalRevenueEl = document.getElementById('metric-total-revenue');
    const revenueKhrEl = document.getElementById('metric-revenue-khr');
    const totalOrdersEl = document.getElementById('metric-total-orders');
    const itemsSoldEl = document.getElementById('metric-items-sold');
    const avgOrderEl = document.getElementById('metric-avg-order');

    const totalOrders = orderHistory.length;
    const totalRevenue = orderHistory.reduce((sum, ord) => sum + ord.total, 0);
    const totalItems = orderHistory.reduce((sum, ord) => {
      return sum + ord.items.reduce((s, it) => s + it.quantity, 0);
    }, 0);
    const avgOrder = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    const totalKhr = Math.round(totalRevenue * 4100);

    if (totalRevenueEl) totalRevenueEl.textContent = `$${totalRevenue.toFixed(2)}`;
    if (revenueKhrEl) revenueKhrEl.textContent = `~ ${totalKhr.toLocaleString()} ៛ KHR`;
    if (totalOrdersEl) totalOrdersEl.textContent = totalOrders;
    if (itemsSoldEl) itemsSoldEl.textContent = totalItems;
    if (avgOrderEl) avgOrderEl.textContent = `$${avgOrder.toFixed(2)}`;

    // 1. Current Active Cart Order Preview (if items currently in cart)
    const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartItemsCount > 0 && currentCartReportPanel) {
      currentCartReportPanel.style.display = 'block';
      if (cartReportCount) cartReportCount.textContent = cartItemsCount;
      if (cartReportTotal) cartReportTotal.textContent = cartTotalEl?.textContent || '$0.00';

      if (cartReportItemsGrid) {
        cartReportItemsGrid.innerHTML = cart.map(item => `
          <div class="cart-report-item-card">
            <div>
              <div class="cart-report-item-name">
                <i class="fa-solid fa-mug-hot text-gold"></i>
                <span>${item.name}</span>
              </div>
              <small style="color: #c7b9ab; font-family: var(--font-khmer);">
                Qty: <strong style="color: var(--gold-primary);">${item.quantity}</strong> × $${item.price.toFixed(2)}
              </small>
            </div>
            <span class="cart-report-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        `).join('');
      }

      if (checkoutFromReportBtn) {
        checkoutFromReportBtn.onclick = () => {
          closeDashboardModal();
          checkoutBtn?.click();
        };
      }
    } else if (currentCartReportPanel) {
      currentCartReportPanel.style.display = 'none';
    }

    // 2. Render Filtered Table of Orders with Full Item Details
    renderOrdersTable();

    ordersDashboardModal?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function renderOrdersTable() {
    const dashboardOrdersTbody = document.getElementById('dashboard-orders-tbody');
    const filterResultsCount = document.getElementById('filter-results-count');
    if (!dashboardOrdersTbody) return;

    const searchTerm = (reportSearchInput?.value || '').toLowerCase().trim();
    const typeFilter = reportTypeFilter?.value || 'all';

    const filtered = orderHistory.filter(ord => {
      // Type match
      const matchesType = typeFilter === 'all' || ord.orderType.toLowerCase() === typeFilter.toLowerCase();

      // Search match
      const itemsText = ord.items.map(i => i.name).join(' ').toLowerCase();
      const matchesSearch = !searchTerm ||
        ord.orderId.toLowerCase().includes(searchTerm) ||
        ord.customerName.toLowerCase().includes(searchTerm) ||
        ord.phone.toLowerCase().includes(searchTerm) ||
        ord.locationInfo.toLowerCase().includes(searchTerm) ||
        itemsText.includes(searchTerm);

      return matchesType && matchesSearch;
    });

    if (filterResultsCount) {
      filterResultsCount.textContent = `បង្ហាញ ${filtered.length} ការកម្ម៉ង់ (Showing ${filtered.length} orders)`;
    }

    if (filtered.length === 0) {
      dashboardOrdersTbody.innerHTML = `
        <tr>
          <td colspan="8" class="empty-orders-placeholder">
            <i class="fa-solid fa-folder-open"></i>
            <p>រកមិនឃើញទិន្នន័យការកម្ម៉ង់ដែលត្រូវនឹងការស្វែងរកទេ</p>
            <small>No matching orders found. Try adjusting your search query or filters.</small>
          </td>
        </tr>
      `;
      return;
    }

    dashboardOrdersTbody.innerHTML = filtered.map(ord => {
      // Find original index in orderHistory for action handling
      const origIndex = orderHistory.findIndex(o => o.orderId === ord.orderId);

      // Extract customer initials
      const rawName = (ord.customerName || 'Customer').replace(/\(.*?\)/g, '').trim();
      const nameParts = rawName.split(' ').filter(Boolean);
      let initials = 'CU';
      if (nameParts.length >= 2) {
        initials = (nameParts[0][0] + nameParts[1][0]).toUpperCase();
      } else if (nameParts.length === 1 && nameParts[0].length >= 2) {
        initials = nameParts[0].substring(0, 2).toUpperCase();
      } else if (nameParts.length === 1) {
        initials = nameParts[0][0].toUpperCase();
      }

      // Elegant avatar background gradient
      const avatarGradients = [
        'linear-gradient(135deg, rgba(229, 184, 105, 0.4), rgba(181, 131, 42, 0.75))',
        'linear-gradient(135deg, rgba(52, 211, 153, 0.4), rgba(16, 185, 129, 0.75))',
        'linear-gradient(135deg, rgba(167, 139, 250, 0.4), rgba(139, 92, 246, 0.75))',
        'linear-gradient(135deg, rgba(251, 146, 60, 0.4), rgba(234, 88, 12, 0.75))'
      ];
      const charCode = ord.orderId.charCodeAt(ord.orderId.length - 1) || 0;
      const avatarGrad = avatarGradients[charCode % avatarGradients.length];

      // Service type class & icon & label
      let typeClass = 'type-dinein';
      let typeIcon = 'fa-solid fa-utensils';
      let typeLabel = ord.orderType;
      if (ord.orderType === 'Takeaway') {
        typeClass = 'type-takeaway';
        typeIcon = 'fa-solid fa-bag-shopping';
      } else if (ord.orderType === 'Delivery') {
        typeClass = 'type-delivery';
        typeIcon = 'fa-solid fa-motorcycle';
      }

      // Payment method badge class & icon
      let paymentClass = 'payment-khqr';
      let paymentIcon = 'fa-solid fa-qrcode';
      if (ord.paymentMethod.toLowerCase().includes('cash')) {
        paymentClass = 'payment-cash';
        paymentIcon = 'fa-solid fa-money-bill-wave';
      } else if (ord.paymentMethod.toLowerCase().includes('counter') || ord.paymentMethod.toLowerCase().includes('card')) {
        paymentClass = 'payment-counter';
        paymentIcon = 'fa-solid fa-store';
      }

      // Detailed items pills
      const itemsListHtml = ord.items.map(it => `
        <div class="order-item-pill">
          <span><i class="fa-solid fa-mug-hot text-gold" style="font-size: 0.75rem; margin-right: 0.25rem;"></i> ${it.name}</span>
          <div>
            <span class="pill-qty">x${it.quantity}</span>
            <span class="pill-price">$${(it.price * it.quantity).toFixed(2)}</span>
          </div>
        </div>
      `).join('');

      const notesHtml = ord.notes && ord.notes !== 'Standard preparation'
        ? `<div class="order-note-tag"><i class="fa-regular fa-comment-dots"></i> "${ord.notes}"</div>`
        : '';

      const [dateStr, timeStr] = ord.timestamp.split(',');

      return `
        <tr>
          <td>
            <div class="order-id-badge">
              <i class="fa-solid fa-hashtag text-gold"></i>
              <span>${ord.orderId}</span>
            </div>
            <div>
              <span class="badge-status-completed"><i class="fa-solid fa-circle-check"></i> Completed (រួចរាល់)</span>
            </div>
          </td>
          <td>
            <div class="order-datetime-cell">
              <span class="order-date-text"><i class="fa-regular fa-calendar-days text-gold"></i> ${dateStr ? dateStr.trim() : ord.timestamp}</span>
              <span class="order-time-text"><i class="fa-regular fa-clock"></i> ${timeStr ? timeStr.trim() : ''}</span>
            </div>
          </td>
          <td>
            <div class="customer-cell-wrap">
              <div class="cust-avatar" style="background: ${avatarGrad};">${initials}</div>
              <div class="cust-info-text">
                <strong>${ord.customerName}</strong>
                <a href="tel:${ord.phone}" class="cust-phone-badge"><i class="fa-solid fa-phone"></i> ${ord.phone}</a>
              </div>
            </div>
          </td>
          <td>
            <div class="service-type-cell">
              <span class="badge-order-type ${typeClass}"><i class="${typeIcon}"></i> ${typeLabel}</span>
              <div class="location-info-sub">
                <i class="fa-solid fa-location-dot text-gold"></i>
                <span>${ord.locationInfo}</span>
              </div>
            </div>
          </td>
          <td>
            <div class="order-items-detail-list">
              ${itemsListHtml}
              ${notesHtml}
            </div>
          </td>
          <td style="text-align: center;">
            <span class="badge-payment-method ${paymentClass}">
              <i class="${paymentIcon}"></i> ${ord.paymentMethod}
            </span>
          </td>
          <td>
            <div class="order-total-cell">
              <span class="order-total-usd">$${ord.total.toFixed(2)}</span>
              <span class="order-total-khr">~ ${ord.khrTotal.toLocaleString()} ៛</span>
            </div>
          </td>
          <td class="no-print">
            <div class="order-actions-cell">
              <button class="view-receipt-btn" data-index="${origIndex}" title="View Receipt">
                <i class="fa-solid fa-receipt"></i> View
              </button>
              <button class="quick-print-btn" data-index="${origIndex}" title="Quick Print Receipt">
                <i class="fa-solid fa-print"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Attach listeners to view receipt buttons
    dashboardOrdersTbody.querySelectorAll('.view-receipt-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.getAttribute('data-index'), 10);
        const targetOrder = orderHistory[index];
        if (targetOrder) {
          closeDashboardModal();
          displayOrderReceipt(targetOrder);
        }
      });
    });

    // Attach listeners to quick print buttons
    dashboardOrdersTbody.querySelectorAll('.quick-print-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.getAttribute('data-index'), 10);
        const targetOrder = orderHistory[index];
        if (targetOrder) {
          activeOrderForReceipt = targetOrder;
          displayOrderReceipt(targetOrder);
          setTimeout(() => {
            window.print();
          }, 350);
        }
      });
    });
  }

  // Live filter and search event listeners
  const searchClearBtn = document.getElementById('search-clear-btn');
  reportSearchInput?.addEventListener('input', () => {
    if (searchClearBtn) {
      searchClearBtn.style.display = reportSearchInput.value ? 'flex' : 'none';
    }
    renderOrdersTable();
  });

  searchClearBtn?.addEventListener('click', () => {
    reportSearchInput.value = '';
    searchClearBtn.style.display = 'none';
    renderOrdersTable();
    reportSearchInput.focus();
  });

  // Filter chips integration with dropdown
  const filterChips = document.querySelectorAll('#dashboard-filter-chips .filter-chip');
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const filterVal = chip.getAttribute('data-filter') || 'all';
      if (reportTypeFilter) {
        reportTypeFilter.value = filterVal;
      }
      renderOrdersTable();
    });
  });

  reportTypeFilter?.addEventListener('change', () => {
    const currentVal = reportTypeFilter.value;
    filterChips.forEach(chip => {
      if (chip.getAttribute('data-filter') === currentVal) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });
    renderOrdersTable();
  });

  function closeDashboardModal() {
    ordersDashboardModal?.classList.remove('active');
    document.body.style.overflow = '';
  }

  openReportBtn?.addEventListener('click', renderOrderReportsDashboard);
  mobileReportsLink?.addEventListener('click', (e) => {
    e.preventDefault();
    closeMobileDrawer();
    renderOrderReportsDashboard();
  });

  closeDashboardModalBtn?.addEventListener('click', closeDashboardModal);
  ordersDashboardModal?.addEventListener('click', (e) => {
    if (e.target === ordersDashboardModal) closeDashboardModal();
  });

  // Print all reports
  printAllReportsBtn?.addEventListener('click', () => {
    window.print();
  });

  // Export CSV
  exportCsvBtn?.addEventListener('click', () => {
    if (orderHistory.length === 0) {
      showToast('No orders to export!', 'error');
      return;
    }

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Order ID,Date Time,Customer Name,Phone,Order Type,Location,Payment Method,Subtotal,Discount,Tax,Total USD,Total KHR\n';

    orderHistory.forEach(ord => {
      const row = [
        `"${ord.orderId}"`,
        `"${ord.timestamp}"`,
        `"${ord.customerName}"`,
        `"${ord.phone}"`,
        `"${ord.orderType}"`,
        `"${ord.locationInfo}"`,
        `"${ord.paymentMethod}"`,
        ord.subtotal.toFixed(2),
        ord.discount.toFixed(2),
        ord.tax.toFixed(2),
        ord.total.toFixed(2),
        ord.khrTotal
      ].join(',');
      csvContent += row + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `aurora-sales-reports-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('📊 Exported Sales Report to CSV successfully!', 'success');
  });

  // Clear orders history
  clearOrdersBtn?.addEventListener('click', () => {
    if (orderHistory.length === 0) return;
    const confirmClear = confirm('តើអ្នកពិតជាចង់ជម្រះប្រវត្តិរបាយការណ៍ទាំងអស់មែនទេ? (Are you sure you want to clear all order history?)');
    if (confirmClear) {
      orderHistory = [];
      localStorage.removeItem('aurora_order_history');
      renderOrderReportsDashboard();
      showToast('🗑️ បានជម្រះប្រវត្តិរបាយការណ៍ទាំងអស់រួចរាល់។', 'info');
    }
  });

  // Connect signature buttons and hero pick
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget;
      const id = target.getAttribute('data-id');
      const name = target.getAttribute('data-name');
      const price = parseFloat(target.getAttribute('data-price'));
      const img = target.getAttribute('data-img');
      addToCart(id, name, price, img);
      openCartDrawer();
    });
  });

  const heroQuickBtn = document.querySelector('.add-to-cart-quick');
  if (heroQuickBtn) {
    heroQuickBtn.addEventListener('click', (e) => {
      const target = e.currentTarget;
      const id = target.getAttribute('data-id');
      const name = target.getAttribute('data-name');
      const price = parseFloat(target.getAttribute('data-price'));
      addToCart(id, name, price, 'images/hero-coffee.jpg');
      openCartDrawer();
    });
  }

  // Favorite toggle buttons on cards
  document.querySelectorAll('.quick-favorite-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.classList.toggle('favorited');
      const isFav = btn.classList.contains('favorited');
      const icon = btn.querySelector('i');
      if (isFav) {
        icon.className = 'fa-solid fa-heart';
        showToast('Saved to your favorites collection!', 'info');
      } else {
        icon.className = 'fa-regular fa-heart';
      }
    });
  });

  // Initial cart UI update
  updateCartUI();

  // ------------------------------------------------------------------------
  // 9. INTERACTIVE COFFEE FLAVOR FINDER QUIZ
  // ------------------------------------------------------------------------
  const quizOptionBtns = document.querySelectorAll('.quiz-option-btn');
  const resultCoffeeName = document.getElementById('result-coffee-name');
  const resultCoffeeDesc = document.getElementById('result-coffee-desc');
  const resultCoffeeOrigin = document.getElementById('result-coffee-origin');
  const resultCoffeePrice = document.getElementById('result-coffee-price');
  const addQuizMatchBtn = document.getElementById('add-quiz-match-btn');

  let quizState = {
    roast: 'light',
    flavor: 'fruity',
    style: 'black'
  };

  const recommendationMatrix = {
    'light-fruity-black': {
      name: 'Highlands Geisha Precision Pour-Over',
      desc: 'Delicate jasmine blossoms, white peach, bergamot tea, and golden nectar with a crystalline, sparkling finish.',
      origin: 'Boquete, Panama (1,850m)',
      price: 6.75,
      img: 'images/coffee-1.jpg'
    },
    'light-fruity-milk': {
      name: 'Honey Yirgacheffe Piccolo Latte',
      desc: 'A bright, lively espresso with wild berry sweetness softened by velvety milk foam.',
      origin: 'Yirgacheffe, Ethiopia (2,000m)',
      price: 5.50,
      img: 'images/hero-coffee.jpg'
    },
    'light-fruity-iced': {
      name: 'Cascara Botanical Tonic Cold Brew',
      desc: 'Sparkling tonic water infused with cascara fruit syrup, light cold brew, and fresh lemon twist.',
      origin: 'Nariño, Colombia',
      price: 6.25,
      img: 'images/coffee-3.jpg'
    },
    'medium-choc-nut-black': {
      name: 'Huila Supreme Aeropress Brew',
      desc: 'Silky, full cup packed with toasted almond, milk chocolate praline, and a round honey finish.',
      origin: 'Huila, Colombia',
      price: 5.75,
      img: 'images/coffee-1.jpg'
    },
    'medium-choc-nut-milk': {
      name: 'Velvet Crema Cortado',
      desc: 'Equal parts double espresso and silky microfoam, unlocking rich roasted hazelnut and dark cocoa.',
      origin: 'Huila, Colombia',
      price: 5.25,
      img: 'images/coffee-2.jpg'
    },
    'medium-choc-nut-iced': {
      name: '18-Hour Kyoto Cold Drip with Oat Cream',
      desc: 'Chilled drop-by-drop extraction layered with Madagascar vanilla and oat milk crema.',
      origin: 'Antigua, Guatemala',
      price: 5.95,
      img: 'images/coffee-3.jpg'
    },
    'dark-spiced-caramel-black': {
      name: 'Sumatra Mandheling French Press',
      desc: 'Heavy body, earthy cedar, spiced dark chocolate, and smoky dark brown sugar molasses.',
      origin: 'Lake Toba, Sumatra',
      price: 5.50,
      img: 'images/coffee-1.jpg'
    },
    'dark-spiced-caramel-milk': {
      name: 'Artisan Smoked Sea Salt Mocha',
      desc: 'Double dark roast espresso blended with Valrhona 70% dark chocolate and salted caramel.',
      origin: 'Antigua & Sumatra Blend',
      price: 6.50,
      img: 'images/hero-coffee.jpg'
    },
    'dark-spiced-caramel-iced': {
      name: 'Nitro Spiced Espresso Shakerato',
      desc: 'Vigorously shaken dark espresso over block ice with cinnamon bark and brown sugar syrup.',
      origin: 'House Roast Reserve',
      price: 5.85,
      img: 'images/coffee-3.jpg'
    }
  };

  function updateQuizRecommendation() {
    const key = `${quizState.roast}-${quizState.flavor}-${quizState.style}`;
    // Fallback if specific 3-combination isn't directly listed
    const match = recommendationMatrix[key] || recommendationMatrix['medium-choc-nut-milk'];

    if (resultCoffeeName) resultCoffeeName.textContent = match.name;
    if (resultCoffeeDesc) resultCoffeeDesc.textContent = match.desc;
    if (resultCoffeeOrigin) resultCoffeeOrigin.textContent = `Origin: ${match.origin}`;
    if (resultCoffeePrice) resultCoffeePrice.textContent = `$${match.price.toFixed(2)}`;

    if (addQuizMatchBtn) {
      addQuizMatchBtn.onclick = () => {
        addToCart(`quiz-${key}`, match.name, match.price, match.img);
        openCartDrawer();
      };
    }
  }

  quizOptionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const parentStep = btn.closest('.quiz-step');
      parentStep.querySelectorAll('.quiz-option-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (btn.hasAttribute('data-roast')) quizState.roast = btn.getAttribute('data-roast');
      if (btn.hasAttribute('data-flavor')) quizState.flavor = btn.getAttribute('data-flavor');
      if (btn.hasAttribute('data-style')) quizState.style = btn.getAttribute('data-style');

      updateQuizRecommendation();
    });
  });

  // Initialize quiz default
  updateQuizRecommendation();

  // ------------------------------------------------------------------------
  // 10. GALLERY LIGHTBOX MODAL
  // ------------------------------------------------------------------------
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.getAttribute('data-caption') || img.getAttribute('alt');
      if (lightboxImg) lightboxImg.src = img.src;
      if (lightboxCaption) lightboxCaption.textContent = caption;
      lightboxModal?.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightboxModal?.classList.remove('active');
    document.body.style.overflow = '';
  }

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxModal?.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeMobileDrawer();
      closeCartDrawer();
      closeResModal();
    }
  });

  // ------------------------------------------------------------------------
  // 11. TABLE RESERVATION FORM
  // ------------------------------------------------------------------------
  const reservationForm = document.getElementById('reservation-form');
  const resModal = document.getElementById('res-modal');
  const resDetailsBox = document.getElementById('res-details-box');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const closeResModalBtn = document.getElementById('close-res-modal-btn');
  const openReserveBtn = document.getElementById('open-reserve-btn');

  // Set minimum date to today
  const resDateInput = document.getElementById('res-date');
  if (resDateInput) {
    const todayStr = new Date().toISOString().split('T')[0];
    resDateInput.min = todayStr;
    resDateInput.value = todayStr;
  }

  if (openReserveBtn) {
    openReserveBtn.addEventListener('click', () => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  function closeResModal() {
    resModal?.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalCloseBtn?.addEventListener('click', closeResModal);
  closeResModalBtn?.addEventListener('click', closeResModal);
  resModal?.addEventListener('click', (e) => {
    if (e.target === resModal) closeResModal();
  });

  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('res-name').value;
      const email = document.getElementById('res-email').value;
      const date = document.getElementById('res-date').value;
      const time = document.getElementById('res-time').value;
      const guests = document.getElementById('res-guests').value;
      const seating = document.getElementById('res-seating').value;
      const code = 'AUR-' + Math.floor(1000 + Math.random() * 9000);

      if (resDetailsBox) {
        resDetailsBox.innerHTML = `
          <div><strong>Confirmation Code:</strong> ${code}</div>
          <div><strong>Guest Name:</strong> ${name} (${email})</div>
          <div><strong>Reservation Time:</strong> ${date} at ${time}</div>
          <div><strong>Party Size:</strong> ${guests} guests</div>
          <div><strong>Area:</strong> ${seating}</div>
        `;
      }

      resModal?.classList.add('active');
      document.body.style.overflow = 'hidden';
      reservationForm.reset();
      if (resDateInput) {
        resDateInput.value = new Date().toISOString().split('T')[0];
      }
    });
  }

  // ------------------------------------------------------------------------
  // 12. NEWSLETTER FORM
  // ------------------------------------------------------------------------
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterEmail = document.getElementById('newsletter-email');

  if (newsletterForm && newsletterEmail) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterEmail.value.trim();
      if (email) {
        showToast(`✨ Welcome to the Club, ${email}! Check your inbox for your 15% discount code!`, 'success');
        newsletterForm.reset();
      }
    });
  }

  // ------------------------------------------------------------------------
  // 13. TOAST NOTIFICATION UTILITY
  // ------------------------------------------------------------------------
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';

    let iconClass = 'fa-solid fa-mug-hot';
    let iconModifier = '';

    if (type === 'success') {
      iconClass = 'fa-solid fa-circle-check';
      iconModifier = 'success';
    } else if (type === 'error') {
      iconClass = 'fa-solid fa-circle-exclamation';
      iconModifier = 'error';
    }

    toast.innerHTML = `
      <div class="toast-icon ${iconModifier}"><i class="${iconClass}"></i></div>
      <div class="toast-message">${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('hiding');
      setTimeout(() => toast.remove(), 350);
    }, 4000);
  }

  // Details button mock modal
  document.querySelectorAll('.view-details-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Brew recipe: 1:16 ratio, 93°C temperature, 3-minute slow extraction curve.', 'info');
    });
  });

  // --------------------------------------------------------------------------
  // Marquee & Announcement Promo Code Auto-Copy (AURORA10)
  // --------------------------------------------------------------------------
  const promoTriggers = document.querySelectorAll('.mq-coupon, .promo-pill, #marquee-copy-coupon-btn, .ann-chip-promo');
  promoTriggers.forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const code = 'AURORA10';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(() => {
          showToast('🎉 បានចម្លងកូដ "AURORA10" បញ្ចុះតម្លៃ 10% ដោយជោគជ័យ! (Copied promo code)', 'success');
        }).catch(() => {
          fallbackCopyText(code);
        });
      } else {
        fallbackCopyText(code);
      }
    });
  });

  function fallbackCopyText(text) {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    tempInput.style.position = 'fixed';
    tempInput.style.opacity = '0';
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      showToast('🎉 បានចម្លងកូដ "AURORA10" បញ្ចុះតម្លៃ 10% ដោយជោគជ័យ!', 'success');
    } catch (err) {
      showToast('🎁 កូដបញ្ចុះតម្លៃ 10%: AURORA10', 'info');
    }
    document.body.removeChild(tempInput);
  }
});
