import { NextResponse } from "next/server";
import { dataService } from "@/lib/dataService";

export async function POST(request: Request) {
  try {
    const { orderNumber, gateway, status, transactionId } = await request.json();

    if (!orderNumber) {
      return NextResponse.json({ success: false, message: "Order number missing" }, { status: 400 });
    }

    if (status === "success") {
      const updated = await dataService.updateOrderStatus(
        orderNumber,
        "processing",
        "paid",
        {
          name: "Steadfast Courier",
          trackingId: `ST-${Math.floor(100000 + Math.random() * 900000)}`,
        }
      );

      return NextResponse.json({
        success: true,
        order: updated,
        message: "Payment successfully verified and order updated to processing.",
      });
    }

    return NextResponse.json({
      success: false,
      message: "Payment status not successful",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to verify transaction" },
      { status: 500 }
    );
  }
}
