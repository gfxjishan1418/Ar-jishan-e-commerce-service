import { NextResponse } from "next/server";
import { dataService } from "@/lib/dataService";
import { OrderItem, PaymentMethod } from "@/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customer_name,
      customer_phone,
      customer_email,
      shipping_division,
      shipping_district,
      shipping_upazila,
      shipping_area,
      shipping_address,
      order_notes,
      payment_method,
      items,
      coupon_code,
    } = body;

    // 1. Validate customer details
    if (!customer_name || !customer_phone || !shipping_division || !shipping_district || !shipping_address) {
      return NextResponse.json(
        { error: "Please fill in all required customer and address fields." },
        { status: 400 }
      );
    }

    // Bangladesh mobile number validation (11 digits starting with 013-019)
    const bdPhoneRegex = /^01[3-9]\d{8}$/;
    const cleanPhone = customer_phone.replace(/\D/g, "");
    if (!bdPhoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { error: "Please provide a valid 11-digit Bangladesh mobile number (e.g., 01712345678)." },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
    }

    // 2. Server-Side Price & Stock Recalculation
    let serverSubtotal = 0;
    const verifiedItems: OrderItem[] = [];

    for (const clientItem of items) {
      const realProduct = await dataService.getProductById(clientItem.product_id);
      if (!realProduct) {
        return NextResponse.json(
          { error: `Product ID "${clientItem.product_id}" was not found.` },
          { status: 404 }
        );
      }

      // Check stock
      if (realProduct.stock_quantity < clientItem.quantity) {
        return NextResponse.json(
          { error: `Sorry, "${realProduct.name}" only has ${realProduct.stock_quantity} units left in stock.` },
          { status: 400 }
        );
      }

      let unitPrice = realProduct.sale_price !== undefined ? realProduct.sale_price : realProduct.regular_price;
      
      // If variant was chosen, check variant modifier
      if (clientItem.variant_id && realProduct.variants) {
        const variant = realProduct.variants.find((v) => v.id === clientItem.variant_id);
        if (variant) {
          unitPrice += variant.price_modifier || 0;
        }
      }

      const itemTotal = unitPrice * clientItem.quantity;
      serverSubtotal += itemTotal;

      verifiedItems.push({
        id: `oi-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        order_id: "",
        product_id: realProduct.id,
        variant_id: clientItem.variant_id,
        product_name: realProduct.name,
        sku: realProduct.sku,
        image_url: realProduct.images[0] || "",
        unit_price: unitPrice,
        quantity: clientItem.quantity,
        total_price: itemTotal,
      });
    }

    // 3. Shipping Fee calculation
    const isDhaka = shipping_division.toLowerCase() === "dhaka";
    let shippingFee = isDhaka ? 60 : 120;
    if (serverSubtotal >= 1000) {
      shippingFee = 0; // Free delivery
    }

    // 4. Coupon Discount calculation on server
    let discountAmount = 0;
    if (coupon_code) {
      const couponCheck = await dataService.validateCoupon(coupon_code, serverSubtotal);
      if (couponCheck.valid) {
        discountAmount = couponCheck.discount;
      }
    }

    const finalTotal = Math.max(0, serverSubtotal - discountAmount + shippingFee);

    // 5. Determine initial order status
    const isCod = payment_method === "cod";
    const paymentStatus = isCod ? "unpaid" : "unpaid";
    const orderStatus = isCod ? "confirmed" : "pending";

    // 6. Create Order
    const newOrder = await dataService.createOrder({
      customer_name,
      customer_phone: cleanPhone,
      customer_email,
      shipping_division,
      shipping_district,
      shipping_upazila: shipping_upazila || "",
      shipping_area: shipping_area || "",
      shipping_address,
      order_notes,
      payment_method: payment_method as PaymentMethod,
      payment_status: paymentStatus,
      order_status: orderStatus,
      subtotal: serverSubtotal,
      discount_amount: discountAmount,
      shipping_fee: shippingFee,
      total_amount: finalTotal,
      coupon_code: coupon_code || undefined,
      courier_name: isDhaka ? "Pathao Courier" : "Steadfast Courier",
      courier_tracking_id: `BD-${Math.floor(100000 + Math.random() * 900000)}`,
      items: verifiedItems,
    });

    return NextResponse.json({
      success: true,
      order: newOrder,
      message: "Order placed successfully!",
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Failed to place order. Please try again." },
      { status: 500 }
    );
  }
}
