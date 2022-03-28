import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  const sampleProject = await prisma.project.create({
    data: {
      projectName: "test project",
      clientName: "shyam",
    },
  });
  const sampleEstimate = await prisma.estimate.create({
    data: {
      projectId: sampleProject.id,
      estimateName: "test estimate",
    },
  });

  await prisma.lineItem.create({
    data: {
      item: "Safety Door",
      description:
        "38mm thick door including laminate on both sides with 18\" x 4' MS jaali in chrome finish. Door stopper, interlock, handles and hinges included.",
      width: 3.5,
      height: 3.5,
      quantity: 1,
      unit: "SFT",
      rate: null,
      cost: 31450,
      estimateId: sampleEstimate.id,
    },
  });

  await prisma.lineItem.create({
    data: {
      item: "Wood finish laminate ceiling & wall panelling at entry",
      description:
        "Framing made of 12mm plywood finished in approved wooden finish laminate.",
      quantity: 23.25,
      width: null,
      height: null,
      unit: "SFT",
      rate: 850,
      cost: 19762,
      estimateId: sampleEstimate.id,
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
