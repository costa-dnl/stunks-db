import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";

class StunksDb {
  private path: string;
  private data: any;

  constructor(name: string = "stunksDb") {
    this.path = `database/${name}.json`;
    try {
      if (!existsSync(this.path)) {
        if (!existsSync('database')) mkdirSync('database');
        writeFileSync(this.path, '{}');

      } else if (!readFileSync(this.path)) writeFileSync(this.path, '{}');

      this.data = JSON.parse(readFileSync(this.path).toString())
    } catch (err) {
      throw new Error(`Unable to start stunksDb\n${err}`);
    }
  }

  public set(key: string, value: any): StunksDb {
    if(!key || !value) this.errMethod('set', 'key/value');

    this.$set(key, value);

    return this;
  }

  /*
  public get(key: string): any {
    if(!key) return this.errMethod('get', 'key');
    
    return this.data[key];
  }
  */

  public get(key: string): any {
    if (!key) this.errMethod('get', 'key');
  
    const keys: string[] = key.split('.');
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
  

  public delete(key: string): StunksDb {
    if(!key) this.errMethod('delete', 'key');

    this.$set(key)

    return this;
  }

  /*
  public add(key: string, value: number): void {
    if(!key || !value) return this.errMethod('add', 'key/value');
    if(typeof value !== 'number') return this.errUnexpected('add', 'value', 'number', typeof value);
    
    const oldValue: any = this.data[key];

    if(typeof oldValue !== 'number') return this.errUnexpected('add', 'data_value', 'number', typeof oldValue);

    this.$set(key, oldValue + value);
  }
  */

  public add(key: string, value: number): StunksDb {
    if (!key || isNaN(value)) this.errMethod('add', 'key/value');
  
    const keys: string[] = key.split('.');
    let target: any = this.data;
  
    for (let i = 0; i < keys.length - 1; i++) {
      const currentKey: string = keys[i];
  
      if (!(currentKey in target)) {
        target[currentKey] = {};
      }
  
      target = target[currentKey];
    }
  
    const lastKey: string = keys[keys.length - 1];
    const oldValue: any = target[lastKey];
  
    if (oldValue && typeof oldValue !== 'number') this.errUnexpected('add', 'data_value', 'number', typeof oldValue);
  
    target[lastKey] = (oldValue || 0) + value;
  
    writeFileSync(this.path, JSON.stringify(this.data));

    return this;
  }
  
  

  public all(): any {
    return this.data;
  }

  private $set(key: string, value?: any): void {
    if (!value) {
      delete this.data[key];
    } else {
      const keys: string[] = key.split('.');
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
  
    writeFileSync(this.path, JSON.stringify(this.data));
  }

  private errMethod(method: string, parameter: string): void {
    throw new Error(`The "${method}" method is missing the ${parameter} parameter.`);
  }

  private errUnexpected(method: string, parameter: string, expected: string, value: string): void {
    throw new TypeError(`In ${method}, the "${parameter}" parameter should be "${expected}", but it is "${value}" instead.`);
  }
};

export = StunksDb;