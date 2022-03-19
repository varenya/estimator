import { json, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { getLineItems } from "~/models/lineitem.server";
import { LineItem } from "@prisma/client";
import invariant from "tiny-invariant";

type Size = {
  width: number;
  height: number;
};

type Unit = "SFT" | "M" | "NUMBER";

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

export default function Table() {
  const lineItems = useLoaderData<LineItemApp[]>();
  return (
    <main className="flex min-h-screen items-center bg-slate-100">
      <div className="mx-auto w-4/6 overflow-hidden rounded-lg bg-slate-100 shadow-xl">
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
          </tbody>
        </table>
      </div>
    </main>
  );
}
