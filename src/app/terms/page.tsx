import React from "react";

export const metadata = {
  title: "Terms of Service | AR JISHAN",
  description: "Terms and conditions of service for AR Jishan E-commerce Service.",
};

export default function TermsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-2xl sm:text-3xl font-black text-[#172554]">
          Terms of Service
        </h1>
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>
            Welcome to AR Jishan E-commerce Service. By accessing, browsing, or making a purchase on our website, you agree to be bound by the following terms and operating conditions.
          </p>
          <h2 className="text-base font-bold text-[#172554]">Orders & Pricing</h2>
          <p>
            All prices listed on the website are in Bangladesh Taka (BDT ৳) and include applicable taxes unless specified otherwise. We reserve the right to correct any typographical or inventory errors.
          </p>
          <h2 className="text-base font-bold text-[#172554]">Product Authenticity</h2>
          <p>
            We warrant that all products sold on AR Jishan are 100% genuine and sourced through legitimate commercial channels. All electronic products include official manufacturer warranties where indicated.
          </p>
        </div>
      </div>
    </div>
  );
}
