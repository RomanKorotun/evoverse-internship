import cluster from "cluster";
import os from "os";
import app from "./app.js";

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  console.log(`Forking ${numCPUs} workers`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died. Forking a new one...`);
    cluster.fork();
  });
} else {
  const PORT = 3030;
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} started, listening on port ${PORT}`);
  });
}
