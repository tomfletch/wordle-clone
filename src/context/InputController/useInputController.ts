import { useContext } from "react";
import { InputControllerContext } from "./InputControllerContext";

export const useInputController = () => {
  const context = useContext(InputControllerContext);

  if (!context) {
    throw new Error(
      "useInputController can only be used within InputControllerProvider"
    );
  }

  return context;
};
