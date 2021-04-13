import { createStore } from 'vuex';
import { Device, DeviceState, Credentials } from '../services/NextDomApi';

interface DeviceList { [deviceId: string]: Device};

export type State = {
    devices: DeviceList
    states: { [deviceid: string]: DeviceState}
    renderCards: any[]
    credentials: Credentials
};

const state: State = {
    devices: {},
    states: {},
    renderCards: [],
    credentials: {server: ''}
};

export const store = createStore({
    state,
    mutations: {
        credentials(state: State, credentials: Credentials) {
            state.credentials = credentials;
            localStorage.setItem('credentials', JSON.stringify(credentials));
        },
        updatesDevices(state: State, devices: Device[]) {
            state.devices = devices.reduce((result: DeviceList, currentDevice) => {
                result[currentDevice.id] = currentDevice;
                return result;
            }, {});
        },
        addDeviceState(state: State, deviceId: any) {
            console.log('addDeviceState on ' + deviceId);
            console.log(state.devices);
            if (!Object.keys(state.states).includes(deviceId)) {
                console.log('Add ' + deviceId);
                state.states[deviceId] = {deviceId: deviceId}
            }
        },
        updateDeviceStates(state: State, payload: any) {
            state.states[payload.deviceId] = payload.states;
        },
        addRenderCard(state: State, renderCard: any) {
            state.renderCards.push(renderCard);
            console.log(renderCard);
            for (const deviceId of renderCard.devices) {
              store.commit('addDeviceState', deviceId);
            }
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
        devicesByCategory: (state: State) => (category: string): Device[] => {
            return Object.values(state.devices).filter(device => device.category === category);
        },
        devicesToManage: (state: State, getters: any) => (showHiddenDevices: Boolean) => {
            const unknownDevices = getters.devicesByCategory('unknown');
            if (!showHiddenDevices) {
                return unknownDevices.filter((device: Device) => {
                    return !(device.config !== undefined && device.config.hidden === true);
                });
            }
            return unknownDevices;
        },
        devices: (state: State) => () => {
            return state.devices;
        },
        isConnected: (state: State) => () => {
            return state.credentials.server !== '';
        },
        renderCards: (state: State) => () => {
            return state.renderCards;
        }
    }
})
