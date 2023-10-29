export const bytes2Hex = (bytes: Uint8Array) =>
  [...bytes].map((x) => x.toString(16).padStart(2, "0")).join("");
