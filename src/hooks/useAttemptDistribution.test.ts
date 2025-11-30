import { act } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderHook } from "../../test/render";
import { useAttemptDistribution } from "./useAttemptDistribution";

describe("useAttemptDistribution", () => {
  it("defaults to an empty distribution", () => {
    const { result } = renderHook(() => useAttemptDistribution());
    const { distribution } = result.current;
    expect(distribution).toEqual({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });
  });

  it("throws an error if attempts is > 6", () => {
    const { result } = renderHook(() => useAttemptDistribution());
    const { recordWin } = result.current;
    expect(() => recordWin(7)).toThrowError("Attempts must be between 1 and 6");
  });

  it("records wins correctly", () => {
    const { result } = renderHook(() => useAttemptDistribution());
    const { recordWin } = result.current;

    act(() => recordWin(3));
    let expected = { 1: 0, 2: 0, 3: 1, 4: 0, 5: 0, 6: 0 };
    expect(result.current.distribution).toEqual(expected);

    act(() => recordWin(5));
    expected = { 1: 0, 2: 0, 3: 1, 4: 0, 5: 1, 6: 0 };
    expect(result.current.distribution).toEqual(expected);

    act(() => recordWin(3));
    expected = { 1: 0, 2: 0, 3: 2, 4: 0, 5: 1, 6: 0 };
    expect(result.current.distribution).toEqual(expected);
  });
});
