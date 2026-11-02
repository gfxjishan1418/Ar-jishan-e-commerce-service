import React, { Suspense } from "react";
import Link from "next/link";
import { dataService } from "@/lib/dataService";
import { ProductCard } from "@/components/product/ProductCard";
import { Filter, SlidersHorizontal, Check, RefreshCw } from "lucide-react";
import { formatBDT } from "@/lib/utils";

interface ShopPageProps {
  searchParams: Promise<{
    category?: string;
    brand?: string;
    search?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: "price_asc" | "price_desc" | "rating" | "newest" | "popular";
    flash?: string;
    featured?: string;
  }>;
}

async function ShopContent({ searchParams }: ShopPageProps) {
  const query = await searchParams;
  const categories = await dataService.getCategories();
  const brands = await dataService.getBrands();

  const minP = query.minPrice ? Number(query.minPrice) : undefined;
  const maxP = query.maxPrice ? Number(query.maxPrice) : undefined;

  const { products, total } = await dataService.getProducts({
    category: query.category,
    brand: query.brand,
    search: query.search,
    minPrice: minP,
    maxPrice: maxP,
    sortBy: query.sort,
    isFlashDeal: query.flash === "true",
    isFeatured: query.featured === "true",
  });

  const activeCategory = categories.find((c) => c.slug === query.category);

  return (
    <div className="bg-slate-50 min-h-screen py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Title */}
        <div className="mb-6">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Link href="/" className="hover:text-[#F97316]">Home</Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">
              {activeCategory ? activeCategory.name : query.search ? `Search "${query.search}"` : "All Products"}
            </span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#172554]">
                {activeCategory ? activeCategory.name : query.search ? `Results for "${query.search}"` : "All Products"}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Showing {total} {total === 1 ? "product" : "products"} available in Bangladesh
              </p>
            </div>

            {/* Quick Sort Links */}
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs shadow-2xs">
              <span className="text-slate-400 font-medium">Sort:</span>
              <Link
                href={`/shop?${new URLSearchParams({ ...query, sort: "popular" }).toString()}`}
                className={`px-2 py-1 rounded-md transition-colors ${query.sort === "popular" || !query.sort ? "bg-orange-50 text-[#F97316] font-bold" : "text-slate-600 hover:text-[#F97316]"}`}
              >
                Popular
              </Link>
              <Link
                href={`/shop?${new URLSearchParams({ ...query, sort: "newest" }).toString()}`}
                className={`px-2 py-1 rounded-md transition-colors ${query.sort === "newest" ? "bg-orange-50 text-[#F97316] font-bold" : "text-slate-600 hover:text-[#F97316]"}`}
              >
                Newest
              </Link>
              <Link
                href={`/shop?${new URLSearchParams({ ...query, sort: "price_asc" }).toString()}`}
                className={`px-2 py-1 rounded-md transition-colors ${query.sort === "price_asc" ? "bg-orange-50 text-[#F97316] font-bold" : "text-slate-600 hover:text-[#F97316]"}`}
              >
                Price: Low to High
              </Link>
              <Link
                href={`/shop?${new URLSearchParams({ ...query, sort: "price_desc" }).toString()}`}
                className={`px-2 py-1 rounded-md transition-colors ${query.sort === "price_desc" ? "bg-orange-50 text-[#F97316] font-bold" : "text-slate-600 hover:text-[#F97316]"}`}
              >
                Price: High to Low
              </Link>
            </div>
          </div>
        </div>

        {/* Layout Grid: Sidebar Filters + Products */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Left Sidebar Filters */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 font-bold text-[#172554] text-sm">
                  <SlidersHorizontal className="w-4 h-4 text-[#F97316]" />
                  <span>Filters</span>
                </div>
                {(query.category || query.brand || query.search || query.minPrice || query.maxPrice) && (
                  <Link
                    href="/shop"
                    className="text-xs text-red-500 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset</span>
                  </Link>
                )}
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                  Categories
                </h3>
                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  <Link
                    href="/shop"
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                      !query.category
                        ? "bg-[#F97316] text-white font-bold"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <span>All Categories</span>
                  </Link>
                  {categories.map((c) => {
                    const isSelected = query.category === c.slug;
                    return (
                      <Link
                        key={c.id}
                        href={`/shop?category=${c.slug}`}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                          isSelected
                            ? "bg-[#F97316] text-white font-bold"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        <span>{c.name}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-400"}`}>
                          {c.product_count}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Price Filter Links */}
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                  Price Range
                </h3>
                <div className="space-y-1.5 text-xs">
                  <Link
                    href={`/shop?${new URLSearchParams({ ...query, minPrice: "0", maxPrice: "2000" }).toString()}`}
                    className={`block px-2.5 py-1.5 rounded-lg transition-colors ${query.maxPrice === "2000" ? "bg-orange-50 text-[#F97316] font-bold" : "text-slate-600 hover:bg-slate-100"}`}
                  >
                    Under ৳ 2,000
                  </Link>
                  <Link
                    href={`/shop?${new URLSearchParams({ ...query, minPrice: "2000", maxPrice: "4000" }).toString()}`}
                    className={`block px-2.5 py-1.5 rounded-lg transition-colors ${query.minPrice === "2000" && query.maxPrice === "4000" ? "bg-orange-50 text-[#F97316] font-bold" : "text-slate-600 hover:bg-slate-100"}`}
                  >
                    ৳ 2,000 - ৳ 4,000
                  </Link>
                  <Link
                    href={`/shop?${new URLSearchParams({ ...query, minPrice: "4000", maxPrice: "10000" }).toString()}`}
                    className={`block px-2.5 py-1.5 rounded-lg transition-colors ${query.minPrice === "4000" ? "bg-orange-50 text-[#F97316] font-bold" : "text-slate-600 hover:bg-slate-100"}`}
                  >
                    Above ৳ 4,000
                  </Link>
                </div>
              </div>

              {/* Brands Filter */}
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                  Top Brands
                </h3>
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {brands.map((b) => {
                    const isSelected = query.brand?.toLowerCase() === b.name.toLowerCase();
                    return (
                      <Link
                        key={b.id}
                        href={`/shop?brand=${encodeURIComponent(b.name)}`}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                          isSelected
                            ? "bg-[#172554] text-white font-bold"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        <span>{b.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-orange-400" />}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Bangladesh Delivery Trust Box */}
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-[11px] text-blue-900 leading-relaxed">
                <p className="font-bold text-[#172554] mb-1">🚚 Delivery in 64 Districts</p>
                <p className="text-blue-700">Inside Dhaka: ৳60 (24h)</p>
                <p className="text-blue-700">Outside Dhaka: ৳120 (48h-72h)</p>
                <p className="text-emerald-700 font-bold mt-1">FREE delivery on orders over ৳1,000</p>
              </div>
            </div>
          </aside>

          {/* Main Product Grid */}
          <main className="lg:col-span-3">
            {products.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
                <div className="w-16 h-16 bg-orange-50 text-[#F97316] rounded-full flex items-center justify-center mx-auto">
                  <Filter className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">No products found</h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                  We couldn&apos;t find any items matching your selected criteria. Try removing some filters or search for something else.
                </p>
                <div>
                  <Link
                    href="/shop"
                    className="inline-block px-5 py-2.5 bg-[#F97316] text-white text-xs font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-sm"
                  >
                    View All Products
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage(props: ShopPageProps) {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading catalog...</div>}>
      <ShopContent {...props} />
    </Suspense>
  );
}
