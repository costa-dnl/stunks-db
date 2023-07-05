<div align="center" style="margin-bottom: 30px">

  # Stunks-DB

  <img src="https://img.shields.io/npm/v/stunks-db?color=black&label=version" alt="Version"/>
  <img src="https://img.shields.io/npm/dt/stunks-db?color=black" alt="Downloads"/>
  <img src="https://img.shields.io/bundlephobia/min/stunks-db?color=black" alt="Size"/>
  <img src="https://img.shields.io/npm/l/stunks-db?color=black" alt="License"/>
</div>
A simple database with a simple purpose.

## Installation
```
npm install stunks-db
```

## Usage
```js
import StunksDb from "stunks-db";

const usersDb = new StunksDb("users");
// The name 'users' will be used as the file name

usersDb.ref("11111.lastname").set("Costa");
// 'Costa' was saved in '11111.lastname'.
usersDb.ref("99999.name").set("Yuri");
// 'Yuri' was saved in '99999.name'.

usersDb.ref("11111.age").set(10);
usersDb.ref("11111.age").add(4);
// Now '11111.age' will be set to '14'
usersDb.ref("99999.age").add(32);
// '32' was added in '99999.age'.

usersDb.ref("11111.lastname").delete();
// Now there won't be any value inside '11111.lastname' anymore.

usersDb.ref("11111.lastname").get();
// It will return 'undefined'
usersDb.ref().get();
// It will return { "11111": { "age": 14 }, "99999": { "lastname": "Yuri", "age": 32 } }
```