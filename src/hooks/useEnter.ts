import { useInput } from "./useInput";

export const useEnter = (onEnter: () => void) => {
  useInput((key) => {
    if (key === "Enter") {
      onEnter();
    }
  });
};
