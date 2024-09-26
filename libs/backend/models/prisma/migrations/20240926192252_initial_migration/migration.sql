-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MALE', 'FEMALE', 'DONT_MATTER');

-- CreateEnum
CREATE TYPE "Location" AS ENUM ('PIONERSKAYA', 'PETROGRADSKAYA', 'UDELNAYA', 'ZVEZDNAYA', 'SPORTIVNAYA');

-- CreateEnum
CREATE TYPE "Level" AS ENUM ('BEGGINER', 'AMATEUR', 'PRO');

-- CreateEnum
CREATE TYPE "TrainingType" AS ENUM ('YOGA', 'RUNNING', 'BOX', 'STRETCHING', 'CROSSFIT', 'AEROBICS', 'PILATES');

-- CreateEnum
CREATE TYPE "Time" AS ENUM ('SHORT', 'MEDIUM', 'LONG', 'EXTRA');

-- CreateEnum
CREATE TYPE "Payment" AS ENUM ('VISA', 'MIR', 'UMONEY');

-- CreateTable
CREATE TABLE "User" (
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
    "calories_all" DECIMAL(65,30) NOT NULL,
    "calories_per_day" DECIMAL(65,30) NOT NULL,
    "ready" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Training" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "level" "Level" NOT NULL,
    "trainingType" "TrainingType" NOT NULL,
    "trainingTime" "Time" NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "calories" DECIMAL(65,30) NOT NULL,
    "description" TEXT NOT NULL,
    "sex" "Sex" NOT NULL,
    "video" TEXT NOT NULL,
    "rating" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "trainer" TEXT NOT NULL,
    "special" BOOLEAN NOT NULL,

    CONSTRAINT "Training_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "type_of_order" TEXT NOT NULL DEFAULT 'subscription',
    "training_id" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL,
    "payment" "Payment" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Balance" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "trainingId" TEXT NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Balance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "training_id" TEXT NOT NULL,
    "rate" DECIMAL(65,30) NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "Training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
