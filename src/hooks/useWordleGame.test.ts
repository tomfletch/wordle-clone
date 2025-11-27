import { act } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderHook } from "../../test/render";
import { useWordleGame } from "./useWordleGame";

vi.mock("../utils/getRandomAnswer", () => ({
  getRandomAnswer: vi.fn().mockReturnValue("zebra"),
}));

describe("useWordleGame", () => {
  it("has the correct initial state", () => {
    const { result } = renderHook(() => useWordleGame({ maxGuesses: 6 }));
    expect(result.current.pastGuesses).toEqual([]);
    expect(result.current.activeGuessIndex).toBe(0);
    expect(result.current.isGameOver).toBe(false);
  });

  it("adds a guess correctly", () => {
    const { result } = renderHook(() => useWordleGame({ maxGuesses: 6 }));

    act(() => {
      const valid = result.current.submitGuess("train");
      expect(valid).toBe("valid");
    });

    expect(result.current.pastGuesses).toHaveLength(1);
    expect(result.current.pastGuesses[0].guess).toBe("train");
    expect(result.current.activeGuessIndex).toBe(1);
    expect(result.current.isGameOver).toBe(false);
  });

  it("rejects invalid guesses", () => {
    const { result } = renderHook(() => useWordleGame({ maxGuesses: 6 }));

    act(() => {
      const valid = result.current.submitGuess("xxxxx");
      expect(valid).toBe("invalid");
    });

    expect(result.current.pastGuesses).toEqual([]);
    expect(result.current.activeGuessIndex).toBe(0);
    expect(result.current.isGameOver).toBe(false);
  });

  it("rejects duplicate guesses", () => {
    const { result } = renderHook(() => useWordleGame({ maxGuesses: 6 }));

    act(() => {
      result.current.submitGuess("train");
    });

    act(() => {
      const valid = result.current.submitGuess("train");
      expect(valid).toBe("invalid");
    });

    expect(result.current.pastGuesses).toHaveLength(1);
    expect(result.current.activeGuessIndex).toBe(1);
  });

  it("marks game as over after max guesses", () => {
    const { result } = renderHook(() => useWordleGame({ maxGuesses: 2 }));

    act(() => {
      result.current.submitGuess("apple");
      result.current.submitGuess("train");
    });

    expect(result.current.pastGuesses.length).toBe(2);
    expect(result.current.activeGuessIndex).toBe(2);
    expect(result.current.isGameOver).toBe(true);
  });

  it("allows multiple valid guesses", () => {
    const { result } = renderHook(() => useWordleGame({ maxGuesses: 6 }));

    act(() => {
      result.current.submitGuess("apple");
      result.current.submitGuess("train");
      result.current.submitGuess("hello");
    });

    expect(result.current.pastGuesses).toHaveLength(3);
    expect(result.current.activeGuessIndex).toBe(3);
    expect(result.current.isGameOver).toBe(false);
  });

  it("rejects guess when game is already over", () => {
    const { result } = renderHook(() => useWordleGame({ maxGuesses: 1 }));

    act(() => {
      result.current.submitGuess("apple");
    });

    expect(result.current.isGameOver).toBe(true);

    expect(() => {
      result.current.submitGuess("train");
    }).toThrow("Game is over");
  });
});
