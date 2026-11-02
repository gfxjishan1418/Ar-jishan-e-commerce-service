import { NextResponse } from "next/server";
import { dataService } from "@/lib/dataService";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderNumber = searchParams.get("orderNumber");
    const phone = searchParams.get("phone");

    if (!orderNumber) {
      return NextResponse.json({ success: false, message: "Order ID is required." }, { status: 400 });
    }

    const order = await dataService.getOrder(orderNumber.trim());

    if (!order) {
      return NextResponse.json(
        { success: false, message: "No order found with this Order ID." },
        { status: 404 }
      );
    }

    // If phone is provided, match phone suffix
    if (phone && phone.trim()) {
      const cleanPhone = phone.replace(/\D/g, "");
      if (cleanPhone && !order.customer_phone.includes(cleanPhone)) {
        return NextResponse.json(
          { success: false, message: "Phone number does not match order record." },
          { status: 403 }
        );
      }
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to track order." },
      { status: 500 }
    );
  }
}
