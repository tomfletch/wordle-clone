import { useLocalStorage } from "./useLocalStorage";

export const useAttemptDistribution = () => {
  const [distribution, setDistribution] = useLocalStorage<
    Record<number, number>
  >("attempt-distribution", { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });

  const recordWin = (attempts: number) => {
    if (attempts < 1 || attempts > 6) {
      throw new Error("Attempts must be between 1 and 6");
    }
    setDistribution((prev) => ({
      ...prev,
      [attempts]: (prev[attempts] || 0) + 1,
    }));
  };

  return { distribution, recordWin };
};
