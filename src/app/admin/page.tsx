import React from "react";
import Link from "next/link";
import { dataService } from "@/lib/dataService";
import { formatBDT, formatDate } from "@/lib/utils";
import { AnalyticsCharts } from "@/components/admin/AnalyticsCharts";
import { 
  ArrowUpRight,
  AlertTriangle,
  ShoppingBag,
  Package,
  Layers,
  CheckCircle2
} from "lucide-react";

export default async function AdminDashboardPage() {
  const metrics = await dataService.getAdminMetrics();

  return (
    <div className="space-y-8">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-[#172554]">
              Store Overview & Analytics
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
              Live Systems
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time financial analytics, courier logistics, and operational metrics for AR JISHAN
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/products"
            className="px-4 py-2 bg-[#F97316] hover:bg-orange-600 text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
          >
            + Add New Product
          </Link>
          <Link
            href="/admin/orders"
            className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition-colors shadow-2xs"
          >
            Manage All Orders
          </Link>
        </div>
      </div>

      {/* Comprehensive Graphical Charts & Analytics Section */}
      <AnalyticsCharts />

      {/* Operational Modules: Recent Customer Orders & Low Stock Watchlist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#172554]">Recent Customer Orders</h2>
              <p className="text-xs text-slate-400">Latest nationwide shipments requiring store action</p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-bold text-[#F97316] hover:underline flex items-center gap-1"
            >
              <span>View All Orders</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <th className="pb-3 font-semibold">Order ID</th>
                  <th className="pb-3 font-semibold">Customer</th>
                  <th className="pb-3 font-semibold">Division</th>
                  <th className="pb-3 font-semibold">Amount</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {metrics.recentOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/60">
                    <td className="py-3.5 font-bold text-[#172554]">{ord.order_number}</td>
                    <td className="py-3.5">
                      <div className="font-semibold text-slate-800">{ord.customer_name}</div>
                      <div className="text-[10px] text-slate-400">{ord.customer_phone}</div>
                    </td>
                    <td className="py-3.5">{ord.shipping_division}</td>
                    <td className="py-3.5 font-bold text-[#F97316]">
                      {formatBDT(ord.total_amount)}
                    </td>
                    <td className="py-3.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        ord.order_status === "delivered"
                          ? "bg-emerald-100 text-emerald-800"
                          : ord.order_status === "processing"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-amber-100 text-amber-800"
                      }`}>
                        {ord.order_status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <Link
                        href={`/track-order?orderNumber=${ord.order_number}`}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-[11px] font-bold transition-colors"
                      >
                        Inspect
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Watchlist (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <h2 className="text-base font-bold text-[#172554]">Low Stock Alert</h2>
            </div>
            <Link
              href="/admin/inventory"
              className="text-xs font-bold text-[#F97316] hover:underline"
            >
              Restock
            </Link>
          </div>

          <div className="space-y-3">
            {metrics.lowStockProducts.length === 0 ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-center space-y-1">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                <p className="text-xs font-bold text-emerald-900">Inventory Healthy</p>
                <p className="text-[11px] text-emerald-700">All products have sufficient units.</p>
              </div>
            ) : (
              metrics.lowStockProducts.map((p) => (
                <div
                  key={p.id}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between"
                >
                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-bold text-slate-800 truncate">{p.name}</p>
                    <p className="text-[10px] text-slate-400">SKU: {p.sku}</p>
                  </div>
                  <span className="px-2.5 py-1 bg-red-100 text-red-700 font-bold text-xs rounded-xl shrink-0">
                    {p.stock_quantity} left
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="pt-2">
            <Link
              href="/admin/inventory"
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors block text-center"
            >
              Open Inventory Manager
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
