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
      <h2 className="bg-slate-200 px-9 py-8 text-2xl">Project Info</h2>
      <div className="mx-auto bg-slate-100 p-9">
        <Form method="post">
          <div className="mb-6 flex flex-col">
            <label htmlFor="clientName" className="mb-2 text-xl">
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
            <label htmlFor="projectName" className="mb-2 text-xl">
              Project Name{" "}
            </label>
            <input
              id="projectName"
              className="rounded-lg border-2 px-2 py-3 text-xl"
              type="text"
              name="projectName"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded bg-gray-400 px-4 py-2 text-2xl text-white"
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
        <header>
          <h1 className="p-8 text-center text-5xl">Project Estimator</h1>
        </header>
        <h2 className="mt-2 mb-4 text-center text-2xl">
          Hey 👋🏻, seems like you don't have any projects. Lets get started
        </h2>
        <div className="project-view mx-auto mt-14 w-4/5 lg:w-1/2 ">
          <CreateProject />
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
