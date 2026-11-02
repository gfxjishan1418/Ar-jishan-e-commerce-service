"use client";

import React, { useState } from "react";
import { Tag, Plus, Check, X } from "lucide-react";
import { INITIAL_COUPONS } from "@/data/mockData";
import { Coupon } from "@/types";
import { formatBDT } from "@/lib/utils";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [code, setCode] = useState("");
  const [type, setType] = useState<"percentage" | "fixed_amount">("percentage");
  const [value, setValue] = useState(10);
  const [minPurchase, setMinPurchase] = useState(1000);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;

    const newC: Coupon = {
      code: code.toUpperCase().trim(),
      discount_type: type,
      discount_value: value,
      min_purchase_amount: minPurchase,
      is_active: true,
    };

    setCoupons([newC, ...coupons]);
    setCode("");
  };

  const toggleCoupon = (cCode: string) => {
    setCoupons(
      coupons.map((c) => (c.code === cCode ? { ...c, is_active: !c.is_active } : c))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#172554]">Coupons & Promo Vouchers</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Create discount codes, set minimum purchase limits, and manage campaign promotions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Create Coupon Card */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-[#172554] pb-2 border-b">Create New Voucher</h2>
          <form onSubmit={handleAdd} className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Coupon Code *</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. SUMMER2026"
                required
                className="w-full h-10 px-3 uppercase rounded-xl border border-slate-300 font-mono font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Discount Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full h-10 px-3 rounded-xl border border-slate-300 bg-white"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed_amount">Fixed Amount (৳)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Discount Value *</label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                  required
                  className="w-full h-10 px-3 rounded-xl border border-slate-300 font-bold"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Minimum Order Amount (৳)</label>
              <input
                type="number"
                value={minPurchase}
                onChange={(e) => setMinPurchase(Number(e.target.value))}
                className="w-full h-10 px-3 rounded-xl border border-slate-300"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#F97316] hover:bg-orange-600 text-white font-bold rounded-xl transition-colors shadow-xs"
            >
              Add Voucher Code
            </button>
          </form>
        </div>

        {/* Coupon List Table */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 font-bold text-sm text-[#172554]">
            Active Promotional Codes ({coupons.length})
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {coupons.map((c) => (
              <div key={c.code} className="p-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-[#172554]">{c.code}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 text-[#F97316]">
                      {c.discount_type === "percentage" ? `${c.discount_value}% OFF` : `৳${c.discount_value} OFF`}
                    </span>
                  </div>
                  <p className="text-slate-400 mt-1">
                    Min purchase: {formatBDT(c.min_purchase_amount)}
                  </p>
                </div>

                <button
                  onClick={() => toggleCoupon(c.code)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
                    c.is_active
                      ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {c.is_active ? "Active" : "Disabled"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
