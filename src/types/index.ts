export type UserRole = 'super_admin' | 'store_manager' | 'order_manager' | 'product_manager' | 'customer';

export interface UserProfile {
  id: string;
  full_name: string;
  phone?: string;
  email?: string;
  avatar_url?: string;
  role: UserRole;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  icon_name?: string;
  parent_id?: string;
  display_order: number;
  product_count?: number;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  description?: string;
  is_featured?: boolean;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  variant_name: string;
  sku?: string;
  color?: string;
  color_hex?: string;
  size?: string;
  price_modifier: number;
  stock_quantity: number;
  image_url?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  rich_description?: string;
  regular_price: number;
  sale_price?: number;
  category_id: string;
  category_name?: string;
  category_slug?: string;
  brand_id?: string;
  brand_name?: string;
  stock_quantity: number;
  is_featured: boolean;
  is_new_arrival: boolean;
  is_bestseller: boolean;
  is_flash_deal: boolean;
  flash_deal_end?: string;
  rating: number;
  review_count: number;
  images: string[];
  variants?: ProductVariant[];
  specifications: Record<string, string>;
  seo_title?: string;
  seo_description?: string;
  is_published: boolean;
  created_at: string;
}

export interface CartItem {
  id: string;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  selected_color?: string;
  selected_size?: string;
}

export interface WishlistItem {
  id: string;
  product: Product;
  added_at: string;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'returned';

export type PaymentMethod = 'cod' | 'bkash' | 'nagad' | 'sslcommerz';
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded' | 'failed';

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  variant_id?: string;
  product_name: string;
  sku: string;
  image_url: string;
  unit_price: number;
  quantity: number;
  total_price: number;
}

export interface Order {
  id: string;
  order_number: string;
  user_id?: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  shipping_division: string;
  shipping_district: string;
  shipping_upazila: string;
  shipping_area?: string;
  shipping_address: string;
  order_notes?: string;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  subtotal: number;
  discount_amount: number;
  shipping_fee: number;
  total_amount: number;
  coupon_code?: string;
  courier_name?: string;
  courier_tracking_id?: string;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface Coupon {
  code: string;
  discount_type: 'percentage' | 'fixed_amount';
  discount_value: number;
  min_purchase_amount: number;
  max_discount_amount?: number;
  is_active: boolean;
  valid_until?: string;
}

export interface Review {
  id: string;
  product_id: string;
  customer_name: string;
  customer_location?: string;
  rating: number;
  comment: string;
  is_verified_purchase: boolean;
  created_at: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image_url: string;
  link_url: string;
  badge_text?: string;
  placement: 'hero' | 'promo_card' | 'flash_sale';
}

export interface StoreSettings {
  store_name: string;
  support_phone: string;
  support_email: string;
  office_address: string;
  dhaka_shipping_fee: number;
  outside_dhaka_shipping_fee: number;
  free_shipping_threshold: number;
}
