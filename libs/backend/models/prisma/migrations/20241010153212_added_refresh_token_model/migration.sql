-- CreateTable
CREATE TABLE "refresh_token" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "token_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expiresIn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "refresh_token_pkey" PRIMARY KEY ("token_id")
);
