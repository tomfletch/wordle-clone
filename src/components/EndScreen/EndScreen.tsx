import { useStats } from "../../hooks/useStats";
import type { GameResult } from "../../types/GameResult";
import { Chart } from "../Chart/Chart";
import { StackedBarChart } from "../StackedBarChart/StackedBarChart";
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
  const {
    gamesPlayed,
    gamesWon,
    gamesLost,
    winRate,
    averageGuesses,
    distribution,
  } = useStats();

  return (
    <div className={styles.endScreen}>
      <div className={styles.messagePanel}>
        {didWin ? <WinMessage attempts={attempts} /> : <LoseMessage />}
        <button onClick={() => onPlayAgain()}>Play Again</button>
      </div>
      <div className={styles.statsPanel}>
        <div className={styles.statsSummary}>
          <div className={styles.stat}>
            <div className={styles.statLabel}>Games Played</div>
            <div className={styles.statValue}>{gamesPlayed}</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statLabel}>Win Rate</div>
            <div className={styles.statValue}>{Math.round(winRate)}%</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statLabel}>Average Guesses</div>
            <div className={styles.statValue}>{averageGuesses.toFixed(1)}</div>
          </div>
        </div>
        <StackedBarChart
          left={{ label: "Wins", barColour: "#6aaa64", value: gamesWon }}
          right={{ label: "Losses", barColour: "#d9534f", value: gamesLost }}
        />
        <h3>Attempt Distribution</h3>
        <Chart data={distribution} />
      </div>
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
