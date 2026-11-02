-- ====================================================================
-- AR JISHAN E-COMMERCE SERVICE — SEED DATA SCRIPT
-- Market: Bangladesh | Currency: BDT (৳)
-- ====================================================================

-- 1. SEED CATEGORIES
INSERT INTO public.categories (id, name, slug, description, icon_name, display_order, image_url)
VALUES
('c1000000-0000-0000-0000-000000000001', 'Electronics', 'electronics', 'Latest gadgets, audio, computing & smart accessories', 'Smartphone', 1, '/images/products/earbuds.jpg'),
('c1000000-0000-0000-0000-000000000002', 'Fashion', 'fashion', 'Trending men''s and women''s clothing, ethnic & casual wear', 'Shirt', 2, '/images/products/linen-shirt.jpg'),
('c1000000-0000-0000-0000-000000000003', 'Beauty', 'beauty', 'Skincare, fragrances, makeup and personal wellness', 'Sparkles', 3, '/images/products/face-serum.jpg'),
('c1000000-0000-0000-0000-000000000004', 'Watches', 'watches', 'Smartwatches, chronographs, and luxury timepieces', 'Watch', 4, '/images/products/smartwatch.jpg'),
('c1000000-0000-0000-0000-000000000005', 'Home & Living', 'home-living', 'Home decor, organizers, kitchenware and lighting', 'Home', 5, '/images/products/desk-lamp.jpg'),
('c1000000-0000-0000-0000-000000000006', 'Accessories', 'accessories', 'Backpacks, wallets, eyewear, phone cases and cables', 'Headphones', 6, '/images/products/backpack.jpg'),
('c1000000-0000-0000-0000-000000000007', 'Sports', 'sports', 'Athletic wear, running footwear, gym gear & fitness', 'Activity', 7, '/images/products/shoes.jpg'),
('c1000000-0000-0000-0000-000000000008', 'Lifestyle', 'lifestyle', 'Travel essentials, gourmet coffee & daily productivity', 'Compass', 8, '/images/banners/hero-headphones.jpg')
ON CONFLICT (slug) DO NOTHING;

-- 2. SEED BRANDS
INSERT INTO public.brands (id, name, slug, is_featured)
VALUES
('b1000000-0000-0000-0000-000000000001', 'Apple', 'apple', TRUE),
('b1000000-0000-0000-0000-000000000002', 'Samsung', 'samsung', TRUE),
('b1000000-0000-0000-0000-000000000003', 'Sony', 'sony', TRUE),
('b1000000-0000-0000-0000-000000000004', 'Xiaomi', 'xiaomi', TRUE),
('b1000000-0000-0000-0000-000000000005', 'Apex', 'apex', TRUE),
('b1000000-0000-0000-0000-000000000006', 'Aarong', 'aarong', TRUE),
('b1000000-0000-0000-0000-000000000007', 'Amazfit', 'amazfit', TRUE),
('b1000000-0000-0000-0000-000000000008', 'Anker', 'anker', TRUE)
ON CONFLICT (slug) DO NOTHING;

-- 3. SEED PRODUCTS (Using valid hex UUID prefix a1000000...)
INSERT INTO public.products (
  id, name, slug, sku, description, regular_price, sale_price, category_id, brand_id, stock_quantity,
  is_featured, is_new_arrival, is_bestseller, is_flash_deal, rating, review_count, is_published
)
VALUES
(
  'a1000000-0000-0000-0000-000000000001',
  'Wireless ANC Bluetooth Earbuds',
  'wireless-anc-bluetooth-earbuds',
  'ARJ-AUD-001',
  'Premium active noise cancelling earbuds with transparent mode, crystal clear HD microphone, and 32 hours total playback.',
  3500.00,
  2490.00,
  'c1000000-0000-0000-0000-000000000001',
  'b1000000-0000-0000-0000-000000000008',
  45,
  TRUE, FALSE, TRUE, TRUE, 4.6, 2540, TRUE
),
(
  'a1000000-0000-0000-0000-000000000002',
  'Smart Watch Ultra Pro AMOLED Display',
  'smart-watch-ultra-pro-amoled',
  'ARJ-WCH-002',
  '1.96-inch HD AMOLED display smartwatch featuring comprehensive 24/7 heart rate, SpO2 blood oxygen monitoring, and Bluetooth calling.',
  4200.00,
  3200.00,
  'c1000000-0000-0000-0000-000000000004',
  'b1000000-0000-0000-0000-000000000007',
  30,
  TRUE, TRUE, TRUE, TRUE, 4.7, 1280, TRUE
),
(
  'a1000000-0000-0000-0000-000000000003',
  'Urban Explorer Ergonomic Travel Backpack',
  'urban-explorer-travel-backpack',
  'ARJ-BAG-003',
  'Water-resistant, anti-theft urban backpack with dedicated 15.6-inch padded laptop compartment and breathable orthopedic back panel.',
  2500.00,
  1850.00,
  'c1000000-0000-0000-0000-000000000006',
  'b1000000-0000-0000-0000-000000000004',
  28,
  TRUE, FALSE, FALSE, TRUE, 4.5, 985, TRUE
),
(
  'a1000000-0000-0000-0000-000000000004',
  'Breathable Cushion Performance Running Shoes',
  'breathable-cushion-running-shoes',
  'ARJ-SHOE-004',
  'Engineered mesh running shoes featuring high-rebound EVA midsole cushioning, non-slip rubber grip outsole, and all-day comfort.',
  5500.00,
  4500.00,
  'c1000000-0000-0000-0000-000000000007',
  'b1000000-0000-0000-0000-000000000005',
  50,
  TRUE, TRUE, TRUE, TRUE, 4.7, 1820, TRUE
),
(
  'a1000000-0000-0000-0000-000000000005',
  'Over-Ear Studio Hi-Fi Wireless Headphones',
  'over-ear-studio-hifi-headphones',
  'ARJ-AUD-005',
  'Flagship over-ear hybrid noise cancelling headphones with custom 40mm titanium diaphragm drivers and 60-hour marathon battery life.',
  7800.00,
  5990.00,
  'c1000000-0000-0000-0000-000000000001',
  'b1000000-0000-0000-0000-000000000003',
  22,
  TRUE, FALSE, TRUE, FALSE, 4.9, 3120, TRUE
),
(
  'a1000000-0000-0000-0000-000000000006',
  'Premium Linen Mandarin Collar Casual Shirt',
  'premium-linen-mandarin-casual-shirt',
  'ARJ-FAS-006',
  'Tailored 100% pure organic breathable linen shirt with clean mandarin band collar and coconut shell buttons.',
  2450.00,
  1850.00,
  'c1000000-0000-0000-0000-000000000002',
  'b1000000-0000-0000-0000-000000000006',
  60,
  TRUE, TRUE, TRUE, FALSE, 4.8, 840, TRUE
),
(
  'a1000000-0000-0000-0000-000000000007',
  'Ultra-Hydrating Botanical Face Serum 50ml',
  'ultra-hydrating-botanical-face-serum',
  'ARJ-BEA-007',
  'Deep moisture infusion with Multi-Molecular Hyaluronic Acid, Niacinamide 5%, and soothing organic Aloe Vera extract.',
  1800.00,
  1350.00,
  'c1000000-0000-0000-0000-000000000003',
  'b1000000-0000-0000-0000-000000000006',
  35,
  TRUE, FALSE, FALSE, FALSE, 4.6, 530, TRUE
),
(
  'a1000000-0000-0000-0000-000000000008',
  'Minimalist Scandinavian Ceramic Desk Lamp',
  'minimalist-scandinavian-ceramic-desk-lamp',
  'ARJ-HOM-008',
  'Handcrafted warm ceramic base lamp with natural linen shade, 3-level touch dimming, and warm white LED bulb included.',
  3200.00,
  2400.00,
  'c1000000-0000-0000-0000-000000000005',
  'b1000000-0000-0000-0000-000000000004',
  15,
  TRUE, TRUE, FALSE, FALSE, 4.7, 410, TRUE
)
ON CONFLICT (slug) DO NOTHING;

-- 4. SEED PRODUCT IMAGES
INSERT INTO public.product_images (product_id, image_url, is_primary)
VALUES
('a1000000-0000-0000-0000-000000000001', '/images/products/earbuds.jpg', TRUE),
('a1000000-0000-0000-0000-000000000002', '/images/products/smartwatch.jpg', TRUE),
('a1000000-0000-0000-0000-000000000003', '/images/products/backpack.jpg', TRUE),
('a1000000-0000-0000-0000-000000000004', '/images/products/shoes.jpg', TRUE),
('a1000000-0000-0000-0000-000000000005', '/images/products/headphones.jpg', TRUE),
('a1000000-0000-0000-0000-000000000006', '/images/products/linen-shirt.jpg', TRUE),
('a1000000-0000-0000-0000-000000000007', '/images/products/face-serum.jpg', TRUE),
('a1000000-0000-0000-0000-000000000008', '/images/products/desk-lamp.jpg', TRUE);

-- 5. SEED COUPONS
INSERT INTO public.coupons (code, discount_type, discount_value, min_purchase_amount, max_discount_amount, is_active)
VALUES
('ARJISHAN10', 'percentage', 10, 1500, 500, TRUE),
('WELCOME50', 'fixed_amount', 100, 1000, NULL, TRUE),
('EIDSPECIAL', 'percentage', 15, 3000, 1000, TRUE)
ON CONFLICT (code) DO NOTHING;

-- 6. SEED SHIPPING RATES (Bangladesh)
INSERT INTO public.shipping_rates (zone_name, rate, estimated_days, free_delivery_threshold, is_active)
VALUES
('inside_dhaka', 60.00, '24 to 48 Hours', 1000.00, TRUE),
('outside_dhaka', 120.00, '48 to 72 Hours', 1000.00, TRUE)
ON CONFLICT (zone_name) DO NOTHING;
