import NextDomApi from './NextDomApi';
import { useStore } from 'vuex';

export default class StateUpdater {
    /**
     * Request API
     */
    public start() {
        const store = useStore();
        NextDomApi.getDevices().then((devices) => {
            store.commit('updatesDevices', devices);
        })
        setInterval(() => {
            const devicesId = store.getters.devicesToUpdate();
            for (const deviceId of devicesId) {
                NextDomApi.getDeviceState(deviceId).then((states) => {
                    store.commit('updateDeviceStates', {
                        deviceId,
                        states
                    });
                });
            }
        }, 2000);
    }
}