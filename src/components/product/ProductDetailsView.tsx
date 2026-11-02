"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  Heart, 
  ShoppingBag, 
  Zap, 
  Star, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Check, 
  Minus, 
  Plus, 
  Clock, 
  Share2, 
  MessageSquare,
  Sparkles
} from "lucide-react";
import { Product, ProductVariant, Review } from "@/types";
import { formatBDT } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { ProductCard } from "@/components/product/ProductCard";

interface ProductDetailsViewProps {
  product: Product;
  relatedProducts: Product[];
  initialReviews: Review[];
}

export function ProductDetailsView({
  product,
  relatedProducts,
  initialReviews,
}: ProductDetailsViewProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "reviews">("desc");

  // Review submission state
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewCity, setNewReviewCity] = useState("Dhaka");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const currentPrice = (product.sale_price !== undefined ? product.sale_price : product.regular_price) + (selectedVariant?.price_modifier || 0);
  const hasDiscount = product.sale_price !== undefined && product.sale_price < product.regular_price;
  const discountPercent = hasDiscount
    ? Math.round(((product.regular_price - product.sale_price!) / product.regular_price) * 100)
    : 0;

  const currentStock = selectedVariant ? selectedVariant.stock_quantity : product.stock_quantity;
  const isOutOfStock = currentStock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity, selectedVariant, selectedVariant?.color, selectedVariant?.size);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity, selectedVariant, selectedVariant?.color, selectedVariant?.size);
    router.push("/checkout");
  };

  const handleWishlistToggle = () => {
    if (isFavorited) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName || !newReviewComment) return;

    const added: Review = {
      id: `rev-${Date.now()}`,
      product_id: product.id,
      customer_name: newReviewName,
      customer_location: newReviewCity,
      rating: newReviewRating,
      comment: newReviewComment,
      is_verified_purchase: true,
      created_at: new Date().toISOString(),
    };

    setReviews([added, ...reviews]);
    setReviewSubmitted(true);
    setNewReviewName("");
    setNewReviewComment("");
  };

  return (
    <div className="bg-slate-50 min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Main Details Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-8 lg:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left: Gallery Column */}
            <div className="lg:col-span-6 space-y-4">
              {/* Main Image Stage */}
              <div className="relative aspect-square w-full rounded-2xl bg-slate-100 overflow-hidden border border-slate-200 group">
                <Image
                  src={product.images[selectedImage] || product.images[0] || "/images/products/earbuds.jpg"}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 550px"
                />

                {hasDiscount && (
                  <div className="absolute top-4 left-4 bg-[#F97316] text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                    SAVE {discountPercent}%
                  </div>
                )}

                <button
                  onClick={handleWishlistToggle}
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-110 ${
                    isFavorited ? "bg-red-50 text-red-500" : "bg-white/90 text-slate-500 hover:text-red-500"
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
                </button>
              </div>

              {/* Thumbnails Row */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                        selectedImage === idx
                          ? "border-[#F97316] ring-2 ring-orange-100"
                          : "border-slate-200 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Buy Box */}
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
              <div>
                {/* Brand & Category badges */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-[#F97316] bg-orange-50 px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {product.brand_name || "Official Store"}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">SKU: {product.sku}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-[#172554] tracking-tight leading-snug">
                  {product.name}
                </h1>

                {/* Rating & Reviews row */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-xs text-slate-800">{product.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-xs text-slate-500 underline cursor-pointer" onClick={() => setActiveTab("reviews")}>
                    {product.review_count} Customer Reviews
                  </span>
                  <span className="text-slate-300">•</span>
                  <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                    <Check className="w-4 h-4" />
                    <span>In Stock ({currentStock} available)</span>
                  </div>
                </div>

                {/* Price display */}
                <div className="mt-5 p-4 rounded-2xl bg-orange-50/50 border border-orange-100/80 flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-[#F97316]">
                    {formatBDT(currentPrice)}
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="text-base sm:text-lg text-slate-400 line-through">
                        {formatBDT(product.regular_price)}
                      </span>
                      <span className="text-xs font-bold text-orange-700 bg-orange-200/80 px-2 py-0.5 rounded-full">
                        Save {formatBDT(product.regular_price - product.sale_price!)}
                      </span>
                    </>
                  )}
                </div>

                {/* Variants Selection (Color / Sizes) */}
                {product.variants && product.variants.length > 0 && (
                  <div className="mt-6 space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                      Select Variant: <span className="text-slate-900">{selectedVariant?.variant_name}</span>
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {product.variants.map((v) => {
                        const isSelected = selectedVariant?.id === v.id;
                        return (
                          <button
                            key={v.id}
                            onClick={() => setSelectedVariant(v)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-2 ${
                              isSelected
                                ? "border-[#F97316] bg-orange-50 text-[#F97316] shadow-2xs ring-1 ring-[#F97316]"
                                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                            }`}
                          >
                            {v.color_hex && (
                              <span
                                className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                                style={{ backgroundColor: v.color_hex }}
                              />
                            )}
                            <span>{v.variant_name}</span>
                            {v.price_modifier > 0 && (
                              <span className="text-[10px] text-slate-400">
                                (+{formatBDT(v.price_modifier)})
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Quantity Selector */}
                <div className="mt-6 flex items-center gap-4">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Quantity:
                  </label>
                  <div className="flex items-center border border-slate-300 rounded-xl bg-white shadow-2xs">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="p-2 text-slate-600 hover:text-slate-900 disabled:opacity-40 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-bold text-sm text-slate-800">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                      disabled={quantity >= currentStock}
                      className="p-2 text-slate-600 hover:text-slate-900 disabled:opacity-40 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-xs text-slate-400">Max {currentStock} units</span>
                </div>

                {/* Primary Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-8">
                  <button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    className="w-full py-3.5 px-6 rounded-xl bg-white border-2 border-[#F97316] text-[#F97316] hover:bg-orange-50 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    disabled={isOutOfStock}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#F97316] hover:bg-orange-600 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Zap className="w-5 h-5 fill-white" />
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>

              {/* Bangladesh Delivery Trust Box */}
              <div className="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                  <Truck className="w-4 h-4 text-[#F97316] shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800">Dhaka: ৳60 (24h)</span>
                    <p className="text-[11px] text-slate-500">Outside Dhaka: ৳120</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800">Cash on Delivery</span>
                    <p className="text-[11px] text-slate-500">Pay after receiving order</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Info: Description, Specifications, Reviews */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
          {/* Tabs Navigation */}
          <div className="flex border-b border-slate-200 gap-6 sm:gap-8">
            <button
              onClick={() => setActiveTab("desc")}
              className={`pb-3 text-sm font-bold border-b-2 transition-all ${
                activeTab === "desc"
                  ? "border-[#F97316] text-[#F97316]"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("specs")}
              className={`pb-3 text-sm font-bold border-b-2 transition-all ${
                activeTab === "specs"
                  ? "border-[#F97316] text-[#F97316]"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === "reviews"
                  ? "border-[#F97316] text-[#F97316]"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <span>Customer Reviews</span>
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                {reviews.length}
              </span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="pt-6">
            {activeTab === "desc" && (
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
                <p>{product.description}</p>
                {product.rich_description && (
                  <div
                    className="prose prose-sm max-w-none text-slate-700"
                    dangerouslySetInnerHTML={{ __html: product.rich_description }}
                  />
                )}
              </div>
            )}

            {activeTab === "specs" && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <tbody className="divide-y divide-slate-100">
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <tr key={key} className="hover:bg-slate-50/60">
                        <td className="py-3 px-4 font-bold text-slate-600 w-1/3 bg-slate-50/50">
                          {key}
                        </td>
                        <td className="py-3 px-4 text-slate-800">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-8">
                {/* Write Review Form */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="text-sm font-bold text-[#172554] mb-3">
                    Write a Verified Customer Review
                  </h4>

                  {reviewSubmitted ? (
                    <div className="p-3 bg-emerald-100 text-emerald-800 text-xs rounded-xl font-semibold">
                      Thank you! Your verified review has been submitted and published.
                    </div>
                  ) : (
                    <form onSubmit={handleReviewSubmit} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-bold text-slate-600 block mb-1">
                            Your Name
                          </label>
                          <input
                            type="text"
                            value={newReviewName}
                            onChange={(e) => setNewReviewName(e.target.value)}
                            placeholder="e.g. Shakil Rahman"
                            required
                            className="w-full text-xs h-9 px-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold text-slate-600 block mb-1">
                            Location (City / District)
                          </label>
                          <input
                            type="text"
                            value={newReviewCity}
                            onChange={(e) => setNewReviewCity(e.target.value)}
                            placeholder="e.g. Uttara, Dhaka"
                            required
                            className="w-full text-xs h-9 px-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">
                          Rating: {newReviewRating} Stars
                        </label>
                        <div className="flex gap-1 text-amber-400 cursor-pointer">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setNewReviewRating(star)}
                            >
                              <Star
                                className={`w-5 h-5 ${
                                  star <= newReviewRating ? "fill-amber-400" : "text-slate-300"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">
                          Your Review & Experience
                        </label>
                        <textarea
                          rows={3}
                          value={newReviewComment}
                          onChange={(e) => setNewReviewComment(e.target.value)}
                          placeholder="How did you like the product quality, delivery speed, and packaging?"
                          required
                          className="w-full text-xs p-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#F97316] text-white text-xs font-bold rounded-lg hover:bg-orange-600 transition-colors shadow-xs"
                      >
                        Submit Review
                      </button>
                    </form>
                  )}
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                  {reviews.length === 0 ? (
                    <p className="text-xs text-slate-500 text-center py-6">
                      No reviews yet. Be the first to review this product!
                    </p>
                  ) : (
                    reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-slate-800">
                              {rev.customer_name}
                            </span>
                            {rev.customer_location && (
                              <span className="text-[11px] text-slate-400">
                                ({rev.customer_location})
                              </span>
                            )}
                            {rev.is_verified_purchase && (
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-bold">
                                Verified Buyer
                              </span>
                            )}
                          </div>
                          <div className="flex text-amber-400">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#172554]">
              Related Products You May Like
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
