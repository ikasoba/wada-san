import { deserialize } from "../../deps/bson.ts";
import {
  $Command,
  $Message,
  Command,
  CommandType,
  isMessageCommandType,
  Message,
  PingCommand,
  PutApplicationCommand,
} from "../post/Message.ts";
import { Address } from "../post/common.ts";
import { sha256Hex } from "../util/sha256.ts";

export interface IWadaPeer {
  addr: Address;
}

export class WadaNode {
  constructor(public peers: Set<IWadaPeer>) {}

  fetch(req: Request) {
    if (req.headers.get("upgrade") != "websocket") {
      return new Response(null, { status: 501 });
    }

    const { socket, response } = Deno.upgradeWebSocket(req);

    socket.binaryType = "arraybuffer";

    socket.addEventListener("message", (e) => {
      const rawData: unknown = e.data;

      if (!(rawData instanceof ArrayBuffer)) return;

      const data = deserialize(new Uint8Array(rawData));

      if ($Message($Command)(data)) {
        this.onMessage(data);
      }
    });

    return response;
  }

  onMessage<C extends Command>(msg: Message<C>) {
    if (isMessageCommandType(msg, CommandType.Ping)) {
      return this.ping(msg);
    }
  }

  ping(_: Message<PingCommand>): Date {
    return new Date();
  }

  async putApplication(msg: Message<PutApplicationCommand>) {
    const appBin = msg.body.appBin.buffer;
    if (WebAssembly.validate(appBin)) return;

    const appId = await sha256Hex(appBin);

    const instance = WebAssembly.instantiate(appBin);
  }
}
