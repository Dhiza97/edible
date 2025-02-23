import { prisma } from "@/src/app/lib/prisma";
import { NextResponse } from "next/server";

// Get Product by ID
export async function GET(req, { params }) {
  const { id } = params;
  try {
    const product = await prisma.product.findUnique({ where: { id } });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
}

// Update Product
export async function PUT(req, context) {
  const { params } = context;
  const id = params?.id;

  if (!id) {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }

  const body = await req.json();

  const data = {
    ...body,
    price: body.price ? parseFloat(body.price) : undefined,
    discountPrice: body.discountPrice ? parseFloat(body.discountPrice) : undefined,
    stock: body.stock ? parseInt(body.stock, 10) : undefined,
    image: body.image || undefined,
  };

  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data,
    });
    return NextResponse.json(updatedProduct);
  } catch (error) {
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete Product
export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
