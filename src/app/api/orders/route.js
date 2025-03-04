import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid"; // Import uuid for generating unique transactionId

const JWT_SECRET = process.env.JWT_SECRET;

// Get All Orders
export async function GET() {
  const orders = await prisma.order.findMany({
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
      shipping: true,
      payments: true,
    },
  });
  return NextResponse.json(orders);
}

export async function POST(req) {
  try {
    // Extract token from headers or cookies
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // order creation
    const {
      firstName,
      lastName,
      email,
      street,
      city,
      state,
      country,
      phone,
      paymentMethod,
      orderItems,
      totalAmount,
    } = await req.json();

    const newOrder = await prisma.order.create({
      data: {
        userId: user.id,
        totalAmount,
        orderItems: {
          create: orderItems,
        },
        shipping: {
          create: {
            firstName,
            lastName,
            email,
            street,
            city,
            state,
            country,
            phone,
            paymentMethod,
          },
        },
        payments: {
          create: {
            paymentMethod,
            amount: totalAmount,
            status: "pending",
            transactionId: uuidv4(),
          },
        },
      },
      include: {
        shipping: true,
        payments: true,
      },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Update Order Status
export async function PUT(req) {
  const { id, status } = await req.json();
  const updatedOrder = await prisma.order.update({
    where: { id },
    data: { status },
  });
  return NextResponse.json(updatedOrder);
}