import { act } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderHook } from "../../test/render";
import { useActiveGuess } from "./useActiveGuess";

describe("useActiveGuess", () => {
  it("is initially empty", () => {
    const { result } = renderHook(() => useActiveGuess({ wordLength: 5 }));
    expect(result.current.activeGuess).toEqual("");
  });

  it("allows typing of a guess", async () => {
    const { result, user } = renderHook(() =>
      useActiveGuess({ wordLength: 5 })
    );

    await user.keyboard("abc");
    expect(result.current.activeGuess).toEqual("abc");
  });

  it("does not allow for typing more than word length letters", async () => {
    const { result, user } = renderHook(() =>
      useActiveGuess({ wordLength: 5 })
    );

    await user.keyboard("abcdefg");

    expect(result.current.activeGuess).toEqual("abcde");
  });

  it("removes the last letter when Backspace is pressed", async () => {
    const { result, user } = renderHook(() =>
      useActiveGuess({ wordLength: 5 })
    );

    await user.keyboard("cat");
    expect(result.current.activeGuess).toEqual("cat");

    await user.keyboard("{Backspace}");
    expect(result.current.activeGuess).toEqual("ca");

    await user.keyboard("{Backspace}");
    expect(result.current.activeGuess).toEqual("c");

    await user.keyboard("{Backspace}");
    expect(result.current.activeGuess).toEqual("");
  });

  it("nothing happens when Backspace is pressed on an empty guess", async () => {
    const { result, user } = renderHook(() =>
      useActiveGuess({ wordLength: 5 })
    );

    expect(result.current.activeGuess).toEqual("");

    await user.keyboard("{Backspace}");
    expect(result.current.activeGuess).toEqual("");
  });

  it("ignores non-letter keys except Backspace", async () => {
    const { result, user } = renderHook(() =>
      useActiveGuess({ wordLength: 5 })
    );

    await user.keyboard("a1!b@c#");
    expect(result.current.activeGuess).toEqual("abc");
  });

  it("treats uppercase letters as lowercase", async () => {
    const { result, user } = renderHook(() =>
      useActiveGuess({ wordLength: 5 })
    );

    await user.keyboard("AbCDe");
    expect(result.current.activeGuess).toEqual("abcde");
  });

  it("clearActiveGuess clears the active guess", async () => {
    const { result, user } = renderHook(() =>
      useActiveGuess({ wordLength: 5 })
    );

    await user.keyboard("hello");
    expect(result.current.activeGuess).toEqual("hello");

    act(() => {
      result.current.clearActiveGuess();
    });
    expect(result.current.activeGuess).toEqual("");
  });
});
