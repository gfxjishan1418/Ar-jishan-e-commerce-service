"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Lock, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  Tag
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatBDT } from "@/lib/utils";
import { BD_DIVISIONS, BD_DISTRICTS_BY_DIVISION } from "@/data/mockData";
import { PaymentMethod } from "@/types";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, couponCode, discountAmount, clearCart } = useCart();

  // Customer & Shipping Form State
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    division: "Dhaka",
    district: "Dhaka",
    upazila: "",
    area: "",
    fullAddress: "",
    orderNotes: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Delivery calculation based on Division
  const isDhaka = formData.division === "Dhaka";
  const freeThreshold = 1000;
  const deliveryFee = subtotal >= freeThreshold || subtotal === 0 ? 0 : isDhaka ? 60 : 120;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  // Available districts based on division
  const availableDistricts = BD_DISTRICTS_BY_DIVISION[formData.division] || ["Dhaka"];

  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDiv = e.target.value;
    const districts = BD_DISTRICTS_BY_DIVISION[newDiv] || [];
    setFormData((prev) => ({
      ...prev,
      division: newDiv,
      district: districts[0] || "",
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (cart.length === 0) {
      setErrorMessage("Your cart is empty. Please add items before checkout.");
      return;
    }

    // Phone validation
    const cleanPhone = formData.phone.replace(/\D/g, "");
    const bdRegex = /^01[3-9]\d{8}$/;
    if (!bdRegex.test(cleanPhone)) {
      setErrorMessage("Please enter a valid 11-digit Bangladesh mobile number (e.g. 01712345678).");
      return;
    }

    if (!formData.fullName.trim() || !formData.fullAddress.trim()) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        customer_name: formData.fullName.trim(),
        customer_phone: cleanPhone,
        customer_email: formData.email.trim() || undefined,
        shipping_division: formData.division,
        shipping_district: formData.district,
        shipping_upazila: formData.upazila,
        shipping_area: formData.area,
        shipping_address: formData.fullAddress.trim(),
        order_notes: formData.orderNotes.trim() || undefined,
        payment_method: paymentMethod,
        coupon_code: couponCode || undefined,
        items: cart.map((item) => ({
          product_id: item.product.id,
          variant_id: item.variant?.id,
          quantity: item.quantity,
        })),
      };

      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Failed to place order. Please try again.");
        setIsSubmitting(false);
        return;
      }

      const order = data.order;
      clearCart();

      // If COD, go directly to order success page
      if (paymentMethod === "cod") {
        router.push(`/checkout/success?orderNumber=${order.order_number}`);
      } else {
        // If digital payment, redirect to secure payment gateway sandbox
        router.push(
          `/checkout/payment-sandbox?gateway=${paymentMethod}&orderNumber=${order.order_number}&amount=${order.total_amount}`
        );
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("An unexpected network error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="bg-slate-50 min-h-screen py-16 text-center">
        <div className="max-w-md mx-auto px-4 space-y-4">
          <h1 className="text-2xl font-black text-[#172554]">Your Cart is Empty</h1>
          <p className="text-sm text-slate-500">
            Please add products to your cart before proceeding to checkout.
          </p>
          <Link
            href="/shop"
            className="inline-block px-6 py-2.5 bg-[#F97316] text-white font-bold text-sm rounded-xl hover:bg-orange-600 transition-colors"
          >
            Go to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/cart"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#F97316] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Cart</span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <Lock className="w-3.5 h-3.5" />
            <span className="font-semibold">256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 8 Cols: Customer & Shipping & Payment */}
            <div className="lg:col-span-8 space-y-6">
              {/* Step 1: Customer Contact Info */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-7 h-7 rounded-full bg-[#172554] text-white flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <h2 className="text-lg font-bold text-[#172554]">
                    Customer Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Mohammad Rahim"
                      required
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Bangladesh Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 017XXXXXXXX"
                      required
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">
                      Required for courier delivery updates and verification
                    </span>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. rahim@example.com (for PDF invoice)"
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Bangladesh Delivery Address */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-7 h-7 rounded-full bg-[#172554] text-white flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <h2 className="text-lg font-bold text-[#172554]">
                    Delivery Address (Bangladesh)
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Division */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Division *
                    </label>
                    <select
                      name="division"
                      value={formData.division}
                      onChange={handleDivisionChange}
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                    >
                      {BD_DIVISIONS.map((div) => (
                        <option key={div} value={div}>
                          {div}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* District */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      District *
                    </label>
                    <select
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                    >
                      {availableDistricts.map((dist) => (
                        <option key={dist} value={dist}>
                          {dist}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Thana/Upazila */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Upazila / Thana
                    </label>
                    <input
                      type="text"
                      name="upazila"
                      value={formData.upazila}
                      onChange={handleInputChange}
                      placeholder="e.g. Gulshan, Dhanmondi, or Boalia"
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                    />
                  </div>

                  {/* Area */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Area / Neighborhood
                    </label>
                    <input
                      type="text"
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      placeholder="e.g. Sector 4, Block D, or Road 12"
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                    />
                  </div>

                  {/* Full Street Address */}
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Full Street Address *
                    </label>
                    <textarea
                      rows={2}
                      name="fullAddress"
                      value={formData.fullAddress}
                      onChange={handleInputChange}
                      placeholder="House number, building name, flat number, street name..."
                      required
                      className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                    />
                  </div>

                  {/* Delivery Notes */}
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Order Notes (Optional)
                    </label>
                    <input
                      type="text"
                      name="orderNotes"
                      value={formData.orderNotes}
                      onChange={handleInputChange}
                      placeholder="Special instructions for the delivery courier (e.g. deliver after 3 PM)"
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Options */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-7 h-7 rounded-full bg-[#172554] text-white flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <h2 className="text-lg font-bold text-[#172554]">
                    Select Payment Method
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* COD */}
                  <label
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3.5 ${
                      paymentMethod === "cod"
                        ? "border-[#F97316] bg-orange-50/50 ring-1 ring-[#F97316]"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="mt-1 text-[#F97316] focus:ring-[#F97316]"
                    />
                    <div>
                      <div className="font-bold text-sm text-[#172554]">Cash on Delivery</div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Pay cash directly to the courier upon receiving your package.
                      </p>
                      <span className="inline-block mt-2 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        Recommended for Bangladesh
                      </span>
                    </div>
                  </label>

                  {/* bKash */}
                  <label
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3.5 ${
                      paymentMethod === "bkash"
                        ? "border-[#F97316] bg-pink-50/40 ring-1 ring-[#F97316]"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bkash"
                      checked={paymentMethod === "bkash"}
                      onChange={() => setPaymentMethod("bkash")}
                      className="mt-1 text-[#F97316] focus:ring-[#F97316]"
                    />
                    <div>
                      <div className="font-bold text-sm text-[#E2136E]">bKash Payment</div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Pay seamlessly via official bKash mobile financial gateway.
                      </p>
                      <span className="inline-block mt-2 text-[10px] bg-pink-100 text-[#E2136E] font-bold px-2 py-0.5 rounded-full">
                        Instant Verification
                      </span>
                    </div>
                  </label>

                  {/* Nagad */}
                  <label
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3.5 ${
                      paymentMethod === "nagad"
                        ? "border-[#F97316] bg-orange-50/50 ring-1 ring-[#F97316]"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="nagad"
                      checked={paymentMethod === "nagad"}
                      onChange={() => setPaymentMethod("nagad")}
                      className="mt-1 text-[#F97316] focus:ring-[#F97316]"
                    />
                    <div>
                      <div className="font-bold text-sm text-[#F7941D]">Nagad Payment</div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Direct digital checkout via Bangladesh Post Office Nagad.
                      </p>
                      <span className="inline-block mt-2 text-[10px] bg-orange-100 text-orange-800 font-bold px-2 py-0.5 rounded-full">
                        Zero Extra Charge
                      </span>
                    </div>
                  </label>

                  {/* SSLCommerz (Cards) */}
                  <label
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3.5 ${
                      paymentMethod === "sslcommerz"
                        ? "border-[#F97316] bg-blue-50/50 ring-1 ring-[#F97316]"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="sslcommerz"
                      checked={paymentMethod === "sslcommerz"}
                      onChange={() => setPaymentMethod("sslcommerz")}
                      className="mt-1 text-[#F97316] focus:ring-[#F97316]"
                    />
                    <div>
                      <div className="font-bold text-sm text-[#172554]">Debit / Credit Card</div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Visa, Mastercard, Amex, Rocket, Internet Banking via SSLCommerz.
                      </p>
                      <span className="inline-block mt-2 text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                        Bank Certified
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Order Items & Summary */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-5 sticky top-28">
                <h3 className="text-base font-bold text-[#172554] pb-3 border-b border-slate-100">
                  Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)})
                </h3>

                {/* Items preview list */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-slate-100">
                  {cart.map((item) => {
                    const price =
                      (item.product.sale_price !== undefined
                        ? item.product.sale_price
                        : item.product.regular_price) + (item.variant?.price_modifier || 0);

                    return (
                      <div key={item.id} className="pt-2 first:pt-0 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 relative overflow-hidden shrink-0 border border-slate-200">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-800 truncate">
                            {item.product.name}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            Qty: {item.quantity} {item.variant ? `• ${item.variant.variant_name}` : ""}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-slate-800">
                          {formatBDT(price * item.quantity)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Price calculations */}
                <div className="space-y-2 pt-3 border-t border-slate-100 text-xs sm:text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-bold text-slate-800">{formatBDT(subtotal)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Discount ({couponCode})</span>
                      <span>-{formatBDT(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-600">
                    <span>
                      Delivery ({isDhaka ? "Inside Dhaka" : "Outside Dhaka"})
                    </span>
                    <span>
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-600 font-bold">FREE</span>
                      ) : (
                        formatBDT(deliveryFee)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-base font-black text-[#172554] pt-3 border-t border-slate-200">
                    <span>Total Payable</span>
                    <span className="text-[#F97316]">{formatBDT(grandTotal)}</span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-[#F97316] hover:bg-orange-600 text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-orange-500/25 flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Placing Your Order...</span>
                  ) : (
                    <span>
                      {paymentMethod === "cod" ? "Confirm Order (Cash on Delivery)" : "Proceed to Payment"}
                    </span>
                  )}
                </button>

                <p className="text-[11px] text-center text-slate-400">
                  By clicking confirm, you agree to AR Jishan Terms of Service and Return Policies.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
