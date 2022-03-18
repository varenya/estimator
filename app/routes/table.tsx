import { json, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";

type Size = {
  width: number;
  height: number;
};

type Unit = "SFT" | "M" | "NUMBER";

type Rate = "LUMPSUM" | number;

type LineItem = {
  id: string;
  item: string;
  description: string;
  size?: Size;
  quantity: number;
  unit: Unit;
  rate: Rate;
  cost: number;
};

export const loader: LoaderFunction = async () => {
  return json<LineItem[]>([
    {
      id: "1",
      item: "Safety Door",
      description:
        "38mm thick door including laminate on both sides with 18\" x 4' MS jaali in chrome finish. Door stopper, interlock, handles and hinges included.",
      size: { width: 3.5, height: 3.5 },
      quantity: 1,
      unit: "SFT",
      rate: "LUMPSUM",
      cost: 31450,
    },
    {
      id: "2",
      item: "Wood finish laminate ceiling & wall panelling at entry",
      description:
        "Framing made of 12mm plywood finished in approved wooden finish laminate.",
      quantity: 23.25,
      unit: "SFT",
      rate: 850,
      cost: 19762,
    },
  ]);
};

export default function Table() {
  const lineItems = useLoaderData<LineItem[]>();
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
