<template>
  <Card :template="templates[0]"></Card>
</template>

<script lang="ts">
import Card from './Card.vue';
import { ref, defineComponent } from 'vue'
import StateUpdater from '../services/StateUpdater';

export default defineComponent({
  name: 'HelloWorld',
  components: {
    Card
  },
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  data: () => {
    return {
      templates: [
        {
          id: 'a-test-id',
          items: [
            { type: 'Title', props: {title: 'Mon titre' }},
            { type: 'BooleanTextState', props: {label: 'My state', onLabel: 'On', offLabel: 'Off', state: {deviceId: 'lights-2', capability: 'on'}}},
            { type: 'ToggleStateIcon', props: {label: 'My state', onIcon: 'On', offIcon: 'Off', state: {deviceId: 'lights-2', capability: 'on'}, setOn: {deviceId: 'lights-2', capability: 'on', targetValue: true}, setOff: {deviceId: 'lights-2', capability: 'on', targetValue: false}}},
            { type: 'ActionButton', props: {label: 'On', action: {deviceId: 'lights-2', capability: 'on', targetValue: true}}},
            { type: 'ActionButton', props: {label: 'Off', action: {deviceId: 'lights-2', capability: 'on', targetValue: false}}},
            { type: 'LevelTextState', props: {label: 'Brightness', state: {deviceId: 'lights-2', capability: 'bri'}}},
            { type: 'SliderState', props: {label: 'Brightness: ', min: 0, max: 255, state: {deviceId: 'lights-2', capability: 'bri'}}}
          ]
        }
      ]
    }
  },
  mounted() {
    this.$store.commit('addDevice', {
      deviceId: 'lights-2'
    });
    const stateUpdater = new StateUpdater();
    stateUpdater.start();
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
