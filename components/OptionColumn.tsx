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
      <h2 className="border-b-4 border-b-blue-800 self-end row-start-1 flex flex-col">
        <input
          className="text-blue-800 font-bold p-1 text-center hover:bg-gray-100 rounded-md"
          type="text"
          value={option.name}
          onChange={(e) => {
            const newValue = e.currentTarget.value;
            setOption(update(option, { name: { $set: newValue } }));
          }}
        />
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
