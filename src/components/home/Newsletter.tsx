"use client";

import React, { useState } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <section className="py-12 bg-gradient-to-r from-[#172554] via-[#1e3a8a] to-[#172554] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto text-[#F97316]">
          <Mail className="w-6 h-6" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
          Subscribe & Get <span className="text-[#F97316]">৳100 OFF</span> Your First Order
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Be the first to hear about flash sales, exclusive discounts, new product arrivals, and special seasonal vouchers.
        </p>

        {isSubmitted ? (
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-sm font-semibold animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Thank you for subscribing! Use coupon code <strong>WELCOME50</strong> at checkout for ৳100 discount.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto pt-2"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              required
              className="w-full sm:flex-1 h-12 px-4 rounded-xl text-slate-900 bg-white border border-transparent focus:outline-none focus:ring-2 focus:ring-[#F97316] text-sm placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto h-12 px-6 bg-[#F97316] hover:bg-orange-600 font-bold text-sm text-white rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>{loading ? "Joining..." : "Subscribe"}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="text-[11px] text-slate-400 pt-1">
          We respect your privacy. Unsubscribe at any time.
        </div>
      </div>
    </section>
  );
}
