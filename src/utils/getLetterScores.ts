import { LETTER_SCORE, type LetterScore } from "../types/LetterScore";

type Guess = { guess: string; score: LetterScore[] };

const SCORE_PRIORITY: Record<LetterScore, number> = {
  [LETTER_SCORE.INCORRECT]: 0,
  [LETTER_SCORE.ALMOST]: 1,
  [LETTER_SCORE.CORRECT]: 2,
};

const getScorePriority = (score?: LetterScore) => {
  return score ? SCORE_PRIORITY[score] : -1;
};

export const getLetterScores = (
  guesses: Guess[]
): Record<string, LetterScore> => {
  const keyScores: Record<string, LetterScore> = {};

  for (const { guess, score } of guesses) {
    for (let i = 0; i < guess.length; i++) {
      const letter = guess[i];
      const letterScore = score[i];
      const scorePriority = getScorePriority(letterScore);

      const currentScore = keyScores[letter];
      const currentScorePriority = getScorePriority(currentScore);

      if (scorePriority > currentScorePriority) {
        keyScores[letter] = letterScore;
      }
    }
  }

  return keyScores;
};
