<template>
  <DataView :value="models" layout="grid">
    <template #grid="slotProps">
      <div style="padding: .5em" class="p-col-12 p-md-4">
        <DeviceCard :template="slotProps.data.template" @click="selectedModel(slotProps.data)" :enabled="false" />
      </div>
    </template>
  </DataView>
</template>

<script>
import DeviceCard from '../../DeviceCard.vue';
import DataView from 'primevue/dataview';
import { SingleLight, SingleDimmerLight } from '../Models';

const models = [
  new SingleLight(),
  new SingleDimmerLight()
];
export default {
  name: "ModelsChoice",
  components: {
    DeviceCard,
    DataView
  },
  data: () => {
    return {
      models: models
    }
  },
  created() {
    this.$store.commit('updateDeviceStates', {
      deviceId: 'test-device',
      states: {
        'on': true,
        'integer': 128
      }
    });
  },
  emits: ['change'],
  methods: {
    selectedModel(model) {
      this.$emit('change', model);
    }
  }
}
</script>

<style>

</style>