import { NextResponse } from "next/server";
import { dataService } from "@/lib/dataService";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || undefined;

    const { products, total } = await dataService.getProducts({
      category,
      search,
    });

    return NextResponse.json({ success: true, products, total });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
