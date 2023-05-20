import Router from "express";
import {
  listDevices,
  getDevice,
  turnOnDevice,
  turnOffDevice,
} from "../libs/Tapo";

export const deviceRouter = Router();

deviceRouter.get("/", async (_, res) => {
  const devices = await listDevices();
  res.send(devices);
});

deviceRouter.get("/:id", async (req, res) => {
  const device = await getDevice(req.params.id);

  if (device) {
    return res.send(device);
  } else {
    res.sendStatus(404);
  }
});

deviceRouter.post("/:id", async (req, res) => {
  const device = await getDevice(req.params.id);

  if (device) {
    turnOnDevice(device);
    return res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

deviceRouter.delete("/:id", async (req, res) => {
  const device = await getDevice(req.params.id);

  if (device) {
    await turnOffDevice(device);
    return res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});
