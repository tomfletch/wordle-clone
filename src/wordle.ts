export const LETTER_SCORE = {
  CORRECT: "C",
  ALMOST: "A",
  INCORRECT: "I",
} as const;

export type LetterScore = (typeof LETTER_SCORE)[keyof typeof LETTER_SCORE];

export const scoreGuess = (guess: string, answer: string): LetterScore[] => {
  if (guess.length !== answer.length) {
    throw new Error("Guess and answer must have the same number of letters");
  }

  const guessLetters = guess.split("");
  const answerLetters = answer.split("");

  // Fill the score array with INCORRECT
  const score: LetterScore[] = Array.from(
    { length: guessLetters.length },
    () => LETTER_SCORE.INCORRECT
  );

  // Score correctly guessed letters
  for (let i = 0; i < guessLetters.length; i++) {
    if (guessLetters[i] === answerLetters[i]) {
      score[i] = LETTER_SCORE.CORRECT;
      answerLetters[i] = "";
    }
  }

  // Score almost guessed letters
  for (let i = 0; i < guessLetters.length; i++) {
    if (score[i] !== LETTER_SCORE.INCORRECT) continue;

    const answerIndex = answerLetters.findIndex((l) => l === guessLetters[i]);

    if (answerIndex !== -1) {
      score[i] = LETTER_SCORE.ALMOST;
      answerLetters[answerIndex] = "";
    }
  }

  return score;
};

export const validateGuess = (
  guess: string,
  dictionary: Set<string>,
  previousGuesses: string[]
): boolean => {
  if (!dictionary.has(guess.toLowerCase())) return false;
  if (previousGuesses.includes(guess)) return false;
  return true;
};
