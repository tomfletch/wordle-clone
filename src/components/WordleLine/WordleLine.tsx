import { LETTER_SCORE, type LetterScore } from "../../wordle";
import styles from "./WordleLine.module.css";

type WordleLineProps = {
  length: number;
  value?: string;
  isInactive?: boolean;
  isInvalid?: boolean;
  isShaking?: boolean;
  score?: LetterScore[];
};

const LETTER_SCORE_TO_DATA_SCORE: Record<LetterScore, string> = {
  [LETTER_SCORE.CORRECT]: "correct",
  [LETTER_SCORE.ALMOST]: "almost",
  [LETTER_SCORE.INCORRECT]: "incorrect",
};

const letterScoreToDataScore = (score: LetterScore | undefined) => {
  if (score === undefined) return undefined;
  return LETTER_SCORE_TO_DATA_SCORE[score];
};

export const WordleLine = ({
  length,
  value,
  score,
  isInactive = false,
  isShaking = false,
}: WordleLineProps) => {
  return (
    <div
      data-testid="line"
      className={styles.line}
      data-inactive={isInactive}
      data-shake={isShaking}
    >
      {Array.from({ length }).map((_, index) => {
        const letter = value?.[index] ?? "";
        const letterScore = score?.[index];

        return (
          <span
            key={index}
            data-testid="letter"
            className={styles.letter}
            data-score={letterScoreToDataScore(letterScore)}
            data-letter={letter}
          >
            {letter}
          </span>
        );
      })}
    </div>
  );
};
