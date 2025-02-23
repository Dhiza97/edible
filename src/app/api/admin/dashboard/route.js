import { isAdmin } from "@/src/middleware/adminAuth";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  const authResponse = isAdmin(req);
  if (authResponse.status !== 200) return authResponse;

  try {
    const productsCount = await prisma.product.count();
    const usersCount = await prisma.user.count();
    const completedOrdersCount = await prisma.order.count({
      where: { status: "completed" },
    });
    const recentOrders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        user: true,
        orderItems: true,
      },
    });

    return NextResponse.json({
      message: "Welcome Admin",
      data: {
        productsCount,
        usersCount,
        completedOrdersCount,
        recentOrders,
      },
    });
  } catch (error) {
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}