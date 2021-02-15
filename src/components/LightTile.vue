<template>
  <Card>
    <template #title>{{ device.name }}</template>
    <!--
    <template #content v-if="state !== undefined">
      <i
        :class="['pi', state.state === true ? 'pi-check' : 'pi-times']"
        @click="switchState"
      ></i>
    </template>
    -->
  </Card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "primevue/card";
//import NextDomApi from "@/services/NextDomApi";

export default defineComponent({
  name: "LightTile",
  components: {
    Card
  },
  props: {
    device: {
      type: Object
    }
    /*,
    state: {
      type: Object
    }

     */
  }/*,
  methods: {
    switchState(): void {
      if (this.device !== undefined && this.state !== undefined) {
        NextDomApi.setDeviceAction(this.device.id, "state", !this.state.state);
      }
    }
  }
  */
});
</script>
