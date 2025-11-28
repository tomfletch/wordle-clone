import { useState } from "react";
import { DICTIONARY } from "../data/dictionary";
import type { LetterScore } from "../types/LetterScore";
import { getRandomAnswer } from "../utils/getRandomAnswer";
import { scoreGuess, validateGuess } from "../wordle";

const usePastGuesses = () => {
  const [pastGuesses, setGuesses] = useState<
    { guess: string; score: LetterScore[] }[]
  >([]);

  const addGuess = (guess: { guess: string; score: LetterScore[] }) => {
    setGuesses((prev) => [...prev, guess]);
  };

  return { pastGuesses, addGuess };
};

export const useWordleGame = ({ maxGuesses }: { maxGuesses: number }) => {
  const [answer] = useState(getRandomAnswer);
  const { pastGuesses, addGuess } = usePastGuesses();
  const activeGuessIndex = pastGuesses.length;

  const hasWon = pastGuesses[activeGuessIndex - 1]?.guess === answer;
  const isGameOver = activeGuessIndex >= maxGuesses || hasWon;

  const submitGuess = (guess: string): "correct" | "valid" | "invalid" => {
    if (isGameOver) {
      throw new Error("Game is over");
    }

    const pastGuessesList = pastGuesses.map((g) => g.guess);

    if (validateGuess(guess, DICTIONARY, pastGuessesList)) {
      addGuess({ guess: guess, score: scoreGuess(guess, answer) });
      return guess === answer ? "correct" : "valid";
    } else {
      return "invalid";
    }
  };

  return {
    pastGuesses,
    activeGuessIndex,
    isGameOver,
    hasWon,
    submitGuess,
  };
};
