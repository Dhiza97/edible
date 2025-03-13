/*
  Warnings:

  - You are about to drop the column `totalAmount` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "totalAmount",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0;
