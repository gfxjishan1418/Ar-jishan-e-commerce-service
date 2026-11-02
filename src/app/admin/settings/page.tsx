"use client";

import React, { useState } from "react";
import { STORE_SETTINGS } from "@/data/mockData";
import { StoreSettings } from "@/types";
import { Save, CheckCircle } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<StoreSettings>(STORE_SETTINGS);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#172554]">Website & Logistics Settings</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure Bangladesh shipping charges, support contacts, and store policies
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs max-w-2xl">
        {saved && (
          <div className="mb-4 p-3 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>Settings saved successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Store Brand Name</label>
            <input
              type="text"
              value={settings.store_name}
              onChange={(e) => setSettings({ ...settings, store_name: e.target.value })}
              className="w-full h-10 px-3 rounded-xl border border-slate-300"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Inside Dhaka Shipping (৳)</label>
              <input
                type="number"
                value={settings.dhaka_shipping_fee}
                onChange={(e) => setSettings({ ...settings, dhaka_shipping_fee: Number(e.target.value) })}
                className="w-full h-10 px-3 rounded-xl border border-slate-300 font-bold"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Outside Dhaka Shipping (৳)</label>
              <input
                type="number"
                value={settings.outside_dhaka_shipping_fee}
                onChange={(e) => setSettings({ ...settings, outside_dhaka_shipping_fee: Number(e.target.value) })}
                className="w-full h-10 px-3 rounded-xl border border-slate-300 font-bold"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Free Shipping Threshold (৳)</label>
            <input
              type="number"
              value={settings.free_shipping_threshold}
              onChange={(e) => setSettings({ ...settings, free_shipping_threshold: Number(e.target.value) })}
              className="w-full h-10 px-3 rounded-xl border border-slate-300 font-bold"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Orders equal to or above this subtotal qualify for automatic free delivery nationwide.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Helpline Phone</label>
              <input
                type="text"
                value={settings.support_phone}
                onChange={(e) => setSettings({ ...settings, support_phone: e.target.value })}
                className="w-full h-10 px-3 rounded-xl border border-slate-300"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Support Email</label>
              <input
                type="email"
                value={settings.support_email}
                onChange={(e) => setSettings({ ...settings, support_email: e.target.value })}
                className="w-full h-10 px-3 rounded-xl border border-slate-300"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Dhaka Office Address</label>
            <textarea
              rows={2}
              value={settings.office_address}
              onChange={(e) => setSettings({ ...settings, office_address: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-300"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#F97316] hover:bg-orange-600 text-white font-bold rounded-xl transition-colors shadow-xs flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Configuration</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
