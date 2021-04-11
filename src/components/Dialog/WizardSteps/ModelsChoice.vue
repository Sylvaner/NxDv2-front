<template>
  <DataView :value="models" layout="grid">
    <template #grid="slotProps">
      <div style="padding: .5em" class="p-col-12 p-md-4">
        <DeviceCard :template="slotProps.data.template" />
      </div>
    </template>
  </DataView>
</template>

<script>
import DeviceCard from '../../DeviceCard.vue';
import DataView from 'primevue/dataview';

const models = [
  {
    name: 'Lumière simple',
    template: {
      id: 'test-device',
      card: {},
      devices: ['test-device'],
      items: [
        { type: 'Title', props: {title: 'Lumière simple' }},
        { type: 'ToggleStateIcon', props: {label: 'My state', state: {deviceId: 'test-device', capability: 'on'}, onIcon: 'pi pi-check', offIcon: 'pi pi-times'}}
      ]
    }
  },
  {
    name: 'Lumière variable',
    template: {
      id: 'test-device',
      card: {},
      devices: [''],
      items: [
        { type: 'Title', props: {title: 'Lumière variable' }},
        { type: 'ToggleStateIcon', props: {label: 'My state', state: {deviceId: 'test-device', capability: 'on'}, onIcon: 'pi pi-check', offIcon: 'pi pi-times'}},
        { type: 'KnobState', props: {min: 0, max: 255, state: {deviceId: 'test-device', capability: 'integer'}}}
      ]
    }
  }
];
export default {
  name: "ModelsChoice",
  components: {
    DeviceCard,
    DataView
  },
  data: () => {
    return {
      models: models,
      test: [
        { label: 'coucou', data: 'test'},
        { label: 'mouah', data: 'pouah'},
        { label: 'ppp', data: 'aodsqkdp'},
        { label: 'bof', data: 'podkqspdok'}
      ]
    }
  },
  created() {
    this.$store.commit('updateDeviceStates', {
      deviceId: 'test-device',
      states: {
        'on': true,
        'integer': 128
      }
    })
    console.log(this.models);
  }
}
</script>

<style>

</style>