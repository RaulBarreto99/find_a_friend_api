-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "age" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "energy" TEXT NOT NULL,
    "independence" TEXT NOT NULL,
    "enviroment" TEXT NOT NULL,
    "photos" JSONB,
    "requirements" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);
