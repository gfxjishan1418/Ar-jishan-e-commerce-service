"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, LayoutGrid, Zap, Flame, ShieldAlert } from "lucide-react";
import { INITIAL_CATEGORIES } from "@/data/mockData";

export function Navbar() {
  const pathname = usePathname();
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Flash Deals", href: "/shop?flash=true", highlight: true },
    { label: "New Arrivals", href: "/shop?sort=newest" },
    { label: "Best Sellers", href: "/shop?sort=popular" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 hidden lg:block relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Left: "All Categories" Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              className="flex items-center justify-between gap-3 bg-[#F97316] hover:bg-orange-600 text-white font-semibold text-sm px-5 py-2.5 rounded-t-lg transition-colors min-w-[230px]"
            >
              <div className="flex items-center gap-2">
                <LayoutGrid className="w-4 h-4" />
                <span>All Categories</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCategoryDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            {isCategoryDropdownOpen && (
              <div
                className="absolute left-0 top-full w-64 bg-white border border-slate-200 shadow-xl rounded-b-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onMouseLeave={() => setIsCategoryDropdownOpen(false)}
              >
                {INITIAL_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/shop?category=${cat.slug}`}
                    onClick={() => setIsCategoryDropdownOpen(false)}
                    className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 hover:bg-orange-50 hover:text-[#F97316] transition-colors"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[11px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-medium">
                      {cat.product_count}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Center: Nav Links */}
          <div className="flex items-center space-x-1 xl:space-x-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium px-3 py-2 rounded-md transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? "text-[#F97316] font-semibold"
                      : link.highlight
                      ? "text-red-600 hover:text-red-700 font-semibold"
                      : "text-slate-700 hover:text-[#F97316]"
                  }`}
                >
                  {link.highlight && <Flame className="w-3.5 h-3.5 fill-red-500 text-red-500" />}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right: Quick Admin / Hotline Shortcut */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="text-xs font-semibold text-slate-600 hover:text-[#172554] bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5"
            >
              <span>Admin Panel</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
