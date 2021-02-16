<template>
  <div class="home">
    <h2>Lumières</h2>
    <div class="p-grid">
      <LightTile
          v-for="device in devices.lights"
          :key="device.id"
          class="p-col-3"
          :device="device"
      ></LightTile>
    </div>
    <h2>Non configurés</h2>
    <div class="p-grid">
      <UnknownTile
          v-for="(device, deviceIndex) in devices.unknowns"
          :key="device.id"
          class="p-col-3"
          :device="device"
          @click="setSelectedDevice('unknowns', deviceIndex)"
      ></UnknownTile>
    </div>
    <DeviceWizard v-model:showed="showWizard" v-model="selectedDevice" v-on:update="updateDevices"></DeviceWizard>
  </div>
</template>

<script>
import LightTile from '@/components/LightTile.vue';
import UnknownTile from '@/components/UnknownTile.vue';
import DeviceWizard from '@/components/DeviceWizard.vue';
import NextDomApi from '@/services/NextDomApi';

export default {
  name: 'DevicesList',
  components: {
    LightTile,
    UnknownTile,
    DeviceWizard
  },
  data: () => {
    return {
      devices: {
        lights: [],
        unknowns: []
      },
      selectedDevice: {
        id: '',
        name: '',
        capabilities: [],
        category: 'unknown',
        config: {}
      },
      showWizard: false
    };
  },
  mounted() {
    this.updateDevices();
    this.startLoop();
  },
  methods: {
    updateDevices() {
      NextDomApi.getDevices().then((devices) => {
        this.devices.lights = devices.filter((device) => device.category === 'light');
        this.devices.unknowns = devices.filter((device) => device.category === 'unknown');
      });
    },
    startLoop() {
      setInterval(() => {
        for (const light of this.devices.lights) {
          NextDomApi.getDeviceState(light.id).then((state) => {
            if (state !== null) {
              this.$store.commit('setState', { deviceId: light.id, state });
            }
          });
        }
      }, 5000);
    },
    setSelectedDevice(deviceCategory, deviceIndex) {
      if (deviceCategory === 'unknowns') {
        this.selectedDevice = this.devices[deviceCategory][deviceIndex];
        this.showWizard = true;
      }
    }
  }
};
</script>
