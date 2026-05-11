import { IoCloseSharp } from "react-icons/io5";
import ITS from "../its";

export default function TutorialContainer({
  setCollapsed,
}: {
  setCollapsed?: (collapsed: boolean) => void;
}) {
  let currentLevel = 1;

  return (
    <div className="text-gray-500 p-3">
      <div className="p-1 w-full flex justify-end text-2xl text-black">
        <button
          onClick={() => setCollapsed && setCollapsed(true)}
          className="hover:cursor-pointer"
        >
          <IoCloseSharp />
        </button>
      </div>

      <div className="w-full">
        <p>{ITS[currentLevel - 1].text}</p>
        <div
          className="mt-4"
          dangerouslySetInnerHTML={{ __html: ITS[currentLevel - 1].html }}
        />
      </div>
    </div>
  );
}
