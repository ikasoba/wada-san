import { $const, $number } from "npm:lizod@0.2.7";
import {
  $object,
  $string,
  $union,
  Infer,
  Validator,
} from "../../deps/lizod.ts";
import { WadaPostType } from "./WadaPost.ts";
import { $Address, $Binary, Address, WithSignature } from "./common.ts";

export const isMessageCommandType = <T extends CommandType>(
  m: Message<Command>,
  t: T,
): m is Message<Command & { type: T }> => {
  return m.body.type == t;
};

export enum CommandType {
  Ping = 0,
  PutApplication,
  DestroyApplication,
  GetApplicationInfo,
  ConnectStream,
  SendStream,
  CloseStream,
}

export type Command =
  | PingCommand
  | PutApplicationCommand
  | DestroyApplicationCommand
  | GetApplicationInfoCommand
  | ConnectStreamCommand
  | CloseStreamCommand;

export type PingCommand = Infer<typeof $PingCommand>;

export const $PingCommand = $object({
  type: $const(CommandType.Ping),
});

export type PutApplicationCommand = Infer<typeof $PutApplicationCommand>;

export const $PutApplicationCommand = $object(
  {
    type: $const(CommandType.PutApplication),
    appBin: $Binary,
  },
);

export type DestroyApplicationCommand = Infer<
  typeof $DestroyApplicationCommand
>;

export const $DestroyApplicationCommand = $object({
  type: $const(CommandType.DestroyApplication),
  appHash: $string,
});

export type GetApplicationInfoCommand = Infer<
  typeof $GetApplicationInfoCommand
>;

export const $GetApplicationInfoCommand = $object({
  type: $const(CommandType.GetApplicationInfo),
  appHash: $string,
});

/**
 * 和田ストリームをWASMアプリへ対して開く
 */
export type ConnectStreamCommand = Infer<typeof $ConnectStreamCommand>;

export const $ConnectStreamCommand = $object({
  type: $const(CommandType.ConnectStream),
  appHash: $string,
});

export type SendStreamCommand = Infer<typeof $SendStreamCommand>;

export const $SendStreamCommand = $object({
  type: $const(CommandType.SendStream),
  appHash: $string,
  content: $Binary,
});

export type CloseStreamCommand = Infer<typeof $CloseStreamCommand>;

export const $CloseStreamCommand = $object({
  type: $const(CommandType.CloseStream),
  appHash: $string,
  streamId: $string,
});

export const $Command = $union([
  $PingCommand,
  $PutApplicationCommand,
  $DestroyApplicationCommand,
  $GetApplicationInfoCommand,
  $ConnectStreamCommand,
  $CloseStreamCommand,
]);

/**
 * メッセージ
 */
export interface Message<T extends Command> {
  type: WadaPostType.Message;
  id: string;
  body: T;

  /**
   * 作成者
   */
  from: Address;
}

export const $Message = <T extends Command>(
  $T: Validator<T>,
): Validator<Message<T>> =>
  $object({
    type: $const(WadaPostType.Message),
    id: $string,
    body: $T,
    from: $Address,
  });

export type MessageWithSignature<T extends Command> = WithSignature<Message<T>>;
