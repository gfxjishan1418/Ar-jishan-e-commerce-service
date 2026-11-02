import React from "react";

export const metadata = {
  title: "Privacy Policy | AR JISHAN",
  description: "Privacy policy and data protection practices for AR Jishan E-commerce Service.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-2xl sm:text-3xl font-black text-[#172554]">
          Privacy Policy
        </h1>
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>
            At AR Jishan E-commerce Service, safeguarding your personal data and privacy is one of our highest operational priorities. This Privacy Policy details how we collect, store, and utilize your personal information.
          </p>
          <h2 className="text-base font-bold text-[#172554]">Information We Collect</h2>
          <p>
            When you register, place an order, or contact us, we collect necessary shipping data including your name, Bangladesh phone number, delivery address, and email. Payment credentials (such as bKash PINs or credit card numbers) are encrypted and handled exclusively by regulated payment gateways and are never stored on our servers.
          </p>
          <h2 className="text-base font-bold text-[#172554]">Data Security</h2>
          <p>
            All communications between your browser and our platform utilize 256-bit SSL encryption. We never sell, lease, or distribute your private contact records to third-party marketing entities.
          </p>
        </div>
      </div>
    </div>
  );
}
