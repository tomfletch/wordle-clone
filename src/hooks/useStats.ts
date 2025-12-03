import type { GameResult } from "../types/GameResult";
import { useLocalStorage } from "./useLocalStorage";

export const useStats = () => {
  const [stats, setStats] = useLocalStorage<{
    gamesPlayed: number;
    gamesWon: number;
    distribution: Record<number, number>;
  }>("game-stats", {
    gamesPlayed: 0,
    gamesWon: 0,
    distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
  });

  const updateDistribution = (
    distribution: Record<number, number>,
    gameResult: GameResult
  ) => {
    if (gameResult.didWin) {
      return {
        ...distribution,
        [gameResult.attempts]: (distribution[gameResult.attempts] || 0) + 1,
      };
    }
    return distribution;
  };

  const recordGameResult = (gameResult: GameResult) => {
    if (
      gameResult.didWin &&
      (gameResult.attempts < 1 || gameResult.attempts > 6)
    ) {
      throw new Error("Attempts must be between 1 and 6");
    }

    setStats((prev) => ({
      gamesPlayed: prev.gamesPlayed + 1,
      gamesWon: prev.gamesWon + (gameResult.didWin ? 1 : 0),
      distribution: updateDistribution(prev.distribution, gameResult),
    }));
  };

  return {
    gamesPlayed: stats.gamesPlayed,
    gamesWon: stats.gamesWon,
    gamesLost: stats.gamesPlayed - stats.gamesWon,
    distribution: stats.distribution,
    recordGameResult,
  };
};
