import {
  cloudLogin,
  loginDevice,
  listDevices as tapoListDevices,
  turnOn as tapoTurnOn,
  turnOff as tapoTurnOff,
  setColour as tapoSetColor,
  setBrightness as tapoSetBrightness,
  TapoDevice,
  TapoDeviceKey,
} from "tp-link-tapo-connect";

export async function getLoginToken() {
  return await cloudLogin(
    process.env.TP_LINK_USERNAME || "",
    process.env.TP_LINK_PASSWORD || ""
  );
}

export async function getDeviceToken(device: TapoDevice) {
  return await loginDevice(
    process.env.TP_LINK_USERNAME || "",
    process.env.TP_LINK_PASSWORD || "",
    device
  );
}

export async function listDevices(loginToken: string) {
  return await tapoListDevices(loginToken);
}

export async function getDevice(loginToken: string, deviceId: string) {
  const devices = await listDevices(loginToken);
  const device = devices.find((device) => device.deviceId === deviceId);

  return device;
}

export async function turnOnDevice(
  device: TapoDevice,
  deviceToken?: TapoDeviceKey
) {
  tapoTurnOn(deviceToken || (await getDeviceToken(device)));
}

export async function turnOffDevice(
  device: TapoDevice,
  deviceToken?: TapoDeviceKey
) {
  tapoTurnOff(deviceToken || (await getDeviceToken(device)));
}

export async function setColor(
  device: TapoDevice,
  color: string,
  deviceToken?: TapoDeviceKey
) {
  tapoSetColor(deviceToken || (await getDeviceToken(device)), color);
}

export async function setBrightness(
  device: TapoDevice,
  brightness: number,
  deviceToken?: TapoDeviceKey
) {
  tapoSetBrightness(deviceToken || (await getDeviceToken(device)), brightness);
}
