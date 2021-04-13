<template>
  <DeviceCard v-for="card in $store.getters.renderCards()" :key="card.id" :template="card"></DeviceCard>
  <AddDeviceCardWizard />
</template>

<script lang="ts">
import DeviceCard from './DeviceCard.vue';
import AddDeviceCardWizard from './Dialog/AddDeviceCardWizard.vue';
import { CardTemplate } from '../types';
import { defineComponent } from 'vue';
import StateUpdater from '../services/StateUpdater';

export default defineComponent({
  name: 'Render',
  components: {
    AddDeviceCardWizard,
    DeviceCard
  },
  data() : {
    cards: CardTemplate[]
  } {
    return {
      cards: []
    }
  },
  created() {
    this.$store.commit('addRenderCard', {
          id: 'a-test-id',
          card: {
            position: 'absolute',
            width: '300px',
            x: '10%',
            y: '20px'
          },
          devices: ['lights-2'],
          items: [
            { type: 'Title', props: {title: 'Mon titre' }},
            { type: 'BooleanTextState', props: {label: 'My state', onLabel: 'On', offLabel: 'Off', state: {deviceId: 'lights-2', capability: 'on'}}},
            { type: 'ToggleStateIcon', props: {label: 'My state', state: {deviceId: 'lights-2', capability: 'on'}, onIcon: 'pi pi-check', offIcon: 'pi pi-times'}},
            { type: 'ActionButton', props: {label: 'On', action: {deviceId: 'lights-2', capability: 'on', targetValue: true}}},
            { type: 'ActionButton', props: {label: 'Off', action: {deviceId: 'lights-2', capability: 'on', targetValue: false}}},
            { type: 'LevelTextState', props: {label: 'Brightness', state: {deviceId: 'lights-2', capability: 'bri'}}},
            { type: 'SliderState', props: {label: 'Brightness: ', min: 0, max: 255, state: {deviceId: 'lights-2', capability: 'bri'}}},
            { type: 'KnobState', props: {label: 'Brightness: ', min: 0, max: 255, state: {deviceId: 'lights-2', capability: 'bri'}}}
          ]
        }
    );
    StateUpdater.start(this.$store);
  }
})
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
