<template>
  <div class="home">
    <div v-for="deviceCategory in deviceCategories"
           :key="`deviceCategory-${deviceCategory}`">
      <h2>{{ deviceCategory }}</h2>
      <div class="p-grid">
        <component
            v-for="(device, deviceIndex) in devices[deviceCategory]"
            :key="device.id"
            v-bind:is="deviceComponent(deviceCategory)"
            class="p-col-3"
            :device="device"
            @click="deviceSelected(deviceCategory, deviceIndex)"
        ></component>
      </div>
    </div>
    <DeviceWizard v-model="showWizard"></DeviceWizard>
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
      selectedDevice?: Device;
      showWizard: boolean = false;
    })();
  },
  mounted() {
    NextDomApi.getDevices().then((devices) => {
      for (const deviceCategory of Object.keys(this.devices)) {
        this.devices[deviceCategory] = devices.filter((device: any) => device.category == deviceCategory);
      }
    });
    /*
    setInterval(() => {
      for (const light of this.devices.lights) {
        NextDomApi.getDeviceState(light.id).then((state) => {
          if (state !== null) {
            this.states[light.id] = state;
          }
        });
      }
    }, 5000);
     */
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
