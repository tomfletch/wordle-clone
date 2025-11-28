import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LETTER_SCORE, type LetterScore } from "../../types/LetterScore";
import { WordleLine } from "./WordleLine";

describe("WordleLine", () => {
  it("renders correct number of boxes", () => {
    render(<WordleLine length={5} />);
    expect(screen.getAllByTestId("letter")).toHaveLength(5);
  });

  it("renders a partial guess", () => {
    render(<WordleLine length={5} value="cat" />);

    const letters = screen.getAllByTestId("letter");

    expect(letters[0]).toHaveTextContent("c");
    expect(letters[1]).toHaveTextContent("a");
    expect(letters[2]).toHaveTextContent("t");
    expect(letters[3]).toHaveTextContent("");
    expect(letters[4]).toHaveTextContent("");
  });

  it("renders an inactive line", () => {
    render(<WordleLine length={5} isInactive />);
    expect(screen.getByTestId("line")).toHaveAttribute("data-inactive", "true");
  });

  it("renders an invalid guess", () => {
    render(<WordleLine length={5} isShaking />);
    expect(screen.getByTestId("line")).toHaveAttribute("data-shake", "true");
  });

  it("renders the guess score", () => {
    const score: LetterScore[] = [
      LETTER_SCORE.CORRECT,
      LETTER_SCORE.ALMOST,
      LETTER_SCORE.INCORRECT,
      LETTER_SCORE.INCORRECT,
      LETTER_SCORE.CORRECT,
    ];
    render(<WordleLine length={5} value="apple" score={score} />);

    const letters = screen.getAllByTestId("letter");

    expect(letters[0]).toHaveAttribute("data-score", "correct");
    expect(letters[1]).toHaveAttribute("data-score", "almost");
    expect(letters[2]).toHaveAttribute("data-score", "incorrect");
    expect(letters[3]).toHaveAttribute("data-score", "incorrect");
    expect(letters[4]).toHaveAttribute("data-score", "correct");
  });
});
