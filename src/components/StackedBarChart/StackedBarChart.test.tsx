import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { render } from "../../../test/render";
import { StackedBarChart } from "./StackedBarChart";

describe("StackedBarChart", () => {
  it("should render correctly", () => {
    render(
      <StackedBarChart
        left={{ label: "Wins", barColour: "blue", value: 15 }}
        right={{ label: "Losses", barColour: "red", value: 5 }}
      />
    );

    expect(screen.getByText("Wins | 15")).toBeInTheDocument();
    expect(screen.getByText("5 | Losses")).toBeInTheDocument();

    expect(screen.getByTestId("left-bar")).toHaveStyle("width: 75%");
    expect(screen.getByTestId("right-bar")).toHaveStyle("width: 25%");
  });
});
