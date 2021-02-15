import Axios, { AxiosInstance } from "axios";

export interface Device {
  id: string;
  name: string;
  category: string;
  capabilities: Record<string, any>;
  config: Record<string, any>;
}

interface DeviceState {
  state: boolean;
}

type MqttFormat = "raw" | "json";

interface MqttAccessDesc {
  topic: string;
  path: string;
  format?: MqttFormat;
  type: string;
}

export interface CapabilityAccessor {
  get?: MqttAccessDesc;
  set?: MqttAccessDesc;
}

export interface Capabilities {
  [capabilityName: string]: CapabilityAccessor;
}

export default class NextDomApi {
  private static instance: NextDomApi;

  private constructor(private axiosInstance: AxiosInstance) { }

  public static getInstance(): NextDomApi {
    if (NextDomApi.instance === undefined) {
      NextDomApi.instance = new NextDomApi(Axios.create());
    }
    return NextDomApi.instance;
  }

  public static getDeviceState(id: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      NextDomApi.getInstance()
        .axiosInstance.get(`/device/${id}/state`)
        .then((response: any) => {
          resolve(response.data);
        })
        .catch((response: any) => {
          reject(response);
        });
    });
  }

  public static getDevices(): Promise<any> {
    return new Promise<[any]>((resolve, reject) => {
      NextDomApi.getInstance()
        .axiosInstance.get("/device")
        .then((response: any) => {
          resolve(response.data);
        })
        .catch((response: any) => {
          reject(response);
        });
    });
  }

  public static postScenario(scenarioData: object): Promise<any> {
    return new Promise<[any]>((resolve, reject) => {
      NextDomApi.getInstance()
        .axiosInstance.post("/scenario", scenarioData)
        .then((response: any) => {
          resolve(response.data);
        })
        .catch((response: any) => {
          reject(response);
        });
    });
  }

  public static setDeviceAction(deviceId: string, capability: string, newValue: any): Promise<[any]> {
    return new Promise<[any]>((resolve, reject) => {
      NextDomApi.getInstance()
        .axiosInstance.post(`/device/${deviceId}/action/${capability}/${newValue}`)
        .then((response: any) => {
          resolve(response.data);
        })
        .catch((response: any) => {
          reject(response);
        })
    });
  }

  public static setCategory(deviceId: string, category: string, config: object): Promise<any> {
    const configData = {
      category,
      config
    };
    return new Promise<Device>((resolve, reject) => {
      NextDomApi.getInstance()
        .axiosInstance.post(`/device/${deviceId}/category`, configData)
        .then((response: any) => {
          resolve(response.data);
        })
        .catch((response: any) => {
          reject(response);
        })
    });
  }
}
