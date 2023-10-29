import { Address } from "../post/common.ts";

export interface ApplicationInfo {
  appHash: string;
  author: Address;
  createdAt: Date;
}
