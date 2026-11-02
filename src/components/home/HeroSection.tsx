"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Truck, RotateCcw, Headphones } from "lucide-react";

const HERO_SLIDES = [
  {
    id: 1,
    tag: "Exclusive Bangladesh Launch",
    headline: "Discover Products",
    headlineAccent: "You'll Love.",
    description: "Quality products. Great prices. Delivered to your doorstep across all 64 districts.",
    ctaText: "SHOP NOW",
    ctaLink: "/shop",
    bgGradient: "from-amber-50/80 via-orange-50/40 to-slate-50",
    image: "/images/banners/hero-headphones.jpg",
    alt: "Premium Headphone & Tech Collection",
  },
  {
    id: 2,
    tag: "Trending Smart Wearables",
    headline: "Smart Living",
    headlineAccent: "Starts Here.",
    description: "Upgrade your lifestyle with state-of-the-art AMOLED smartwatches & audio gear.",
    ctaText: "EXPLORE DEALS",
    ctaLink: "/shop?category=watches",
    bgGradient: "from-blue-50/80 via-indigo-50/30 to-slate-50",
    image: "/images/banners/hero-smartwatch.jpg",
    alt: "Smart Watch Tech",
  },
  {
    id: 3,
    tag: "Pure Organic Cotton & Linen",
    headline: "Modern Style",
    headlineAccent: "Unmatched Comfort.",
    description: "Handcrafted breathable fabrics tailored specifically for the Bangladesh climate.",
    ctaText: "VIEW FASHION",
    ctaLink: "/shop?category=fashion",
    bgGradient: "from-rose-50/80 via-orange-50/30 to-slate-50",
    image: "/images/banners/hero-fashion.jpg",
    alt: "Fashion Collection",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="bg-white pt-4 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Card */}
        <div className={`relative rounded-2xl bg-gradient-to-r ${slide.bgGradient} border border-slate-200/80 overflow-hidden shadow-xs min-h-[380px] sm:min-h-[460px] flex items-center`}>
          {/* Controls */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
            aria-label="Previous slide"
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md flex items-center justify-center transition-transform hover:scale-105"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
            aria-label="Next slide"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md flex items-center justify-center transition-transform hover:scale-105"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Slide Content */}
          <div className="w-full grid grid-cols-1 md:grid-cols-12 items-center p-6 sm:p-12 lg:p-16 gap-8">
            {/* Left Copy */}
            <div className="md:col-span-7 z-10 space-y-4 sm:space-y-6 text-center md:text-left">
              <span className="inline-block text-xs sm:text-sm font-bold text-[#F97316] uppercase tracking-wider bg-orange-100/70 px-3 py-1 rounded-full">
                {slide.tag}
              </span>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#172554] tracking-tight leading-tight">
                {slide.headline}{" "}
                <span className="text-[#F97316]">{slide.headlineAccent}</span>
              </h1>

              <p className="text-sm sm:text-lg text-slate-600 max-w-lg leading-relaxed mx-auto md:mx-0">
                {slide.description}
              </p>

              <div>
                <Link
                  href={slide.ctaLink}
                  className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 bg-[#F97316] hover:bg-orange-600 text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-md hover:shadow-orange-500/20 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </div>
            </div>

            {/* Right Hero Product Image */}
            <div className="md:col-span-5 relative flex items-center justify-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority
                  className="object-cover rounded-2xl shadow-xl transition-all duration-700 hover:scale-102"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
            {HERO_SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === index ? "w-8 bg-[#F97316]" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* 4 Feature Badges below Hero (matching left panel in mockup) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6">
          <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-orange-200 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-[#F97316] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-[#172554]">Secure Shopping</div>
              <div className="text-[11px] text-slate-500">100% Protected Payments</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-orange-200 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-[#172554] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-[#172554]">Fast Delivery</div>
              <div className="text-[11px] text-slate-500">Nationwide 64 Districts</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-orange-200 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-[#172554]">Easy Returns</div>
              <div className="text-[11px] text-slate-500">7-Day Return Policy</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-orange-200 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-[#172554]">24/7 Support</div>
              <div className="text-[11px] text-slate-500">Dedicated BD Helpline</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
