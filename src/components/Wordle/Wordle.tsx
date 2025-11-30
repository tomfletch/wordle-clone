import { useState } from "react";
import { useAttemptDistribution } from "../../hooks/useAttemptDistribution";
import type { GameResult } from "../../types/GameResult";
import { EndScreen } from "../EndScreen/EndScreen";
import { WordleGame } from "../WordleGame/WordleGame";

export const Wordle = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [lastGameResult, setLastGameResult] = useState<GameResult | null>(null);
  const { recordWin } = useAttemptDistribution();

  const handleGameOver = (gameResult: GameResult) => {
    setIsPlaying(false);
    setLastGameResult(gameResult);

    if (gameResult.didWin) {
      recordWin(gameResult.attempts);
    }
  };

  const startGame = () => {
    setIsPlaying(true);
  };

  if (!isPlaying && lastGameResult) {
    return (
      <EndScreen gameResult={lastGameResult} onPlayAgain={() => startGame()} />
    );
  }

  return <WordleGame onGameOver={handleGameOver} />;
};
