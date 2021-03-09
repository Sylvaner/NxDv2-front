import NextDomApi from './NextDomApi';
import { useStore } from 'vuex';

export default class StateUpdater {
    /**
     * Request API
     */
    public start() {
        const store = useStore();
        setInterval(() => {
            const devicesId = store.getters.devices();
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