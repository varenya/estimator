import { Project } from "@prisma/client";
import { Layout } from "~/components/Layout/IndexLayout";
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
  const projects = useLoaderData<Project[]>();
  if (projects.length === 0) {
    return (
      <Layout onboardExp>
        <CreateProject />
      </Layout>
    );
  }

  return (
    <div className="min-h-full bg-gray-200">
      <section className="bg-gray-800 py-12 text-white">
        <header>
          <h1 className="p-8 text-center text-4xl md:text-5xl">Dashboard</h1>
        </header>
      </section>
      <div className="p-8">
        <div className="flex items-stretch gap-4 pt-8">
          <aside className="w-80 rounded-md bg-white shadow-lg">
            <nav className="p-4">
              <header className="text-center text-xl font-thin">
                Projects
              </header>
              <ol>
                {projects.map((project) => (
                  <li key={project.id} className="pb-4">
                    <Link
                      to={`/project/${project.projectName}`}
                      className="text-md block text-left hover:underline"
                    >
                      <span className="font-thin capitalize">
                        {project.projectName}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
          <main className="flex-1 rounded-md bg-white shadow-lg"></main>
        </div>
      </div>
    </div>
  );
}
