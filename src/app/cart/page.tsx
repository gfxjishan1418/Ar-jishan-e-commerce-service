"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  ShieldCheck, 
  Truck, 
  X 
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatBDT } from "@/lib/utils";

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    couponCode,
    discountAmount,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  // Delivery estimation
  const freeThreshold = 1000;
  const estimatedShipping = subtotal >= freeThreshold || subtotal === 0 ? 0 : 60;
  const grandTotal = Math.max(0, subtotal - discountAmount + estimatedShipping);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;

    setCouponError("");
    setCouponSuccess("");
    setIsApplying(true);

    const result = await applyCoupon(inputCoupon.trim());
    setIsApplying(false);

    if (result.success) {
      setCouponSuccess(result.message);
      setInputCoupon("");
    } else {
      setCouponError(result.message);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="bg-slate-50 min-h-screen py-16">
        <div className="max-w-md mx-auto px-4 text-center space-y-4">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto text-[#F97316]">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-black text-[#172554]">Your Cart is Empty</h1>
          <p className="text-sm text-slate-500">
            Looks like you haven&apos;t added any items yet. Explore top categories and discount flash deals.
          </p>
          <div>
            <Link
              href="/shop"
              className="inline-block px-6 py-3 bg-[#F97316] text-white font-bold text-sm rounded-xl hover:bg-orange-600 transition-colors shadow-md"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#172554]">
              Shopping Cart ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Review your items before proceeding to checkout
            </p>
          </div>

          <button
            onClick={clearCart}
            className="text-xs text-red-500 hover:underline font-semibold"
          >
            Clear Entire Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Items Table */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-8 shadow-xs space-y-6">
            <div className="divide-y divide-slate-100">
              {cart.map((item) => {
                const itemPrice =
                  (item.product.sale_price !== undefined
                    ? item.product.sale_price
                    : item.product.regular_price) + (item.variant?.price_modifier || 0);

                return (
                  <div
                    key={item.id}
                    className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-xl bg-slate-100 relative overflow-hidden shrink-0 border border-slate-200">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm sm:text-base text-slate-800 hover:text-[#F97316] line-clamp-1">
                          <Link href={`/products/${item.product.slug}`}>{item.product.name}</Link>
                        </h3>
                        {item.variant && (
                          <p className="text-xs text-slate-500 mt-0.5">
                            Variant: {item.variant.variant_name}
                          </p>
                        )}
                        <p className="text-sm font-bold text-[#F97316] mt-1">
                          {formatBDT(itemPrice)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-slate-200 rounded-lg bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-l-lg transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-10 text-center font-bold text-xs text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-r-lg transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total */}
                      <div className="text-right min-w-[90px]">
                        <span className="font-bold text-sm sm:text-base text-[#172554]">
                          {formatBDT(itemPrice * item.quantity)}
                        </span>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1"
                        title="Remove product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Summary & Coupon Box */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-5">
              <h2 className="text-lg font-bold text-[#172554] pb-3 border-b border-slate-100">
                Order Summary
              </h2>

              {/* Coupon Form */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Have a Promo Code?
                </label>
                {couponCode ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-orange-50 border border-orange-200 text-xs text-orange-950">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-[#F97316]" />
                      <span>Code <strong>{couponCode}</strong> applied</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      placeholder="e.g. ARJISHAN10"
                      className="flex-1 text-xs h-10 px-3 rounded-xl border border-slate-300 bg-white uppercase focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                    />
                    <button
                      type="submit"
                      disabled={isApplying}
                      className="px-4 bg-[#172554] hover:bg-blue-900 text-white font-bold text-xs rounded-xl transition-colors"
                    >
                      {isApplying ? "..." : "Apply"}
                    </button>
                  </form>
                )}

                {couponError && (
                  <p className="text-[11px] text-red-500 mt-1 font-medium">{couponError}</p>
                )}
                {couponSuccess && (
                  <p className="text-[11px] text-emerald-600 mt-1 font-medium">{couponSuccess}</p>
                )}
              </div>

              {/* Totals */}
              <div className="space-y-2.5 pt-3 border-t border-slate-100 text-xs sm:text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-800">{formatBDT(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Coupon Discount</span>
                    <span>-{formatBDT(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600">
                  <span>Estimated Shipping</span>
                  <span>
                    {estimatedShipping === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      formatBDT(estimatedShipping)
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-black text-[#172554] pt-3 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span className="text-[#F97316]">{formatBDT(grandTotal)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full py-3.5 px-6 bg-[#F97316] hover:bg-orange-600 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Trust box */}
            <div className="p-4 rounded-2xl bg-slate-100/80 border border-slate-200 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Secure Checkout with SSL encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#F97316] shrink-0" />
                <span>Cash on Delivery & Instant Mobile Banking</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
