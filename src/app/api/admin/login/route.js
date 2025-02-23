import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken } from "@/src/utils/jwt";

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        const isValidAdmin =
            email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD;

        if (!isValidAdmin) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        // Generate JWT token
        const token = generateToken({ email, role: "admin" });

        return NextResponse.json({ message: "Login successful", token });
    } catch (error) {
        return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
    }
}
