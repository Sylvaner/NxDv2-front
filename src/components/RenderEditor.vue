<template>
  <DeviceCard v-for="card in $store.getters.renderCards()" :key="card.id" :template="card"></DeviceCard>
  <AddDeviceCardWizard />
</template>

<script lang="ts">
import DeviceCard from './DeviceCard.vue';
import { CardTemplate } from '../types';
import { defineComponent } from 'vue';
import AddDeviceCardWizard from './Dialog/AddDeviceCardWizard.vue';
import StateUpdater from '../services/StateUpdater';
import NextDomApi from '../services/NextDomApi';

export default defineComponent({
  name: 'RenderEditor',
  components: {
    AddDeviceCardWizard,
    DeviceCard
  },
  created() {
    NextDomApi.getRender(this.$route.params.id).then((renderData) => {
      for (const card in renderData.cards) {
          this.$store.commit('addRenderCard', card);
      }
    });
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
