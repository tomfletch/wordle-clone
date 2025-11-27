import { useInputController } from "../../context/InputController/useInputController";
import styles from "./Keyboard.module.css";

const ROWS = [
  "QWERTYUIOP".split(""),
  "ASDFGHJKL".split(""),
  ["Enter", ..."ZXCVBNM".split(""), "Backspace"],
];

export const Keyboard = () => {
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
            >
              {key === "Backspace" ? "⌫" : key.toUpperCase()}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};
