import { useState } from "react";
import { useKeyboard } from "./useKeyboard";

export const useActiveGuess = ({
  wordLength,
  isEnabled = true,
}: {
  wordLength: number;
  isEnabled?: boolean;
}) => {
  const [activeGuess, setActiveGuess] = useState("");

  useKeyboard((key) => {
    if (!isEnabled) return;
    if (key.match(/^[a-zA-Z]$/) && activeGuess.length < wordLength) {
      setActiveGuess((prev) => prev + key.toLowerCase());
    } else if (key === "Backspace") {
      setActiveGuess((prev) => prev.slice(0, -1));
    }
  });

  const clearActiveGuess = () => setActiveGuess("");

  return { activeGuess, clearActiveGuess };
};
