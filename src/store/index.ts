import { createStore } from 'vuex';

type Device = {
    capabilities: { [capability: string]: any},
    states: { [capability: string]: any}
};

export type State = {
    devices: { [deviceId: string]: Device }
};

const state: State = {
    devices: {}
};

export const store = createStore({
    state,
    mutations: {
        addDevice(state: State, payload: any) {
            if (!Object.keys(state.devices).includes(payload.deviceId)) {
                state.devices[payload.deviceId] = {
                    capabilities: {},
                    states: {}
                }
            }
        },
        updateDeviceStates(state: State, payload: any) {
            state.devices[payload.deviceId].states = payload.states;
        }
    },
    getters: {
        deviceState: (state: State) => (deviceId: string, capability: string) => {
            if (Object.keys(state.devices).includes(deviceId)) {
                return state.devices[deviceId].states[capability];
            }
            return false;
        },
        devices: (state: State) => () => {
            return Object.keys(state.devices);
        }
    }
})