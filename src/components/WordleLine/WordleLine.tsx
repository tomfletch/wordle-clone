import type { LetterScore } from "../../types/LetterScore";
import { letterScoreToDataScore } from "../../utils/letterScoreToDataScore";
import styles from "./WordleLine.module.css";

type WordleLineProps = {
  length: number;
  value?: string;
  isInactive?: boolean;
  isInvalid?: boolean;
  isShaking?: boolean;
  score?: LetterScore[];
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
