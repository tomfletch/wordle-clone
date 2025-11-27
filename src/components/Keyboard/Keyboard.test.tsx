import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { render } from "../../../test/render";
import { useInput } from "../../hooks/useInput";
import { Keyboard } from "./Keyboard";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const setup = () => {
  const callback = vi.fn();

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    useInput(callback);
    return <>{children}</>;
  };

  const result = render(
    <Wrapper>
      <Keyboard />
    </Wrapper>
  );

  return { ...result, callback };
};

describe("Keyboard", () => {
  it('renders all keys including "Enter" and "Backspace"', () => {
    render(<Keyboard />);

    for (const letter of letters) {
      expect(screen.getByText(letter)).toBeInTheDocument();
    }

    expect(screen.getByText("ENTER")).toBeInTheDocument();
    expect(screen.getByText("⌫")).toBeInTheDocument();
  });

  it("dispatches keyboard events on key press", async () => {
    const { callback, user } = setup();

    for (const letter of letters) {
      const button = screen.getByRole("button", { name: letter });
      await user.click(button);
      expect(callback).toHaveBeenLastCalledWith(letter);
    }
  });

  it("dispatches keyboard events on enter key press", async () => {
    const { callback, user } = setup();

    const button = screen.getByRole("button", { name: "Enter" });
    await user.click(button);
    expect(callback).toHaveBeenCalledWith("Enter");
  });

  it("dispatches keyboard events on backspace key press", async () => {
    const { callback, user } = setup();

    const button = screen.getByRole("button", { name: "Backspace" });
    await user.click(button);
    expect(callback).toHaveBeenCalledWith("Backspace");
  });
});
