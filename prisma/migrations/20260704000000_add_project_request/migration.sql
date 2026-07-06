-- CreateEnum
CREATE TYPE "ProjectRequestStatus" AS ENUM ('NEW', 'REVIEWING', 'QUOTED', 'IN_BUILD', 'DELIVERED', 'DECLINED');

-- CreateTable
CREATE TABLE "ProjectRequest" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "company" TEXT,
    "requirements" TEXT NOT NULL,
    "features" JSONB NOT NULL,
    "complexity" TEXT NOT NULL,
    "estTokens" INTEGER NOT NULL DEFAULT 0,
    "estPrice" INTEGER NOT NULL DEFAULT 0,
    "estSprints" INTEGER NOT NULL DEFAULT 0,
    "estWeeks" INTEGER NOT NULL DEFAULT 0,
    "status" "ProjectRequestStatus" NOT NULL DEFAULT 'NEW',
    "notes" TEXT,
    "source" TEXT NOT NULL DEFAULT 'studio',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectRequest_pkey" PRIMARY KEY ("id")
);
