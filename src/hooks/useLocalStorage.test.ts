import { act } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { renderHook } from "../../test/render";
import { useLocalStorage } from "./useLocalStorage";

const createLocalStorageMock = () => {
  const store: Record<string, unknown> = {};

  return {
    setItem: (key: string, value: unknown) => {
      store[key] = value;
    },
    getItem: (key: string): unknown => {
      return store[key];
    },
  };
};

describe("useLocalStorage", () => {
  let originalLocalStorage: Storage;
  let mockLocalStorage: ReturnType<typeof createLocalStorageMock>;

  beforeEach(() => {
    originalLocalStorage = window.localStorage;
    mockLocalStorage = createLocalStorageMock();
    //@ts-expect-error mock localStorage
    window.localStorage = mockLocalStorage;
  });

  afterEach(() => {
    window.localStorage = originalLocalStorage;
  });

  it("returns the default value when no value is stored", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", "default"));
    const [storedValue] = result.current;
    expect(storedValue).toEqual("default");
  });

  it("returns the value from localStorage if it exists", () => {
    mockLocalStorage.setItem("test-key", '"value"');

    const { result } = renderHook(() => useLocalStorage("test-key", "default"));
    const [storedValue] = result.current;
    expect(storedValue).toEqual("value");
  });

  it("updates the value in localStorage", () => {
    mockLocalStorage.setItem("test-key", '"value"');
    const { result } = renderHook(() => useLocalStorage("test-key", "default"));
    const [, updateValue] = result.current;

    act(() => {
      updateValue("new-value");
    });

    expect(mockLocalStorage.getItem("test-key")).toEqual('"new-value"');

    const [storedValue] = result.current;
    expect(storedValue).toEqual("new-value");
  });
});
