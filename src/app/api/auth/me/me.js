import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const token = cookies().get("token")?.value;
    if (!token) {
      return Response.json({ user: null }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return Response.json({ user: decoded }, { status: 200 });
  } catch (error) {
    return Response.json({ user: null }, { status: 401 });
  }
}
