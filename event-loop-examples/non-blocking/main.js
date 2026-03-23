import fs from "fs/promises";
import path from "path";
import { Worker } from "worker_threads";

console.log("Синхронна операція - 1");

console.log("Синхронна операція - 2");

setTimeout(() => console.log("setTimeout - 3"), 0);

Promise.resolve().then(() => console.log("Promise - 4"));

setImmediate(() => console.log("setImmediate - 5"));

async function getFile() {
  try {
    const data = await fs.readFile("./file.txt", "utf-8");
    console.log(`I/O - 6 ${data}`);
  } catch (error) {
    console.log("I/O - 6", error);
  }
}
getFile();

const pathWorker = path.resolve(
  "event-loop-examples",
  "non-blocking",
  "worker.js",
);

const worker = new Worker(pathWorker);
worker.on("message", (result) => {
  console.log(`Синхронна операція - 7 результат (з воркера): ${result}`);
});

console.log("Синхронна операція - 8");
