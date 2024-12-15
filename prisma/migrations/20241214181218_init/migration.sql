/*
  Warnings:

  - Added the required column `emailIdOfTheProfileWhoCreatedTheJson` to the `JsonData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JsonData" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "emailIdOfTheProfileWhoCreatedTheJson" TEXT NOT NULL;
