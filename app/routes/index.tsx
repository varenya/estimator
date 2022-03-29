import { Project } from "@prisma/client";
import {
  ActionFunction,
  Form,
  json,
  Link,
  LoaderFunction,
  redirect,
  useLoaderData,
} from "remix";
import invariant from "tiny-invariant";
import { createProject, getProjects } from "~/models/project.server";
import indexStyles from "~/styles/index_page.css";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const clientName = formData.get("clientName");
  const projectName = formData.get("projectName");

  invariant(typeof clientName === "string");
  invariant(typeof projectName === "string");

  await createProject({ clientName, projectName });
  return redirect("/");
};

export function links() {
  return [{ rel: "stylesheet", href: indexStyles }];
}

export const loader: LoaderFunction = async () => {
  return json<Project[]>(await getProjects());
};

function CreateProject() {
  return (
    <div className="overflow-hidden rounded-lg shadow-lg">
      <div className="mx-auto border-t-8 border-teal-300 bg-white p-8">
        <p className="mb-4 p-4 text-center text-3xl text-gray-700">
          Project Info
        </p>
        <Form method="post">
          <div className="mb-6 flex flex-col">
            <label htmlFor="clientName" className="mb-2 text-xl text-gray-500">
              Client Name{" "}
            </label>
            <input
              id="clientName"
              className="rounded-lg border-2 px-2 py-3 text-xl"
              type="text"
              name="clientName"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="projectName" className="mb-2 text-xl text-gray-500">
              Project Name{" "}
            </label>
            <input
              id="projectName"
              className="rounded-lg border-2 px-2 py-3 text-xl"
              type="text"
              name="projectName"
            />
          </div>
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="rounded bg-teal-500 px-5 py-3 text-xl text-white"
            >
              Create Project
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default function Index() {
  const projects = useLoaderData<Project[]>();
  if (projects.length === 0) {
    return (
      <div className="min-h-screen">
        <section className="bg-gray-800 py-12 text-teal-400">
          <header>
            <h1 className="p-8 text-center text-5xl">Project Estimator</h1>
          </header>
          <h2 className="mt-2 mb-4 text-center text-2xl">
            Hey 👋🏻, seems like you don't have any projects. Lets get started
          </h2>
        </section>
        <div className="project-view flex items-center justify-center bg-gray-200">
          <div className="mx-auto w-4/5 lg:w-1/3">
            <CreateProject />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <header>
        <h1 className="p-8 text-center text-5xl">Project Estimator</h1>
      </header>
      <div className="project-view container mx-auto mt-16 rounded-lg bg-gray-200 p-8 shadow-lg">
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
        <main></main>
      </div>
    </div>
  );
}
