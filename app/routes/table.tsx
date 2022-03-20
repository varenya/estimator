import { ActionFunction, Form, json, redirect, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { createLineItem, getLineItems } from "~/models/lineitem.server";
import { LineItem, Unit } from "@prisma/client";
import invariant from "tiny-invariant";

const ESTIMATE_ID = "cl0xzjpkv00083syf6vrbbahj";

type Size = {
  width: number;
  height: number;
};

type Rate = "LUMPSUM" | number;

type LineItemApp = {
  id: string;
  item: string;
  description: string;
  size?: Size;
  quantity: number;
  unit: Unit;
  rate: Rate;
  cost: number;
};

function toLineItemApp(lineItemDb: LineItem): LineItemApp {
  if (lineItemDb.width && lineItemDb.height) {
    return {
      id: lineItemDb.id,
      item: lineItemDb.item,
      description: lineItemDb.description,
      size: { width: lineItemDb.width, height: lineItemDb.height },
      quantity: lineItemDb.quantity,
      unit: lineItemDb.unit,
      rate: lineItemDb.rate ? lineItemDb.rate : "LUMPSUM",
      cost: lineItemDb.cost,
    };
  }

  return {
    id: lineItemDb.id,
    item: lineItemDb.item,
    description: lineItemDb.description,
    quantity: lineItemDb.quantity,
    unit: lineItemDb.unit,
    rate: lineItemDb.rate ? lineItemDb.rate : "LUMPSUM",
    cost: lineItemDb.cost,
  };
}

export const loader: LoaderFunction = async () => {
  const lineItmes = await getLineItems({
    estimateId: "cl0xzjpkv00083syf6vrbbahj",
  });

  return json(lineItmes.map(toLineItemApp));
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const item = formData.get("item")?.valueOf();
  const description = formData.get("description");
  const width = formData.get("width");
  const height = formData.get("height");
  const quantity = formData.get("quantity");
  const unit = formData.get("unit");
  const rate = formData.get("rate");
  const cost = formData.get("cost");

  invariant(typeof item === "string");
  invariant(typeof description === "string");
  invariant(typeof quantity === "string");
  invariant(typeof unit === "string");
  invariant(unit === "SFT");
  invariant(typeof rate === "string");
  invariant(typeof cost === "string");

  const payload: Omit<LineItem, "id"> = {
    item,
    description,
    width: width ? parseInt(width as string, 10) : null,
    height: height ? parseInt(height as string, 10) : null,
    quantity: parseInt(quantity, 10),
    unit,
    rate: parseInt(rate, 10),
    cost: parseInt(cost, 10),
    estimateId: ESTIMATE_ID,
  };

  await createLineItem(payload);

  return redirect("/table");
};

function AddLineItemFields() {
  return (
    <tr>
      <td className="border-2 p-4">
        <p>
          <label>
            Item{" "}
            <input
              type="text"
              name="item"
              className="border-2 p-2"
              form="add-line-item"
            />
          </label>
        </p>
      </td>
      <td className="border-2 p-4">
        <label>
          Description{" "}
          <input
            type="text"
            name="description"
            className="border-2 p-2"
            form="add-line-item"
          />
        </label>
      </td>
      <td className="border-2 p-4">
        <div>
          <p className="text-center text-2xl">Size</p>
          <label>
            Width{" "}
            <input
              type="number"
              name="width"
              className="border-2"
              form="add-line-item"
            />
          </label>
          <label>
            Height{" "}
            <input
              type="number"
              name="height"
              className="border-2"
              form="add-line-item"
            />
          </label>
        </div>
      </td>
      <td className="border-2 p-4">
        <label>
          Quanitity
          <input
            type="number"
            name="quantity"
            className="border-2 p-2"
            form="add-line-item"
          />
        </label>
      </td>
      <td className="border-2 p-4">
        <label>
          Unit
          <select name="unit" className="border-2 p-2" form="add-line-item">
            <option value="SFT">Square Feet</option>
            <option value="M">Metres</option>
          </select>
        </label>
      </td>
      <td className="border-2 p-4">
        <label>
          Rate
          <input
            type="number"
            name="rate"
            className="border-2 p-2"
            form="add-line-item"
          />
        </label>
      </td>
      <td className="border-2 p-4">
        <label>
          Cost
          <input
            type="number"
            name="cost"
            className="border-2 p-2"
            form="add-line-item"
          />
        </label>
      </td>
    </tr>
  );
}

export default function Table() {
  const lineItems = useLoaderData<LineItemApp[]>();
  return (
    <main className="flex min-h-screen items-center bg-slate-100">
      <div
        className="mx-auto rounded-lg bg-slate-100 shadow-xl"
        style={{ width: "85%" }}
      >
        <Form method="post" id="add-line-item" />
        <table className="mx-auto border-collapse bg-white text-left">
          <thead>
            <tr className="bg-slate-200 text-center">
              <th className="border-2 p-4">
                <div className="font-normal uppercase tracking-wide">Item</div>
              </th>
              <th className="border-2 p-4">
                <div className="font-normal uppercase tracking-wide">
                  Description
                </div>
              </th>
              <th className="border-2 p-4">
                <div className="font-normal uppercase tracking-wide">Size</div>
              </th>
              <th className="border-2 p-4">
                <div className="font-normal uppercase tracking-wide">
                  Quantity
                </div>
              </th>
              <th className="border-2 p-4">
                <div className="font-normal uppercase tracking-wide">Unit</div>
              </th>
              <th className="border-2 p-4">
                <div className="font-normal uppercase tracking-wide">Rate</div>
              </th>
              <th className="border-2 p-4">
                <div className="font-normal uppercase tracking-wide">Cost</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {lineItems.map((lineItem, index) => (
              <tr key={lineItem.id}>
                <td className="border-2 p-4">
                  <div className="font-light">{lineItem.item}</div>
                </td>
                <td className="border-2 p-4">
                  <div className="font-light">{lineItem.description}</div>
                </td>
                {lineItem.size ? (
                  <td className="border-2 p-4">
                    <div className="w-32">
                      <div className="block">
                        <span className="mr-2">{lineItem.size.width}</span>
                        <span>ft</span>
                      </div>
                      <div className="block">
                        <span className="mr-2">{lineItem.size.height}</span>
                        <span>ft</span>
                      </div>
                    </div>
                  </td>
                ) : (
                  <td className="border-2 p-4">N/A</td>
                )}
                <td className="border-2 p-4">{lineItem.quantity}</td>
                <td className="border-2 p-4">{lineItem.unit}</td>
                <td className="border-2 p-4">{lineItem.rate}</td>
                <td className="border-2 p-4">
                  {lineItem.cost.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </td>
              </tr>
            ))}
            <AddLineItemFields />
          </tbody>
        </table>
      </div>
      <button
        className="fixed bottom-4 right-4 rounded-lg bg-slate-300 px-8 py-2 text-lg"
        type="submit"
        form="add-line-item"
      >
        Add
      </button>
    </main>
  );
}
