"use client";
import { useState } from "react";
import update from "immutability-helper";
import ProsOrConsList from "@/components/ProsOrConsList";

const decisionOptionHeaderClasses =
  "border-b-4 border-b-blue-800 text-blue-800 font-bold p-2 text-center self-end row-start-1";

interface Option {
  pros: string[];
  cons: string[];
}

type Decision = Option[];

export default function Home() {
  const [decision, setDecision] = useState<Decision>([
    {
      pros: [],
      cons: [],
    },
    {
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
        <h2 className={decisionOptionHeaderClasses}>Do it</h2>
        <ProsOrConsList
          sectionType="pros"
          prosOrCons={decision[0].pros}
          setProsOrCons={(newProsOrCons) =>
            setDecision(
              update(decision, { 0: { pros: { $set: newProsOrCons } } })
            )
          }
        />
        <ProsOrConsList
          sectionType="cons"
          prosOrCons={decision[0].cons}
          setProsOrCons={(newProsOrCons) =>
            setDecision(
              update(decision, { 0: { cons: { $set: newProsOrCons } } })
            )
          }
        />

        <h2 className={decisionOptionHeaderClasses}>Don&apos;t do it</h2>
        <ProsOrConsList
          sectionType="pros"
          prosOrCons={decision[1].pros}
          setProsOrCons={(newProsOrCons) =>
            setDecision(
              update(decision, { 1: { pros: { $set: newProsOrCons } } })
            )
          }
        />
        <ProsOrConsList
          sectionType="cons"
          prosOrCons={decision[1].cons}
          setProsOrCons={(newProsOrCons) =>
            setDecision(
              update(decision, { 1: { cons: { $set: newProsOrCons } } })
            )
          }
        />
      </div>
    </main>
  );
}
