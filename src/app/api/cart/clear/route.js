import { prisma } from "@/src/app/lib/prisma";

export async function DELETE(req) {
  const { userId } = await req.json();

  if (!userId) {
    return Response.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    await prisma.cartItem.deleteMany({
      where: { userId },
    });
    return Response.json({ message: "Cart cleared" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}