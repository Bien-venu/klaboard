/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "util" {
  export const TextEncoder: typeof globalThis.TextEncoder;
  export const TextDecoder: typeof globalThis.TextDecoder;
}

declare var global: any;
