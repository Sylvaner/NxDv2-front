import { createStore } from 'vuex';

type Capability = {
    state: any;
};

type Device = {
    capabilities: Record<string, Capability>
};

export type State = {
    devices: { [deviceId: string]: Device }
};

const state: State = {
    devices: {}
};

export const store = createStore({
    state,
    mutations: {},
    getters: {
        deviceState: (state) => (deviceId: string, capabilityName: string) => {
            console.log(Object.keys(state.devices));
            if (Object.keys(state.devices).includes(deviceId)) {
                return true;
            }
            return false;
        }
    }
})