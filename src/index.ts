import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

import StunksDbRef from "./StunksDbRef";

class StunksDb {
  #path: string;

  constructor(name?: string, path?: string) {
    name = name || "stunksDB";
    path = path ? `${path?.replace(/^(\.\/|\/)/, "")}` : "database";
    this.#path = `${path}/${name}.json`;

    try {
      if (!existsSync(path)) {
        if (!existsSync(path)) mkdirSync(path, { recursive: true });
        writeFileSync(this.#path, "{}");

      } else if (!readFileSync(this.#path)) writeFileSync(this.#path, "{}");

    } catch (err) {
      throw new Error(`Unable to start stunksDb\n${err}`);
    }
  }

  public ref(key?: string) {
    return new StunksDbRef(this.#path, key)
  }
}

export = StunksDb;