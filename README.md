# AR JISHAN E-COMMERCE SERVICE

> **"Shop Smart. Live Better."**  
> A high-performance, production-ready Bangladesh e-commerce platform built with Next.js (App Router), TypeScript, Tailwind CSS, Supabase PostgreSQL, and comprehensive Bangladesh payment and logistics integrations.

---

## 🚀 Key Features

### 1. Brand Identity & Experience
- **Official Brand Mark**: AJ Shopping Bag emblem with dynamic orange speed accents, deep navy typography (`#172554`), and premium orange highlights (`#F97316`).
- **Bangladesh Market Focus**: Currency formatting in **BDT (৳)**, bilingual English & Bangla indicators, and customer helpline.
- **Responsive Architecture**: Mobile-first design optimized for 360px, 390px, 768px, 1024px, and 1440px displays, complete with a persistent mobile bottom navigation bar.

### 2. High-Conversion Homepage
- **Announcement Bar**: Nationwide delivery notice, Cash on Delivery banner, 24/7 support hotline, and language switcher.
- **Main Header**: Brand logo, predictive search with autocomplete suggestions, account shortcut, wishlist counter, and live cart counter badge.
- **Navigation Bar**: Quick category dropdown, flash deal highlights, and public navigation links.
- **Hero Slider**: Interactive carousel with "Discover Products You'll Love", value propositions, and direct CTAs.
- **Category Pills**: Clean iconography and soft pastel background badges for Electronics, Fashion, Beauty, Watches, Home & Living, Accessories, Sports, and Lifestyle.
- **Promotional 3-Up Cards**: Special discount banners matching real retail campaign merchandizing.
- **Flash Sale Section**: Live real-time countdown timer, discount badges (-30%, -25%), and one-click cart additions.
- **Featured Products, Best Sellers & New Arrivals**: Multi-category grids with dynamic reviews and stock availability indicators.
- **Why Choose Us**: 6-pillar trust badges (Genuine Guarantee, Nationwide Fast Courier, 7-Day Easy Returns, etc.).
- **Customer Testimonials**: Verified purchaser reviews from Dhaka, Chattogram, Sylhet, and other districts.
- **Newsletter Subscription**: Instant incentive coupon code (`WELCOME50`) upon submission.
- **Comprehensive Footer**: Quick shop links, customer service guidelines, contact info, accepted payment badges (bKash, Nagad, Rocket, Visa/Mastercard, COD), and legal policies.

### 3. Product Catalog & Details
- **Multi-Facet Search & Filtering**: Filter by category, brand, price range (e.g. Under ৳2,000, ৳2,000–৳4,000, Above ৳4,000), and sort by popularity, rating, newest, or price.
- **Product Details Page (`/products/[slug]`)**:
  - Interactive multi-image gallery with zoom preview.
  - Live stock verification and stock level badges.
  - Variant selectors (Color swatches and size buttons).
  - Quantity controls strictly constrained by available stock.
  - Instant **Buy Now** (direct to checkout) and **Add to Cart**.
  - Bangladesh delivery estimation (Dhaka 24-48h, Outside Dhaka 2-3 days).
  - Tabbed Description, Technical Specifications, and Verified Customer Reviews with submission form.
  - Related product recommendations.

### 4. Cart, Checkout & Bangladesh Logistics
- **Persistent Slide-Over Cart Drawer**: Slide-out drawer on item addition, quantity steppers, item removal, and a **Free Delivery progress bar** (threshold: ৳1,000).
- **Dedicated Cart Page (`/cart`)**: Itemized table, order summary, and promo coupon voucher engine (`ARJISHAN10`, `WELCOME50`, `EIDSPECIAL`).
- **Multi-Step Bangladesh Checkout (`/checkout`)**:
  - Customer contact validation (11-digit Bangladesh phone verification `01XXXXXXXXX`).
  - Cascading address selectors: Division (Dhaka, Chattogram, Rajshahi, Khulna, Barishal, Sylhet, Rangpur, Mymensingh) & dynamically filtered Districts.
  - Server-calculated shipping fees: ৳60 inside Dhaka, ৳120 outside Dhaka, or **FREE** for orders over ৳1,000.
  - Strict server-side recalculation of prices, discounts, and inventory before order creation.

### 5. Bangladesh Payment Integrations
- **Payment Options**: Cash on Delivery (COD), bKash, Nagad, and Debit/Credit Cards via SSLCommerz.
- **Payment Sandbox / Test Mode (`/checkout/payment-sandbox`)**: Fully testable payment simulation environment for verifying mobile PIN verification, gateway callbacks, and order status updates without requiring live merchant credentials during staging.
- **Order Confirmation & Invoicing (`/checkout/success`)**: Order summary, shipping destination snapshot, courier assignment, and printable receipt.
- **Live Public Order Tracking (`/track-order`)**: Real-time status progression (Pending → Confirmed → Processing → Shipped → Delivered) and courier consignment tracking (Pathao / Steadfast).

### 6. Admin Management Console (`/admin`)
- **Dashboard Overview**: Total Sales (৳), Total Orders, Pending Orders, Low Stock Alerts, and sales distribution.
- **Products Catalog (`/admin/products`)**: Add new products, edit pricing/stock, toggle flash sales, and delete catalog items.
- **Orders Management (`/admin/orders`)**: Filter orders by status, change status, assign courier consignment numbers, and inspect customer details.
- **Inventory Control (`/admin/inventory`)**: Stock level auditing and low inventory warnings.
- **Coupons Manager (`/admin/coupons`)**: Create promo codes, configure percentage or fixed discounts, set minimum spends, and toggle active status.
- **Store Settings (`/admin/settings`)**: Configure shipping fees, free shipping thresholds, and office contacts.

---

## 🛠 Tech Stack

- **Framework**: Next.js 16+ (App Router, Server Components & Route Handlers)
- **Language**: TypeScript 5+ (Strict type-checking)
- **Styling**: Tailwind CSS v4, Lucide React Icons
- **Database**: PostgreSQL (Supabase schema and migrations provided in `supabase/schema.sql`)
- **Architecture**: Dual-layer Repository Service with persistent storage fallback and instant out-of-the-box operation.

---

## 📂 Project Structure

```
├── public/
│   └── images/brand/         # Official logo and design assets
├── src/
│   ├── app/
│   │   ├── (public)/         # Home, Shop, Products, Cart, Checkout
│   │   ├── account/          # Customer account and order history
│   │   ├── admin/            # Admin dashboard and management modules
│   │   ├── api/              # Secure Next.js route handlers
│   │   ├── track-order/      # Public live tracking portal
│   │   ├── layout.tsx        # Global root layout with providers
│   │   └── page.tsx          # Homepage
│   ├── components/
│   │   ├── brand/Logo.tsx    # Official AR Jishan SVG / Brand logo
│   │   ├── cart/             # Slide-over cart drawer
│   │   ├── home/             # Hero, Category pills, Flash Sale, Banners
│   │   ├── layout/           # Header, Announcement bar, Navbar, Footer
│   │   └── product/          # ProductCard, ProductDetailsView
│   ├── context/              # Cart & Wishlist context providers
│   ├── data/                 # Bangladesh seed catalog and mock data
│   ├── lib/                  # Data service, utils, and payment adapters
│   └── types/                # TypeScript interfaces
├── supabase/
│   └── schema.sql            # Full PostgreSQL production migration schema
└── .env.example              # Environment variables template
```

---

## ⚙️ Getting Started

### 1. Prerequisites
- **Node.js**: v18.18.0 or higher (v20+ recommended)
- **npm** or **pnpm**

### 2. Installation
```bash
# Clone or navigate to the repository
cd "Ar jishan e-commerce service"

# Install dependencies
npm install
```

### 3. Run Locally in Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 💳 Payment Gateway Setup (Production)

To enable live payment processing, add your merchant credentials to `.env.local`:

```env
# bKash Tokenized Checkout
BKASH_BASE_URL=https://tokenized.pay.bka.sh/v1.2.0-beta
BKASH_APP_KEY=your_app_key
BKASH_APP_SECRET=your_app_secret
BKASH_USERNAME=your_username
BKASH_PASSWORD=your_password

# SSLCommerz
SSLCOMMERZ_STORE_ID=your_store_id
SSLCOMMERZ_STORE_PASS=your_store_password
SSLCOMMERZ_IS_SANDBOX=false
```
*Note: In development or sandbox mode without external API keys, the application automatically runs its testable Sandbox Simulator, allowing end-to-end testing of payments and order flows.*

---

## 🗄️ Database Setup (Supabase / PostgreSQL)

1. Create a new project in [Supabase](https://supabase.com).
2. Go to the **SQL Editor** tab.
3. Paste and run the entire SQL script from [`supabase/schema.sql`](supabase/schema.sql).
4. Copy your Supabase Project URL and Anon Key into `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

---

## 🧪 Testing & Verification

Run TypeScript and code quality checks:
```bash
# Type-checking
npx tsc --noEmit

# Production build
npm run build
```

---

## 📜 License
Copyright © 2026 **AR JISHAN E-COMMERCE SERVICE**. All rights reserved.
