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
    const {
      userId,
      orderItems,
      firstName,
      lastName,
      email,
      street,
      city,
      state,
      country,
      phone,
      paymentMethod,
      shippingFee,
      totalPrice,
      shippingOptionId
    } = await req.json();

    console.log(orderItems);

    const order = await prisma.order.create({
      data: {
        userId: userId,
        price: totalPrice,
        firstName: firstName,
        lastName: lastName,
        email: email,
        street: street,
        city: city,
        state: state,
        country: country,
        phone: phone,
        paymentMethod: paymentMethod,
        orderItems: {
          create: orderItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
        shipping: {
          create: {
            city: city,
            state: state,
            country: country,
            phone: phone,
            email: email,
            firstName: firstName,
            lastName: lastName,
            paymentMethod: paymentMethod,
            street: street,
          },
        },
      },
      include: {
        orderItems: true,
        shipping: true,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Failed to create order." }, { status: 500 });
  }
}

// Update Order Status
export async function PUT(req) {}
