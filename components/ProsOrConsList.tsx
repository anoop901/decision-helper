import clsx from "clsx";
import update from "immutability-helper";
import { MdAdd, MdClose } from "react-icons/md";
import TextareaAutosize from "@mui/base/TextareaAutosize";

export default function ProsOrConsList({
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
  function deleteProOrCon(index: number) {
    setProsOrCons(update(prosOrCons, { $splice: [[index, 1]] }));
  }
  return (
    <div
      className={clsx("rounded-xl flex flex-col gap-1 overflow-hidden", {
        "bg-green-100 row-start-2": sectionType === "pros",
        "bg-red-100 row-start-3": sectionType === "cons",
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
            className={
              "p-1 rounded-md transition overflow-hidden flex items-center"
            }
          >
            <form
              className="grow"
              onSubmit={(e) => {
                addNewProOrCon();
                e.preventDefault();
              }}
            >
              <TextareaAutosize
                autoFocus
                className="p-1 w-full bg-transparent rounded-md focus:bg-white transition hover:bg-gray-500/20 resize-none"
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
                    deleteProOrCon(index);
                  }
                }}
              />
            </form>
            <button
              className="text-gray-500 p-2 rounded-full hover:bg-gray-500/20 transition"
              onClick={() => {
                deleteProOrCon(index);
              }}
            >
              <MdClose />
            </button>
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
