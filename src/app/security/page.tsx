import React from "react";
import { ShieldCheck, Lock, Key, Server, CreditCard } from "lucide-react";

export const metadata = {
  title: "Security Statement | AR JISHAN",
  description: "Enterprise security architecture and data protection measures at AR Jishan E-commerce Service.",
};

export default function SecurityPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#F97316] bg-orange-100/70 px-3 py-1 rounded-full">
            Security Architecture
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#172554] mt-2">
            Security & Trust Commitment
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            How we protect customer transactions, credentials, and data privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
            <Lock className="w-6 h-6 text-[#F97316]" />
            <h3 className="font-bold text-sm text-[#172554]">256-Bit SSL Encryption</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every request between customer browsers and our servers is secured with TLS 1.3 encryption.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
            <CreditCard className="w-6 h-6 text-emerald-600" />
            <h3 className="font-bold text-sm text-[#172554]">Zero Stored Card Data</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We never store sensitive credit card numbers or bKash PINs. All payments are processed through certified PCI-DSS compliant gateways.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
            <Key className="w-6 h-6 text-blue-600" />
            <h3 className="font-bold text-sm text-[#172554]">Role-Based Access Control</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Administrative functions are guarded by server-enforced role-based access control and Supabase Row Level Security (RLS).
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
            <Server className="w-6 h-6 text-purple-600" />
            <h3 className="font-bold text-sm text-[#172554]">Audit Logs & Verification</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Orders and payments undergo server-side validation to prevent tampering, fraudulent pricing, and duplicate charges.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
