/*
  Warnings:

  - The `training_types` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `payment` on the `orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `level` on the `trainings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `trainingType` on the `trainings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `trainingTime` on the `trainings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `sex` on the `trainings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `sex` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `location` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `level` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `trainingTime` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_training_id_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "payment",
ADD COLUMN     "payment" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "trainings" DROP COLUMN "level",
ADD COLUMN     "level" TEXT NOT NULL,
DROP COLUMN "trainingType",
ADD COLUMN     "trainingType" TEXT NOT NULL,
DROP COLUMN "trainingTime",
ADD COLUMN     "trainingTime" TEXT NOT NULL,
DROP COLUMN "sex",
ADD COLUMN     "sex" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "sex",
ADD COLUMN     "sex" TEXT NOT NULL,
DROP COLUMN "location",
ADD COLUMN     "location" TEXT NOT NULL,
DROP COLUMN "level",
ADD COLUMN     "level" TEXT NOT NULL,
DROP COLUMN "training_types",
ADD COLUMN     "training_types" TEXT[],
DROP COLUMN "trainingTime",
ADD COLUMN     "trainingTime" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Level";

-- DropEnum
DROP TYPE "Location";

-- DropEnum
DROP TYPE "Payment";

-- DropEnum
DROP TYPE "Sex";

-- DropEnum
DROP TYPE "Time";

-- DropEnum
DROP TYPE "TrainingType";
