<template>
  <div class="home">
    <h2>Lumières</h2>
    <div class="p-grid">
      <LightTile
          v-for="device in devices['light']"
          :key="device.id"
          class="p-col-3"
          :device="device"
          :deviceState="states[device.id]"
      ></LightTile>
    </div>
    <h2>Non configurés</h2>
    <div class="p-grid">
      <UnknownTile
          v-for="(device, deviceIndex) in devices['unknown']"
          :key="device.id"
          class="p-col-3"
          :device="device"
          @click="deviceSelected('unknown', deviceIndex)"
      ></UnknownTile>
    </div>
    <DeviceWizard v-model:showed="showWizard" v-model="selectedDevice"></DeviceWizard>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LightTile from "@/components/LightTile.vue";
import UnknownTile from "@/components/UnknownTile.vue";
import NextDomApi, { Device } from "@/services/NextDomApi";
import DeviceWizard from "@/components/DeviceWizard.vue";

export default defineComponent({
  name: "DevicesList",
  components: {
    DeviceWizard,
    LightTile,
    UnknownTile
  },
  data: () => {
    return new (class {
      devices: { [key: string]: Array<Device> } = {
        light: [],
        unknown: []
      };
      states: { [id: string]: any } = {};
      selectedDevice: Device = {
        id: '',
        name: '',
        capabilities: [],
        category: 'unknown',
        config: {}
      };
      showWizard: boolean = false;
    })();
  },
  mounted() {
    NextDomApi.getDevices().then((devices) => {
      for (const deviceCategory of Object.keys(this.devices)) {
        this.devices[deviceCategory] = devices.filter((device: any) => device.category == deviceCategory);
      }
    });
    setInterval(() => {
      for (const light of this.devices.light) {
        NextDomApi.getDeviceState(light.id).then((state) => {
          if (state !== null) {
            this.states[light.id] = state;
            console.log(this.states);
            console.log(state);
          }
        });
      }
    }, 5000);
  },
  methods: {
    deviceComponent(deviceCategory: string): string {
      switch (deviceCategory) {
      case 'light':
        return 'LightTile';
      case 'unknown':
      default:
        return 'UnknownTile';
      }
    },
    deviceSelected(deviceCategory: string, deviceIndex: number) {
      if (deviceCategory === 'unknown') {
        this.selectedDevice = this.devices[deviceCategory][deviceIndex];
        this.showWizard = true;
      }
    }
  },
  computed: {
    deviceCategories(): string[] {
      return Object.keys(this.devices);
    }
  }
});
</script>
