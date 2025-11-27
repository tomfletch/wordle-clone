import { useEffect } from "react";
import { useInputController } from "../context/InputController/useInputController";

export const useInput = (callback: (key: string) => void) => {
  const { subscribe } = useInputController();
  useEffect(() => subscribe(callback), [subscribe, callback]);
};
