import { readFileSync, writeFileSync } from "node:fs";

class StunksDbRef {
  private key: string | undefined;
  private data: any;
  private save: () => void;
  private update: () => void;

  constructor(path: string, key?: string) {
    this.key = key;
    this.data = JSON.parse(readFileSync(path, "utf-8"));

    this.save = (): void => writeFileSync(path, JSON.stringify(this.data), "utf-8");
    this.update = (): void => {
      this.data = JSON.parse(readFileSync(path, "utf-8"));
    }
  }

  public get(): any {
    if (!this.key) return this.data;

    const keys: string[] = this.key.split(".");
    let target: any = this.data;

    for (let i: number = 0; i < keys.length; i++) {
      const currentKey: string = keys[i];

      if (!(currentKey in target)) {
        return undefined;
      }

      target = target[currentKey];
    }

    return target;
  }

  public set(value: any): void {
    if(!this.key || !value) this.errMethod("set", "key/value");

    this.$set(value);
  }

  public delete(force: boolean = false): void {
    if (!this.key) {
      if (force) {
        this.data = {};
        this.save()
        
        return;
      } else 
        throw new Error('You forgot to define the "key" parameter. If you want to delete all the data, use "true" as the parameter.')
    }

    this.$set();
  }

  public add(value: number): void {
    if (!this.key || value === null || value === undefined) this.errMethod("add", "key/value");
    if (typeof value !== "number") this.errUnexpected("add", "value", "number", typeof value);

    const oldValue: any = this.get() || 0;
    if (typeof oldValue !== "number") this.errUnexpected("add", "save_value", "number", typeof oldValue);

    this.$set(oldValue + value)
  }

  private $set(value?: any): void {
    this.update();
    if (!this.key) throw new Error("Something that happened wasn't supposed to happen.");

    if (!value)
      delete this.data[this.key];

    else {
      const keys: string[] = this.key.split(".");
      let target: any = this.data;

      for (let i: number = 0; i < keys.length - 1; i++) {
        const currentKey: string = keys[i];

        if (!(currentKey in target)) {
          target[currentKey] = {};
        }

        target = target[currentKey];
      }

      const lastKey: string = keys[keys.length - 1];
      target[lastKey] = value;
    }

    this.save();
  }

  private errMethod(method: string, parameter: string): void {
    throw new Error(`The "${method}" method is missing the ${parameter} parameter.`)
  }

  private errUnexpected(method: string, parameter: string, expected: string, value: string): void {
    throw new TypeError(`In ${method}, the "${parameter}" parameter should be "${expected}", but it is "${value}" instead.`);
  }
};

export = StunksDbRef;