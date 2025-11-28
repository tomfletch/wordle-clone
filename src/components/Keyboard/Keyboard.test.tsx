import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { render } from "../../../test/render";
import { useInput } from "../../hooks/useInput";
import { LETTER_SCORE } from "../../types/LetterScore";
import { Keyboard } from "./Keyboard";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const setup = () => {
  const callback = vi.fn();

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    useInput(callback);
    return <>{children}</>;
  };

  const result = render(
    <Wrapper>
      <Keyboard />
    </Wrapper>
  );

  return { ...result, callback };
};

describe("Keyboard", () => {
  it('renders all keys including "Enter" and "Backspace"', () => {
    render(<Keyboard />);

    for (const letter of letters) {
      expect(screen.getByText(letter)).toBeInTheDocument();
    }

    expect(screen.getByText("ENTER")).toBeInTheDocument();
    expect(screen.getByText("⌫")).toBeInTheDocument();
  });

  it("dispatches keyboard events on key press", async () => {
    const { callback, user } = setup();

    for (const letter of letters) {
      const button = screen.getByRole("button", { name: letter });
      await user.click(button);
      expect(callback).toHaveBeenLastCalledWith(letter);
    }
  });

  it("dispatches keyboard events on enter key press", async () => {
    const { callback, user } = setup();

    const button = screen.getByRole("button", { name: "Enter" });
    await user.click(button);
    expect(callback).toHaveBeenCalledWith("Enter");
  });

  it("dispatches keyboard events on backspace key press", async () => {
    const { callback, user } = setup();

    const button = screen.getByRole("button", { name: "Backspace" });
    await user.click(button);
    expect(callback).toHaveBeenCalledWith("Backspace");
  });

  it("applies correct attribute to 'almost' keys", () => {
    render(<Keyboard letterScores={{ a: LETTER_SCORE.ALMOST }} />);

    const almostKey = screen.getByRole("button", { name: "A" });

    expect(almostKey).toHaveAttribute("data-score", "almost");
  });

  it("applies correct attribute to 'correct' keys", () => {
    render(<Keyboard letterScores={{ b: LETTER_SCORE.CORRECT }} />);

    const correctKey = screen.getByRole("button", { name: "B" });
    expect(correctKey).toHaveAttribute("data-score", "correct");
  });

  it("applies correct attribute to 'incorrect' keys", () => {
    render(<Keyboard letterScores={{ c: LETTER_SCORE.INCORRECT }} />);

    const incorrectKey = screen.getByRole("button", { name: "C" });
    expect(incorrectKey).toHaveAttribute("data-score", "incorrect");
  });
});
