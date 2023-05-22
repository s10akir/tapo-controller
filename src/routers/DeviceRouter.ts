import Router from "express";
import {
  listDevices,
  getDevice,
  getDeviceToken,
  turnOnDevice,
  turnOffDevice,
  setColor,
  setBrightness,
} from "../libs/Tapo";

export const deviceRouter = Router();

deviceRouter.get("/", async (req, res) => {
  try {
    const devices = await listDevices(req.app.get("loginToken"));
    res.send(devices);
  } catch (e) {
    console.error(e);
    res.status(500);
  }
});

deviceRouter.get("/:id", async (req, res) => {
  try {
    const device = await getDevice(req.app.get("loginToken"), req.params.id);

    if (device) {
      return res.send(device);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    console.error(e);
    res.status(500);
  }
});

deviceRouter.post("/:id", async (req, res) => {
  try {
    const device = await getDevice(req.app.get("loginToken"), req.params.id);

    if (device) {
      turnOnDevice(device);
      return res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    console.error(e);
    res.status(500);
  }
});

deviceRouter.patch("/:id", async (req, res) => {
  try {
    const device = await getDevice(req.app.get("loginToken"), req.params.id);

    console.log(req.body);

    // TODO: imprements validation
    const color = req.body.color;
    const brightness = req.body.brightness;

    if (device) {
      const deviceToken = await getDeviceToken(device);

      // TODO: inprements action validation
      if (color) {
        await setColor(device, color, deviceToken);
      }

      if (brightness) {
        await setBrightness(device, brightness, deviceToken);
      }

      return res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

deviceRouter.delete("/:id", async (req, res) => {
  try {
    const device = await getDevice(req.app.get("loginToken"), req.params.id);

    if (device) {
      await turnOffDevice(device);
      return res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});
