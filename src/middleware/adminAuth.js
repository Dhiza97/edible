import { NextResponse } from "next/server";
import { verifyToken } from "../utils/jwt";

export function isAdmin(req) {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    if (!decoded || decoded.role !== "admin") {
        return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }

    return NextResponse.next();
}
