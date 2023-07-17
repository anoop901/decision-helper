"use client";
import { useState } from "react";
import update from "immutability-helper";
import clsx from "clsx";
import { MdAdd } from "react-icons/md";

const decisionOptionHeaderClasses =
  "rounded-xl bg-blue-400 border-blue-800 text-white font-bold p-2 text-center";
const prosConsHeaderClasses = "font-semibold text-center border-gray-300 p-2";
const prosConsSectionClasses =
  "rounded-xl sm:mx-8 flex flex-col gap-1 overflow-hidden";

interface ProsCons {
  pros: string[];
  cons: string[];
}

type DecisionInfo = ProsCons[];

function ProsConsList({
  prosOrCons,
  setProsOrCons,
}: {
  prosOrCons: string[];
  setProsOrCons: (prosOrCons: string[]) => void;
}) {
  function addNewProOrCon() {
    setProsOrCons(update(prosOrCons, { $push: [""] }));
  }
  return (
    <>
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
    </>
  );
}

export default function Home() {
  const [info, setInfo] = useState<DecisionInfo>([
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
      <h1 className="text-3xl font-bold">Decision Helper</h1>
      <p>Use this tool to help you visualize your decision-making process.</p>
      <div className="grid grid-cols-2 gap-4 w-full sm:w-5/6 max-w-3xl items-start">
        <h2 className={decisionOptionHeaderClasses}>Do it</h2>

        <h2 className={decisionOptionHeaderClasses}>Don&apos;t do it</h2>
        <div className={clsx(prosConsSectionClasses, "bg-green-100")}>
          <h3 className={clsx(prosConsHeaderClasses, "bg-green-300")}>Pros</h3>
          <ProsConsList
            prosOrCons={info[0].pros}
            setProsOrCons={(newProsOrCons) =>
              setInfo(update(info, { 0: { pros: { $set: newProsOrCons } } }))
            }
          />
        </div>
        <div className={clsx(prosConsSectionClasses, "bg-green-100")}>
          <h3 className={clsx(prosConsHeaderClasses, "bg-green-300")}>Pros</h3>
          <ProsConsList
            prosOrCons={info[1].pros}
            setProsOrCons={(newProsOrCons) =>
              setInfo(update(info, { 1: { pros: { $set: newProsOrCons } } }))
            }
          />
        </div>
        <div className={clsx(prosConsSectionClasses, "bg-red-100")}>
          <h3 className={clsx(prosConsHeaderClasses, "bg-red-300")}>Cons</h3>
          <ProsConsList
            prosOrCons={info[0].cons}
            setProsOrCons={(newProsOrCons) =>
              setInfo(update(info, { 0: { cons: { $set: newProsOrCons } } }))
            }
          />
        </div>
        <div className={clsx(prosConsSectionClasses, "bg-red-100")}>
          <h3 className={clsx(prosConsHeaderClasses, "bg-red-300")}>Cons</h3>
          <ProsConsList
            prosOrCons={info[1].cons}
            setProsOrCons={(newProsOrCons) =>
              setInfo(update(info, { 1: { cons: { $set: newProsOrCons } } }))
            }
          />
        </div>
      </div>
    </main>
  );
}
