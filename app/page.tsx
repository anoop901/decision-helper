"use client";
import { useState } from "react";
import update from "immutability-helper";
import clsx from "clsx";
import { MdAdd } from "react-icons/md";

const decisionOptionHeaderClasses =
  "border-b-4 border-b-blue-800 text-blue-800 font-bold p-2 text-center self-end";

interface Option {
  pros: string[];
  cons: string[];
}

type Decision = Option[];

function ProsOrConsList({
  sectionType,
  prosOrCons,
  setProsOrCons,
}: {
  sectionType: "pros" | "cons";
  prosOrCons: string[];
  setProsOrCons: (prosOrCons: string[]) => void;
}) {
  function addNewProOrCon() {
    setProsOrCons(update(prosOrCons, { $push: [""] }));
  }
  return (
    <div
      className={clsx("rounded-xl flex flex-col gap-1 overflow-hidden", {
        "bg-green-100": sectionType === "pros",
        "bg-red-100": sectionType === "cons",
      })}
    >
      <h3
        className={clsx("font-semibold text-center border-gray-300 p-2", {
          "bg-green-300": sectionType === "pros",
          "bg-red-300": sectionType === "cons",
        })}
      >
        {sectionType === "pros" && "Pros"}
        {sectionType === "cons" && "Cons"}
      </h3>
      <ul className="flex flex-col gap-1">
        {prosOrCons.map((proOrCon, index) => (
          <li
            key={index}
            className={"p-1 rounded-md transition overflow-hidden"}
          >
            <form
              onSubmit={(e) => {
                addNewProOrCon();
                e.preventDefault();
              }}
            >
              <input
                autoFocus
                type="text"
                className="p-1 w-full bg-transparent rounded-md hover:bg-white focus:bg-white transition"
                value={proOrCon}
                onChange={(e) => {
                  setProsOrCons(
                    update(prosOrCons, {
                      [index]: { $set: e.currentTarget.value },
                    })
                  );
                }}
                onBlur={() => {
                  if (prosOrCons[index] === "") {
                    setProsOrCons(
                      update(prosOrCons, { $splice: [[index, 1]] })
                    );
                  }
                }}
              />
            </form>
          </li>
        ))}
      </ul>
      <button
        className="rounded-md border-2 border-gray-300 bg-gray-100 px-2 py-1 self-center hover:bg-gray-200 transition m-1 flex gap-1 items-center"
        onClick={() => {
          addNewProOrCon();
        }}
      >
        <MdAdd />
        <span className="font-semibold">Add</span>
      </button>
    </div>
  );
}

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

        <h2 className={decisionOptionHeaderClasses}>Don&apos;t do it</h2>
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
          prosOrCons={decision[0].cons}
          setProsOrCons={(newProsOrCons) =>
            setDecision(
              update(decision, { 0: { cons: { $set: newProsOrCons } } })
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
