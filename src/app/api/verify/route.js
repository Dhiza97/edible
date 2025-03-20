import { NextResponse } from "next/server";
import axios from "axios";
import { prisma } from "@/src/app/lib/prisma";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");
    const reference = searchParams.get("reference");

    if (!orderId || !reference) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/payment-failed`
      );
    }

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
      await prisma.order.update({
        where: { id: orderId },
        data: {
          payments: {
            create: {
              transactionId: transactionData.reference,
              amount: transactionData.amount / 100,
              paymentMethod: "paystack",
            },
          },
          paymentStatus: "paid",
        },
      });

      // Redirect to success page
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?orderId=${orderId}`
      );
    } else {
      // Redirect to failure page
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/payment-failed`
      );
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/payment-failed`
    );
  }
}
