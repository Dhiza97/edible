import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

const JWT_SECRET = process.env.JWT_SECRET;

// Get All Orders
export async function GET(req) {
  try {
    // Extract token from headers
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

    // Fetch orders for the logged-in user
    const orders = await prisma.order.findMany({
      where: { userId: decoded.id },
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
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Create Order
export async function POST(req) {
  try {
    // Extract token from headers
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

    // Extract order data from request body
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
      price,
    } = await req.json();

    if (!price) {
      return NextResponse.json({ error: "Price is missing" }, { status: 400 });
    }

    // Create new order
    const newOrder = await prisma.order.create({
      data: {
        userId: user.id,
        price: parseFloat(price),
        orderItems: {
          create: orderItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: parseFloat(item.price),
            product: {
              connect: { id: item.productId },
            },
          })),
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
            amount: parseFloat(price),
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
    console.error("Error in POST /api/orders:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Update Order Status
export async function PUT(req) {
  const { id, status } = await req.json();

  try {
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status },
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

    if (
      updatedOrder &&
      updatedOrder.payments &&
      updatedOrder.payments.length > 0
    ) {
      const payment = updatedOrder.payments[0]; // Assuming one payment per order

      if (status === "Delivered") {
        await prisma.payment.update({
          where: { id: payment.id },
          data: { status: "paid" },
        });
      } else if (payment.paymentMethod !== "cod") {
        // For online payments, keep status as pending until delivered.
        await prisma.payment.update({
          where: { id: payment.id },
          data: { status: "pending" },
        });
      }
    }

    const finalOrder = await prisma.order.findUnique({
      where: { id },
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

    return NextResponse.json(finalOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}