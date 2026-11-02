"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  User, 
  Package, 
  MapPin, 
  Heart, 
  ShieldCheck, 
  LogOut, 
  Clock, 
  ChevronRight, 
  Edit3 
} from "lucide-react";
import { formatBDT, formatDate } from "@/lib/utils";
import { useWishlist } from "@/context/WishlistContext";

export default function AccountPage() {
  const { wishlist, totalWishlistItems } = useWishlist();
  const [activeTab, setActiveTab] = useState<"orders" | "profile" | "addresses" | "wishlist">("orders");

  // Sample customer state
  const [customer, setCustomer] = useState({
    name: "Mohammad Rahim",
    phone: "01711223344",
    email: "rahim@example.com",
    division: "Dhaka",
    district: "Dhaka",
    address: "House 12, Road 35, Gulshan-2, Dhaka-1212",
  });

  const [orders] = useState([
    {
      id: "ord-1",
      order_number: "ARJ-2026-89412",
      date: "2026-10-30T10:00:00Z",
      status: "processing",
      payment_status: "paid",
      total: 5190,
      itemCount: 2,
    },
    {
      id: "ord-2",
      order_number: "ARJ-2026-67123",
      date: "2026-10-15T14:30:00Z",
      status: "delivered",
      payment_status: "paid",
      total: 1970,
      itemCount: 1,
    },
  ]);

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar Menu */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-6">
              {/* User Avatar Card */}
              <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                <div className="w-14 h-14 rounded-full bg-[#172554] text-white flex items-center justify-center font-bold text-xl shadow-xs">
                  {customer.name.charAt(0)}
                </div>
                <div>
                  <h2 className="font-bold text-base text-[#172554]">{customer.name}</h2>
                  <p className="text-xs text-slate-500">{customer.phone}</p>
                  <span className="inline-block mt-1 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    Verified Customer
                  </span>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1 text-sm font-semibold">
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${
                    activeTab === "orders"
                      ? "bg-orange-50 text-[#F97316]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Package className="w-4 h-4" />
                    <span>My Orders</span>
                  </div>
                  <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full text-slate-600">
                    {orders.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("wishlist")}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${
                    activeTab === "wishlist"
                      ? "bg-orange-50 text-[#F97316]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Heart className="w-4 h-4" />
                    <span>My Wishlist</span>
                  </div>
                  <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full text-slate-600">
                    {totalWishlistItems}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center gap-2.5 p-3 rounded-xl transition-colors ${
                    activeTab === "profile"
                      ? "bg-orange-50 text-[#F97316]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Profile Information</span>
                </button>

                <button
                  onClick={() => setActiveTab("addresses")}
                  className={`w-full flex items-center gap-2.5 p-3 rounded-xl transition-colors ${
                    activeTab === "addresses"
                      ? "bg-orange-50 text-[#F97316]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>Saved Addresses</span>
                </button>
              </div>

              {/* Logout button */}
              <div className="pt-4 border-t border-slate-100">
                <Link
                  href="/"
                  className="flex items-center gap-2 p-2 text-xs font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </Link>
              </div>
            </div>
          </aside>

          {/* Right Main Content Stage */}
          <main className="lg:col-span-8">
            {activeTab === "orders" && (
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
                <h2 className="text-xl font-bold text-[#172554] pb-4 border-b border-slate-100">
                  Order History & Invoices
                </h2>

                <div className="space-y-4">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-orange-200 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-sm text-[#172554]">{ord.order_number}</span>
                          <span className="text-xs px-2.5 py-0.5 rounded-full font-bold uppercase bg-orange-100 text-[#F97316]">
                            {ord.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">
                          {formatDate(ord.date)} • {ord.itemCount} items
                        </p>
                        <p className="text-sm font-bold text-[#172554]">
                          {formatBDT(ord.total)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/track-order?orderNumber=${ord.order_number}`}
                          className="px-4 py-2 bg-white border border-slate-200 text-xs font-bold text-[#172554] hover:bg-slate-100 rounded-xl transition-colors shadow-2xs"
                        >
                          Track Shipment
                        </Link>
                        <Link
                          href={`/checkout/success?orderNumber=${ord.order_number}`}
                          className="px-4 py-2 bg-[#F97316] text-white text-xs font-bold hover:bg-orange-600 rounded-xl transition-colors shadow-2xs"
                        >
                          Invoice Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
                <h2 className="text-xl font-bold text-[#172554] pb-4 border-b border-slate-100">
                  Profile Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-600 block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={customer.name}
                      onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 text-slate-800 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-600 block mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={customer.phone}
                      disabled
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-bold text-slate-600 block mb-1">Email Address</label>
                    <input
                      type="email"
                      value={customer.email}
                      onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 text-slate-800"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button className="px-5 py-2.5 bg-[#F97316] text-white text-xs font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-xs">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
                <h2 className="text-xl font-bold text-[#172554] pb-4 border-b border-slate-100">
                  Saved Delivery Addresses
                </h2>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#172554]">Home (Default)</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      Primary
                    </span>
                  </div>
                  <p className="text-slate-700 font-semibold">{customer.name} • {customer.phone}</p>
                  <p className="text-slate-600">{customer.address}</p>
                  <p className="text-slate-500">{customer.district}, {customer.division}, Bangladesh</p>
                </div>
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
                <h2 className="text-xl font-bold text-[#172554] pb-4 border-b border-slate-100">
                  My Wishlist ({totalWishlistItems})
                </h2>

                {wishlist.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-xs">
                    Your wishlist is empty. Browse products and tap the heart icon to save items.
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {wishlist.map((it) => (
                      <div key={it.id} className="py-3 flex justify-between items-center text-xs">
                        <div>
                          <p className="font-bold text-slate-800">{it.product.name}</p>
                          <p className="text-[#F97316] font-bold">
                            {formatBDT(it.product.sale_price || it.product.regular_price)}
                          </p>
                        </div>
                        <Link
                          href={`/products/${it.product.slug}`}
                          className="px-3 py-1.5 bg-[#F97316] text-white rounded-lg font-bold"
                        >
                          View Product
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
