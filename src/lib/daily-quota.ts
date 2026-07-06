import { prisma } from "@/lib/prisma";
import { DAILY_TAG_LIMIT } from "@/lib/profile-parser";

export async function getDailyTagQuota(userId: string) {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const taggedToday = await prisma.profileCompanyLead.count({
    where: {
      taggedByUserId: userId,
      taggedAt: { gte: startOfDay },
    },
  });

  return {
    limit: DAILY_TAG_LIMIT,
    used: taggedToday,
    remaining: Math.max(0, DAILY_TAG_LIMIT - taggedToday),
  };
}

export function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}
