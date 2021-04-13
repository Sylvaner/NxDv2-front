import NextDomApi from './NextDomApi';
import { Store } from 'vuex';

export default class StateUpdater {
    private static started = false;

    public static start(store: Store<any>) {
        console.log('start');
        if (StateUpdater.readyToStart(store)) {
            StateUpdater.initDevicesInStore(store);
            setInterval(() => {
                const devicesId = store.getters.devicesToUpdate();
                console.log('Devices to update');
                console.log(devicesId);
                for (const deviceId of devicesId) {
                    NextDomApi.getDeviceState(deviceId).then((states) => {
                        if (states !== null) {
                            store.commit('updateDeviceStates', {
                                deviceId,
                                states
                            });
                        }
                    });
                }
            }, 2000);
            this.started = true;    
        }
    }

    private static readyToStart(store: Store<any>): boolean {
        return store.getters.isConnected() && !StateUpdater.started;
    }

    private static initDevicesInStore(store: Store<any>): void {
        NextDomApi.getDevices().then((devices) => {
            store.commit('updatesDevices', devices);
        })
    }
}