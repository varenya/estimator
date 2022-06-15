import { Project } from "@prisma/client";
import { ActionFunction, json, redirect, useLoaderData } from "remix";
import invariant from "tiny-invariant";
import { CreateProject } from "~/components/CreateProject";
import {
  createProject,
  getFirstProject,
  getProjects,
} from "~/models/project.server";

type ProjectLoaderData = {
  project: Awaited<ReturnType<typeof getFirstProject>>;
};

export async function loader() {
  return json<ProjectLoaderData>({ project: await getFirstProject() });
}

function ProjectUI({
  projectName,
  clientName,
  creationDate,
}: {
  projectName: string;
  clientName: string;
  creationDate: Date;
}) {
  return (
    <div className="flex flex-col rounded-lg border-t-4 border-teal-400 bg-white p-8 shadow-md">
      <p className="text-3xl capitalize">{clientName}</p>
      <p className="mt-2 text-base font-thin">
        {creationDate.toLocaleDateString("en-GB", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>
      <p className="mt-2 text-lg font-thin capitalize text-orange-400">
        {projectName}
      </p>
    </div>
  );
}

export default function Index() {
  const { project } = useLoaderData<ProjectLoaderData>();
  if (project) {
    return (
      <div className="flex p-8">
        <ol className="flex w-full flex-col">
          {project.estimates.map((estimate) => (
            <li
              key={estimate.id}
              className="mx-auto w-1/2 rounded-xl bg-primary-100 p-2 text-center text-lg text-primary-300 shadow-md"
            >
              {estimate.estimateName}
            </li>
          ))}
        </ol>
      </div>
    );
  }
}
