import { screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "../../../test/render";
import { WordleGame } from "./WordleGame";

vi.mock("../../utils/getRandomAnswer", () => ({
  getRandomAnswer: vi.fn().mockReturnValue("zebra"),
}));

describe("WordleGame", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("renders six lines", () => {
    render(<WordleGame onGameOver={() => {}} />);
    expect(screen.getAllByTestId("line")).toHaveLength(6);
  });

  it("renders only the first line as active", () => {
    render(<WordleGame onGameOver={() => {}} />);
    const lines = screen.getAllByTestId("line");
    expect(lines[0]).toHaveAttribute("data-inactive", "false");

    for (let i = 1; i < 6; i++) {
      expect(lines[i]).toHaveAttribute("data-inactive", "true");
    }
  });

  it("renders a letter when typed", async () => {
    const { user } = render(<WordleGame onGameOver={() => {}} />);

    const lines = screen.getAllByTestId("line");
    expect(lines[0]).toHaveTextContent("");

    await user.keyboard("h");

    expect(lines[0]).toHaveTextContent("h");
  });

  it("does not allow typing more than 5 letters in a line", async () => {
    const { user } = render(<WordleGame onGameOver={() => {}} />);

    const lines = screen.getAllByTestId("line");
    expect(lines[0]).toHaveTextContent("");

    await user.keyboard("abcdefg");

    expect(lines[0]).toHaveTextContent("abcde");
  });

  it('stores past guesses and shows them when "Enter" is pressed', async () => {
    const { user } = render(<WordleGame onGameOver={() => {}} />);

    const lines = screen.getAllByTestId("line");
    expect(lines[0]).toHaveTextContent("");
    expect(lines[1]).toHaveTextContent("");

    await user.keyboard("hello");
    await user.keyboard("{Enter}");
    vi.runAllTimers();

    expect(lines[0]).toHaveTextContent("hello");
    expect(lines[1]).toHaveTextContent("");

    await user.keyboard("world");
    await user.keyboard("{Enter}");

    expect(lines[0]).toHaveTextContent("hello");
    expect(lines[1]).toHaveTextContent("world");
  });

  it("rejects incomplete guesses when 'Enter' is pressed", async () => {
    const { user } = render(<WordleGame onGameOver={() => {}} />);

    const lines = screen.getAllByTestId("line");
    expect(lines[0]).toHaveTextContent("");
    expect(lines[1]).toHaveTextContent("");

    await user.keyboard("cat");

    expect(lines[0]).toHaveTextContent("cat");
    expect(lines[1]).toHaveTextContent("");

    await user.keyboard("{Enter}");

    expect(lines[0]).toHaveTextContent("cat");
    expect(lines[0]).toHaveAttribute("data-shake", "true");
    expect(lines[1]).toHaveTextContent("");
  });

  it("disables input whilst shaking", async () => {
    const { user } = render(<WordleGame onGameOver={() => {}} />);

    const lines = screen.getAllByTestId("line");
    expect(lines[0]).toHaveTextContent("");

    await user.keyboard("dog");

    expect(lines[0]).toHaveTextContent("dog");
    await user.keyboard("{Enter}");

    // Attempt to type during shake
    await user.keyboard("gy");

    // Still shaking, so no change
    expect(lines[0]).toHaveTextContent("dog");
    expect(lines[1]).toHaveTextContent("");

    // Wait for shake to finish
    await new Promise((r) => setTimeout(r, 500));

    // Now type again
    await user.keyboard("ma");

    expect(lines[0]).toHaveTextContent("dogma");
  });

  it("calls onGameOver when the game is lost", async () => {
    const onGameOverFn = vi.fn();
    const { user } = render(<WordleGame onGameOver={onGameOverFn} />);

    // Make 6 wrong guesses to lose the game
    const guesses = ["apple", "berry", "charm", "delta", "eagle", "flame"];

    for (const guess of guesses) {
      await user.keyboard(guess);
      await user.keyboard("{Enter}");
      vi.runAllTimers();
    }

    expect(onGameOverFn).toHaveBeenCalledTimes(1);
    expect(onGameOverFn).toHaveBeenCalledWith({ didWin: false });
  });

  it("calls onGameOver when the game is won on first attempt", async () => {
    const onGameOverFn = vi.fn();
    const { user } = render(<WordleGame onGameOver={onGameOverFn} />);

    // Make the correct guess to win the game
    await user.keyboard("zebra");
    await user.keyboard("{Enter}");

    expect(onGameOverFn).toHaveBeenCalledTimes(1);
    expect(onGameOverFn).toHaveBeenCalledWith({ didWin: true, attempts: 1 });
  });

  it("calls onGameOver when the game is won on later attempt", async () => {
    const onGameOverFn = vi.fn();
    const { user } = render(<WordleGame onGameOver={onGameOverFn} />);

    const guesses = ["apple", "berry", "charm", "zebra"];

    for (const guess of guesses) {
      await user.keyboard(guess);
      await user.keyboard("{Enter}");
      vi.runAllTimers();
    }

    expect(onGameOverFn).toHaveBeenCalledTimes(1);
    expect(onGameOverFn).toHaveBeenCalledWith({ didWin: true, attempts: 4 });
  });

  it("renders the Keyboard component", () => {
    render(<WordleGame onGameOver={() => {}} />);
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("ENTER")).toBeInTheDocument();
    expect(screen.getByText("⌫")).toBeInTheDocument();
  });

  it("handles key presses from the Keyboard component", async () => {
    const { user } = render(<WordleGame onGameOver={() => {}} />);

    const lines = screen.getAllByTestId("line");
    expect(lines[0]).toHaveTextContent("");

    // Press keys using the on-screen keyboard
    const guess = "hello";

    for (const letter of guess) {
      const key = screen.getByRole("button", { name: letter.toUpperCase() });
      await user.click(key);
    }

    expect(lines[0]).toHaveTextContent("hello");
  });
});
