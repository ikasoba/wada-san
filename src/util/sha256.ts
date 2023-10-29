import { bytes2Hex } from "./hex.ts";

export const sha256 = (bytes: Uint8Array) =>
  crypto.subtle.digest("sha256", bytes);

export const sha256Hex = (bytes: Uint8Array) =>
  sha256(bytes).then((x) => bytes2Hex(new Uint8Array(x)));
