import { prisma } from "../../lib/prisma";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) return Response.json({ error: "User ID is required" }, { status: 400 });

  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true },
  });

  return Response.json({ cart: cartItems });
}

export async function POST(req) {
  try {
    const { userId, productId } = await req.json();
    console.log("Received data:", { userId, productId });

    const cartItem = await prisma.cartItem.create({
      data: { userId, productId, quantity: 1 },
    });

    return Response.json(cartItem);
  } catch (error) {
    console.error("Error creating cart item:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req) {
  const { userId, productId, action } = await req.json();

  const cartItem = await prisma.cartItem.findFirst({
    where: { userId, productId },
  });

  if (!cartItem) return Response.json({ error: "Item not found" }, { status: 404 });

  let updatedQuantity = cartItem.quantity;
  if (action === "increase") {
    updatedQuantity += 1;
  } else if (action === "decrease") {
    updatedQuantity -= 1;
  }

  if (updatedQuantity <= 0) {
    await prisma.cartItem.delete({
      where: { id: cartItem.id },
    });
    return Response.json({ quantity: 0 });
  } else {
    const updatedCart = await prisma.cartItem.update({
      where: { id: cartItem.id },
      data: { quantity: updatedQuantity },
    });
    return Response.json(updatedCart);
  }
}