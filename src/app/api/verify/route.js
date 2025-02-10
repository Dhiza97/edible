import { NextResponse } from "next/server";
import { prisma } from "@/src/app/lib/prisma";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Invalid verification token" }, { status: 400 });
  }

  // Find user with this token
  const user = await prisma.user.findUnique({
    where: { verificationToken: token },
  });

  if (!user) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
  }

  // Verify the user
  await prisma.user.update({
    where: { id: user.id },
    data: { verified: true, verificationToken: null },
  });

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`);
}
