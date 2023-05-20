import {
  cloudLogin,
  loginDevice,
  listDevices as tapoListDevices,
  turnOn as tapoTurnOn,
  turnOff as tapoTurnOff,
  TapoDevice,
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

export async function listDevices() {
  return await tapoListDevices(await getLoginToken());
}

export async function getDevice(deviceId: string) {
  const devices = await listDevices();
  const device = devices.find((device) => device.deviceId === deviceId);

  return device;
}

export async function turnOnDevice(device: TapoDevice) {
  tapoTurnOn(await getDeviceToken(device));
}

export async function turnOffDevice(device: TapoDevice) {
  tapoTurnOff(await getDeviceToken(device));
}
