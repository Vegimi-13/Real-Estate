import { connectDB } from "@/lib/db";
import Land from "@/lib/models/land";
import { NextResponse } from "next/server";

// GET → all lands
export async function GET() {
  try {
    await connectDB();
    const lands = await Land.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, lands });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// POST → create land
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const land = await Land.create(body);

    return NextResponse.json({ success: true, land }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
