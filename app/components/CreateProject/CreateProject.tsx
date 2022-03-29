import { Form } from "remix";

function CreateProject() {
  return (
    <div className="overflow-hidden rounded-lg shadow-lg">
      <div className="mx-auto border-t-8 border-teal-600 bg-white p-8">
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
              className="rounded-lg border-2 px-2 py-3 text-xl outline-teal-400"
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
              className="rounded-lg border-2 px-2 py-3 text-xl outline-teal-400"
              type="text"
              name="projectName"
            />
          </div>
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="rounded bg-teal-600 px-6 py-4 text-xl text-white"
            >
              Create Project
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
export { CreateProject };
