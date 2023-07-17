import update from "immutability-helper";
import { Option } from "@/model/decision";
import ProsOrConsList from "./ProsOrConsList";

export default function OptionColumn({
  option,
  setOption,
}: {
  option: Option;
  setOption: (option: Option) => void;
}) {
  return (
    <>
      <h2 className="border-b-4 border-b-blue-800 text-blue-800 font-bold p-2 text-center self-end row-start-1">
        Do it
      </h2>
      <ProsOrConsList
        sectionType="pros"
        prosOrCons={option.pros}
        setProsOrCons={(newProsOrCons) =>
          setOption(update(option, { pros: { $set: newProsOrCons } }))
        }
      />
      <ProsOrConsList
        sectionType="cons"
        prosOrCons={option.cons}
        setProsOrCons={(newProsOrCons) =>
          setOption(update(option, { cons: { $set: newProsOrCons } }))
        }
      />
    </>
  );
}
