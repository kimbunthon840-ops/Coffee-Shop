# ☕ Aurora Coffee Roasters

> An artisanal, luxury specialty coffee shop & roastery web application featuring modern dark & light modes, interactive flavor profiling, live ordering cart, table reservations, and rich responsive aesthetics.

---

## 📁 Project Structure

```
coffee-shop/
│
├── index.html              # Main HTML structure with semantic tags & SEO metadata
├── css/
│   └── style.css           # Vanilla CSS design system, typography, glassmorphism, animations
├── js/
│   └── script.js           # Interactive state: cart, quiz, menu filtering, reservations, theme
├── images/
│   ├── logo.png            # Aurora Coffee Roasters gold crest logo
│   ├── hero-coffee.jpg     # Cinematic hero shot of steaming artisanal latte
│   ├── coffee-1.jpg        # Precision V60 pour-over specialty brew
│   ├── coffee-2.jpg        # Velvet crema Cortado in glassware
│   ├── coffee-3.jpg        # 18-Hour Kyoto slow drip cold brew
│   └── gallery/
│       ├── gallery-1.jpg   # Barista latte art pouring
│       ├── gallery-2.jpg   # Coffee drum roaster cooling tray
│       ├── gallery-3.jpg   # Cozy cafe interior & leather lounge
│       ├── gallery-4.jpg   # Fresh morning bakery pastries & croissants
│       ├── gallery-5.jpg   # Kyoto slow drip glass tower
│       └── gallery-6.jpg   # Barista espresso bar tools
│
└── README.md               # Project documentation
```

---

## ✨ Key Features & Interactive Experience

### 1. 🎨 Luxury Aesthetic & Visual Polish
- **Harmonious Color Palette**: Deep espresso roast (`#0d0a08`), warm crema gold (`#e5b869`), amber glow, and crisp typography.
- **Dark & Light Mode Switcher**: Seamless instant theme toggle with persistent state saved to `localStorage`.
- **Glassmorphism Panels**: Modern backdrop blur effect on navigation, cards, and floating elements.
- **Fluid Micro-Animations**: Smooth button hover glows, cart badge bounce, card elevations, and steam indicators.

### 2. 🧠 Interactive Flavor Finder Quiz
- A 3-step sommelier quiz helping guests discover their ideal roast intensity, flavor notes, and brewing method.
- Real-time matching matrix providing instant custom recommendations with a direct "+ Add Match to Order" button.

### 3. 🛍️ Interactive Ordering & Customer Details
- Slide-out cart drawer with real-time item counter and badge animation.
- Item quantity adjustment (increment, decrement, remove).
- **Order Type Switcher**: Dine-in (ញ៉ាំនៅហាង), Takeaway (ខ្ចប់ទៅផ្ទះ), or Delivery (ដឹកជញ្ជូន).
- **Promo Code Engine**: Test with `AURORA10` (10% off) or `WELCOME15` (15% off).
- Dynamic sales tax calculation and real-time total breakdown.

### 4. 🧾 Automated Order Reports & Printable Receipts (របាយការណ៍ការកម្មង់ & វិក្កយបត្រ)
- **Customer Checkout Modal**: Collects customer name, phone number, table number or delivery address, and payment method (Cash, ABA KHQR, Credit Card).
- **Instant Official Receipt / Report**:
  - Automatically generates an Order ID (e.g. `#AUR-20261001-4821`), timestamp, customer details, and itemized table.
  - Calculates subtotal, promo discounts, tax, grand total in USD ($) and converted to Cambodian Riel (៛ at 4,100 KHR/$).
  - **🖨️ Print Receipt**: Direct `@media print` thermal/A4 receipt printing with zero website clutter.
  - **📥 Download Report**: Exports clean formatted text invoice files (`Order-Report-*.txt`).
- **📊 Sales & Orders Reports Dashboard**:
  - Accessible via header & mobile drawer "Reports" button.
  - Key business metrics: Total Revenue ($ & ៛), Total Orders, Items Sold, Average Order Value.
  - Live Order History Table with full order lookup and reprint features.
  - Export all orders to CSV (`aurora-sales-reports-*.csv`).

### 5. 🍽️ Categorized Seasonal Menu
- Filter by categories: **All Offerings**, **Espresso Bar**, **Manual Filter**, **Cold & Nitro**, **Artisan Bakery**, and **Whole Bean Bags**.
- Dietary tags, origin notes, pricing, and 1-click addition to cart.

### 5. 📅 Interactive Table Booking System
- Complete reservation system for reserving window bars, cozy leather lounges, patio tables, or tasting benches.
- Automatic guest validation and confirmation modal generating a unique booking code (e.g. `#AUR-8492`).

### 6. 🕒 Dynamic Real-Time Store Status
- Calculates open/closed status in real-time based on the user's local day and time.
- Displays dynamic operating hours and morning opening countdowns.

### 7. 🖼️ Sensory Gallery with Lightbox
- High-resolution cafe imagery showcasing the barista bar, roastery, fresh pastries, and lounge.
- Click any photo to inspect in the fullscreen lightbox preview.

---

## 🚀 How to Run Locally

You can run this project with any local server or simply open the HTML file:

### Option 1: Direct Browser Open
Double-click `coffee-shop/index.html` or open it in any modern browser (Chrome, Edge, Firefox, Safari).

### Option 2: Using Node.js `npx serve`
```bash
npx serve coffee-shop
```

### Option 3: Using Python
```bash
# Navigate to the coffee-shop folder
cd coffee-shop
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

---

## 🛠️ Built With
- **HTML5**: Semantic tags, accessibility attributes, and SEO metadata.
- **Vanilla CSS3**: CSS Variables, CSS Grid, Flexbox, Keyframe Animations, Glassmorphism.
- **Vanilla JavaScript (ES6+)**: Zero external JS dependencies for lightning-fast performance.
- **Google Fonts**: *Playfair Display*, *Cinzel*, and *Plus Jakarta Sans*.
- **Font Awesome 6**: Modern iconography.
