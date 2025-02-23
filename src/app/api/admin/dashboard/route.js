import { isAdmin } from "@/src/middleware/adminAuth";
import { NextResponse } from "next/server";

export async function GET(req) {
    const authResponse = isAdmin(req);
    if (authResponse.status !== 200) return authResponse;

    return NextResponse.json({ message: "Welcome Admin", data: { orders: [], users: [] } });
}
