import { prisma } from "../../lib/prisma";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId)
    return Response.json({ error: "User ID is required" }, { status: 400 });

  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true },
  });

  return Response.json({ cart: cartItems });
}

export async function POST(req) {
  const body = await req.json();
  const { userId, productId, quantity } = body;

  if (!userId || !productId) {
    return Response.json(
      { error: "Missing userId or productId" },
      { status: 400 }
    );
  }

  const existingItem = await prisma.cartItem.findFirst({
    where: { userId, productId },
  });

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + 1 },
    });
  } else {
    await prisma.cartItem.create({
      data: { userId, productId, quantity },
    });
  }

  const updatedCart = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true },
  });

  return Response.json({ cart: updatedCart }, { status: 201 });
}

export async function DELETE(req) {
  const body = await req.json();
  const { userId, productId } = body;

  if (!userId || !productId) {
    return Response.json(
      { error: "Missing userId or productId" },
      { status: 400 }
    );
  }

  const existingItem = await prisma.cartItem.findFirst({
    where: { userId, productId },
  });

  if (!existingItem) {
    return Response.json({ error: "Item not found in cart" }, { status: 404 });
  }

  if (existingItem.quantity > 1) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity - 1 },
    });
  } else {
    await prisma.cartItem.delete({ where: { id: existingItem.id } });
  }

  return Response.json({ message: "Item removed from cart" }, { status: 200 });
}
