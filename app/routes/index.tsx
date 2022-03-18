import { json, Link, LoaderFunction, useLoaderData } from "remix";
import indexStyles from "~/styles/index_page.css";

type Project = {
  id: string;
  clientName: string;
  apartementComplext?: string;
};

export function links() {
  return [{ rel: "stylesheet", href: indexStyles }];
}

export const loader: LoaderFunction = async () => {
  return json<Project[]>([
    { id: "1", clientName: "Nyati" },
    { id: "2", clientName: "Panchsheel" },
    { id: "3", clientName: "Nirmay" },
  ]);
};

export default function Index() {
  const projects = useLoaderData<Project[]>();
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
                  to={`/project/${project.clientName}`}
                  className="block text-left text-2xl hover:underline"
                >
                  {project.clientName}
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
