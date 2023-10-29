import { $array, $bigint, $boolean, $const, $null, $number, $object, $string, $union, Infer } from "../../deps/lizod.ts";
import { DB, QueryParameterSet } from "../../deps/sqlite.ts";

export enum ColumnType {
  Text = 0,
  Integer,
  Real,
  Numeric,
  Blob,
}

export type QueryParamValue = Infer<typeof $QueryParamValue>;

export const $QueryParamValue = $union([
  $boolean
  , $number
  , $string
  , $null
  , $bigint
  , ((x): x is Uint8Array => x instanceof Uint8Array)
])

export type QueryParams = Infer<typeof $QueryParamSet>;

export const $QueryParamSet = $array($QueryParamValue)

export const $SqlQuery = $union([
  $object({
    type: $const("exec"),
    query: $string
  }),
  $object({
    type: $const("query"),
    query: $string,
    values:
  })
])

export class WadaDB {
  static validateIdent(text: string): boolean {
    return /^[a-zA-Z_][a-zA-Z_0-9]*$/.test(text);
  }

  constructor(private db: DB) {}

  query(query: string, values: QueryParameterSet) {
    this.db.query(query, values);
  }
}
