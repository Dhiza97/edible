import { sendEmail } from "@/src/utils/nodemailer";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { email } = await req.json();

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // Generate and hash OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);
    const otpExpireTime = new Date(Date.now() + 10 * 60 * 1000);

    // Save OTP in DB
    await prisma.user.update({
      where: { email },
      data: {
        resetOtp: hashedOtp,
        resetOtpExpireAt: otpExpireTime,
      },
    });

    // Send OTP email
    await sendEmail(email, otp, "passwordReset");

    return Response.json({ message: "Reset OTP sent to email" }, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
