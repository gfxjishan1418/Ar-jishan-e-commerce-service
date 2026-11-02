"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { formatBDT } from "@/lib/utils";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="bg-slate-50 min-h-screen py-16 text-center">
        <div className="max-w-md mx-auto px-4 space-y-4">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-[#172554]">Your Wishlist is Empty</h1>
          <p className="text-sm text-slate-500">
            Explore our collections and tap the heart icon on any product to save it here.
          </p>
          <div>
            <Link
              href="/shop"
              className="inline-block px-6 py-2.5 bg-[#F97316] text-white font-bold text-sm rounded-xl hover:bg-orange-600 transition-colors shadow-sm"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-[#172554]">
            My Wishlist ({wishlist.length})
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Products saved for later consideration
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlist.map(({ product }) => {
            const price = product.sale_price !== undefined ? product.sale_price : product.regular_price;

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between p-4 shadow-xs"
              >
                <div className="relative aspect-square w-full rounded-xl bg-slate-100 overflow-hidden mb-3">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="250px"
                  />
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 text-slate-400 hover:text-red-500 flex items-center justify-center shadow-xs"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-800 line-clamp-2 hover:text-[#F97316]">
                    <Link href={`/products/${product.slug}`}>{product.name}</Link>
                  </h3>
                  <div className="mt-2 text-base font-black text-[#F97316]">
                    {formatBDT(price)}
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => {
                      addToCart(product, 1);
                      removeFromWishlist(product.id);
                    }}
                    className="w-full py-2.5 px-3 bg-[#F97316] hover:bg-orange-600 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Move to Cart</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
