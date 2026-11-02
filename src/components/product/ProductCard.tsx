"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Product } from "@/types";
import { formatBDT } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export function ProductCard({ product, compact = false }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [imgSrc, setImgSrc] = useState(product.images[0] || "/images/products/earbuds.jpg");

  const isFavorited = isInWishlist(product.id);
  const currentPrice = product.sale_price !== undefined ? product.sale_price : product.regular_price;
  const hasDiscount = product.sale_price !== undefined && product.sale_price < product.regular_price;
  const discountPercent = hasDiscount
    ? Math.round(((product.regular_price - product.sale_price!) / product.regular_price) * 100)
    : 0;

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorited) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="group bg-white rounded-xl border border-slate-200 hover:border-orange-300 hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col justify-between">
      {/* Product Image Box */}
      <div className="relative aspect-square w-full bg-slate-50 overflow-hidden">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            onError={() => setImgSrc("/images/products/earbuds.jpg")}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-2.5 right-2.5 bg-[#F97316] text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
            -{discountPercent}%
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-2.5 left-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isFavorited
              ? "bg-red-50 text-red-500 shadow-xs"
              : "bg-white/90 text-slate-400 hover:text-red-500 shadow-xs hover:bg-white"
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
        </button>

        {/* Stock Badge */}
        {product.stock_quantity <= 0 && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-xs uppercase tracking-wider backdrop-blur-xs">
            Out of Stock
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between">
        <div>
          <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider mb-1">
            {product.category_name}
          </div>
          <h3 className="font-semibold text-slate-800 text-sm line-clamp-2 hover:text-[#F97316] transition-colors leading-snug">
            <Link href={`/products/${product.slug}`}>{product.name}</Link>
          </h3>
        </div>

        <div className="mt-3">
          {/* Price Row */}
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-bold text-[#F97316]">
              {formatBDT(currentPrice)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-slate-400 line-through">
                {formatBDT(product.regular_price)}
              </span>
            )}
          </div>

          {/* Bottom Bar: Rating and Add to Cart Action */}
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-slate-700">{product.rating.toFixed(1)}</span>
              <span className="text-[11px] text-slate-400">
                ({product.review_count >= 1000 ? `${(product.review_count / 1000).toFixed(1)}k` : product.review_count})
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock_quantity <= 0}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                product.stock_quantity <= 0
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-[#F97316] text-white hover:bg-orange-600 shadow-xs hover:scale-105 active:scale-95"
              }`}
              title="Add to Cart"
              aria-label="Add to Cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
