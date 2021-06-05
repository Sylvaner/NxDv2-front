<template>
  <RendersList v-model="selectedRender" />
  <!--
  <DeviceCard v-for="card in $store.getters.renderCards()" :key="card.id" :template="card"></DeviceCard>
  -->
  <div class="section p-grid  p-jc-center">
    <div class="p-col-3">
    <Button label="Ajouter un rendu" @click="showRenderWizard = true" icon="pi pi-plus"></Button>
    </div>
  </div>
  <AddRender v-model="showRenderWizard" />
</template>

<script lang="ts">
import DeviceCard from './DeviceCard.vue';
import { CardTemplate } from '../types';
import { defineComponent } from 'vue';
import StateUpdater from '../services/StateUpdater';
import RendersList from "./RenderHelpers/RendersList.vue";
import AddRender from './Dialog/AddRender.vue';
import Button from 'primevue/button';

export default defineComponent({
  name: 'Render',
  components: {
    Button,
    RendersList,
    DeviceCard,
    AddRender
  },
  data() : {
    selectedRender: number,
    showRenderWizard: boolean,
    cards: CardTemplate[]
  } {
    return {
      selectedRender: -1,
      showRenderWizard: false,
      cards: []
    }
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
