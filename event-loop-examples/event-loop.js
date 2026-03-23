import fs from "fs";

console.log("Синхронний код - 1");

setTimeout(() => console.log("setTimeout - 2"), 0);

setImmediate(() => console.log("setImmediate - 3"));

Promise.resolve().then(() => console.log("Promise - 4"));

fs.readFile("./file.txt", { encoding: "utf-8" }, (error, data) => {
  if (error) {
    console.log("I/O - 5", error);
  } else {
    console.log(`I/O - 5 ${data}`);
  }
});

Promise.reject().catch(() => console.log("Promise - 6"));

console.log("Синхронний код - 7");

// 1 - синхронний код
// 7 - синхронний код

// 4 - мікротаска
// 6 - мікротаска

// 3 - макротаска
// 2 - макротаска
// 5 - макротаска
