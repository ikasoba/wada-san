import { BroadCastMessage } from "./BroadCastMessage.ts";
import { Command, Message, MessageWithSignature } from "./Message.ts";
import {
  Reply,
  ReplyMessage,
  ReplyMessageWithSignature,
} from "./ReplyMessage.ts";

export enum WadaPostType {
  Message = 0,
  Reply,
  BroadCast,
}

export type WadaPost<T = {}> =
  | Message<T & Command>
  | ReplyMessage<T & Reply>
  | BroadCastMessage<T & WadaPost>;

export type WadaPostWithSignature<T = {}> =
  | MessageWithSignature<T & Command>
  | ReplyMessageWithSignature<T & Reply>;
