"use client";

import React, { useState } from "react";
import { Truck, CheckCircle2, Phone, Globe } from "lucide-react";

export function AnnouncementBar() {
  const [language, setLanguage] = useState<"en" | "bn">("en");

  return (
    <div className="bg-[#172554] text-white text-[11px] sm:text-xs py-2 px-4 border-b border-blue-900/40">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        {/* Left: Perks */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-slate-200">
          <div className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Free Delivery on Orders Over <strong>৳1,000</strong></span>
          </div>
          <div className="hidden md:flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Cash on Delivery Available</span>
          </div>
          <div className="hidden lg:flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-[#F97316]" />
            <span>24/7 Support: <strong>+880 1700-000000</strong></span>
          </div>
        </div>

        {/* Right: Language and Quick Links */}
        <div className="flex items-center gap-4 text-slate-300">
          <div className="flex items-center gap-1 text-[11px]">
            <Globe className="w-3 h-3 text-[#F97316]" />
            <button
              onClick={() => setLanguage("bn")}
              className={`hover:text-white transition-colors ${language === "bn" ? "font-bold text-white underline underline-offset-2" : ""}`}
            >
              বাংলা
            </button>
            <span className="text-slate-500">|</span>
            <button
              onClick={() => setLanguage("en")}
              className={`hover:text-white transition-colors ${language === "en" ? "font-bold text-white underline underline-offset-2" : ""}`}
            >
              English
            </button>
          </div>
          <span className="hidden sm:inline text-slate-600">|</span>
          <a
            href="/track-order"
            className="hidden sm:inline text-[11px] hover:text-[#F97316] transition-colors"
          >
            Track Order
          </a>
        </div>
      </div>
    </div>
  );
}
