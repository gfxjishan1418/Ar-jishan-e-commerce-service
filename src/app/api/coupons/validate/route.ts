import { NextResponse } from "next/server";
import { dataService } from "@/lib/dataService";

export async function POST(request: Request) {
  try {
    const { code, subtotal } = await request.json();

    if (!code || typeof subtotal !== "number") {
      return NextResponse.json(
        { valid: false, discount: 0, message: "Invalid request payload" },
        { status: 400 }
      );
    }

    const result = await dataService.validateCoupon(code, subtotal);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { valid: false, discount: 0, message: "Internal validation error" },
      { status: 500 }
    );
  }
}
