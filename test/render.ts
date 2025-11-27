import {
  render as rtlRender,
  renderHook as rtlRenderHook,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";

export const render = (ui: ReactNode) => {
  return {
    user: userEvent.setup(),
    ...rtlRender(ui),
  };
};

export const renderHook = <TProps, TResult>(
  callback: (props: TProps) => TResult
) => {
  return {
    user: userEvent.setup(),
    ...rtlRenderHook(callback),
  };
};
