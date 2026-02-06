/// <reference path="../types/node-compat.d.ts" />
import { TextEncoder, TextDecoder } from "util";

// Polyfill TextEncoder/TextDecoder for environments where they are missing
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).TextEncoder = TextEncoder;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).TextDecoder =
  TextDecoder as unknown as typeof window.TextDecoder;

// Basic window.matchMedia polyfill for tests
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
