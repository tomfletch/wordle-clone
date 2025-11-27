import { useKeyboard } from "./useKeyboard";

export const useEnter = (onEnter: () => void) => {
  useKeyboard((key) => {
    if (key === "Enter") {
      onEnter();
    }
  });
};
