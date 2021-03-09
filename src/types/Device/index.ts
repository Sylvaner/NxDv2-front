export type DeviceCapability = {
  get?: any,
  set?: any
}

export type Device = {
    id: string,
    _id: string,
    name: string,
    capabilities: {[name: string]: DeviceCapability},
    category: string
}

export type DeviceState = {
    deviceId: string,
    capability: string
}