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
          metadata: {
            userId: userId,
          },
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