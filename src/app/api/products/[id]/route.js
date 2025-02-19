import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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
export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();
  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: body,
    });
    return NextResponse.json(updatedProduct);
  } catch (error) {
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
