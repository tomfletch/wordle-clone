import { describe, expect, it } from "vitest";
import { LETTER_SCORE } from "./types/LetterScore";
import { scoreGuess, validateGuess } from "./wordle";

describe("scoreGuess", () => {
  it("scores a guess with no correct letters", () => {
    expect(scoreGuess("aaaa", "bbbb")).toEqual([
      LETTER_SCORE.INCORRECT,
      LETTER_SCORE.INCORRECT,
      LETTER_SCORE.INCORRECT,
      LETTER_SCORE.INCORRECT,
    ]);
  });

  it("scores a correct guess", () => {
    expect(scoreGuess("abcd", "abcd")).toEqual([
      LETTER_SCORE.CORRECT,
      LETTER_SCORE.CORRECT,
      LETTER_SCORE.CORRECT,
      LETTER_SCORE.CORRECT,
    ]);
  });

  it("scores a guess with one correct letter", () => {
    expect(scoreGuess("xaxx", "yayy")).toEqual([
      LETTER_SCORE.INCORRECT,
      LETTER_SCORE.CORRECT,
      LETTER_SCORE.INCORRECT,
      LETTER_SCORE.INCORRECT,
    ]);
  });

  it("scores a guess with one almost letter", () => {
    expect(scoreGuess("xaxx", "yyay")).toEqual([
      LETTER_SCORE.INCORRECT,
      LETTER_SCORE.ALMOST,
      LETTER_SCORE.INCORRECT,
      LETTER_SCORE.INCORRECT,
    ]);
  });

  it("scores a guess with one almost letter and one correct letter", () => {
    expect(scoreGuess("abxx", "ayyb")).toEqual([
      LETTER_SCORE.CORRECT,
      LETTER_SCORE.ALMOST,
      LETTER_SCORE.INCORRECT,
      LETTER_SCORE.INCORRECT,
    ]);
  });

  it("scores an almost letter only once", () => {
    expect(scoreGuess("aaxx", "yyya")).toEqual([
      LETTER_SCORE.ALMOST,
      LETTER_SCORE.INCORRECT,
      LETTER_SCORE.INCORRECT,
      LETTER_SCORE.INCORRECT,
    ]);
  });

  it("does not score a letter as almost if it is also correct", () => {
    expect(scoreGuess("axxa", "yyya")).toEqual([
      LETTER_SCORE.INCORRECT,
      LETTER_SCORE.INCORRECT,
      LETTER_SCORE.INCORRECT,
      LETTER_SCORE.CORRECT,
    ]);
  });

  it("scores all letters as almost", () => {
    expect(scoreGuess("abcd", "bcda")).toEqual([
      LETTER_SCORE.ALMOST,
      LETTER_SCORE.ALMOST,
      LETTER_SCORE.ALMOST,
      LETTER_SCORE.ALMOST,
    ]);
  });

  it("throws an error if answer and guess have a different number of letters", () => {
    expect(() => scoreGuess("train", "bike")).toThrow();
  });
});

describe("validateGuess", () => {
  const dictionary = new Set(["aaa", "bbb", "ccc"]);

  it("returns true for a valid guess", () => {
    expect(validateGuess("bbb", dictionary, ["ccc"])).toEqual(true);
  });

  it("returns false for a guess that is not in the dictionary", () => {
    expect(validateGuess("ddd", dictionary, [])).toEqual(false);
  });

  it("returns false for a guess that has already been used", () => {
    expect(validateGuess("aaa", dictionary, ["aaa"])).toEqual(false);
  });
});
