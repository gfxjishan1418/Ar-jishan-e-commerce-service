"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatBDT } from "@/lib/utils";

export function CartDrawer() {
  const {
    cart,
    isCartDrawerOpen,
    closeCartDrawer,
    updateQuantity,
    removeFromCart,
    subtotal,
    totalItems,
  } = useCart();

  if (!isCartDrawerOpen) return null;

  const freeDeliveryThreshold = 1000;
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));
  const amountNeeded = Math.max(0, freeDeliveryThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCartDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#F97316]" />
              <h2 className="text-lg font-bold text-[#172554]">
                Shopping Cart ({totalItems})
              </h2>
            </div>
            <button
              onClick={closeCartDrawer}
              className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-orange-50 px-5 py-3 border-b border-orange-100">
            <div className="text-xs font-medium text-orange-900 mb-1.5">
              {amountNeeded > 0 ? (
                <>Add <span className="font-bold text-[#F97316]">{formatBDT(amountNeeded)}</span> more for <strong>FREE Delivery</strong> across Bangladesh!</>
              ) : (
                <span className="text-emerald-700 font-bold">🎉 You qualify for FREE Delivery!</span>
              )}
            </div>
            <div className="w-full h-1.5 bg-orange-200/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#F97316] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-700">Your cart is empty</h3>
                  <p className="text-xs text-slate-500 mt-1">Explore our hot deals and top products!</p>
                </div>
                <Link
                  href="/shop"
                  onClick={closeCartDrawer}
                  className="inline-block px-5 py-2.5 bg-[#F97316] text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              cart.map((item) => {
                const itemPrice =
                  (item.product.sale_price !== undefined
                    ? item.product.sale_price
                    : item.product.regular_price) + (item.variant?.price_modifier || 0);

                return (
                  <div
                    key={item.id}
                    className="flex gap-3.5 pb-4 border-b border-slate-100 last:border-b-0"
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-slate-100 relative shrink-0 border border-slate-200">
                      <Image
                        src={item.product.images[0] || "/images/products/earbuds.jpg"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="text-sm font-semibold text-slate-800 line-clamp-1 hover:text-[#F97316]">
                            <Link href={`/products/${item.product.slug}`} onClick={closeCartDrawer}>
                              {item.product.name}
                            </Link>
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-400 hover:text-red-500 transition-colors p-0.5"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        {item.variant && (
                          <p className="text-xs text-slate-500 mt-0.5">
                            Variant: {item.variant.variant_name}
                          </p>
                        )}
                        <p className="text-xs font-bold text-[#172554] mt-1">
                          {formatBDT(itemPrice)}
                        </p>
                      </div>

                      {/* Quantity stepper */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-slate-200 rounded-md bg-white">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-slate-100 text-slate-600 rounded-l-md transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-semibold text-slate-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-slate-100 text-slate-600 rounded-r-md transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-xs font-bold text-slate-700">
                          {formatBDT(itemPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer with subtotal and Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-bold text-lg text-[#172554]">{formatBDT(subtotal)}</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Shipping and promotional vouchers calculated at checkout.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/cart"
                  onClick={closeCartDrawer}
                  className="w-full py-2.5 px-4 text-center border border-slate-300 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-100 transition-colors"
                >
                  View Cart
                </Link>
                <Link
                  href="/checkout"
                  onClick={closeCartDrawer}
                  className="w-full py-2.5 px-4 text-center bg-[#F97316] text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
