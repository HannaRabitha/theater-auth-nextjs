-- CreateTable
CREATE TABLE "Qustion" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer1" TEXT NOT NULL,
    "answer2" TEXT NOT NULL,
    "answer3" TEXT NOT NULL,
    "answer4" TEXT NOT NULL,
    "correctAnswer" TEXT NOT NULL,

    CONSTRAINT "Qustion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Score" (
    "id" SERIAL NOT NULL,
    "score" INTEGER NOT NULL,
    "trueAnswer" INTEGER NOT NULL,
    "falseAnswer" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
