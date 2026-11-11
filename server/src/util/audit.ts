import { prisma } from '../db';
import type { Request } from 'express';
import { logger } from './logger';

/**
 * רישום פעולה ביומן הביקורת. נכשל בשקט (לא מפיל בקשה) כדי לא לחסום פעולה עסקית.
 */
export async function audit(
  req: Request,
  action: string,
  entity: string,
  entityId?: string,
  details?: string
) {
  try {
    await prisma.auditLog.create({
      data: {
        userId: req.user?.id,
        action,
        entity,
        entityId,
        ip: (req.headers['x-forwarded-for'] as string) || req.ip,
        details,
      },
    });
    logger.tabOp(entity, action, details);
  } catch (err) {
    // לא מפילים את הבקשה בגלל כשל ביומן
    logger.auditFailed(entity, err);
  }
}
