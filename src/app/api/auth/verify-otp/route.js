import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { email, otp } = await req.json();

    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if OTP is expired
    if (!user.verifiedOtpExpireAt || new Date() > user.verifiedOtpExpireAt) {
      return NextResponse.json(
        { error: "OTP expired. Request a new one." },
        { status: 400 }
      );
    }

    // Compare OTP (hashed)
    const isMatch = await bcrypt.compare(otp, user.verifyOtp);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    // Mark user as verified
    await prisma.user.update({
      where: { email },
      data: {
        isVerified: true,
        verifyOtp: "",
        verifiedOtpExpireAt: null,
      },
    });

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("OTP Verification Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
