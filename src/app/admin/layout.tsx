"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  AlertTriangle, 
  Tag, 
  Settings, 
  ArrowLeft, 
  ShieldCheck 
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";

function AdminNavLinks() {
  const pathname = usePathname();

  const links = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Products Catalog", href: "/admin/products", icon: Package },
    { label: "Orders Management", href: "/admin/orders", icon: ShoppingBag },
    { label: "Inventory Alerts", href: "/admin/inventory", icon: AlertTriangle },
    { label: "Coupons & Discounts", href: "/admin/coupons", icon: Tag },
    { label: "Store Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <nav className="p-4 space-y-1 text-xs sm:text-sm font-semibold">
      {links.map((link) => {
        const isActive = pathname === link.href;
        const Icon = link.icon;

        return (
          <Link
            key={link.label}
            href={link.href}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
              isActive
                ? "bg-[#F97316] text-white shadow-xs"
                : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span>{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full lg:w-64 bg-[#172554] text-white flex flex-col justify-between shrink-0">
        <div>
          {/* Admin Header */}
          <div className="p-6 border-b border-blue-900/60">
            <div className="bg-white p-2 rounded-xl inline-block mb-3">
              <Logo variant="compact" />
            </div>
            <div className="flex items-center gap-1.5 text-xs text-orange-400 font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#F97316]" />
              <span>Admin Management Console</span>
            </div>
          </div>

          {/* Links */}
          <Suspense fallback={<div className="p-4 text-xs text-slate-400">Loading navigation...</div>}>
            <AdminNavLinks />
          </Suspense>
        </div>

        {/* Bottom Profile / Return to Store */}
        <div className="p-4 border-t border-blue-900/60 space-y-3">
          <div className="flex items-center gap-3 p-2 bg-blue-950/60 rounded-xl border border-blue-900/40">
            <div className="w-8 h-8 rounded-full bg-[#F97316] text-white flex items-center justify-center font-bold text-xs">
              SA
            </div>
            <div>
              <div className="text-xs font-bold text-white">AR Jishan Admin</div>
              <div className="text-[10px] text-orange-400 font-semibold">Role: Super Admin (RBAC)</div>
            </div>
          </div>

          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors px-2 py-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Store</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Content Stage */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="p-4 sm:p-8 lg:p-10 max-w-7xl mx-auto space-y-8">
          {children}
        </div>
      </main>
    </div>
  );
}
