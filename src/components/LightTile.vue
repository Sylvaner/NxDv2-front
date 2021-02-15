<template>
  <Card>
    <template #title>{{ device.name }}</template>
    <template #content v-if="state !== undefined">
      <p @click="test">T</p>
      <i
        :class="['pi', state.state === true ? 'pi-check' : 'pi-times']"
        @click="switchState"
      ></i>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "primevue/card";
import NextDomApi from "@/services/NextDomApi";

export default defineComponent({
  name: "LightTile",
  components: {
    Card
  },
  props: {
    device: {
      type: Object
    },
    deviceState: {
      type: Object
    }
  },
  computed: {
    state(): boolean {
      if (this.device !== undefined && this.deviceState !== undefined) {
        return this.deviceState[this.device.config.state];
      }
      return false;
    }
  },
  methods: {
    test(): void {
      console.log(this.device);
      console.log(this.state);
    },
    switchState(): void {
      if (this.device !== undefined && this.deviceState !== undefined) {
        NextDomApi.setDeviceAction(this.device.id, this.device.config.state, !this.deviceState[this.device.config.state]);
      }
    }
  }
});
</script>
