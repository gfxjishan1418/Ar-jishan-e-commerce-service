import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { StoreLayoutShell } from "@/components/layout/StoreLayoutShell";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#172554",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: "AR JISHAN E-COMMERCE SERVICE | Shop Smart. Live Better.",
  description:
    "Bangladesh's trusted online shopping platform for genuine electronics, modern fashion, watches, audio gadgets, and lifestyle products with fast nationwide delivery and Cash on Delivery.",
  keywords: [
    "AR Jishan",
    "Bangladesh E-commerce",
    "Online Shopping BD",
    "Electronics BD",
    "Smart Watch Dhaka",
    "Cash on Delivery Bangladesh",
    "bKash Shopping",
  ],
  authors: [{ name: "AR Jishan E-commerce Team" }],
  openGraph: {
    title: "AR JISHAN E-COMMERCE SERVICE — Shop Smart. Live Better.",
    description: "Quality products. Great prices. Delivered to your doorstep across Bangladesh.",
    url: "https://arjishan.com",
    siteName: "AR Jishan E-Commerce",
    locale: "en_BD",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-white text-slate-900 selection:bg-orange-500 selection:text-white">
        <CartProvider>
          <WishlistProvider>
            <Suspense fallback={<main className="min-h-screen">{children}</main>}>
              <StoreLayoutShell>{children}</StoreLayoutShell>
            </Suspense>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
