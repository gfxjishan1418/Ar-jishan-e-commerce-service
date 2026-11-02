"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Package, 
  Search, 
  CheckCircle2, 
  Clock, 
  Truck, 
  MapPin, 
  AlertCircle, 
  Phone 
} from "lucide-react";
import { Order, OrderStatus } from "@/types";
import { formatBDT, formatDate } from "@/lib/utils";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialOrderNumber = searchParams.get("orderNumber") || "";
  const initialPhone = searchParams.get("phone") || "";

  const [orderNumber, setOrderNumber] = useState(initialOrderNumber);
  const [phone, setPhone] = useState(initialPhone);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const fetchOrder = async (searchNum: string, searchPhone?: string) => {
    if (!searchNum.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/orders/track?orderNumber=${encodeURIComponent(searchNum.trim())}&phone=${encodeURIComponent(searchPhone?.trim() || "")}`);
      const data = await res.json();
      if (data.success && data.order) {
        setOrder(data.order);
      } else {
        setOrder(null);
        setError(data.message || "No order found matching the provided details. Please check the order number.");
      }
    } catch {
      setError("Failed to track order. Please try again.");
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  useEffect(() => {
    if (initialOrderNumber) {
      fetchOrder(initialOrderNumber, initialPhone);
    }
  }, [initialOrderNumber, initialPhone]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrder(orderNumber, phone);
  };

  const steps: { key: OrderStatus; label: string; desc: string }[] = [
    { key: "pending", label: "Order Placed", desc: "Order submitted to store" },
    { key: "confirmed", label: "Confirmed", desc: "Verified by AR Jishan team" },
    { key: "processing", label: "Processing", desc: "Packed & awaiting handover" },
    { key: "shipped", label: "Shipped", desc: "Out for delivery with courier" },
    { key: "delivered", label: "Delivered", desc: "Package handed to customer" },
  ];

  const getStepStatus = (stepKey: OrderStatus) => {
    if (!order) return "inactive";
    const statusOrder: OrderStatus[] = ["pending", "confirmed", "processing", "shipped", "delivered"];
    const currentIndex = statusOrder.indexOf(order.order_status);
    const stepIndex = statusOrder.indexOf(stepKey);

    if (order.order_status === "cancelled") return "cancelled";
    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "inactive";
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F97316] bg-orange-100/70 px-3 py-1 rounded-full">
            Real-Time Logistics
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#172554]">
            Track Your Order
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Enter your AR Jishan Order ID and registered mobile number to check real-time courier status and delivery progress.
          </p>
        </div>

        {/* Search Bar Form */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            <div className="sm:col-span-6">
              <label className="text-[11px] font-bold text-slate-600 block mb-1">
                Order ID *
              </label>
              <input
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="e.g. ARJ-2026-89412"
                required
                className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#F97316]"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="text-[11px] font-bold text-slate-600 block mb-1">
                Phone Number (Optional)
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 017XXXXXXXX"
                className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]"
              />
            </div>

            <div className="sm:col-span-2 sm:pt-5">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-[#F97316] hover:bg-orange-600 text-white font-bold text-xs rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1.5"
              >
                <Search className="w-4 h-4" />
                <span>{loading ? "..." : "Track"}</span>
              </button>
            </div>
          </form>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Order Details & Stepper */}
        {order && (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-8 animate-in fade-in">
            {/* Header Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="text-xs text-slate-400 font-medium">Order Number</span>
                <h2 className="text-xl font-black text-[#172554]">{order.order_number}</h2>
                <p className="text-xs text-slate-500 mt-0.5">Placed on {formatDate(order.created_at)}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider bg-orange-100 text-[#F97316]">
                  Status: {order.order_status}
                </span>
                <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                  order.payment_status === "paid" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                }`}>
                  Payment: {order.payment_status}
                </span>
              </div>
            </div>

            {/* Visual Tracking Stepper */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-6">
                Delivery Lifecycle
              </h3>

              <div className="relative">
                <div className="grid grid-cols-5 gap-2 text-center">
                  {steps.map((st, idx) => {
                    const status = getStepStatus(st.key);
                    const isDone = status === "completed";
                    const isCurrent = status === "current";

                    return (
                      <div key={st.key} className="flex flex-col items-center relative z-10">
                        <div
                          className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                            isDone
                              ? "bg-emerald-500 text-white shadow-xs"
                              : isCurrent
                              ? "bg-[#F97316] text-white ring-4 ring-orange-100 shadow-md"
                              : "bg-slate-100 text-slate-400 border border-slate-200"
                          }`}
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : isCurrent ? (
                            <Clock className="w-5 h-5 animate-spin" />
                          ) : (
                            idx + 1
                          )}
                        </div>
                        <span className={`text-xs font-bold mt-2.5 ${isCurrent ? "text-[#F97316]" : isDone ? "text-slate-800" : "text-slate-400"}`}>
                          {st.label}
                        </span>
                        <span className="text-[10px] text-slate-400 hidden sm:block mt-0.5">
                          {st.desc}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Courier & Address Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-[#172554] mb-2">
                  <Truck className="w-4 h-4 text-[#F97316]" />
                  <span>Courier & Dispatch</span>
                </div>
                <p>Courier Service: <strong className="text-slate-800">{order.courier_name || "Steadfast Courier"}</strong></p>
                <p>Tracking / Consignment ID: <strong className="text-[#F97316] font-mono">{order.courier_tracking_id || "BD-884920"}</strong></p>
                <p>Estimated Arrival: <strong>{order.shipping_division === "Dhaka" ? "Within 24-48 Hours" : "2-3 Days"}</strong></p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-[#172554] mb-2">
                  <MapPin className="w-4 h-4 text-[#F97316]" />
                  <span>Delivery Destination</span>
                </div>
                <p className="font-semibold text-slate-800">{order.customer_name} ({order.customer_phone})</p>
                <p>{order.shipping_address}</p>
                <p>{order.shipping_district}, {order.shipping_division}</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Ordered Items ({order.items.length})
              </h4>
              <div className="divide-y divide-slate-100 text-xs">
                {order.items.map((it) => (
                  <div key={it.id} className="py-2.5 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-800">{it.product_name}</p>
                      <p className="text-slate-400">Qty: {it.quantity} × {formatBDT(it.unit_price)}</p>
                    </div>
                    <span className="font-bold text-slate-800">{formatBDT(it.total_price)}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-slate-200 font-bold text-sm text-[#172554]">
                <span>Total Paid / Payable</span>
                <span className="text-[#F97316] text-base">{formatBDT(order.total_amount)}</span>
              </div>
            </div>

            {/* Helpline Notice */}
            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-between text-xs text-blue-900">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#F97316]" />
                <span>Need immediate support regarding this shipment?</span>
              </div>
              <a
                href="tel:+8801700000000"
                className="font-bold text-[#172554] hover:underline"
              >
                +880 1700-000000
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading order tracker...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
