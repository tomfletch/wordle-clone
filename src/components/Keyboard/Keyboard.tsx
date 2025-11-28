import { useInputController } from "../../context/InputController/useInputController";
import type { LetterScore } from "../../types/LetterScore";
import { letterScoreToDataScore } from "../../utils/letterScoreToDataScore";
import styles from "./Keyboard.module.css";

const ROWS = [
  "QWERTYUIOP".split(""),
  "ASDFGHJKL".split(""),
  ["Enter", ..."ZXCVBNM".split(""), "Backspace"],
];

type KeyboardProps = {
  letterScores?: Record<string, LetterScore>;
};

export const Keyboard = ({ letterScores = {} }: KeyboardProps) => {
  const { pressKey } = useInputController();

  return (
    <div role="group" aria-label="Virtual keyboard">
      {ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {row.map((key) => (
            <button
              key={key}
              aria-label={key}
              onClick={() => pressKey(key)}
              className={styles.key}
              style={{
                minWidth:
                  key === "Enter" || key === "Backspace" ? "64px" : undefined,
              }}
              data-score={letterScoreToDataScore(
                letterScores[key.toLowerCase()]
              )}
            >
              {key === "Backspace" ? "⌫" : key.toUpperCase()}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};
