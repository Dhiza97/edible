import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@/src/app/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  try {
    if (!JWT_SECRET) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const { email, password } = await req.json();

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 🔹 Check if user is verified
    if (!user.isVerified) {
      return NextResponse.json(
        { error: "Please verify your email before logging in" },
        { status: 403 }
      );
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1d",
    });

    // Create response with cookie
    const response = NextResponse.json(
      {
        message: "Login successful",
        user: { id: user.id, name: user.name, email: user.email },
        token,
      },
      { status: 200 }
    );

    response.headers.set(
      "Set-Cookie",
      `token=${token}; HttpOnly; Secure; Path=/; Max-Age=604800; SameSite=Strict`
    );

    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
