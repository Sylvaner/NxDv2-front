<template>
  <Card>
    <template #title>{{ device.name }}</template>
    <template #content v-if="state !== undefined">
      <i
        :class="['pi', state === true ? 'pi-check' : 'pi-times']"
        @click="switchState"
      ></i>
    </template>
  </Card>
</template>

<script>
import Card from 'primevue/card';
import NextDomApi from '@/services/NextDomApi';

export default ({
  name: 'LightTile',
  components: {
    Card
  },
  props: {
    device: {
      type: Object
    }
  },
  computed: {
    state() {
      if (this.device !== undefined) {
        if (this.deviceState !== undefined) {
          return this.deviceState[this.device.config.state];
        }
      }
      return false;
    },
    deviceState() {
      return this.$store.getters.deviceState(this.device.id);
    }
  },
  methods: {
    switchState() {
      if (this.device !== undefined && this.deviceState !== undefined) {
        NextDomApi.setDeviceAction(this.device.id, this.device.config.state, !this.deviceState[this.device.config.state]);
      }
    }
  }
});
</script>
