"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, Clock, ArrowRight } from "lucide-react";
import { Product } from "@/types";
import { ProductCard } from "@/components/product/ProductCard";

interface FlashSaleSectionProps {
  products: Product[];
}

export function FlashSaleSection({ products }: FlashSaleSectionProps) {
  // Countdown timer: 18h 42m 15s
  const [timeLeft, setTimeLeft] = useState({
    hours: 18,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashProducts = products.filter((p) => p.is_flash_deal).slice(0, 4);

  return (
    <section className="py-8 bg-slate-50/60 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flash Sale Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-500/20">
              <Zap className="w-6 h-6 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl sm:text-2xl font-black text-[#172554] tracking-tight">
                  Flash Sale
                </h2>
                {/* Live Countdown Badges */}
                <div className="flex items-center gap-1.5 text-xs font-bold text-white bg-slate-900 px-3 py-1 rounded-lg">
                  <Clock className="w-3.5 h-3.5 text-[#F97316] animate-pulse" />
                  <span>{String(timeLeft.hours).padStart(2, "0")}h</span>
                  <span>:</span>
                  <span>{String(timeLeft.minutes).padStart(2, "0")}m</span>
                  <span>:</span>
                  <span className="text-[#F97316]">{String(timeLeft.seconds).padStart(2, "0")}s</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Limited stock special deals updated daily
              </p>
            </div>
          </div>

          <Link
            href="/shop?flash=true"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#F97316] hover:text-orange-700 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {flashProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
