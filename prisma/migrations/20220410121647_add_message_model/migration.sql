-- CreateTable
CREATE TABLE "Message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "properties" TEXT NOT NULL,
    "fields" TEXT NOT NULL
);
