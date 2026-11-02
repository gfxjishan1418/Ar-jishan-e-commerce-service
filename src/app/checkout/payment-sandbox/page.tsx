"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ShieldCheck, CheckCircle2, XCircle, ArrowLeft, Lock } from "lucide-react";
import { formatBDT } from "@/lib/utils";

function PaymentSandboxContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const gateway = searchParams.get("gateway") || "bkash";
  const orderNumber = searchParams.get("orderNumber") || "ARJ-2026-00000";
  const amount = Number(searchParams.get("amount") || "0");

  const [pin, setPin] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const gatewayInfo = {
    bkash: {
      name: "bKash Payment Gateway Sandbox",
      color: "bg-[#E2136E]",
      btnColor: "bg-[#E2136E] hover:bg-[#c2105e]",
      textColor: "text-[#E2136E]",
      logoText: "bKash",
      label: "Enter 5-Digit bKash PIN to Confirm",
    },
    nagad: {
      name: "Nagad Payment Gateway Sandbox",
      color: "bg-[#F7941D]",
      btnColor: "bg-[#F7941D] hover:bg-[#db8014]",
      textColor: "text-[#F7941D]",
      logoText: "Nagad",
      label: "Enter 4-Digit Nagad PIN to Confirm",
    },
    sslcommerz: {
      name: "SSLCommerz Secure Payment Gateway",
      color: "bg-[#172554]",
      btnColor: "bg-[#172554] hover:bg-blue-900",
      textColor: "text-[#172554]",
      logoText: "SSLCommerz",
      label: "Simulate Card Authorization & 3D Secure OTP",
    },
  }[gateway] || {
    name: "Payment Gateway Sandbox",
    color: "bg-[#172554]",
    btnColor: "bg-[#172554]",
    textColor: "text-[#172554]",
    logoText: "Gateway",
    label: "Enter PIN / OTP",
  };

  const handlePaySuccess = async () => {
    setIsProcessing(true);
    setError("");

    try {
      const res = await fetch("/api/payments/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderNumber,
          gateway,
          status: "success",
          transactionId: `${gateway.toUpperCase()}-${Math.floor(10000000 + Math.random() * 90000000)}`,
        }),
      });

      const data = await res.json();
      if (data.success) {
        router.push(`/checkout/success?orderNumber=${orderNumber}&paid=true`);
      } else {
        setError(data.message || "Failed to complete transaction.");
        setIsProcessing(false);
      }
    } catch {
      router.push(`/checkout/success?orderNumber=${orderNumber}&paid=true`);
    }
  };

  const handlePayFail = async () => {
    setError("Transaction cancelled or failed by user in Sandbox.");
  };

  return (
    <div className="bg-slate-100 min-h-screen py-10 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Sandbox Indicator Banner */}
        <div className="bg-amber-500 text-slate-900 text-[11px] font-black text-center py-1.5 px-3 uppercase tracking-wider">
          🛠 Test Environment — Sandbox Simulator Mode
        </div>

        {/* Gateway Header */}
        <div className={`${gatewayInfo.color} p-6 text-white text-center space-y-1`}>
          <div className="text-2xl font-black tracking-tight">{gatewayInfo.logoText}</div>
          <div className="text-xs text-white/80">{gatewayInfo.name}</div>
        </div>

        {/* Payment Summary */}
        <div className="p-6 space-y-6">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Merchant:</span>
              <span className="font-bold text-slate-800">AR JISHAN E-COMMERCE SERVICE</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Invoice / Order:</span>
              <span className="font-bold text-slate-800">{orderNumber}</span>
            </div>
            <div className="flex justify-between text-slate-500 pt-2 border-t border-slate-200">
              <span className="font-bold text-sm text-slate-700">Amount Due:</span>
              <span className="font-black text-base text-[#F97316]">
                {formatBDT(amount)}
              </span>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* PIN Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block text-center">
              {gatewayInfo.label}
            </label>
            <input
              type="password"
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="••••"
              className="w-full text-center text-lg tracking-widest h-12 rounded-xl border border-slate-300 bg-white font-mono focus:outline-none focus:ring-2 focus:ring-[#F97316]"
            />
            <p className="text-[11px] text-center text-slate-400">
              Sandbox test: Any 4-6 digit PIN (e.g. 1234) will pass verification.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5">
            <button
              onClick={handlePaySuccess}
              disabled={isProcessing}
              className={`w-full py-3.5 px-4 ${gatewayInfo.btnColor} text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-60`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isProcessing ? "Verifying Transaction..." : "Confirm & Pay Now"}</span>
            </button>

            <button
              onClick={handlePayFail}
              disabled={isProcessing}
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs rounded-xl transition-colors"
            >
              Simulate Cancel / Fail
            </button>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-2 border-t border-slate-100">
            <Lock className="w-3.5 h-3.5" />
            <span>End-to-End Encrypted Payment Session</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSandboxPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading payment sandbox...</div>}>
      <PaymentSandboxContent />
    </Suspense>
  );
}
