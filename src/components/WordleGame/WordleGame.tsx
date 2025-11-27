import { useEffect, useRef } from "react";
import { useActiveGuess } from "../../hooks/useActiveGuess";
import { useAnimationTimer } from "../../hooks/useAnimationTimer";
import { useEnter } from "../../hooks/useEnter";
import { useWordleGame } from "../../hooks/useWordleGame";
import type { GameResult } from "../../types/GameResult";
import { Keyboard } from "../Keyboard/Keyboard";
import { WordleLine } from "../WordleLine/WordleLine";
import styles from "./WordleGame.module.css";

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

type WordleGameProps = {
  onGameOver: (gameResult: GameResult) => void;
};

export const WordleGame = ({ onGameOver }: WordleGameProps) => {
  const onGameOverRef = useRef(onGameOver);

  useEffect(() => {
    onGameOverRef.current = onGameOver;
  }, [onGameOver]);

  const { pastGuesses, activeGuessIndex, isGameOver, hasWon, submitGuess } =
    useWordleGame({ maxGuesses: MAX_GUESSES });

  const { isAnimating: isShaking, startAnimation: startShake } =
    useAnimationTimer(500);

  const canType = !isShaking && !isGameOver;

  const { activeGuess, clearActiveGuess } = useActiveGuess({
    wordLength: WORD_LENGTH,
    isEnabled: canType,
  });

  useEnter(() => {
    if (!canType) return;
    const result = submitGuess(activeGuess);

    if (result === "valid") {
      clearActiveGuess();
    } else {
      startShake();
    }
  });

  useEffect(() => {
    if (isGameOver) {
      if (hasWon) {
        onGameOverRef.current({ didWin: true, attempts: pastGuesses.length });
      } else {
        onGameOverRef.current({ didWin: false });
      }
    }
  }, [isGameOver, hasWon, pastGuesses.length]);

  const renderLine = (index: number) => {
    if (index < activeGuessIndex) {
      const { guess, score } = pastGuesses[index];

      return (
        <WordleLine
          key={index}
          value={guess}
          length={WORD_LENGTH}
          score={score}
        />
      );
    } else if (index === activeGuessIndex) {
      return (
        <WordleLine
          key={index}
          value={activeGuess}
          isShaking={isShaking}
          length={WORD_LENGTH}
        />
      );
    } else {
      return <WordleLine key={index} isInactive length={WORD_LENGTH} />;
    }
  };

  return (
    <div className={styles.wordle}>
      {Array.from({ length: MAX_GUESSES }, (_, index) => renderLine(index))}
      <Keyboard />
    </div>
  );
};
