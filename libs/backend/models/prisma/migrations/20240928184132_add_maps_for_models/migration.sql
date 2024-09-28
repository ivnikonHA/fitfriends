/*
  Warnings:

  - You are about to drop the `Balance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Training` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_training_id_fkey";

-- DropTable
DROP TABLE "Balance";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "Review";

-- DropTable
DROP TABLE "Training";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "sex" "Sex" NOT NULL,
    "date_of_birth" TIMESTAMP(3),
    "description" TEXT NOT NULL,
    "location" "Location" NOT NULL,
    "picture" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "level" "Level" NOT NULL,
    "training_types" "TrainingType"[],
    "trainingTime" "Time" NOT NULL,
    "calories_all" INTEGER NOT NULL,
    "calories_per_day" INTEGER NOT NULL,
    "ready" BOOLEAN NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trainings" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "level" "Level" NOT NULL,
    "trainingType" "TrainingType" NOT NULL,
    "trainingTime" "Time" NOT NULL,
    "price" INTEGER NOT NULL,
    "calories" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "sex" "Sex" NOT NULL,
    "video" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "trainer" TEXT NOT NULL,
    "special" BOOLEAN NOT NULL,

    CONSTRAINT "trainings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "type_of_order" TEXT NOT NULL DEFAULT 'subscription',
    "training_id" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "payment" "Payment" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "balances" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "trainingId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "balances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "training_id" TEXT NOT NULL,
    "rate" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "trainings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
