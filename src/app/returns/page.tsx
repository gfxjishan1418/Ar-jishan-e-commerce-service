import React from "react";
import Link from "next/link";
import { RotateCcw, ShieldCheck, CheckCircle } from "lucide-react";

export const metadata = {
  title: "Return & Refund Policy | AR JISHAN",
  description: "7-day easy return policy and refund guidelines for AR Jishan E-commerce Service.",
};

export default function ReturnsPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#F97316] bg-orange-100/70 px-3 py-1 rounded-full">
            Customer Guarantee
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#172554] mt-2">
            Return & Refund Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Shop with total peace of mind with our 7-day hassle-free return and refund guarantee.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center gap-3 text-emerald-900">
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
            <p className="font-semibold">
              Eligible items can be returned within 7 calendar days of receipt for a replacement or full refund to your original payment method.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-base font-bold text-[#172554]">Eligibility Criteria</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Item is defective, physically damaged upon delivery, or not functioning as described.</li>
              <li>Incorrect product, size, or color received.</li>
              <li>The item must be in its original packaging with all warranty cards, cables, tags, and accessories intact.</li>
            </ul>

            <h2 className="text-base font-bold text-[#172554]">How to Initiate a Return</h2>
            <p>
              To file a return request, please contact our support helpline at <strong>+880 1700-000000</strong> or email <strong>support@arjishan.com</strong> with your Order ID and photo evidence. Our courier partner will schedule a complimentary pickup from your address.
            </p>

            <h2 className="text-base font-bold text-[#172554]">Refund Timelines</h2>
            <p>
              Upon receiving and inspecting the returned merchandise, refunds are processed within:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>bKash / Nagad:</strong> 24 to 48 business hours.</li>
              <li><strong>Debit / Credit Cards:</strong> 5 to 7 working banking days.</li>
              <li><strong>Cash on Delivery:</strong> Sent directly to your designated bKash or bank account.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
