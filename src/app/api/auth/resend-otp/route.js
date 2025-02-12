import { PrismaClient } from "@prisma/client";
import { sendVerificationEmail } from "@/src/utils/nodemailer";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import rateLimit from "@/src/app/lib/rateLimit";

const prisma = new PrismaClient();

export async function POST(req) {
  const res = NextResponse.next();

  try {
    // Apply rate limiter correctly
    const rateLimitResponse = await rateLimit(req, res);
    if (rateLimitResponse) return rateLimitResponse;

    const { email } = await req.json();

    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Generate new OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(newOtp, 10);
    const otpExpireTime = new Date(Date.now() + 10 * 60 * 1000);

    // Update user with new OTP
    await prisma.user.update({
      where: { email },
      data: {
        verifyOtp: hashedOtp,
        verifiedOtpExpireAt: otpExpireTime,
      },
    });

    // Send new OTP email
    await sendVerificationEmail(email, newOtp);

    return NextResponse.json(
      { message: "New OTP sent to email" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Resend OTP Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}