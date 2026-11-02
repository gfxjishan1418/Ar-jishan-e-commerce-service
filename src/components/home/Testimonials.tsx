import React from "react";
import { Star, CheckCircle, Quote } from "lucide-react";

export function Testimonials() {
  const reviews = [
    {
      name: "Tanvir Ahmed",
      location: "Dhanmondi, Dhaka",
      product: "Wireless ANC Bluetooth Earbuds",
      rating: 5,
      comment: "Super fast delivery inside Dhaka! Received within 24 hours. The sound quality and noise cancellation are top notch. AR Jishan is now my go-to gadget store.",
      date: "Verified Customer • Oct 2026",
    },
    {
      name: "Farhana Yasmin",
      location: "Nasirabad, Chattogram",
      product: "Smart Watch Ultra Pro AMOLED",
      rating: 5,
      comment: "Original product with genuine warranty card. Paid via bKash and tracking updates via SMS were spot on. Excellent packaging and customer care.",
      date: "Verified Customer • Oct 2026",
    },
    {
      name: "Kamrul Hassan",
      location: "Zindabazar, Sylhet",
      product: "Urban Explorer Travel Backpack",
      rating: 5,
      comment: "High quality material, very spacious for my laptop and gym gear. Steadfast courier delivered right to my doorstep with Cash on Delivery option.",
      date: "Verified Customer • Oct 2026",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F97316] bg-orange-100/70 px-3 py-1 rounded-full">
            Real Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#172554] tracking-tight mt-2">
            Loved by Shoppers Across Bangladesh
          </h2>
          <p className="text-xs text-slate-400 mt-2">
            [Development Notice: Sample customer feedback shown during store staging]
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between hover:border-orange-200 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-300" />
                </div>
                <p className="text-sm text-slate-700 italic leading-relaxed">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#172554] flex items-center gap-1.5">
                    <span>{rev.name}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                  </h4>
                  <p className="text-xs text-slate-500">{rev.location}</p>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
