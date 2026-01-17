import { connectDB } from "@/lib/db";
import Land from "@/lib/models/land";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

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
// DELETE land
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    
    if (!id) {
       return NextResponse.json({ success: false, error: "ID is missing" }, { status: 400 });
    }

    await connectDB();
    
    // 1. Find the land first to get images
    const land = await Land.findById(id);
    if (!land) {
      return NextResponse.json(
        { success: false, error: "Land not found" },
        { status: 404 }
      );
    }

    // 2. Delete images from Cloudinary
    if (land.images && land.images.length > 0) {
      for (const imageUrl of land.images) {
        try {
          // Extract public_id from URL: 
          // e.g. https://res.cloudinary.com/cloudName/image/upload/v1234/land-platform/my-image.jpg
          // we need "land-platform/my-image"
          
          const parts = imageUrl.split('/');
          const filename = parts.pop().split('.')[0]; // my-image
          const folder = parts.pop(); // land-platform (or version if no folder, but we used folder 'land-platform')
          
          // Safety check: only delete if it looks like our folder
          // The upload route uses folder: "land-platform"
          // Cloudinary structure usually has version then folder.
          // Let's try to grab everything after 'upload/' and remove version if present.
          
          // Better approach for Cloudinary URLs:
          // split by 'upload/' -> [base, path]
          // path -> "v171.../land-platform/imageId.jpg"
          // remove version prefix "v1234/" if present
          
          const splitUrl = imageUrl.split('upload/');
          if (splitUrl.length === 2) {
             let publicIdWithVersion = splitUrl[1]; 
             // remove version "v1234/"
             const versionPathParts = publicIdWithVersion.split('/');
             // if first part starts with 'v' and is numeric, it's version
             if (versionPathParts[0].startsWith('v') && !isNaN(versionPathParts[0].substring(1))) {
                versionPathParts.shift();
             }
             const publicIdWithExt = versionPathParts.join('/');
             const publicId = publicIdWithExt.split('.')[0];
             
             await cloudinary.uploader.destroy(publicId);
          }
        } catch (imgErr) {
          console.error("Failed to delete image from Cloudinary:", imgErr);
          // Continue deleting the land even if image delete fails
        }
      }
    }

    // 3. Delete from DB
    await Land.findByIdAndDelete(id);

    return NextResponse.json({ success: true, id });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
