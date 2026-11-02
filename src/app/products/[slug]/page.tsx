import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { dataService } from "@/lib/dataService";
import { ProductDetailsView } from "@/components/product/ProductDetailsView";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const { products } = await dataService.getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await dataService.getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | AR JISHAN",
    };
  }

  return {
    title: `${product.name} | AR JISHAN E-COMMERCE`,
    description: product.description,
    openGraph: {
      title: `${product.name} — AR JISHAN`,
      description: product.description,
      images: [{ url: product.images[0] || "" }],
    },
  };
}

async function ProductPageContent({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await dataService.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Get related products in the same category
  const { products: allProducts } = await dataService.getProducts({
    category: product.category_slug,
    limit: 5,
  });
  const relatedProducts = allProducts.filter((p) => p.id !== product.id).slice(0, 4);

  // Get reviews
  const reviews = await dataService.getReviews(product.id);

  return (
    <ProductDetailsView
      product={product}
      relatedProducts={relatedProducts}
      initialReviews={reviews}
    />
  );
}

export default function ProductPage(props: ProductPageProps) {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading product details...</div>}>
      <ProductPageContent {...props} />
    </Suspense>
  );
}
