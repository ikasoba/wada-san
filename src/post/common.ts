import { $intersection } from "npm:lizod@0.2.7";
import { Binary } from "../../deps/bson.ts";
import { $object, $string, Validator } from "../../deps/lizod.ts";

export type JsonType =
  | string
  | number
  | boolean
  | null
  | { [k: string]: JsonType }
  | JsonType[];

export type Address = string;
export const $Address = $string;

export type Signature = string;
export const $Signature = $string;

export type WithSignature<T = {}> =
  & T
  & {
    /**
     * 署名
     */
    sign: Signature;
  };

export const WithSignature = <T>(
  v: Validator<T>,
): Validator<T & { sign: Signature }> => {
  return $intersection([
    v,
    $object({
      sign: $Signature,
    }),
  ]);
};

export const $Binary: Validator<Binary> = (input): input is Binary =>
  input instanceof Binary;
