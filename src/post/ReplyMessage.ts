import { Binary } from "../../deps/bson.ts";
import { WadaPostType } from "./WadaPostType.ts";
import { Address, WithSignature } from "./common.ts";

/**
 * メッセージへの応答
 */
export interface ReplyMessage<T extends Reply> {
  type: WadaPostType.Message;
  id: string;

  /**
   * 宛先のメッセージ
   */
  destId: string;
  body: T;

  /**
   * 作成者
   */
  from: Address;

  /**
   * 宛先のアドレス
   */
  to: Address;
}

export type ReplyMessageWithSignature<T extends Reply> = WithSignature<
  ReplyMessage<T>
>;

export type Reply =
  | SendStreamReply
  | CloseStreamReply;

export enum ReplyType {
  SendStream = 0,
  CloseStream = 1,
}

export interface SendStreamReply {
  type: ReplyType.SendStream;
  digest: string;
  content: Binary;
}

export interface CloseStreamReply {
  type: ReplyType.CloseStream;
}
