import { parentPort } from "worker_threads";

let result = 0;

for (let i = 0; i < 1e8; i++) {
  result += Math.sqrt(i) * Math.sin(i) * Math.tan(i % 1000);
}

parentPort.postMessage(result);
