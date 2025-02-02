import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export function authMiddleware(req, res, next) {
  const token = request.cookies.get("authToken");

  if (!token) {
    // Redirect unauthenticated users to the login page
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/orders/:path*"],
};
