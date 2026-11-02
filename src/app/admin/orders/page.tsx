"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Filter, Truck, CheckCircle2, Clock, MapPin, Eye } from "lucide-react";
import { Order, OrderStatus, PaymentStatus } from "@/types";
import { formatBDT, formatDate } from "@/lib/utils";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const loadOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (data.orders) setOrders(data.orders);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          orderStatus: newStatus,
          paymentStatus: newStatus === "delivered" ? "paid" : undefined,
        }),
      });
      const data = await res.json();
      if (data.success && data.order) {
        setOrders(orders.map((o) => (o.id === orderId ? data.order : o)));
        if (selectedOrder?.id === orderId) {
          setSelectedOrder(data.order);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filtered = orders.filter((o) => {
    const matchStatus = filterStatus === "all" || o.order_status === filterStatus;
    const matchSearch =
      o.order_number.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_phone.includes(search);
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#172554]">Orders Management</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Process customer orders, update delivery statuses, and assign courier consignments
        </p>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row justify-between gap-4">
        {/* Status filter buttons */}
        <div className="flex flex-wrap gap-1 text-xs">
          {["all", "pending", "confirmed", "processing", "shipped", "delivered"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-colors ${
                filterStatus === st
                  ? "bg-[#172554] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Order ID, name, phone..."
            className="w-full pl-9 pr-3 h-9 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#F97316]"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Order ID & Date</th>
                <th className="py-3 px-4">Customer Details</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Current Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filtered.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50/60">
                  <td className="py-3 px-4">
                    <span className="font-bold text-[#172554] block">{ord.order_number}</span>
                    <span className="text-[10px] text-slate-400">{formatDate(ord.created_at)}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-800 block">{ord.customer_name}</span>
                    <span className="text-[11px] text-slate-500 font-mono">{ord.customer_phone}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span>{ord.shipping_district}, {ord.shipping_division}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="space-y-0.5">
                      <span className="uppercase text-[10px] font-bold block">{ord.payment_method}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                        ord.payment_status === "paid" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                      }`}>
                        {ord.payment_status}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-bold text-[#F97316]">
                    {formatBDT(ord.total_amount)}
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={ord.order_status}
                      onChange={(e) => handleUpdateStatus(ord.id, e.target.value as OrderStatus)}
                      className="text-[11px] font-bold p-1 rounded-lg border border-slate-300 bg-white"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(ord)}
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-bold transition-colors"
                      title="Inspect Order Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-base text-[#172554]">
                  Order {selectedOrder.order_number}
                </h3>
                <p className="text-xs text-slate-400">Placed on {formatDate(selectedOrder.created_at)}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-700 block">Customer Information</span>
                <p><strong>Name:</strong> {selectedOrder.customer_name}</p>
                <p><strong>Phone:</strong> {selectedOrder.customer_phone}</p>
                {selectedOrder.customer_email && <p><strong>Email:</strong> {selectedOrder.customer_email}</p>}
                <p><strong>Address:</strong> {selectedOrder.shipping_address}, {selectedOrder.shipping_upazila}, {selectedOrder.shipping_district}, {selectedOrder.shipping_division}</p>
                {selectedOrder.order_notes && <p className="text-slate-500 italic">Notes: &ldquo;{selectedOrder.order_notes}&rdquo;</p>}
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-700 block">Courier Tracking</span>
                <p>Courier: <strong>{selectedOrder.courier_name || "Steadfast Courier"}</strong></p>
                <p>Consignment ID: <strong className="font-mono text-[#F97316]">{selectedOrder.courier_tracking_id || "BD-884920"}</strong></p>
              </div>

              <div>
                <span className="font-bold text-slate-700 block mb-2">Order Items</span>
                <div className="divide-y divide-slate-100 border rounded-xl overflow-hidden">
                  {selectedOrder.items.map((it) => (
                    <div key={it.id} className="p-2.5 flex justify-between bg-white">
                      <div>
                        <p className="font-bold text-slate-800">{it.product_name}</p>
                        <p className="text-slate-400">Qty: {it.quantity} × {formatBDT(it.unit_price)}</p>
                      </div>
                      <span className="font-bold text-slate-800">{formatBDT(it.total_price)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t flex justify-between text-sm font-black text-[#172554]">
                <span>Total Amount:</span>
                <span className="text-[#F97316]">{formatBDT(selectedOrder.total_amount)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
