import { act } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { renderHook } from "../../test/render";
import { useStats } from "./useStats";

vi.mock("./useLocalStorage", async () => ({
  useLocalStorage: () =>
    React.useState({
      gamesPlayed: 0,
      gamesWon: 0,
      distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
    }),
}));

describe("useStats", () => {
  describe("gamesPlayed and gamesWon", () => {
    it("should default to 0", () => {
      const { result } = renderHook(() => useStats());
      const { gamesPlayed, gamesWon } = result.current;
      expect(gamesPlayed).toBe(0);
      expect(gamesWon).toBe(0);
    });

    it("should record games played and won correctly", () => {
      const { result } = renderHook(() => useStats());
      const { recordGameResult } = result.current;

      act(() => recordGameResult({ didWin: true, attempts: 3 }));
      expect(result.current.gamesPlayed).toBe(1);
      expect(result.current.gamesWon).toBe(1);
      expect(result.current.gamesLost).toBe(0);

      act(() => recordGameResult({ didWin: false }));
      expect(result.current.gamesPlayed).toBe(2);
      expect(result.current.gamesWon).toBe(1);
      expect(result.current.gamesLost).toBe(1);

      act(() => recordGameResult({ didWin: true, attempts: 5 }));
      expect(result.current.gamesPlayed).toBe(3);
      expect(result.current.gamesWon).toBe(2);
      expect(result.current.gamesLost).toBe(1);
    });
  });

  describe("distribution", () => {
    it("defaults to an empty distribution", () => {
      const { result } = renderHook(() => useStats());
      const { distribution } = result.current;
      expect(distribution).toEqual({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });
    });

    it("throws an error if attempts is > 6", () => {
      const { result } = renderHook(() => useStats());
      const { recordGameResult } = result.current;
      expect(() =>
        recordGameResult({ didWin: true, attempts: 7 })
      ).toThrowError("Attempts must be between 1 and 6");
    });

    it("records wins correctly", () => {
      const { result } = renderHook(() => useStats());
      const { recordGameResult } = result.current;

      act(() => recordGameResult({ didWin: true, attempts: 3 }));
      let expected = { 1: 0, 2: 0, 3: 1, 4: 0, 5: 0, 6: 0 };
      expect(result.current.distribution).toEqual(expected);

      act(() => recordGameResult({ didWin: true, attempts: 5 }));
      expected = { 1: 0, 2: 0, 3: 1, 4: 0, 5: 1, 6: 0 };
      expect(result.current.distribution).toEqual(expected);

      act(() => recordGameResult({ didWin: true, attempts: 3 }));
      expected = { 1: 0, 2: 0, 3: 2, 4: 0, 5: 1, 6: 0 };
      expect(result.current.distribution).toEqual(expected);
    });
  });
});
