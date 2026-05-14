import { IoCloseSharp } from "react-icons/io5";
import { useEffect, useState, useMemo } from "react";
import ITS_Beginner from "../ITS-Beginner.json";
import ITS_Intermediate from "../ITS-intermediate.json";
import ITS_Expert from "../ITS-expert.json";
import type { ITS } from "../types";

const ITS_BEGINNER_JSON = ITS_Beginner as ITS[];
const ITS_INTERMEDIATE_JSON = ITS_Intermediate as ITS[];
const ITS_ADVANCED_JSON = ITS_Expert as ITS[];

export default function TutorialContainer({
  setCollapsed,
}: {
  setCollapsed?: (collapsed: boolean) => void;
}) {
  // --- State & Mastery Logic ---
  const [answer, setAnswer] = useState("");
  const [showCorrectMessage, setShowCorrectMessage] = useState(false);
  const [showIncorrectMessage, setShowIncorrectMessage] = useState(false);
  const [scoreTillStreak, setScoreTillStreak] = useState(0);
  const [numMistakes, setNumMistakes] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const streakThreshold = 5;

  // Retrieve persistent experience
  const [experience, setExperience] = useState(
    () => Number(localStorage.getItem("experience")) || 0,
  );

  // Domain Model: Selects the appropriate knowledge set based on XP or current Streak
  const ITS_DATA = useMemo(() => {
    if (experience >= 10 || scoreTillStreak >= 10) return ITS_ADVANCED_JSON;
    if (experience >= 5 || scoreTillStreak >= 5) return ITS_INTERMEDIATE_JSON;
    return ITS_BEGINNER_JSON;
  }, [experience, scoreTillStreak]);

  const totalLevels = ITS_DATA.length;

  const [currentLevel, setCurrentLevel] = useState(
    () => Number(localStorage.getItem("currentLevel")) || 0,
  );

  const safeCurrentLevel = Math.min(Math.max(currentLevel, 0), totalLevels - 1);
  const currentStep = ITS_DATA[safeCurrentLevel];

  // Sync index to local storage for persistence
  useEffect(() => {
    localStorage.setItem("currentLevel", safeCurrentLevel.toString());
  }, [safeCurrentLevel]);

  // --- Action Handlers ---

  const handleSubmit = () => {
    if (answer.trim().toLowerCase() === currentStep.answer.toLowerCase()) {
      setShowCorrectMessage(true);
      setShowIncorrectMessage(false);
      setNumMistakes(0);

      const newExp = experience + 1;
      setExperience(newExp);
      localStorage.setItem("experience", newExp.toString());

      setScoreTillStreak((prev) => prev + 1);
    } else {
      setShowCorrectMessage(false);
      const nextMistakeCount = numMistakes + 1;

      // TWO-MISTAKE DEMOTION: Revisit prerequisite concepts if student struggles
      if (nextMistakeCount >= 2) {
        setScoreTillStreak(0);
        setShowIncorrectMessage(false);
        setNumMistakes(0);
        setExperience(0);
        setCurrentLevel(0);
        localStorage.setItem("experience", "0");
        localStorage.setItem("currentLevel", "0");
      } else {
        setShowIncorrectMessage(true);
        setNumMistakes(nextMistakeCount);
        const newExp = Math.max(0, experience - 1);
        setExperience(newExp);
        localStorage.setItem("experience", newExp.toString());
      }
    }
  };

  const handleNext = () => {
    setShowCorrectMessage(false);
    setShowIncorrectMessage(false);
    setAnswer("");

    // Progression: Level up if streak threshold is met
    if (scoreTillStreak >= streakThreshold) {
      if (ITS_DATA === ITS_ADVANCED_JSON) {
        setIsFinished(true); // Signal completion of Expert level
      } else {
        setCurrentLevel(0);
        setScoreTillStreak(0); // Reset streak for the next module
      }
    }
    // Normal linear progression
    else if (safeCurrentLevel < totalLevels - 1) {
      setCurrentLevel(safeCurrentLevel + 1);
    }
    // Fallback: Loop back if end reached without mastery
    else {
      const randomIndex = Math.floor(Math.random() * totalLevels);
      setCurrentLevel(randomIndex);
      setScoreTillStreak(0);
    }
  };

  // --- Final Mastery View ---
  if (isFinished) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-white to-sky-50 animate-in fade-in duration-700">
        <h2 className="text-2xl font-bold text-sky-900 mb-2">
          🎓 Curriculum Mastered!
        </h2>
        <p className="text-gray-600 mb-8">
          Congratulations! You've successfully navigated the component hierarchy
          and mastered the flow of props.
        </p>
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-sky-100 w-full mb-8">
          <p className="text-xs uppercase tracking-widest text-sky-500 font-bold mb-1">
            Final Mastery Points
          </p>
          <p className="text-4xl font-black text-black">{experience} XP</p>
        </div>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          className="w-full py-4 hover:cursor-pointer bg-sky-600 text-white font-bold rounded-xl hover:bg-sky-700 transition-all shadow-lg active:scale-95 -mt-5"
        >
          Restart Tutorial
        </button>
      </div>
    );
  }

  if (!currentStep) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500 italic">
        Loading tutorial module...
      </div>
    );
  }

  // --- Standard Tutorial View ---
  return (
    <div className="h-full overflow-y-auto text-gray-500 p-4 bg-white shadow-xl">
      {/* Header with Mastery Metadata */}
      <div className="p-1 w-full flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-sky-800 leading-tight">
            Level:{" "}
            <span className="text-black capitalize">
              {experience >= 10 || scoreTillStreak >= 10
                ? "Expert"
                : experience >= 5 || scoreTillStreak >= 5
                  ? "Intermediate"
                  : "Beginner"}
            </span>
          </h3>
          <div className="flex gap-3 mt-1 text-xs font-medium uppercase tracking-wider">
            <span className="text-gray-500">Exp: {experience}</span>
            <span
              className={
                scoreTillStreak > 0 ? "text-orange-500" : "text-gray-400"
              }
            >
              Streak: {Math.min(scoreTillStreak, streakThreshold)}/
              {streakThreshold}
            </span>
            {numMistakes > 0 && (
              <span className="text-red-500">Mistakes: {numMistakes}/2</span>
            )}
          </div>
        </div>
        <button
          onClick={() => setCollapsed && setCollapsed(true)}
          className="hover:cursor-pointer text-2xl text-black transition-transform hover:scale-110"
        >
          <IoCloseSharp />
        </button>
      </div>

      {/* Main Instruction Area */}
      <div className="w-full">
        <p className="text-black text-base leading-relaxed mb-8">
          {currentStep.text}
        </p>

        {currentStep.showInput && (
          <div className="mt-4">
            {!showCorrectMessage ? (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <input
                  type="text"
                  value={answer}
                  autoFocus
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all"
                  placeholder="Type your answer here..."
                />
                <button
                  onClick={handleSubmit}
                  className="mt-4 w-full cursor-pointer bg-blue-600 text-white font-bold p-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg active:scale-[0.98]"
                >
                  Submit Answer
                </button>
              </div>
            ) : (
              <div className="animate-in zoom-in duration-300 space-y-6">
                <div className="p-5 bg-green-50 border-l-8 border-green-500 rounded-r-xl shadow-sm">
                  <p className="text-green-800 text-md leading-relaxed">
                    <span className="font-bold block mb-1">Excellent!</span>
                    {currentStep.correctMessage}
                  </p>
                </div>
                <button
                  onClick={handleNext}
                  className="w-full cursor-pointer bg-green-600 text-white font-black p-4 rounded-xl hover:bg-green-700 transition-all shadow-lg active:scale-95"
                >
                  {scoreTillStreak >= streakThreshold
                    ? "PROMOTE TO NEXT LEVEL"
                    : "NEXT QUESTION"}
                </button>
              </div>
            )}

            {showIncorrectMessage && !showCorrectMessage && (
              <div className="mt-6 p-5 bg-red-50 border-l-8 border-red-500 rounded-r-xl animate-in shake duration-300">
                <p className="text-red-800 text-md">
                  <span className="font-bold block mb-1">Not quite!</span>
                  {currentStep.incorrectMessage}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
