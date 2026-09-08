import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const days = Number(process.env.VISITOR_RETENTION_DAYS || 30);
const cutoff = new Date(Date.now() - (Number.isFinite(days) && days > 0 ? days : 30) * 86400000);
try {
  const visits = await prisma.visitorVisit.deleteMany({ where: { expiresAt: { lt: new Date() } } });
  const sessions = await prisma.adminSession.deleteMany({ where: { expiresAt: { lt: new Date() } } });
  const buckets = await prisma.rateLimitBucket.deleteMany({ where: { expiresAt: { lt: new Date() } } });
  console.log(`Deleted visitor records: ${visits.count}; sessions: ${sessions.count}; rate-limit buckets: ${buckets.count}. Cutoff: ${cutoff.toISOString()}`);
} finally { await prisma.$disconnect(); }
