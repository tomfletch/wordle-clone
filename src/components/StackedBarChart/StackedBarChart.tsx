import styles from "./StackedBarChart.module.css";

type SideData = {
  label: string;
  value: number;
  barColour: string;
};

type StackedBarChartProps = {
  left: SideData;
  right: SideData;
};

export const StackedBarChart = ({ left, right }: StackedBarChartProps) => {
  const total = left.value + right.value;
  const leftWidth = (left.value / total) * 100;
  const rightWidth = (right.value / total) * 100;

  return (
    <div className={styles.container}>
      <div>
        {left.value} {left.label}
      </div>
      <div className={styles.chart}>
        <div
          data-testid="left-bar"
          style={{ width: `${leftWidth}%`, backgroundColor: left.barColour }}
          className={styles.leftBar}
        />
        <div
          data-testid="right-bar"
          style={{ width: `${rightWidth}%`, backgroundColor: right.barColour }}
          className={styles.rightBar}
        />
      </div>
      <div>
        {right.value} {right.label}
      </div>
    </div>
  );
};
