import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { render } from "../../../test/render";
import { Chart } from "./Chart";

describe("Chart", () => {
  it("should render six bars", () => {
    render(<Chart data={{ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }} />);
    const bars = screen.getAllByTestId("chart-bar");
    expect(bars).toHaveLength(6);
  });

  it("displays the guess count and frequency per column", () => {
    const data = { 1: 12, 2: 13, 3: 14, 4: 15, 5: 16, 6: 17 };
    render(<Chart data={data} />);

    const columns = screen.getAllByTestId("chart-column");

    for (let col = 1; col <= 6; col++) {
      expect(columns[col - 1]).toHaveAttribute(
        "title",
        `${col} Attempts: ${data[col as keyof typeof data]}`
      );

      expect(
        within(columns[col - 1]).getByTestId("chart-count")
      ).toHaveTextContent(col.toString());

      expect(
        within(columns[col - 1]).getByTestId("chart-bar-count")
      ).toHaveTextContent(data[col as keyof typeof data].toString());
    }
  });
});
