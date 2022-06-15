import { prisma } from "~/db.server";

export async function getProjects() {
  return prisma.project.findMany({
    include: {
      estimates: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getFirstProject() {
  return prisma.project.findFirst({
    include: {
      estimates: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getProjectInfo({ projectId }: { projectId: string }) {
  return prisma.project.findUnique({
    where: {
      id: projectId,
    },
    include: {
      estimates: true,
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
