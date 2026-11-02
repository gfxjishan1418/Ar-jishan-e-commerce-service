import { NextResponse } from "next/server";
import { dataService } from "@/lib/dataService";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.regular_price) {
      return NextResponse.json(
        { success: false, message: "Product name and regular price are required." },
        { status: 400 }
      );
    }

    const saved = await dataService.saveProduct(body);
    return NextResponse.json({ success: true, product: saved });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to save product." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "Product ID missing" }, { status: 400 });
    }

    const ok = await dataService.deleteProduct(id);
    return NextResponse.json({ success: ok });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete product." },
      { status: 500 }
    );
  }
}
