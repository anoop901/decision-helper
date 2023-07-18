"use client";
import { useState } from "react";
import update from "immutability-helper";
import OptionColumn from "@/components/OptionColumn";
import Decision from "@/model/decision";

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
      <div className="grid grid-cols-2 gap-x-2 sm:gap-x-8 gap-y-2 w-full sm:w-5/6 max-w-3xl items-start">
        {decision.map((option, index) => (
          <OptionColumn
            key={index}
            option={option}
            setOption={(option) =>
              setDecision(update(decision, { [index]: { $set: option } }))
            }
          />
        ))}
      </div>
    </main>
  );
}
