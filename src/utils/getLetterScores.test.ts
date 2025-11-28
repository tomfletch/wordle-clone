import { describe, expect, it } from "vitest";
import { LETTER_SCORE } from "../types/LetterScore";
import { getLetterScores } from "./getLetterScores";

describe("getLetterScores", () => {
  it("returns an empty object when no guesses are provided", () => {
    const result = getLetterScores([]);
    expect(result).toEqual({});
  });

  it("correctly computes letter scores from guesses", () => {
    const guesses = [
      {
        guess: "train",
        score: [
          LETTER_SCORE.INCORRECT,
          LETTER_SCORE.INCORRECT,
          LETTER_SCORE.ALMOST,
          LETTER_SCORE.INCORRECT,
          LETTER_SCORE.ALMOST,
        ],
      },
    ];

    const result = getLetterScores(guesses);

    expect(result).toEqual({
      a: LETTER_SCORE.ALMOST,
      i: LETTER_SCORE.INCORRECT,
      n: LETTER_SCORE.ALMOST,
      r: LETTER_SCORE.INCORRECT,
      t: LETTER_SCORE.INCORRECT,
    });
  });

  it("updates letter scores based on priority from multiple guesses", () => {
    const guesses = [
      {
        guess: "train",
        score: [
          LETTER_SCORE.INCORRECT,
          LETTER_SCORE.INCORRECT,
          LETTER_SCORE.ALMOST,
          LETTER_SCORE.INCORRECT,
          LETTER_SCORE.ALMOST,
        ],
      },
      {
        guess: "nasty",
        score: [
          LETTER_SCORE.ALMOST,
          LETTER_SCORE.CORRECT,
          LETTER_SCORE.ALMOST,
          LETTER_SCORE.INCORRECT,
          LETTER_SCORE.INCORRECT,
        ],
      },
    ];

    const result = getLetterScores(guesses);

    expect(result).toEqual({
      a: LETTER_SCORE.CORRECT,
      i: LETTER_SCORE.INCORRECT,
      n: LETTER_SCORE.ALMOST,
      r: LETTER_SCORE.INCORRECT,
      s: LETTER_SCORE.ALMOST,
      t: LETTER_SCORE.INCORRECT,
      y: LETTER_SCORE.INCORRECT,
    });
  });
});
