import { createStore } from 'vuex';
import { Device, DeviceState } from '../types';

interface DeviceList { [deviceId: string]: Device};

export type State = {
    devices: DeviceList
    states: { [deviceid: string]: DeviceState}
};

const state: State = {
    devices: {},
    states: {}
};

export const store = createStore({
    state,
    mutations: {
        updatesDevices(state: State, devices: Device[]) {
            state.devices = devices.reduce((result: DeviceList, currentDevice) => {
                result[currentDevice.id] = currentDevice;
                return result;
            }, {});
        },
        addDeviceState(state: State, payload: any) {
            if (!Object.keys(state.devices).includes(payload.deviceId)) {
                state.states[payload.deviceId] = {deviceId: payload.deviceId}
            }
        },
        updateDeviceStates(state: State, payload: any) {
            state.states[payload.deviceId] = payload.states;
        }
    },
    getters: {
        deviceState: (state: State) => (deviceId: string, capability: string) => {
            if (Object.keys(state.states).includes(deviceId)) {
                return state.states[deviceId][capability];
            }
            return undefined;
        },
        devicesToUpdate: (state: State) => () => {
            return Object.keys(state.states);
        },
        devices: (state: State) => () => {
            return state.devices;
        }
    }
})