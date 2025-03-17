import { prisma } from "@/src/app/lib/prisma";
import { NextResponse } from "next/server";
import Paystack from "paystack";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const paystack = Paystack(PAYSTACK_SECRET_KEY);

export async function POST(req) {
  const { reference, userId, orderData, shippingData } = await req.json();

  try {
    const verificationResponse = await paystack.transaction.verify(reference);
    const { firstName, lastName, ...filteredOrderData } = orderData;

    if (verificationResponse.data.status === "success") {
      // Ensure price is included in filteredOrderData and is a number
      const price = Number(orderData.price);
if (isNaN(price)) {
  return NextResponse.json(
    { error: "Invalid price value" },
    { status: 400 }
  );
}

      filteredOrderData.price = price;

      // Create order in the database
      const order = await prisma.order.create({
        data: {
          email: filteredOrderData.email,
          street: filteredOrderData.street,
          city: filteredOrderData.city,
          state: filteredOrderData.state,
          country: filteredOrderData.country,
          phone: filteredOrderData.phone,
          paymentMethod: filteredOrderData.paymentMethod,
          userId: userId,
          status: "paid",
          price: price,
          orderItems: {
            create: filteredOrderData.orderItems,
          },
          payments: {
            create: {
              transactionId: reference,
              amount: price,
              paymentMethod: "paystack",
              status: "paid",
            },
          },
        },
        include: {
          orderItems: true,
          payments: true,
        },
      });

      // Create shipping in the database
      await prisma.shipping.create({
        data: {
          ...shippingData,
          orderId: order.id,
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
    console.error(
      "Error details:",
      error.response ? error.response.data : error.message
    );
    console.error("Paystack API Error:", error);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}