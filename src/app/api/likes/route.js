import { prisma } from "../../lib/prisma";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) return Response.json({ error: "User ID is required" }, { status: 400 });

  const likes = await prisma.like.findMany({
    where: { userId },
  });

  return Response.json({ likes });
}

export async function POST(req) {
  const { userId, productId } = await req.json();

  if (!userId || !productId) {
    return Response.json({ error: "Missing userId or productId" }, { status: 400 });
  }

  // Check if the product is already liked
  const existingLike = await prisma.like.findFirst({
    where: { userId, productId },
  });

  if (existingLike) {
    // If exists, remove the like
    await prisma.like.delete({
      where: { id: existingLike.id },
    });
    return Response.json({ message: "Like removed" });
  } else {
    // Otherwise, add a new like
    const newLike = await prisma.like.create({
      data: { userId, productId },
    });
    return Response.json(newLike);
  }
}