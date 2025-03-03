/*
  Warnings:

  - You are about to drop the column `address` on the `Shipping` table. All the data in the column will be lost.
  - Added the required column `email` to the `Shipping` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Shipping` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Shipping` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Shipping` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shipping" DROP COLUMN "address",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "paymentMethod" TEXT NOT NULL DEFAULT 'cod',
ADD COLUMN     "street" TEXT NOT NULL;
