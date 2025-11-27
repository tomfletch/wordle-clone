import { describe, expect, it, vi } from "vitest";
import { renderHook } from "../../test/render";
import { useEnter } from "./useEnter";

describe("useEnter", () => {
  it("calls the callback when Enter is pressed", async () => {
    const callback = vi.fn();
    const { user } = renderHook(() => useEnter(callback));

    await user.keyboard("{Enter}");

    expect(callback).toHaveBeenCalled();
  });

  it("does not call the callback for other keys", async () => {
    const callback = vi.fn();
    const { user } = renderHook(() => useEnter(callback));

    await user.keyboard("a");
    await user.keyboard(" ");
    await user.keyboard("{Backspace}");

    expect(callback).not.toHaveBeenCalled();
  });
});
