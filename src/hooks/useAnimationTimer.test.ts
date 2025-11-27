import { act } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook } from "../../test/render";
import { useAnimationTimer } from "./useAnimationTimer";

describe("useAnimationTimer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should initially return false", () => {
    const { result } = renderHook(() => useAnimationTimer(1000));
    expect(result.current.isAnimating).toEqual(false);
  });

  it("should return true during animation", () => {
    const { result } = renderHook(() => useAnimationTimer(1000));

    expect(result.current.isAnimating).toEqual(false);

    act(() => {
      result.current.startAnimation();
    });

    expect(result.current.isAnimating).toEqual(true);
  });

  it("should return false after animation duration", async () => {
    const { result } = renderHook(() => useAnimationTimer(1000));

    act(() => {
      result.current.startAnimation();
    });

    expect(result.current.isAnimating).toEqual(true);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.isAnimating).toEqual(false);
  });
});
