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
  const { userId, productId } = await req.json();

  if (!userId || !productId) {
    return Response.json({ error: "Missing userId or productId" }, { status: 400 });
  }

  // Check if the product is already in the cart
  const existingItem = await prisma.cartItem.findFirst({
    where: { userId, productId },
  });

  if (existingItem) {
    // If exists, increase quantity
    const updatedItem = await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + 1 },
    });

    return Response.json(updatedItem);
  } else {
    // Otherwise, add new item to cart
    const newItem = await prisma.cartItem.create({
      data: { userId, productId, quantity: 1 },
    });

    return Response.json(newItem);
  }
}

export async function PUT(req) {
  const { userId, productId, action } = await req.json();

  if (!userId || !productId || !action) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const existingItem = await prisma.cartItem.findFirst({
    where: { userId, productId },
  });

  if (!existingItem) {
    return Response.json({ error: "Item not found" }, { status: 404 });
  }

  let updatedItem;
  if (action === "increase") {
    updatedItem = await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + 1 },
    });
  } else if (action === "decrease") {
    if (existingItem.quantity > 1) {
      updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity - 1 },
      });
    } else {
      await prisma.cartItem.delete({ where: { id: existingItem.id } });
      return Response.json({ message: "Item removed" });
    }
  }

  return Response.json(updatedItem);
}

export async function DELETE(req) {
  const { userId, productId } = await req.json();

  if (!userId || !productId) {
    return Response.json({ error: "Missing userId or productId" }, { status: 400 });
  }

  await prisma.cartItem.deleteMany({
    where: { userId, productId },
  });

  return Response.json({ message: "Item removed" });
}
