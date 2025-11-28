import { screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "../../../test/render";
import { Wordle } from "./Wordle";

vi.mock("../../utils/getRandomAnswer", () => ({
  getRandomAnswer: vi.fn().mockReturnValue("zebra"),
}));

describe("Wordle", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("initially renders a new game", () => {
    render(<Wordle />);

    const lines = screen.getAllByTestId("line");
    expect(lines).toHaveLength(6);
  });

  it("shows end screen after game over", async () => {
    const { user } = render(<Wordle />);

    const guesses = ["apple", "berry", "charm", "delta", "eagle", "flame"];

    for (const guess of guesses) {
      await user.keyboard(guess);
      await user.keyboard("{Enter}");
      vi.runAllTimers();
    }

    expect(await screen.findByText("Game Over")).toBeInTheDocument();
  });

  it("shows win screen after winning on first attempt", async () => {
    const { user } = render(<Wordle />);

    await user.keyboard("zebra");
    await user.keyboard("{Enter}");
    vi.runAllTimers();

    expect(await screen.findByText("Genius!")).toBeInTheDocument();
    expect(screen.getByText("You won in 1 attempt!")).toBeInTheDocument();
  });

  it("shows win screen after winning on last attempt", async () => {
    const { user } = render(<Wordle />);

    const guesses = ["apple", "berry", "charm", "delta", "eagle", "zebra"];

    for (const guess of guesses) {
      await user.keyboard(guess);
      await user.keyboard("{Enter}");
      vi.runAllTimers();
    }

    expect(await screen.findByText("Phew!")).toBeInTheDocument();
    expect(screen.getByText("You won in 6 attempts!")).toBeInTheDocument();
  });
});
