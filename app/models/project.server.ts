import { prisma } from "~/db.server";

export async function getProjects() {
  return prisma.project.findMany();
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
