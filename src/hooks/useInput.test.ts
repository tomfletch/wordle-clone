import { fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderHook } from "../../test/render";
import { useInput } from "./useInput";

describe("useInput", () => {
  it("invokes callback on keydown and stops after unmount", () => {
    const callback = vi.fn();

    const { unmount } = renderHook(() => useInput(callback));

    fireEvent.keyDown(window, { key: "A" });
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("A");

    unmount();

    fireEvent.keyDown(window, { key: "B" });
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
