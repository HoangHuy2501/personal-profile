CREATE TABLE "Feedback" (
  "id" TEXT NOT NULL,
  "displayName" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "idempotencyKey" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Feedback_idempotencyKey_key" ON "Feedback"("idempotencyKey");
CREATE INDEX "Feedback_createdAt_idx" ON "Feedback"("createdAt");

CREATE TABLE "FeedbackReply" (
  "id" TEXT NOT NULL,
  "feedbackId" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "FeedbackReply_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "FeedbackReply_feedbackId_createdAt_idx" ON "FeedbackReply"("feedbackId", "createdAt");
ALTER TABLE "FeedbackReply" ADD CONSTRAINT "FeedbackReply_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "Feedback"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "VisitorVisit" (
  "id" TEXT NOT NULL,
  "sequence" SERIAL NOT NULL,
  "city" TEXT,
  "region" TEXT,
  "country" TEXT,
  "latitude" DOUBLE PRECISION,
  "longitude" DOUBLE PRECISION,
  "source" TEXT NOT NULL DEFAULT 'unknown',
  "locationStatus" TEXT NOT NULL DEFAULT 'unknown',
  "accuracy" TEXT,
  "noticeVersion" TEXT NOT NULL,
  "idempotencyKey" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "VisitorVisit_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "VisitorVisit_sequence_key" ON "VisitorVisit"("sequence");
CREATE UNIQUE INDEX "VisitorVisit_idempotencyKey_key" ON "VisitorVisit"("idempotencyKey");
CREATE INDEX "VisitorVisit_createdAt_idx" ON "VisitorVisit"("createdAt");
CREATE INDEX "VisitorVisit_expiresAt_idx" ON "VisitorVisit"("expiresAt");

CREATE TABLE "AdminSession" (
  "id" TEXT NOT NULL,
  "tokenHash" TEXT NOT NULL,
  "passwordVersion" TEXT NOT NULL,
  "scope" TEXT NOT NULL,
  "feedbackId" TEXT,
  "usedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "revokedAt" TIMESTAMP(3),
  CONSTRAINT "AdminSession_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "AdminSession_tokenHash_key" ON "AdminSession"("tokenHash");
CREATE INDEX "AdminSession_scope_expiresAt_idx" ON "AdminSession"("scope", "expiresAt");
CREATE INDEX "AdminSession_feedbackId_idx" ON "AdminSession"("feedbackId");

CREATE TABLE "RateLimitBucket" (
  "id" TEXT NOT NULL,
  "bucketKey" TEXT NOT NULL,
  "count" INTEGER NOT NULL DEFAULT 0,
  "windowStart" TIMESTAMP(3) NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "RateLimitBucket_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "RateLimitBucket_bucketKey_key" ON "RateLimitBucket"("bucketKey");
CREATE INDEX "RateLimitBucket_expiresAt_idx" ON "RateLimitBucket"("expiresAt");
