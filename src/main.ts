import express from "express";

import { deviceRouter } from "./routers/deviceRouter";
import { getLoginToken } from "./libs/Tapo";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.use("/devices/", deviceRouter);

app.listen(process.env.PORT || 3000, async () => {
  app.set("loginToken", await getLoginToken());

  console.log("Server is running!");
});
