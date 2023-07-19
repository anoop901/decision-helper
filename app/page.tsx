"use client";
import { useState } from "react";
import update from "immutability-helper";
import OptionColumn from "@/components/OptionColumn";
import Decision from "@/model/decision";
import { BsPlusCircleFill } from "react-icons/bs";

export default function Home() {
  const [decision, setDecision] = useState<Decision>([
    {
      name: "Do it",
      pros: [],
      cons: [],
    },
    {
      name: "Don't do it",
      pros: [],
      cons: [],
    },
  ]);

  return (
    <main className="flex min-h-screen flex-col items-center space-y-5 py-5">
      <h1 className="text-3xl text-center font-bold">Decision Helper</h1>
      <p className="text-center">
        Use this tool to help you visualize your decision-making process.
      </p>
      <div
        className="max-w-full overflow-x-auto grid gap-x-8 gap-y-2 items-start"
        style={{
          gridTemplateColumns: `repeat(${decision.length}, 250px) auto`,
        }}
      >
        {decision.map((option, index) => (
          <OptionColumn
            key={index}
            option={option}
            setOption={(option) =>
              setDecision(update(decision, { [index]: { $set: option } }))
            }
            removeOption={() => {
              setDecision(update(decision, { $splice: [[index, 1]] }));
            }}
            showRemoveButton={decision.length > 1}
          />
        ))}
        <button
          className="row-start-1 self-center flex gap-1 items-center p-2 rounded-full hover:bg-gray-500/20 transition"
          onClick={() => {
            setDecision(
              update(decision, {
                $push: [
                  {
                    name: `Option ${decision.length + 1}`,
                    pros: [],
                    cons: [],
                  },
                ],
              })
            );
          }}
        >
          <BsPlusCircleFill className="text-blue-800" />
        </button>
      </div>
    </main>
  );
}
