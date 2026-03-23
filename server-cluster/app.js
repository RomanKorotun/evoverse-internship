import express from "express";

const app = express();

app.use((req, res, next) => {
  console.log(
    `Worker ${process.pid} отримав запит на ${req.method} ${req.url}`,
  );
  next();
});

app.get("/", (req, res) => {
  let result = 0;

  for (let i = 0; i < 1e8; i++) {
    result += Math.sqrt(i) * Math.sin(i) * Math.tan(i % 1000);
  }

  res.send(`Hello from worker ${process.pid}. Result: ${result}`);
});

export default app;
