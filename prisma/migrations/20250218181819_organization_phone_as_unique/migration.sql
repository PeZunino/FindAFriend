/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `organizations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "organizations_phone_key" ON "organizations"("phone");
