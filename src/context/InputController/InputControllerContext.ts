import { createContext } from "react";

export type Listener = (key: string) => void;

export const InputControllerContext = createContext<{
  pressKey: (key: string) => void;
  subscribe: (listener: Listener) => () => void;
} | null>(null);
