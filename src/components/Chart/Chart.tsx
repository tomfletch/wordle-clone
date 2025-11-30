import styles from "./Chart.module.css";

const MAX_GUESSES = 6;

type ChartProps = {
  data: Record<number, number>;
};

export const Chart = ({ data }: ChartProps) => {
  const maxValue = Math.max(...Object.values(data), 1);

  return (
    <div className={styles.chart} title="Guess Distribution">
      {Array.from({ length: MAX_GUESSES }, (_, i) => (
        <div
          key={i}
          className={styles.column}
          data-testid="chart-column"
          title={`${i + 1} Attempts: ${data[i + 1]}`}
        >
          <div className={styles.barContainer}>
            <div data-testid="chart-bar-count">{data[i + 1]}</div>
            <div
              className={styles.bar}
              style={{
                height: `${(data[i + 1] / maxValue) * 100}%`,
              }}
              data-testid="chart-bar"
            ></div>
          </div>
          <div data-testid="chart-count">{i + 1}</div>
        </div>
      ))}
    </div>
  );
};
