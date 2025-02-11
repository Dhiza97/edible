import { sendEmail } from "@/src/utils/nodemailer";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return Response.json({ error: "Email already in use" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP (6-digit code)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10)

    // Set OTP expiry (10 minutes from now)
    const otpExpireTime = new Date(Date.now() + 10 * 60 * 1000);

    // Save user to DB
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        verifyOtp: hashedOtp,
        verifiedOtpExpireAt: otpExpireTime,
      },
    });

    // Send OTP email
    await sendEmail(email, otp, "verification");

    return Response.json({ message: "OTP sent to email" }, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
