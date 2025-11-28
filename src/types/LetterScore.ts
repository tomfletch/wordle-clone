export const LETTER_SCORE = {
  CORRECT: "C",
  ALMOST: "A",
  INCORRECT: "I",
} as const;

export type LetterScore = (typeof LETTER_SCORE)[keyof typeof LETTER_SCORE];
