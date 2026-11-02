import { NextResponse } from "next/server";
import { dataService } from "@/lib/dataService";

export async function GET() {
  try {
    const orders = await dataService.getOrders();
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to load orders" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { orderId, orderStatus, paymentStatus, courierName, trackingId } = body;

    if (!orderId || !orderStatus) {
      return NextResponse.json({ success: false, message: "Order ID and status required" }, { status: 400 });
    }

    const updated = await dataService.updateOrderStatus(
      orderId,
      orderStatus,
      paymentStatus,
      { name: courierName, trackingId }
    );

    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to update order" }, { status: 500 });
  }
}
