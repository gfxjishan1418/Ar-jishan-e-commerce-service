import React from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Phone, Mail, MapPin, ShieldCheck, Truck, RotateCcw, Headphones } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0f172a] text-slate-300 pt-16 pb-24 lg:pb-12 border-t border-slate-800">
      {/* Top Value Badges Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-slate-800/80">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-950/60 border border-blue-900/50 flex items-center justify-center text-[#F97316] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Genuine</h4>
              <p className="text-xs text-slate-400">Direct authentic source</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-950/60 border border-blue-900/50 flex items-center justify-center text-[#F97316] shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Fast BD Delivery</h4>
              <p className="text-xs text-slate-400">24-48h inside Dhaka</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-950/60 border border-blue-900/50 flex items-center justify-center text-[#F97316] shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">7-Day Easy Return</h4>
              <p className="text-xs text-slate-400">Hassle-free guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-950/60 border border-blue-900/50 flex items-center justify-center text-[#F97316] shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">24/7 BD Support</h4>
              <p className="text-xs text-slate-400">Dedicated phone & chat</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white p-2.5 rounded-lg inline-block">
              <Logo variant="compact" />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              AR Jishan E-commerce Service is Bangladesh’s premier digital shopping platform offering authentic electronics, modern fashion, watches, and lifestyle essentials with fast nationwide delivery.
            </p>
            <div className="space-y-2 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#F97316] shrink-0" />
                <span>House 42, Road 11, Banani, Dhaka-1213, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#F97316] shrink-0" />
                <span>+880 1700-000000 (Hotline)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#F97316] shrink-0" />
                <span>support@arjishan.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Shop</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/shop" className="hover:text-[#F97316] transition-colors">All Products</Link></li>
              <li><Link href="/shop?category=electronics" className="hover:text-[#F97316] transition-colors">Electronics & Audio</Link></li>
              <li><Link href="/shop?category=fashion" className="hover:text-[#F97316] transition-colors">Fashion & Apparel</Link></li>
              <li><Link href="/shop?category=watches" className="hover:text-[#F97316] transition-colors">Smart Watches</Link></li>
              <li><Link href="/shop?flash=true" className="hover:text-[#F97316] transition-colors">Flash Sales</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Customer Service</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/track-order" className="hover:text-[#F97316] transition-colors">Track Your Order</Link></li>
              <li><Link href="/account" className="hover:text-[#F97316] transition-colors">Customer Account</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-[#F97316] transition-colors">Delivery & Shipping Rates</Link></li>
              <li><Link href="/returns" className="hover:text-[#F97316] transition-colors">Return & Refund Policy</Link></li>
              <li><Link href="/contact" className="hover:text-[#F97316] transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Payment & Security */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Secure Payments</h4>
            <p className="text-xs text-slate-400">We accept major Bangladesh mobile financial services and debit/credit cards:</p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-1 bg-pink-900/40 text-pink-300 border border-pink-700/50 rounded-md text-[11px] font-bold">
                bKash
              </span>
              <span className="px-2.5 py-1 bg-orange-900/40 text-orange-300 border border-orange-700/50 rounded-md text-[11px] font-bold">
                Nagad
              </span>
              <span className="px-2.5 py-1 bg-purple-900/40 text-purple-300 border border-purple-700/50 rounded-md text-[11px] font-bold">
                Rocket
              </span>
              <span className="px-2.5 py-1 bg-blue-900/40 text-blue-300 border border-blue-700/50 rounded-md text-[11px] font-bold">
                Visa / Master
              </span>
              <span className="px-2.5 py-1 bg-emerald-900/40 text-emerald-300 border border-emerald-700/50 rounded-md text-[11px] font-bold">
                Cash on Delivery
              </span>
            </div>
            <div className="pt-2">
              <Link
                href="/admin"
                className="text-[11px] text-slate-400 hover:text-white underline underline-offset-4"
              >
                Staff Admin Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright & Legal Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>© 2026 AR JISHAN E-COMMERCE SERVICE. All rights reserved. Made in Bangladesh.</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
          <Link href="/security" className="hover:text-slate-300 transition-colors">Security Statement</Link>
        </div>
      </div>
    </footer>
  );
}
