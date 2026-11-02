import React from "react";
import { ShieldCheck, Truck, RotateCcw, Headphones, CreditCard, Award } from "lucide-react";

export function WhyChooseUs() {
  const perks = [
    {
      icon: ShieldCheck,
      title: "100% Genuine Guaranteed",
      description: "Direct manufacturer & authorized sourcing. No replicas or counterfeit goods.",
    },
    {
      icon: CreditCard,
      title: "Cash on Delivery & MFS",
      description: "Pay conveniently at your door or instantly through verified bKash, Nagad & Cards.",
    },
    {
      icon: Truck,
      title: "Reliable Nationwide Delivery",
      description: "Same-day dispatch in Dhaka and 48-72h door delivery across all 64 districts.",
    },
    {
      icon: RotateCcw,
      title: "7 Days Hassle-Free Returns",
      description: "Simple, transparent return policy if your product doesn't meet expectations.",
    },
    {
      icon: Headphones,
      title: "Dedicated BD Customer Support",
      description: "Friendly Bangla and English support team ready to assist via phone and chat.",
    },
    {
      icon: Award,
      title: "Warranty Protection",
      description: "Official brand warranty coverage on all electronic and smart device purchases.",
    },
  ];

  return (
    <section className="py-12 bg-slate-50/80 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F97316] bg-orange-100/70 px-3 py-1 rounded-full">
            Our Promise
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#172554] tracking-tight mt-2">
            Why Shop with AR JISHAN?
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Building Bangladesh’s most reliable e-commerce experience with transparent pricing and trustworthy service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {perks.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200/70 shadow-xs hover:border-orange-200 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#F97316] flex items-center justify-center mb-4 group-hover:bg-[#F97316] group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#172554] mb-1.5">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
