import { prisma } from "~/db.server";

export async function getProjects() {
  return prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getFirstProject() {
  return prisma.project.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createProject({
  projectName,
  clientName,
}: {
  projectName: string;
  clientName: string;
}) {
  return prisma.project.create({
    data: {
      projectName,
      clientName,
    },
  });
}
