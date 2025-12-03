import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { render } from "../../../test/render";
import { EndScreen } from "./EndScreen";

describe("EndScreen", () => {
  it("renders the end screen message for lose", () => {
    render(<EndScreen gameResult={{ didWin: false }} onPlayAgain={() => {}} />);
    expect(screen.getByText("Game Over")).toBeInTheDocument();
    expect(screen.getByText("Better luck next time!")).toBeInTheDocument();
  });

  it("renders the end screen message for 1 attempt", () => {
    render(
      <EndScreen
        gameResult={{ didWin: true, attempts: 1 }}
        onPlayAgain={() => {}}
      />
    );
    expect(screen.getByText("Genius!")).toBeInTheDocument();
    expect(screen.getByText("You won in 1 attempt!")).toBeInTheDocument();
  });

  it("renders the end screen message for multiple attempts", () => {
    render(
      <EndScreen
        gameResult={{ didWin: true, attempts: 3 }}
        onPlayAgain={() => {}}
      />
    );
    expect(screen.getByText("Impressive!")).toBeInTheDocument();
    expect(screen.getByText("You won in 3 attempts!")).toBeInTheDocument();
  });

  it("calls onPlayAgain when Play Again button is clicked", async () => {
    const onPlayAgainFn = vi.fn();
    const { user } = render(
      <EndScreen
        gameResult={{ didWin: true, attempts: 2 }}
        onPlayAgain={onPlayAgainFn}
      />
    );

    const playAgainButton = screen.getByRole("button", { name: "Play Again" });
    await user.click(playAgainButton);

    expect(onPlayAgainFn).toHaveBeenCalledTimes(1);
  });

  it("renders the charts", () => {
    render(
      <EndScreen
        gameResult={{ didWin: true, attempts: 4 }}
        onPlayAgain={() => {}}
      />
    );

    expect(screen.getByText(/Wins/)).toBeInTheDocument();
    expect(screen.getByText(/Losses/)).toBeInTheDocument();
  });
});
