-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "banExpires" TIMESTAMP(3),
    "banReason" TEXT,
    "banned" BOOLEAN DEFAULT false,
    "role" TEXT,
    "courseId" UUID,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shift" (
    "id" SERIAL NOT NULL,
    "shift" VARCHAR(12) NOT NULL,
    "starttime" TIME(6) NOT NULL,
    "finishtime" TIME(6) NOT NULL,

    CONSTRAINT "shift_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course" (
    "id" UUID NOT NULL DEFAULT uuidv7(),
    "name" TEXT NOT NULL,
    "code" VARCHAR(6) NOT NULL,
    "shiftid" INTEGER NOT NULL,
    "identifier" CHAR(1) NOT NULL,
    "startat" DATE NOT NULL,
    "finishat" DATE NOT NULL,
    "createdat" DATE NOT NULL DEFAULT CURRENT_DATE,
    "updatedat" DATE NOT NULL DEFAULT CURRENT_DATE,
    "isactive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subject" (
    "id" UUID NOT NULL DEFAULT uuidv7(),
    "name" VARCHAR(64) NOT NULL,
    "type" INTEGER,
    "createdat" DATE DEFAULT CURRENT_DATE,
    "isactive" BOOLEAN DEFAULT true,

    CONSTRAINT "subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subject_type" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "isactive" BOOLEAN DEFAULT true,

    CONSTRAINT "subject_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "semester" (
    "id" SERIAL NOT NULL,
    "courseid" UUID,
    "subjectid" UUID,
    "semester" INTEGER NOT NULL,
    "teacherid" TEXT,

    CONSTRAINT "class_subject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "class_code_key" ON "course"("code");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "class_shift_fkey" FOREIGN KEY ("shiftid") REFERENCES "shift"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "semester" ADD CONSTRAINT "class_subject_courseid_fkey" FOREIGN KEY ("courseid") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "semester" ADD CONSTRAINT "class_subject_subjectid_fkey" FOREIGN KEY ("subjectid") REFERENCES "subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "semester" ADD CONSTRAINT "fk_teacherid" FOREIGN KEY ("teacherid") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
