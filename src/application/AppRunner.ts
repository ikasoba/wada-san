import { DB } from "../../deps/sqlite.ts";

export class AppRunner {
  private wasm?: {
    i: WebAssembly.Instance;
    m: WebAssembly.Memory;
  };

  constructor(
    private db: DB,
  ) {}

  async init(bytes: Uint8Array) {
    const mem = new WebAssembly.Memory({
      initial: 1,
      maximum: 16 * 8, // とりあえず8mb
    });

    const res = await WebAssembly.instantiate(bytes, {
      env: {
        memory: mem,
      },
      db: {
        createTable() {
        },
      },
    });

    this.wasm = {
      i: res.instance,
      m: mem,
    };

    return res;
  }

  tick() {
  }
}
