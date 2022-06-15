import { json, LoaderFunction, useLoaderData, useParams } from "remix";
import { getProjectInfo } from "~/models/project.server";

type LoaderData = {
  project: Awaited<ReturnType<typeof getProjectInfo>>;
};

export const loader: LoaderFunction = async ({ params }) => {
  const { projectId } = params;
  if (!projectId) {
    throw new Response("projectId not present", { status: 404 });
  }

  const projectData = await getProjectInfo({ projectId: projectId });

  if (!projectData) {
    throw new Response("project not present", { status: 404 });
  }
  return json<LoaderData>({ project: projectData });
};

export default function Project() {
  const { project } = useLoaderData<LoaderData>();
  if (project) {
    return (
      <div>
        <ol>
          {project.estimates.map((estimate) => (
            <li key={estimate.id}>{estimate.estimateName}</li>
          ))}
        </ol>
      </div>
    );
  }
}
