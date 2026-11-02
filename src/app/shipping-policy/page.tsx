import React from "react";
import Link from "next/link";
import { Truck, MapPin, CheckCircle, Clock } from "lucide-react";

export const metadata = {
  title: "Delivery & Shipping Rates | AR JISHAN",
  description: "Bangladesh nationwide shipping rates, estimated arrival times, and courier policy for AR Jishan E-commerce Service.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#F97316] bg-orange-100/70 px-3 py-1 rounded-full">
            Logistics Information
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#172554] mt-2">
            Shipping & Delivery Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Fast, secure, and trackable door delivery across all 64 districts of Bangladesh.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-orange-50 border border-orange-100 space-y-2">
              <div className="flex items-center gap-2 text-[#172554] font-bold text-base">
                <Truck className="w-5 h-5 text-[#F97316]" />
                <span>Inside Dhaka Delivery</span>
              </div>
              <p className="text-2xl font-black text-[#F97316]">৳ 60</p>
              <p className="text-slate-600">Estimated delivery: <strong>Within 24 to 48 Hours</strong></p>
              <p className="text-[11px] text-emerald-700 font-bold">FREE for orders above ৳1,000</p>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100 space-y-2">
              <div className="flex items-center gap-2 text-[#172554] font-bold text-base">
                <MapPin className="w-5 h-5 text-[#172554]" />
                <span>Outside Dhaka (All BD)</span>
              </div>
              <p className="text-2xl font-black text-[#172554]">৳ 120</p>
              <p className="text-slate-600">Estimated delivery: <strong>48 to 72 Hours</strong></p>
              <p className="text-[11px] text-emerald-700 font-bold">FREE for orders above ৳1,000</p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h2 className="text-base font-bold text-[#172554]">Courier Partners</h2>
            <p>
              We dispatch all orders via certified tier-1 logistics partners including <strong>Pathao Courier</strong>, <strong>Steadfast Courier</strong>, and <strong>RedX</strong>. Every parcel receives an authentic consignment tracking ID that you can monitor live on our <Link href="/track-order" className="text-[#F97316] underline font-bold">Order Tracking</Link> tool.
            </p>

            <h2 className="text-base font-bold text-[#172554]">Delivery Inspection & Cash on Delivery</h2>
            <p>
              When your parcel arrives, you may check the exterior packaging in front of the courier delivery executive before completing your Cash on Delivery payment. If the parcel appears damaged or tampered with, please reject the package and notify our hotline at <strong>+880 1700-000000</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
