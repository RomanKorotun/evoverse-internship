import fs from "fs/promises";

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

console.time("Блокування основного потоку");
let result = 0;
for (let i = 0; i < 1e8; i++) {
  result += Math.sqrt(i) * Math.sin(i) * Math.tan(i % 1000);
}
console.log(`Синхронна операція - 7 результат:${result}`);
console.timeEnd("Блокування основного потоку");

console.log("Синхронна операція - 8");
