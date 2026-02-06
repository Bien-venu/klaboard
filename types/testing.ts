import type { ReactNode } from "react";

export type ChildrenProps = { children: ReactNode };
export type TFunction = (key: string) => string;
export type MaybeHandler = (() => void) | undefined;
export type ThemeName = "light" | "dark" | "system";
