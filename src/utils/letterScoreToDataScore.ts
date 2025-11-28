import { LETTER_SCORE, type LetterScore } from "../types/LetterScore";

const LETTER_SCORE_TO_DATA_SCORE: Record<LetterScore, string> = {
  [LETTER_SCORE.CORRECT]: "correct",
  [LETTER_SCORE.ALMOST]: "almost",
  [LETTER_SCORE.INCORRECT]: "incorrect",
};

export const letterScoreToDataScore = (score: LetterScore | undefined) => {
  if (score === undefined) return undefined;
  return LETTER_SCORE_TO_DATA_SCORE[score];
};
