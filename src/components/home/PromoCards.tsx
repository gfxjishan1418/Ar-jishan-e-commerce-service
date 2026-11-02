import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function PromoCards() {
  const cards = [
    {
      id: 1,
      badge: "Special Offer",
      title: "Up to 50% OFF",
      description: "Laptops, gadgets & audio accessories",
      buttonText: "Shop Now",
      href: "/shop?category=electronics",
      image: "/images/banners/laptop-promo.jpg",
      bgColor: "bg-gradient-to-r from-orange-50 to-amber-100/60",
    },
    {
      id: 2,
      badge: "Trending Fit",
      title: "New Collection",
      subtitle: "Stay Stylish",
      description: "Premium cotton & linen apparel",
      buttonText: "Shop Now",
      href: "/shop?category=fashion",
      image: "/images/banners/fashion-promo.jpg",
      bgColor: "bg-gradient-to-r from-blue-50 to-indigo-100/60",
    },
    {
      id: 3,
      badge: "Modern Living",
      title: "Better Home",
      subtitle: "Better Life",
      description: "Cozy home decor & lighting",
      buttonText: "Shop Now",
      href: "/shop?category=home-living",
      image: "/images/banners/home-promo.jpg",
      bgColor: "bg-gradient-to-r from-emerald-50 to-teal-100/60",
    },
  ];

  return (
    <section className="py-6 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`rounded-2xl ${card.bgColor} p-6 border border-slate-200/80 overflow-hidden relative flex items-center justify-between group hover:shadow-md transition-all duration-300`}
            >
              <div className="space-y-3 z-10 max-w-[55%]">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#F97316] bg-white/80 px-2.5 py-1 rounded-full shadow-2xs">
                  {card.badge}
                </span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#172554] leading-tight">
                    {card.title}
                  </h3>
                  {card.subtitle && (
                    <div className="text-lg font-bold text-slate-800">
                      {card.subtitle}
                    </div>
                  )}
                </div>
                <div>
                  <Link
                    href={card.href}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#F97316] hover:bg-orange-600 text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
                  >
                    <span>{card.buttonText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Promo Image */}
              <div className="w-32 h-32 sm:w-36 sm:h-36 relative shrink-0">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300"
                  sizes="150px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
