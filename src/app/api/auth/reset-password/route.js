import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { email, otp, newPassword } = await req.json();

    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // Validate OTP
    if (!(await bcrypt.compare(otp, user.resetOtp))) {
      return Response.json({ error: "Invalid OTP" }, { status: 400 });
    }

    if (new Date() > user.resetOtpExpireAt) {
      return Response.json({ error: "OTP expired" }, { status: 400 });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear OTP fields
    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        resetOtp: "",
        resetOtpExpireAt: null,
      },
    });

    return Response.json({ message: "Password reset successful" }, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
