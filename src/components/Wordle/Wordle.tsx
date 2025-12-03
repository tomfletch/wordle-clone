import { useState } from "react";
import { useStats } from "../../hooks/useStats";
import type { GameResult } from "../../types/GameResult";
import { EndScreen } from "../EndScreen/EndScreen";
import { WordleGame } from "../WordleGame/WordleGame";

export const Wordle = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [lastGameResult, setLastGameResult] = useState<GameResult | null>(null);
  const { recordGameResult } = useStats();

  const handleGameOver = (gameResult: GameResult) => {
    setIsPlaying(false);
    setLastGameResult(gameResult);
    recordGameResult(gameResult);
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
