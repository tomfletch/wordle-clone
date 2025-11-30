import { useState } from "react";

const getLocalStorage = <T>(key: string, initialValue: T): T => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : initialValue;
  } catch (error) {
    console.error(`Failed to fetch localStorage for key '${key}':`, error);
    return initialValue;
  }
};

const setLocalStorage = <T>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to set localStorage for key '${key}':`, error);
  }
};

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (newValue: T | ((prevValue: T) => T)) => void] => {
  const [state, setState] = useState<T>(() =>
    getLocalStorage(key, initialValue)
  );

  const update = (newValue: T | ((prevValue: T) => T)) => {
    setState((prev) => {
      const value =
        typeof newValue === "function"
          ? (newValue as (p: T) => T)(prev)
          : newValue;
      setLocalStorage(key, value);
      return value;
    });
  };

  return [state, update] as const;
};
