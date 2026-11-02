"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, User, Heart, ShoppingBag, Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { INITIAL_PRODUCTS } from "@/data/mockData";
import { formatBDT } from "@/lib/utils";

export function Header({ onMobileMenuToggle }: { onMobileMenuToggle?: () => void }) {
  const router = useRouter();
  const { totalItems, openCartDrawer } = useCart();
  const { totalWishlistItems } = useWishlist();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Autocomplete suggestions
  const suggestions = searchQuery.trim().length > 1
    ? INITIAL_PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category_name?.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-white sticky top-0 z-40 shadow-xs border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 sm:gap-8">
          {/* Mobile Menu Button + Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={onMobileMenuToggle}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Logo variant="full" />
          </div>

          {/* Large Search Bar with Dropdown Suggestions */}
          <div ref={searchContainerRef} className="flex-1 max-w-2xl hidden md:block relative">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search for electronics, fashion, watches, gadgets..."
                className="w-full h-11 pl-4 pr-14 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent transition-all placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="absolute right-1 w-10 h-9 bg-[#F97316] hover:bg-orange-600 text-white rounded-md flex items-center justify-center transition-colors shadow-xs"
                aria-label="Submit Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Suggestions Overlay */}
            {isSearchFocused && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-12 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50">
                <div className="p-2 border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Product Matches
                </div>
                <div className="divide-y divide-slate-100">
                  {suggestions.map((item) => (
                    <Link
                      key={item.id}
                      href={`/products/${item.slug}`}
                      onClick={() => setIsSearchFocused(false)}
                      className="flex items-center gap-3 p-3 hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded bg-slate-100 relative overflow-hidden shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-800 truncate">{item.name}</p>
                        <p className="text-[11px] text-slate-500">{item.category_name}</p>
                      </div>
                      <div className="text-xs font-bold text-[#F97316]">
                        {formatBDT(item.sale_price || item.regular_price)}
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="p-2 bg-slate-50 text-center border-t border-slate-100">
                  <button
                    onClick={handleSearchSubmit}
                    className="text-xs font-semibold text-[#172554] hover:text-[#F97316] inline-flex items-center gap-1"
                  >
                    <span>View all matching results</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Action Icons: Account, Wishlist, Cart */}
          <div className="flex items-center gap-1.5 sm:gap-4">
            {/* Account */}
            <Link
              href="/account"
              className="p-2.5 rounded-lg text-slate-700 hover:text-[#F97316] hover:bg-slate-50 transition-colors flex items-center gap-2 group"
              title="My Account"
            >
              <User className="w-5 h-5 text-slate-600 group-hover:text-[#F97316] transition-colors" />
              <div className="hidden xl:flex flex-col text-left leading-none">
                <span className="text-[10px] text-slate-500">Welcome</span>
                <span className="text-xs font-semibold text-slate-800 group-hover:text-[#F97316]">Account</span>
              </div>
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="p-2.5 rounded-lg text-slate-700 hover:text-[#F97316] hover:bg-slate-50 transition-colors relative"
              title="My Wishlist"
            >
              <Heart className="w-5 h-5 text-slate-600 hover:text-[#F97316] transition-colors" />
              {totalWishlistItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#F97316] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalWishlistItems}
                </span>
              )}
            </Link>

            {/* Shopping Cart Button */}
            <button
              onClick={openCartDrawer}
              className="p-2.5 rounded-lg text-slate-700 hover:text-[#F97316] hover:bg-slate-50 transition-colors relative flex items-center gap-2"
              title="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-slate-600 hover:text-[#F97316] transition-colors" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#F97316] text-white text-[10px] font-bold rounded-full min-w-4 h-4 px-1 flex items-center justify-center shadow-xs">
                    {totalItems}
                  </span>
                )}
              </div>
              <div className="hidden xl:flex flex-col text-left leading-none">
                <span className="text-[10px] text-slate-500">Cart</span>
                <span className="text-xs font-semibold text-[#172554]">
                  {totalItems > 0 ? `${totalItems} items` : "৳ 0"}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Row */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products in Bangladesh..."
              className="w-full h-10 pl-3.5 pr-12 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F97316]"
            />
            <button
              type="submit"
              className="absolute right-1 w-8 h-8 bg-[#F97316] text-white rounded-md flex items-center justify-center"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
