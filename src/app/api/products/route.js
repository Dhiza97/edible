import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { prisma } from "../../lib/prisma";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Add Product
export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const price = formData.get("price");
    const category = formData.get("category");
    const stock = Number(formData.get("stock"));
    const isFeatured = formData.get("isFeatured") === "true";
    const discountPrice = formData.get("discountPrice") || null;
    const imageFile = formData.get("image");

    let imageUrl = "";

    // Upload image to Cloudinary
    if (imageFile) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadRes = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "products" }, (err, res) => {
            if (err) reject(err);
            else resolve(res);
          })
          .end(buffer);
      });

      imageUrl = uploadRes.secure_url;
    }

    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        category,
        stock,
        isFeatured,
        discountPrice: discountPrice ? parseFloat(discountPrice) : null,
        image: imageUrl,
      },
    });

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Get Product List
export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
