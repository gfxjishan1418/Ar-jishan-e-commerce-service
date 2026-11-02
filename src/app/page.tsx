import React from "react";
import { dataService } from "@/lib/dataService";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoryPills } from "@/components/home/CategoryPills";
import { PromoCards } from "@/components/home/PromoCards";
import { FlashSaleSection } from "@/components/home/FlashSaleSection";
import { ProductGridSection } from "@/components/home/ProductGridSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Testimonials } from "@/components/home/Testimonials";
import { Newsletter } from "@/components/home/Newsletter";

export default async function HomePage() {
  const { products } = await dataService.getProducts();

  const featuredProducts = products.filter((p) => p.is_featured).slice(0, 4);
  const bestSellers = products.filter((p) => p.is_bestseller).slice(0, 4);
  const newArrivals = products.filter((p) => p.is_new_arrival).slice(0, 4);

  return (
    <div className="space-y-2">
      {/* Hero Section */}
      <HeroSection />

      {/* Category Section */}
      <CategoryPills />

      {/* Promotional Cards */}
      <PromoCards />

      {/* Flash Sale Section with Live Countdown */}
      <FlashSaleSection products={products} />

      {/* Featured Products */}
      <ProductGridSection
        title="Featured Products"
        subtitle="Handpicked top quality items recommended for you"
        badge="Popular Pick"
        products={featuredProducts}
        viewAllLink="/shop?featured=true"
      />

      {/* Best Sellers */}
      <ProductGridSection
        title="Best Sellers"
        subtitle="Most loved and highest ordered products this month"
        badge="Top Rated"
        products={bestSellers}
        viewAllLink="/shop?sort=popular"
      />

      {/* New Arrivals */}
      <ProductGridSection
        title="New Arrivals"
        subtitle="Latest additions freshly arrived in our collection"
        badge="Just Landed"
        products={newArrivals}
        viewAllLink="/shop?sort=newest"
      />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Customer Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}
