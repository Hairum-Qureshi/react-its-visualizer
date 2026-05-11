import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import ITS from "../../public/ITS.json";

export default function TutorialContainer({
  setCollapsed,
}: {
  setCollapsed?: (collapsed: boolean) => void;
}) {
  const [answer, setAnswer] = useState("");
  const [showCorrectMessage, setShowCorrectMessage] = useState(false);
  const [showIncorrectMessage, setShowIncorrectMessage] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(
    Number(localStorage.getItem("currentLevel")) || 1,
  );

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
        <p className="text-black">{ITS[currentLevel - 1].text}</p>
        {ITS[currentLevel - 1].showInput && (
          <div className="mt-4">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Type your answer here..."
            />
            <div className="my-3">
              {showCorrectMessage && (
                <p className="text-green-500 mt-2">
                  {ITS[currentLevel - 1].correctMessage}
                </p>
              )}
              {showIncorrectMessage && (
                <p className="text-red-500 mt-2">
                  {ITS[currentLevel - 1].incorrectMessage}
                </p>
              )}
            </div>
            <button
              onClick={() => {
                if (
                  answer.trim().toLowerCase() ===
                  ITS[currentLevel - 1].answer.toLowerCase()
                ) {
                  setShowCorrectMessage(true);
                  setShowIncorrectMessage(false);
                  setAnswer("");
                } else {
                  setShowCorrectMessage(false);
                  setShowIncorrectMessage(true);
                }
              }}
              className="mt-2 w-full hover:cursor-pointer bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
            {showCorrectMessage && currentLevel <= ITS.length && (
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => {
                    setShowCorrectMessage(false);
                    setAnswer("");
                    const nextLevel = currentLevel + 1;
                    setCurrentLevel(nextLevel);
                    localStorage.setItem("currentLevel", nextLevel.toString());
                  }}
                  className="bg-green-500 text-white px-4 py-2 hover:cursor-pointer rounded hover:bg-green-600"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
