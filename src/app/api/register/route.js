import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/src/app/lib/prisma";
import jwt from "jsonwebtoken";
import transporter from "@/src/utils/nodemailer";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user in database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Generate JWT token
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // Create a NextResponse object and set the cookie
    const response = NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );

    response.headers.set(
      "Set-Cookie",
      `token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400`
    );

    // Send welcome email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'Welcome to Edible!',
      text: `Welcome to Edible website. Your account has been created with email id: ${email}`
    }

    await transporter.sendMail(mailOptions)

    return response;
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
