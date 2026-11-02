import React, { Suspense } from "react";
import Link from "next/link";
import { CheckCircle2, Package, ArrowRight, Printer, Phone } from "lucide-react";
import { dataService } from "@/lib/dataService";
import { formatBDT, formatDate } from "@/lib/utils";

interface SuccessPageProps {
  searchParams: Promise<{
    orderNumber?: string;
    paid?: string;
  }>;
}

async function OrderSuccessContent({ searchParams }: SuccessPageProps) {
  const query = await searchParams;
  const orderNumber = query.orderNumber || "ARJ-2026-89412";
  const order = await dataService.getOrder(orderNumber);

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-8">
          {/* Top Congratulations */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#172554] tracking-tight">
              Order Confirmed!
            </h1>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Thank you for shopping with AR JISHAN. Your order has been placed and is currently being processed.
            </p>
          </div>

          {/* Order Details Meta Card */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-400 font-medium block">Order Number</span>
              <span className="font-bold text-[#172554] text-sm">{order?.order_number || orderNumber}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Order Date</span>
              <span className="font-bold text-slate-800">
                {order ? formatDate(order.created_at) : "Today"}
              </span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Payment Status</span>
              <span className={`font-bold capitalize ${order?.payment_status === "paid" ? "text-emerald-600" : "text-amber-600"}`}>
                {order?.payment_status === "paid" ? "Paid (Online)" : "Cash on Delivery"}
              </span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Total Amount</span>
              <span className="font-black text-sm text-[#F97316]">
                {order ? formatBDT(order.total_amount) : "৳ 0"}
              </span>
            </div>
          </div>

          {/* Delivery & Courier Snapshot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
              <h3 className="font-bold text-[#172554] text-xs uppercase tracking-wider mb-2">
                Delivery Address
              </h3>
              <p className="font-semibold text-slate-800">{order?.customer_name}</p>
              <p>{order?.shipping_address}</p>
              <p>
                {order?.shipping_area ? `${order.shipping_area}, ` : ""}
                {order?.shipping_upazila ? `${order.shipping_upazila}, ` : ""}
                {order?.shipping_district}, {order?.shipping_division}
              </p>
              <p className="font-medium text-slate-700">Phone: {order?.customer_phone}</p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
              <h3 className="font-bold text-[#172554] text-xs uppercase tracking-wider mb-2">
                Logistics & Tracking
              </h3>
              <p>
                Courier Partner: <strong className="text-slate-800">{order?.courier_name || "Steadfast Courier"}</strong>
              </p>
              <p>
                Tracking ID: <strong className="text-[#F97316] font-mono">{order?.courier_tracking_id || "BD-884920"}</strong>
              </p>
              <p className="text-[11px] text-slate-400 pt-1">
                Estimated Delivery: {order?.shipping_division === "Dhaka" ? "Within 24-48 Hours" : "2-3 Days"}
              </p>
            </div>
          </div>

          {/* Itemized list */}
          {order && (
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Purchased Items ({order.items.length})
              </h3>
              <div className="divide-y divide-slate-100">
                {order.items.map((item) => (
                  <div key={item.id} className="py-2.5 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-slate-800">{item.product_name}</p>
                      <p className="text-slate-400">Qty: {item.quantity} × {formatBDT(item.unit_price)}</p>
                    </div>
                    <span className="font-bold text-slate-800">{formatBDT(item.total_price)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTAs */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
            <Link
              href={`/track-order?orderNumber=${order?.order_number || orderNumber}&phone=${order?.customer_phone || ""}`}
              className="flex-1 py-3 px-4 bg-[#F97316] hover:bg-orange-600 text-white font-bold text-xs rounded-xl transition-colors text-center flex items-center justify-center gap-2"
            >
              <Package className="w-4 h-4" />
              <span>Track Live Order Status</span>
            </Link>

            <Link
              href="/shop"
              className="py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors text-center"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage(props: SuccessPageProps) {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading order confirmation...</div>}>
      <OrderSuccessContent {...props} />
    </Suspense>
  );
}
