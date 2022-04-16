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
  return <div></div>;
}
