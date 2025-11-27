import { useCallback, useEffect, useRef, type ReactNode } from "react";
import {
  InputControllerContext,
  type Listener,
} from "./InputControllerContext";

type InputControllerProviderProps = {
  children: ReactNode;
};

export const InputControllerProvider = ({
  children,
}: InputControllerProviderProps) => {
  const listeners = useRef<Set<Listener>>(new Set());

  const subscribe = useCallback((listener: Listener) => {
    listeners.current.add(listener);
    return () => listeners.current.delete(listener);
  }, []);

  const pressKey = useCallback((key: string) => {
    for (const listener of listeners.current) {
      listener(key);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      pressKey(event.key);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [pressKey]);

  return (
    <InputControllerContext.Provider value={{ pressKey, subscribe }}>
      {children}
    </InputControllerContext.Provider>
  );
};
