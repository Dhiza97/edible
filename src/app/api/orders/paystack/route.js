import { NextResponse } from "next/server";
import axios from "axios";
import { prisma } from "@/src/app/lib/prisma";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

// Initialize Paystack Payment
export async function POST(req) {
  try {
    const data = await req.json();
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
      shippingOptionId,
    } = data;

    if (paymentMethod === "paystack") {
      // Create a new order in the database with a pending payment status
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
      });

      // Initialize Paystack transaction
      const response = await axios.post(
        "https://api.paystack.co/transaction/initialize",
        {
          email: email,
          amount: (totalPrice + shippingFee) * 100, // Convert to kobo
          reference: `PAYSTACK_${order.id}_${Date.now()}`,
          callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify?orderId=${order.id}`,
        },
        {
          headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { authorization_url } = response.data.data;

      return NextResponse.json({ success: true, authorization_url });
    } else {
      // Handle other payment methods (e.g., COD)
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
      });

      return NextResponse.json(order);
    }
  } catch (error) {
    console.error("Error initializing payment:", error);
    return NextResponse.json(
      { error: "Failed to initialize payment." },
      { status: 500 }
    );
  }
}

// Verify Paystack Payment
export async function PUT(req) {
  try {
    const data = await req.json();
    const { orderId, reference } = data;

    // Verify transaction with Paystack
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const { status, data: transactionData } = response.data;

    if (status === true && transactionData.status === "success") {
      // Update order status to paid
      const updatedOrder = await prisma.order.update({
        where: { id: orderId },
        data: {
          payments: {
            create: {
              transactionId: transactionData.reference,
              amount: transactionData.amount / 100, // Convert back to base currency
              paymentMethod: "paystack",
            },
          },
          paymentStatus: "paid",
        },
      });

      return NextResponse.json({
        success: true,
        message: "Payment verified successfully.",
        updatedOrder,
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Payment verification failed." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { error: "Failed to verify payment." },
      { status: 500 }
    );
  }
}
