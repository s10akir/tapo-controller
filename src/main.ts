import express from "express";

import { deviceRouter } from "./routers/deviceRouter";

const app = express();

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.use("/devices/", deviceRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running!");
});
