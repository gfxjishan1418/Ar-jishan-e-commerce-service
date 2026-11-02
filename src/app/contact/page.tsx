"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F97316] bg-orange-100/70 px-3 py-1 rounded-full">
            We Are Here For You
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#172554]">
            Contact Customer Support
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Have questions about an order, warranty, delivery, or product? Get in touch with our Dhaka support center.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 bg-[#172554] text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
            <div>
              <h2 className="text-lg font-bold">Contact Information</h2>
              <p className="text-xs text-slate-300 mt-1">
                Reach out directly via phone or email for immediate assistance.
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-200">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Dhaka Headquarters</strong>
                  <span>House 42, Road 11, Banani, Dhaka-1213, Bangladesh</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Helpline (Toll-Free in BD)</strong>
                  <span>+880 1700-000000 (24/7 Hotline)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Support Email</strong>
                  <span>support@arjishan.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Customer Support Hours</strong>
                  <span>Saturday – Thursday: 9:00 AM – 10:00 PM<br />Friday: 2:00 PM – 10:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
            {submitted ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-[#172554]">Message Sent Successfully!</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Thank you for contacting AR Jishan. A support specialist will call or email you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <h2 className="text-base font-bold text-[#172554] pb-2 border-b border-slate-100">
                  Send us a Message
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Asif Mahmud"
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 017XXXXXXXX"
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Question about order ARJ-2026-XXXXX"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe how we can assist you..."
                    className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#F97316] hover:bg-orange-600 text-white font-bold rounded-xl transition-colors shadow-xs flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
