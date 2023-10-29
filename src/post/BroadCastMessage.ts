import { WadaPost, WadaPostType } from "./WadaPostType.ts";
import { Address, WithSignature } from "./common.ts";

export interface BroadCastMessage<P extends WadaPost> {
  type: WadaPostType.BroadCast;
  body: P;
  receivers: WithSignature<{ addr: Address }>[];
}
