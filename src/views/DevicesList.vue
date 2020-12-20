<template>
  <div class="home">
    <div class="p-grid">
      <Light
        v-for="device in devices"
        :key="device.id"
        class="p-col-3"
        :device="device"
        :state="states[device.id]"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Light from "@/components/Light.vue";
import NextDomApi, { Device } from "@/services/NextDomApi";

export default defineComponent({
  name: "DevicesList",
  components: {
    Light
  },
  data: () => {
    return new (class {
      devices: Array<Device> = [];
      states: { [id: string]: any } = {};
    })();
  },
  mounted() {
    NextDomApi.getDevices().then((devices) => {
      this.devices = devices.filter((device: any) => device.type === "light");
    });
    setInterval(() => {
      for (const device of this.devices) {
        if (device.type === "light") {
          NextDomApi.getDeviceState(device.id).then((state) => {
            if (state !== null) {
              this.states[device.id] = state;
            }
          });
        }
      }
    }, 5000);
  }
});
</script>
