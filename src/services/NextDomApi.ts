import Axios, { AxiosInstance } from "axios";
import { Store } from 'vuex';

export interface Device {
  id: string;
  name: string;
  category: string;
  capabilities: Record<string, any>;
  config: Record<string, any>;
}

export interface DeviceState {
  deviceId: string,
  [capabilityName: string]: any
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
  [capability: string]: CapabilityAccessor;
}

export interface Credentials {
  server: string
}

export default class NextDomApi {
  private static instance: NextDomApi;

  private constructor(private axiosInstance: AxiosInstance) {}

  public static getInstance(): NextDomApi {
    if (NextDomApi.instance === undefined) {
      NextDomApi.instance = new NextDomApi(Axios.create());
    }
    return NextDomApi.instance;
  }

  public async connectFromCache(store: Store<any>) {
    const rawStoredCredentials = localStorage.getItem('credentials');
    if (rawStoredCredentials !== null) {
      const storedCredentials: Credentials = JSON.parse(rawStoredCredentials);
      await this.connect(storedCredentials, store);
    }
  }

  public connect(credentials: Credentials, store: Store<any>): Promise<NextDomApi> {
    return new Promise<NextDomApi>((resolve, reject) => {
      const testInstance = Axios.create({
        baseURL: `http://${credentials.server}`,
      });
      testInstance.get('/zone').then((_: any) => {
        store.commit('credentials', credentials);
        this.axiosInstance = Axios.create({
          baseURL: `http://${credentials.server}`,
        });
        resolve(this);
      })
      .catch((_: any) => {
        reject();
      });
    });
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

  public static setCategory(deviceId: string, category: string): Promise<any> {
    return new Promise<Device>((resolve, reject) => {
      NextDomApi.getInstance()
        .axiosInstance.post(`/device/${deviceId}/category`, {category})
        .then((response: any) => {
          resolve(response.data);
        })
        .catch((response: any) => {
          reject(response);
        })
    });
  }

  public static setConfig(deviceId: string, config: any): Promise<any> {
    return new Promise<Device>((resolve, reject) => {
      NextDomApi.getInstance()
        .axiosInstance.post(`/device/${deviceId}/category`, {config})
        .then((response: any) => {
          resolve(response.data);
        })
        .catch((response: any) => {
          reject(response);
        })
    });
  }
}