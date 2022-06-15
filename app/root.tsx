import {
  json,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  Link,
  ScrollRestoration,
  useLoaderData,
} from "remix";

import type { LinksFunction, MetaFunction, LoaderFunction } from "remix";

import fontStyleSheetUrl from "./styles/font.css";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getUser } from "./session.server";
import { getProjects } from "./models/project.server";
import { Layout } from "./components/Layout/IndexLayout";
import { CreateProject } from "./components/CreateProject";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: fontStyleSheetUrl },
    { rel: "stylesheet", href: tailwindStylesheetUrl },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Estimator",
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
  projects: Awaited<ReturnType<typeof getProjects>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    user: await getUser(request),
    projects: await getProjects(),
  });
};

export default function App() {
  const { projects } = useLoaderData<LoaderData>();
  if (projects.length == 0) {
    return (
      <Layout onboardExp>
        <CreateProject />
      </Layout>
    );
  }
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full bg-neutral-d">
        <div className="container mx-auto flex min-h-full flex-col gap-8">
          <header className="mt-8 flex items-center justify-center gap-4 rounded-2xl bg-white py-8 text-primary-300">
            <div className="h-32 w-32">
              <img
                className="block"
                src="/images/project_estimator.svg"
                alt="Project Estimator"
              />
            </div>
            <div>
              <h1 className="text-center text-4xl md:text-5xl">Dashboard</h1>
            </div>
          </header>
          <div className="mb-8 flex flex-1 overflow-hidden rounded-3xl bg-white py-8 shadow-xl">
            <aside className="w-64 border-r-2 border-slate-200">
              <nav className="p-4">
                <header className="py-4 text-center text-2xl font-semibold text-primary-300">
                  Projects
                </header>
                <ol className="p-4">
                  {projects.map((project) => (
                    <li key={project.id} className="pb-4">
                      <Link
                        to={`/project/${project.id}`}
                        className="block rounded-md bg-primary-300 py-2 px-2 text-center  text-lg font-medium  capitalize text-white"
                      >
                        {project.projectName}
                      </Link>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
            <main className="flex-1">
              <Outlet />
            </main>
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
