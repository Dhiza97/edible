import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import Paystack from "paystack";

const JWT_SECRET = process.env.JWT_SECRET;
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const paystack = new Paystack(PAYSTACK_SECRET_KEY);

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

export async function POST(req) {
  const origin = req.headers.get("origin");
  if (!origin) {
    return NextResponse.json(
      { error: "Origin header is missing" },
      { status: 400 }
    );
  }
  
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
      price,
    } = await req.json();

    const newOrder = await prisma.order.create({
      data: {
        userId: user.id,
        price,
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
            amount: price,
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

// Verify Paystack Payment
export async function verifyPayment(req) {
  const { reference } = await req.json();

  try {
    const verificationResponse = await paystack.transaction.verify(reference);

    if (verificationResponse.data.status === "success") {
      const payment = await prisma.payment.update({
        where: { transactionId: reference },
        data: { status: "paid" },
      });

      const order = await prisma.order.update({
        where: { id: payment.orderId },
        data: { status: "paid" },
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

      return NextResponse.json(order);
    } else {
      return NextResponse.json(
        { error: "Payment verification failed" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}
