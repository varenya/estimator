import { prisma } from "~/db.server";

import { LineItem } from "@prisma/client";

export function getLineItems({ estimateId }: { estimateId: string }) {
  return prisma.lineItem.findMany({
    where: { estimateId },
  });
}

export function createLineItem(lineItem: Omit<LineItem, "id">) {
  return prisma.lineItem.create({
    data: lineItem,
  });
}
