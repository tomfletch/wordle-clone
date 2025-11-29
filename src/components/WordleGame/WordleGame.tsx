import { useEffect, useRef } from "react";
import { useActiveGuess } from "../../hooks/useActiveGuess";
import { useAnimationTimer } from "../../hooks/useAnimationTimer";
import { useEnter } from "../../hooks/useEnter";
import { useWordleGame } from "../../hooks/useWordleGame";
import type { GameResult } from "../../types/GameResult";
import { getLetterScores } from "../../utils/getLetterScores";
import { Keyboard } from "../Keyboard/Keyboard";
import { WordleLine } from "../WordleLine/WordleLine";
import styles from "./WordleGame.module.css";

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

const SHAKE_ANIMATION_DURATION = 600;

const FLIP_LETTER_DELAY = 100;
const FLIP_LETTER_DURATION = 1000;
const FLIP_ANIMATION_DURATION =
  (WORD_LENGTH - 1) * FLIP_LETTER_DELAY + FLIP_LETTER_DURATION;

const JUMP_ANIMATION_DURATION = 2000;

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
    useAnimationTimer(SHAKE_ANIMATION_DURATION);

  const { isAnimating: isFlipping, startAnimation: startFlip } =
    useAnimationTimer(FLIP_ANIMATION_DURATION);

  const { isAnimating: isJumping, startAnimation: startJump } =
    useAnimationTimer(JUMP_ANIMATION_DURATION);

  const canType = !isShaking && !isFlipping && !isJumping && !isGameOver;

  const { activeGuess, clearActiveGuess } = useActiveGuess({
    wordLength: WORD_LENGTH,
    isEnabled: canType,
  });

  useEnter(() => {
    if (!canType) return;
    const result = submitGuess(activeGuess);

    if (result === "correct") {
      clearActiveGuess();
      startFlip(() => startJump());
    } else if (result === "valid") {
      clearActiveGuess();
      startFlip();
    } else {
      startShake();
    }
  });

  useEffect(() => {
    if (isGameOver && !isJumping && !isFlipping) {
      const result: GameResult = hasWon
        ? { didWin: true, attempts: pastGuesses.length }
        : { didWin: false };

      onGameOverRef.current(result);
    }
  }, [isGameOver, hasWon, pastGuesses.length, isJumping, isFlipping]);

  const renderLine = (index: number) => {
    if (index < activeGuessIndex) {
      const { guess, score } = pastGuesses[index];

      return (
        <WordleLine
          key={index}
          value={guess}
          length={WORD_LENGTH}
          score={score}
          isJumping={isJumping && index === activeGuessIndex - 1}
        />
      );
    } else if (index === activeGuessIndex) {
      return (
        <WordleLine
          key={index}
          value={activeGuess}
          isShaking={isShaking}
          length={WORD_LENGTH}
          isInactive={isFlipping || isJumping}
        />
      );
    } else {
      return <WordleLine key={index} isInactive length={WORD_LENGTH} />;
    }
  };

  const letterScoreGuesses =
    isFlipping || isJumping ? pastGuesses.slice(0, -1) : pastGuesses;

  const letterScores = getLetterScores(letterScoreGuesses);

  return (
    <div className={styles.wordle}>
      {Array.from({ length: MAX_GUESSES }, (_, index) => renderLine(index))}
      <Keyboard letterScores={letterScores} />
    </div>
  );
};
