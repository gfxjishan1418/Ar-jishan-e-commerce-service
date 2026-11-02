"use client";

import React, { Suspense } from "react";
import { usePathname } from "next/navigation";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

export function StoreLayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isPaymentSandbox = pathname?.startsWith("/checkout/payment-sandbox");

  // If in Admin Console or Payment Gateway Sandbox, render clean dedicated screen without public storefront header/footer
  if (isAdmin || isPaymentSandbox) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <>
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Main Header */}
      <Suspense fallback={<div className="h-20 bg-white" />}>
        <Header />
      </Suspense>

      {/* Category Navigation Bar */}
      <Suspense fallback={<div className="h-12 bg-white" />}>
        <Navbar />
      </Suspense>

      {/* Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Main Page Body */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Floating Nav */}
      <Suspense fallback={null}>
        <MobileBottomNav />
      </Suspense>
    </>
  );
}
