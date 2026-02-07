/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../types/node-compat.d.ts" />
import { TextEncoder, TextDecoder } from "util";

(global as any).TextEncoder = TextEncoder;

(global as any).TextDecoder =
  TextDecoder as unknown as typeof window.TextDecoder;

if (typeof window !== "undefined" && !window.matchMedia) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => {
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      } as MediaQueryList;
    },
  });
}
