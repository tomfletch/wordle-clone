import { useAttemptDistribution } from "../../hooks/useAttemptDistribution";
import type { GameResult } from "../../types/GameResult";
import { Chart } from "../Chart/Chart";
import styles from "./EndScreen.module.css";

const WIN_WORDS = [
  "Genius",
  "Magnificent",
  "Impressive",
  "Splendid",
  "Great",
  "Phew",
];

type EndScreenProps = {
  gameResult: GameResult;
  onPlayAgain: () => void;
};

export const EndScreen = ({
  gameResult: { didWin, attempts },
  onPlayAgain,
}: EndScreenProps) => {
  const { distribution } = useAttemptDistribution();

  return (
    <div className={styles.endScreen}>
      {didWin ? <WinMessage attempts={attempts} /> : <LoseMessage />}
      <button onClick={() => onPlayAgain()}>Play Again</button>
      <Chart data={distribution} />
    </div>
  );
};

const WinMessage = ({ attempts }: { attempts: number }) => (
  <>
    <h2>{WIN_WORDS[attempts - 1]}!</h2>
    <p>
      You won in {attempts} attempt{attempts === 1 ? "" : "s"}!
    </p>
  </>
);

const LoseMessage = () => (
  <>
    <h2>Game Over</h2>
    <p>Better luck next time!</p>
  </>
);
