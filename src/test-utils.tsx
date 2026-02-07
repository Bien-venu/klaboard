/* eslint-disable @typescript-eslint/triple-slash-reference */
/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference path="../types/node-compat.d.ts" />
import type { ReactElement, ReactNode } from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import todoReducer from "./features/ToDo/todoSlice";
import userReducer from "./features/users/userSlice";

type RenderOpts = any;

export function renderWithProviders(
  ui: ReactElement,
  { preloadedState = {}, store, ...renderOptions }: RenderOpts = {},
) {
  const testStore =
    store ||
    (configureStore({
      reducer: {
        todo: todoReducer,
        user: userReducer,
      },
      preloadedState,
    } as any) as any);

  function Wrapper({ children }: { children: ReactNode }) {
    return <Provider store={testStore}>{children}</Provider>;
  }

  return {
    store: testStore,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
