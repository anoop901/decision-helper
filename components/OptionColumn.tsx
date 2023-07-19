import update from "immutability-helper";
import { Option } from "@/model/decision";
import ProsOrConsList from "./ProsOrConsList";
import { MdClose } from "react-icons/md";
import { TextareaAutosize } from "@mui/base";

export default function OptionColumn({
  option,
  setOption,
  showRemoveButton,
  removeOption,
}: {
  option: Option;
  setOption: (option: Option) => void;
  showRemoveButton: boolean;
  removeOption: () => void;
}) {
  return (
    <>
      <h2 className="border-b-4 border-b-blue-800 self-end row-start-1 flex items-center">
        <TextareaAutosize
          className="text-blue-800 font-bold p-1 text-center hover:bg-gray-500/20 transition rounded-md grow resize-none"
          value={option.name}
          onChange={(e) => {
            const newValue = e.currentTarget.value;
            setOption(update(option, { name: { $set: newValue } }));
          }}
        />
        {showRemoveButton && (
          <button
            className="text-gray-500 p-2 rounded-full hover:bg-gray-500/20 transition"
            onClick={() => {
              removeOption();
            }}
          >
            <MdClose />
          </button>
        )}
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
