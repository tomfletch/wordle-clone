import { describe, expect, it, vi } from "vitest";
import { renderHook } from "../../test/render";
import { useKeyboard } from "./useKeyboard";

describe("useKeyboard", () => {
  it("calls callback with the pressed key", async () => {
    const callback = vi.fn();
    const { user } = renderHook(() => useKeyboard(callback));

    await user.keyboard("a");

    expect(callback).toHaveBeenCalledWith("a");
  });
});
