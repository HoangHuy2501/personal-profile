import 'server-only';
import { prisma } from '../../config/database';
export async function listFeedback(page: number, pageSize = 10) { const [items, total] = await prisma.$transaction([prisma.feedback.findMany({ skip: (page - 1) * pageSize, take: pageSize, orderBy: { createdAt: 'desc' }, include: { replies: { orderBy: { createdAt: 'asc' } } } }), prisma.feedback.count()]); return { items, total, page, pageSize, pages: Math.max(1, Math.ceil(total / pageSize)) }; }
export async function createFeedback(displayName: string, content: string, idempotencyKey: string) { return prisma.feedback.create({ data: { displayName: displayName || 'Khách / Guest', content, idempotencyKey } }); }
export async function findFeedbackByIdempotencyKey(idempotencyKey: string) { return prisma.feedback.findUnique({ where: { idempotencyKey } }); }
