import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";


// Get All Orders
export async function GET() {
  const orders = await prisma.order.findMany();
  return NextResponse.json(orders);
}

export async function POST(req) {
  try {
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
    } = await req.json();

    // Extract user ID from request (assuming it's available in the request headers)
    const userId = req.headers.get("user-id");

    // Calculate total amount
    let totalAmount = 0;
    for (const item of orderItems) {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      totalAmount += product.price * item.quantity;
    }

    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount,
        status: "pending",
        shippingInfo: {
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
            status: "processing",
          },
        },
        orderItems: {
          create: orderItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
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