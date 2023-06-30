<div align="center" style="margin-bottom: 30px">

  # StunksDb

  <img src="https://img.shields.io/npm/v/stunks-db?color=black&label=version" alt="Version"/>
  <img src="https://img.shields.io/npm/dt/stunks-db?color=black" alt="Downloads"/>
  <img src="https://img.shields.io/bundlephobia/min/stunks-db?color=black" alt="size"/>
  <img src="https://img.shields.io/npm/l/stunks-db?color=black" alt="license"/>
</div>
A simple library for data storage in a JSON database.

## Installation
```
npm install stunks-db
```

## Usage
```js
import StunksDb from "stunks-db";

const usersDb = new StunksDb("users");
// The name 'users' will be used as the file name

usersDb.set("name", "Daniel").set("lastname", "Costa");
// 'Daniel' and 'Costa' were saved in the keys 'name' and 'lastname' respectively.

usersDb.get("name");
// It will return 'Daniel'

usersDb.delete("name");
// now there won't be any value inside 'name' anymore

usersDb.add("age", 10).add("age", 4);
// Now 'age' will be set to '14'

usersDb.all();
// It will return {lastname: "Costa", age: 14}
```