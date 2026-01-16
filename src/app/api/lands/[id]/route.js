import { connectDB } from "@/lib/db";
import Land from "@/lib/models/land";
import { NextResponse } from "next/server";

// GET one land
export async function GET(req, { params }) {
  try {
    await connectDB();
    const land = await Land.findById(params.id);

    if (!land) {
      return NextResponse.json(
        { success: false, message: "Land not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, land });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// UPDATE land
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();

    const land = await Land.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    return NextResponse.json({ success: true, land });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// DELETE land
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    await Land.findByIdAndDelete(params.id);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
