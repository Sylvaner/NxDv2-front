import Axios from 'axios';

export default class NextDomApi {
  static instance;
  static axiosInstance;

  constructor(axiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  static getInstance() {
    if (NextDomApi.instance === undefined) {
      NextDomApi.instance = new NextDomApi(Axios.create());
    }
    return NextDomApi.instance;
  }

  static getDeviceState(id) {
    return new Promise((resolve, reject) => {
      NextDomApi.getInstance()
        .axiosInstance.get('/device/' + id + '/state')
        .then((response) => {
          resolve(response.data);
        })
        .catch((response) => {
          reject(response);
        });
    });
  }

  static getDevices() {
    return new Promise((resolve, reject) => {
      NextDomApi.getInstance()
        .axiosInstance.get('/device')
        .then((response) => {
          resolve(response.data);
        })
        .catch((response) => {
          reject(response);
        });
    });
  }

  static postScenario(scenarioData) {
    return new Promise((resolve, reject) => {
      NextDomApi.getInstance()
        .axiosInstance.post('/scenario', scenarioData)
        .then((response) => {
          resolve(response.data);
        })
        .catch((response) => {
          reject(response);
        });
    });
  }

  static setDeviceAction(deviceId, capability, newValue) {
    return new Promise((resolve, reject) => {
      NextDomApi.getInstance()
        .axiosInstance.post('/device/' + deviceId + '/action/' + capability + '/' + newValue)
        .then((response) => {
          resolve(response.data);
        })
        .catch((response) => {
          reject(response);
        });
    });
  }

  static setCategory(deviceId, category, config) {
    const configData = {
      category,
      config
    };
    return new Promise((resolve, reject) => {
      NextDomApi.getInstance()
        .axiosInstance.post(`/device/${deviceId}/category`, configData)
        .then((response) => {
          resolve(response.data);
        })
        .catch((response) => {
          reject(response);
        });
    });
  }
}
