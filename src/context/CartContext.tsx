"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, ProductVariant, CartItem } from "@/types";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, variant?: ProductVariant, selectedColor?: string, selectedSize?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isCartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  couponCode: string;
  discountAmount: number;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "ar_jishan_cart_v1";
const COUPON_STORAGE_KEY = "ar_jishan_coupon_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [couponCode, setCouponCode] = useState<string>("");
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedCoupon = localStorage.getItem(COUPON_STORAGE_KEY);
      if (savedCoupon) {
        const parsed = JSON.parse(savedCoupon);
        setCouponCode(parsed.code || "");
        setDiscountAmount(parsed.discount || 0);
      }
    } catch (e) {
      console.error("Failed to load cart from storage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to persist cart", e);
    }
  }, [cart, isLoaded]);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const subtotal = cart.reduce((total, item) => {
    const price = (item.product.sale_price !== undefined ? item.product.sale_price : item.product.regular_price) + (item.variant?.price_modifier || 0);
    return total + price * item.quantity;
  }, 0);

  const addToCart = (
    product: Product,
    quantity: number = 1,
    variant?: ProductVariant,
    selectedColor?: string,
    selectedSize?: string
  ) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => {
        return (
          item.product.id === product.id &&
          item.variant?.id === variant?.id &&
          item.selected_color === selectedColor &&
          item.selected_size === selectedSize
        );
      });

      if (existingIndex > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIndex].quantity + quantity;
        // Limit to available stock
        const maxStock = variant ? variant.stock_quantity : product.stock_quantity;
        updated[existingIndex].quantity = Math.min(newQty, maxStock);
        return updated;
      } else {
        const newItem: CartItem = {
          id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          product,
          variant,
          quantity,
          selected_color: selectedColor || variant?.color,
          selected_size: selectedSize || variant?.size,
        };
        return [...prevCart, newItem];
      }
    });

    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId) {
          const maxStock = item.variant ? item.variant.stock_quantity : item.product.stock_quantity;
          return { ...item, quantity: Math.min(quantity, maxStock) };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode("");
    setDiscountAmount(0);
    localStorage.removeItem(CART_STORAGE_KEY);
    localStorage.removeItem(COUPON_STORAGE_KEY);
  };

  const applyCoupon = async (code: string) => {
    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, subtotal }),
      });
      const data = await res.json();
      if (data.valid) {
        setCouponCode(code.toUpperCase());
        setDiscountAmount(data.discount);
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify({ code: code.toUpperCase(), discount: data.discount }));
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    } catch {
      // Offline fallback calculation
      if (code.toUpperCase() === "ARJISHAN10") {
        if (subtotal >= 1500) {
          const disc = Math.min(500, Math.round(subtotal * 0.1));
          setCouponCode("ARJISHAN10");
          setDiscountAmount(disc);
          return { success: true, message: "10% Discount applied!" };
        }
        return { success: false, message: "Minimum purchase ৳1,500 required" };
      }
      if (code.toUpperCase() === "WELCOME50" && subtotal >= 1000) {
        setCouponCode("WELCOME50");
        setDiscountAmount(100);
        return { success: true, message: "৳100 Welcome voucher applied!" };
      }
      return { success: false, message: "Invalid or expired coupon" };
    }
  };

  const removeCoupon = () => {
    setCouponCode("");
    setDiscountAmount(0);
    localStorage.removeItem(COUPON_STORAGE_KEY);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        isCartDrawerOpen,
        openCartDrawer: () => setIsCartDrawerOpen(true),
        closeCartDrawer: () => setIsCartDrawerOpen(false),
        couponCode,
        discountAmount,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
