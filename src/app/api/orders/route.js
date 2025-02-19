import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Get All Orders
export async function GET() {
  const orders = await prisma.order.findMany();
  return NextResponse.json(orders);
}

// Update Order Status
export async function PUT(req) {
  const { id, status } = await req.json();
  const updatedOrder = await prisma.order.update({ where: { id }, data: { status } });
  return NextResponse.json(updatedOrder);
}
