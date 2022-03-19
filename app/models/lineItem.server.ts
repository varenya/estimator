import { prisma } from "~/db.server";

export function getLineItems({ estimateId }: { estimateId: string }) {
  return prisma.lineItem.findMany({
    where: { estimateId },
  });
}
