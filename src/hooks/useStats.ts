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

  const winRate = stats.gamesPlayed
    ? (stats.gamesWon / stats.gamesPlayed) * 100
    : 0;

  const averageGuesses = stats.gamesWon
    ? Object.entries(stats.distribution).reduce((sum, [attempts, count]) => {
        return sum + Number(attempts) * count;
      }, 0) / stats.gamesWon
    : 0;

  return {
    gamesPlayed: stats.gamesPlayed,
    gamesWon: stats.gamesWon,
    gamesLost: stats.gamesPlayed - stats.gamesWon,
    winRate,
    averageGuesses,
    distribution: stats.distribution,
    recordGameResult,
  };
};
