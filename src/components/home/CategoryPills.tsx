import React from "react";
import Link from "next/link";
import { 
  Smartphone, 
  Shirt, 
  Sparkles, 
  Watch, 
  Home, 
  Headphones, 
  Activity, 
  Compass 
} from "lucide-react";
import { INITIAL_CATEGORIES } from "@/data/mockData";

const CATEGORY_ICONS: Record<string, { icon: React.ElementType; bg: string; text: string }> = {
  electronics: { icon: Smartphone, bg: "bg-blue-100", text: "text-blue-600" },
  fashion: { icon: Shirt, bg: "bg-orange-100", text: "text-orange-600" },
  beauty: { icon: Sparkles, bg: "bg-pink-100", text: "text-pink-600" },
  watches: { icon: Watch, bg: "bg-teal-100", text: "text-teal-700" },
  "home-living": { icon: Home, bg: "bg-amber-100", text: "text-amber-700" },
  accessories: { icon: Headphones, bg: "bg-indigo-100", text: "text-indigo-600" },
  sports: { icon: Activity, bg: "bg-orange-100", text: "text-orange-600" },
  lifestyle: { icon: Compass, bg: "bg-purple-100", text: "text-purple-600" },
};

export function CategoryPills() {
  return (
    <section className="py-6 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#172554]">
            Shop by Category
          </h2>
          <Link
            href="/shop"
            className="text-xs sm:text-sm font-semibold text-[#F97316] hover:text-orange-700 transition-colors"
          >
            All Categories →
          </Link>
        </div>

        {/* Categories scrollable or flex grid */}
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4">
          {INITIAL_CATEGORIES.map((cat) => {
            const config = CATEGORY_ICONS[cat.slug] || {
              icon: Smartphone,
              bg: "bg-slate-100",
              text: "text-slate-700",
            };
            const Icon = config.icon;

            return (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className="group flex flex-col items-center p-3 rounded-2xl bg-slate-50 hover:bg-orange-50/60 border border-slate-200/80 hover:border-orange-200 transition-all duration-200 text-center"
              >
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full ${config.bg} ${config.text} flex items-center justify-center mb-2 shadow-xs group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-slate-700 group-hover:text-[#F97316] transition-colors truncate w-full">
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
