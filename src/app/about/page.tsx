import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Target, Heart, Award, Users, Truck } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

export const metadata = {
  title: "About Us | AR JISHAN E-COMMERCE SERVICE",
  description: "Learn about AR Jishan E-commerce Service, our mission, values, and dedication to serving online shoppers across Bangladesh.",
};

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Intro */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-xs text-center space-y-4">
          <div className="inline-block p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <Logo variant="full" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#172554] tracking-tight">
            Shop Smart. Live Better.
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Founded with a vision to redefine e-commerce in Bangladesh, <strong>AR Jishan E-commerce Service</strong> brings authentic electronics, smart gadgets, premium fashion, timepieces, and lifestyle products directly to doorstep across all 64 districts.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-[#F97316] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#172554]">100% Authenticity</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              We eliminate counterfeit goods through direct brand partnerships and rigorous quality inspection before order dispatch.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#172554] flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#172554]">Fast Nationwide Logistics</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Partnered with Bangladesh’s leading courier networks (Pathao, Steadfast) to guarantee 24h delivery inside Dhaka and 48-72h door delivery across all divisions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#172554]">Customer First</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Transparent Cash on Delivery, instant bKash/Nagad options, and a hassle-free 7-day return policy centered entirely around consumer trust.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 shadow-xs space-y-4 text-slate-700 text-sm leading-relaxed">
          <h2 className="text-2xl font-black text-[#172554]">Our Commitment to Bangladesh</h2>
          <p>
            Online shopping should be effortless, honest, and reliable. AR Jishan was built to eliminate the doubts that shoppers often face—unclear delivery dates, deceptive photos, and difficult return procedures.
          </p>
          <p>
            From our headquarters in Banani, Dhaka, our dedicated merchandising, technology, and customer support teams work around the clock to provide a world-class shopping experience with Bangladeshi values.
          </p>
        </div>
      </div>
    </div>
  );
}
