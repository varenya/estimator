import { Project } from "@prisma/client";
import React from "react";
import {
  ActionFunction,
  json,
  Link,
  LoaderFunction,
  redirect,
  useLoaderData,
} from "remix";
import invariant from "tiny-invariant";
import { CreateProject } from "~/components/CreateProject";
import { createProject, getProjects } from "~/models/project.server";
import indexStyles from "~/styles/index_page.css";

export function links() {
  return [{ rel: "stylesheet", href: indexStyles }];
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const clientName = formData.get("clientName");
  const projectName = formData.get("projectName");

  invariant(typeof clientName === "string");
  invariant(typeof projectName === "string");

  await createProject({ clientName, projectName });
  return redirect("/");
};

export const loader: LoaderFunction = async () => {
  return json<Project[]>(await getProjects());
};

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <section className="bg-gray-800 py-12 text-white">
        <header>
          <h1 className="p-8 text-center text-4xl md:text-5xl">
            Project Estimator
          </h1>
        </header>
        <h2 className="mt-2 mb-4 px-5 text-center text-xl md:text-2xl">
          Hey 👋🏻, seems like you don't have any projects. Lets get started!
        </h2>
      </section>
      <div className="project-view flex items-center justify-center bg-gray-200">
        <div className="project-creation-form mx-auto">{children}</div>
      </div>
    </div>
  );
}

export default function Index() {
  const projects = useLoaderData<Project[]>();
  if (projects.length === 0) {
    return (
      <Layout>
        <CreateProject />
      </Layout>
    );
  }

  return (
    <Layout>
      <nav className="min-h-full w-64 p-4">
        <ul>
          {projects.map((project) => (
            <li key={project.id} className="pb-4">
              <Link
                to={`/project/${project.projectName}`}
                className="block text-left text-2xl hover:underline"
              >
                {project.projectName}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Layout>
  );
}
