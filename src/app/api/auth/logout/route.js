import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { message: "Logout successful" },
    { status: 200 }
  );

  response.headers.set(
    "Set-Cookie",
    "token=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
  );

  return response;
}
