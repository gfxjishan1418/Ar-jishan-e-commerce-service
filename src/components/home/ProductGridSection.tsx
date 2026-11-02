import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Product } from "@/types";
import { ProductCard } from "@/components/product/ProductCard";

interface ProductGridSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllLink?: string;
  badge?: string;
}

export function ProductGridSection({
  title,
  subtitle,
  products,
  viewAllLink = "/shop",
  badge,
}: ProductGridSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            {badge && (
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#F97316] bg-orange-50 px-2.5 py-0.5 rounded-full inline-block mb-1">
                {badge}
              </span>
            )}
            <h2 className="text-xl sm:text-2xl font-black text-[#172554] tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{subtitle}</p>
            )}
          </div>

          <Link
            href={viewAllLink}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#F97316] hover:text-orange-700 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
