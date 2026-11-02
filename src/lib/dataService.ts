import { 
  INITIAL_PRODUCTS, 
  INITIAL_CATEGORIES, 
  INITIAL_BRANDS, 
  INITIAL_COUPONS, 
  INITIAL_REVIEWS,
  STORE_SETTINGS 
} from "@/data/mockData";
import { Product, Category, Brand, Order, Coupon, Review, OrderStatus, PaymentStatus } from "@/types";

// In-memory / browser fallback store for stateful operations
let productsCache: Product[] = [...INITIAL_PRODUCTS];
let ordersCache: Order[] = [
  {
    id: "ord-1",
    order_number: "ARJ-2026-89412",
    customer_name: "Rafiqul Islam",
    customer_phone: "01711223344",
    customer_email: "rafiq@example.com",
    shipping_division: "Dhaka",
    shipping_district: "Dhaka",
    shipping_upazila: "Gulshan",
    shipping_area: "Road 35",
    shipping_address: "House 12, Road 35, Gulshan-2, Dhaka",
    payment_method: "bkash",
    payment_status: "paid",
    order_status: "processing",
    subtotal: 5690,
    discount_amount: 500,
    shipping_fee: 0,
    total_amount: 5190,
    coupon_code: "ARJISHAN10",
    courier_name: "Steadfast",
    courier_tracking_id: "ST-8890214",
    items: [
      {
        id: "item-1",
        order_id: "ord-1",
        product_id: "prod-1",
        product_name: "Wireless ANC Bluetooth Earbuds",
        sku: "ARJ-AUD-001",
        image_url: "/images/products/earbuds.jpg",
        unit_price: 2490,
        quantity: 1,
        total_price: 2490,
      },
      {
        id: "item-2",
        order_id: "ord-1",
        product_id: "prod-2",
        product_name: "Smart Watch Ultra Pro AMOLED Display",
        sku: "ARJ-WCH-002",
        image_url: "/images/products/smartwatch.jpg",
        unit_price: 3200,
        quantity: 1,
        total_price: 3200,
      }
    ],
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "ord-2",
    order_number: "ARJ-2026-67123",
    customer_name: "Nusrat Jahan",
    customer_phone: "01812345678",
    customer_email: "nusrat@example.com",
    shipping_division: "Chattogram",
    shipping_district: "Chattogram",
    shipping_upazila: "Panchlaish",
    shipping_area: "GEC Circle",
    shipping_address: "Flat 4B, Green Villa, GEC, Chattogram",
    payment_method: "cod",
    payment_status: "unpaid",
    order_status: "confirmed",
    subtotal: 1850,
    discount_amount: 0,
    shipping_fee: 120,
    total_amount: 1970,
    courier_name: "Pathao",
    courier_tracking_id: "PTH-914820",
    items: [
      {
        id: "item-3",
        order_id: "ord-2",
        product_id: "prod-3",
        product_name: "Urban Explorer Ergonomic Travel Backpack",
        sku: "ARJ-BAG-003",
        image_url: "/images/products/backpack.jpg",
        unit_price: 1850,
        quantity: 1,
        total_price: 1850,
      }
    ],
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 10).toISOString(),
  }
];

let reviewsCache: Review[] = [...INITIAL_REVIEWS];

export const dataService = {
  // Products
  async getProducts(params?: {
    category?: string;
    brand?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'newest' | 'popular';
    isFeatured?: boolean;
    isFlashDeal?: boolean;
    isBestseller?: boolean;
    isNewArrival?: boolean;
    limit?: number;
  }): Promise<{ products: Product[]; total: number }> {
    let list = [...productsCache].filter((p) => p.is_published);

    if (params?.category) {
      list = list.filter(
        (p) => p.category_slug === params.category || p.category_id === params.category
      );
    }

    if (params?.brand) {
      const b = params.brand.toLowerCase();
      list = list.filter((p) => p.brand_id === params.brand || p.brand_name?.toLowerCase() === b);
    }

    if (params?.search) {
      const q = params.search.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.category_name?.toLowerCase().includes(q)
      );
    }

    if (params?.minPrice !== undefined) {
      list = list.filter((p) => (p.sale_price || p.regular_price) >= params.minPrice!);
    }

    if (params?.maxPrice !== undefined) {
      list = list.filter((p) => (p.sale_price || p.regular_price) <= params.maxPrice!);
    }

    if (params?.isFeatured) {
      list = list.filter((p) => p.is_featured);
    }

    if (params?.isFlashDeal) {
      list = list.filter((p) => p.is_flash_deal);
    }

    if (params?.isBestseller) {
      list = list.filter((p) => p.is_bestseller);
    }

    if (params?.isNewArrival) {
      list = list.filter((p) => p.is_new_arrival);
    }

    // Sorting
    if (params?.sortBy) {
      switch (params.sortBy) {
        case 'price_asc':
          list.sort((a, b) => (a.sale_price || a.regular_price) - (b.sale_price || b.regular_price));
          break;
        case 'price_desc':
          list.sort((a, b) => (b.sale_price || b.regular_price) - (a.sale_price || a.regular_price));
          break;
        case 'rating':
          list.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
          break;
        case 'popular':
          list.sort((a, b) => b.review_count - a.review_count);
          break;
      }
    }

    const total = list.length;
    if (params?.limit) {
      list = list.slice(0, params.limit);
    }

    return { products: list, total };
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    return productsCache.find((p) => p.slug === slug) || null;
  },

  async getProductById(id: string): Promise<Product | null> {
    return productsCache.find((p) => p.id === id) || null;
  },

  // Categories & Brands
  async getCategories(): Promise<Category[]> {
    return INITIAL_CATEGORIES;
  },

  async getBrands(): Promise<Brand[]> {
    return INITIAL_BRANDS;
  },

  // Coupons
  async validateCoupon(code: string, subtotal: number): Promise<{ valid: boolean; discount: number; message: string }> {
    const coupon = INITIAL_COUPONS.find((c) => c.code.toUpperCase() === code.toUpperCase().trim() && c.is_active);
    if (!coupon) {
      return { valid: false, discount: 0, message: "Invalid or expired coupon code" };
    }

    if (subtotal < coupon.min_purchase_amount) {
      return {
        valid: false,
        discount: 0,
        message: `Minimum order amount for this coupon is ৳ ${coupon.min_purchase_amount}`,
      };
    }

    let discount = 0;
    if (coupon.discount_type === "percentage") {
      discount = Math.round((subtotal * coupon.discount_value) / 100);
      if (coupon.max_discount_amount && discount > coupon.max_discount_amount) {
        discount = coupon.max_discount_amount;
      }
    } else {
      discount = coupon.discount_value;
    }

    return { valid: true, discount, message: `Coupon ${coupon.code} applied successfully!` };
  },

  // Orders
  async createOrder(data: Omit<Order, "id" | "order_number" | "created_at" | "updated_at">): Promise<Order> {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `ARJ-2026-${randomSuffix}`;
    const newOrder: Order = {
      ...data,
      id: `ord-${Date.now()}`,
      order_number: orderNumber,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    ordersCache.unshift(newOrder);

    // Deduct stock
    for (const item of newOrder.items) {
      const prod = productsCache.find((p) => p.id === item.product_id);
      if (prod) {
        prod.stock_quantity = Math.max(0, prod.stock_quantity - item.quantity);
      }
    }

    return newOrder;
  },

  async getOrder(idOrNumber: string): Promise<Order | null> {
    return (
      ordersCache.find((o) => o.id === idOrNumber || o.order_number === idOrNumber) || null
    );
  },

  async getOrders(params?: { phone?: string; email?: string }): Promise<Order[]> {
    if (params?.phone) {
      return ordersCache.filter((o) => o.customer_phone.includes(params.phone!));
    }
    if (params?.email) {
      return ordersCache.filter((o) => o.customer_email?.toLowerCase() === params.email!.toLowerCase());
    }
    return ordersCache;
  },

  async updateOrderStatus(
    orderId: string, 
    status: OrderStatus, 
    paymentStatus?: PaymentStatus,
    courier?: { name?: string; trackingId?: string }
  ): Promise<Order | null> {
    const order = ordersCache.find((o) => o.id === orderId || o.order_number === orderId);
    if (!order) return null;

    order.order_status = status;
    if (paymentStatus) {
      order.payment_status = paymentStatus;
    }
    if (courier?.name) order.courier_name = courier.name;
    if (courier?.trackingId) order.courier_tracking_id = courier.trackingId;
    order.updated_at = new Date().toISOString();

    return order;
  },

  // Reviews
  async getReviews(productId: string): Promise<Review[]> {
    return reviewsCache.filter((r) => r.product_id === productId);
  },

  async addReview(review: Omit<Review, "id" | "created_at">): Promise<Review> {
    const newReview: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    reviewsCache.unshift(newReview);
    return newReview;
  },

  // Admin Metrics
  async getAdminMetrics() {
    const totalOrders = ordersCache.length;
    const totalSales = ordersCache
      .filter((o) => o.payment_status === "paid" || o.order_status === "delivered")
      .reduce((sum, o) => sum + o.total_amount, 0);
    const pendingOrders = ordersCache.filter((o) => o.order_status === "pending").length;
    const lowStockProducts = productsCache.filter((p) => p.stock_quantity < 10);

    return {
      totalSales,
      totalOrders,
      totalProducts: productsCache.length,
      totalCustomers: 142, // aggregated count
      pendingOrders,
      lowStockCount: lowStockProducts.length,
      recentOrders: ordersCache.slice(0, 5),
      lowStockProducts: lowStockProducts.slice(0, 5),
    };
  },

  // Admin Product Actions
  async saveProduct(product: Partial<Product> & { name: string; regular_price: number }): Promise<Product> {
    if (product.id) {
      const index = productsCache.findIndex((p) => p.id === product.id);
      if (index !== -1) {
        productsCache[index] = { ...productsCache[index], ...product, updated_at: new Date().toISOString() } as Product;
        return productsCache[index];
      }
    }
    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name: product.name,
      slug: product.slug || product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      sku: product.sku || `ARJ-GEN-${Math.floor(100 + Math.random() * 900)}`,
      description: product.description || product.name,
      regular_price: product.regular_price,
      sale_price: product.sale_price,
      category_id: product.category_id || "cat-1",
      category_name: INITIAL_CATEGORIES.find((c) => c.id === product.category_id)?.name || "General",
      category_slug: INITIAL_CATEGORIES.find((c) => c.id === product.category_id)?.slug || "general",
      brand_id: product.brand_id,
      brand_name: product.brand_name,
      stock_quantity: product.stock_quantity ?? 10,
      is_featured: product.is_featured ?? false,
      is_new_arrival: product.is_new_arrival ?? true,
      is_bestseller: product.is_bestseller ?? false,
      is_flash_deal: product.is_flash_deal ?? false,
      rating: 5.0,
      review_count: 0,
      images: product.images?.length ? product.images : [
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80"
      ],
      specifications: product.specifications || {},
      is_published: true,
      created_at: new Date().toISOString(),
    };
    productsCache.unshift(newProd);
    return newProd;
  },

  async deleteProduct(id: string): Promise<boolean> {
    const initialLen = productsCache.length;
    productsCache = productsCache.filter((p) => p.id !== id);
    return productsCache.length < initialLen;
  }
};
