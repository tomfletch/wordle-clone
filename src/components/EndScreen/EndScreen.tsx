import type { GameResult } from "../../types/GameResult";

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
  return (
    <div>
      {didWin ? <WinMessage attempts={attempts} /> : <LoseMessage />}
      <button onClick={() => onPlayAgain()}>Play Again</button>
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
