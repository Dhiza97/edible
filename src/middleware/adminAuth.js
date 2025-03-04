import { NextResponse } from "next/server";
import { verifyToken } from "../utils/jwt";

export function isAdmin(req) {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
        console.log("No authorization header");
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token received:", token);
    const decoded = verifyToken(token);

    if (!decoded) {
        console.log("Token verification failed");
        return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }

    if (decoded.role !== "admin") {
        console.log("User is not an admin");
        return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }

    console.log("Token verified successfully");
    return NextResponse.next();
}