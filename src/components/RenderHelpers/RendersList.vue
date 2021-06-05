<template>
  <DataView :value="$store.getters.renders()">
    <template #list="slotProps">
        <div class="p-col-6 render-item">
          <Card>
            <template #title>
              {{slotProps.data.name}}
            </template>
            <template #content>
              {{ slotProps.data.cards.length }} carte{{ slotProps.data.cards.length > 1 ? 's' : '' }}
            </template>
            <template #footer>
              <Button icon="pi pi-pencil" label="Modifier" @click="loadRender(slotProps.data)"></Button>
              <Button icon="pi pi-eye" label="Afficher" class="p-button-secondary" style="margin-left: .5em" />
            </template>
          </Card>
        </div>
    </template>
  </DataView>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataView from 'primevue/dataview';
import NextDomApi from "../../services/NextDomApi";
import Button from 'primevue/button';
import Card from 'primevue/card';

export default defineComponent({
  name: 'RendersList',
  components: {
    Button,
    Card,
    DataView
  },
  created() {
    this.updateRenders()
  },
  methods: {
    updateRenders() {
      NextDomApi.getRenders().then((renders) => {
        this.$store.commit('updateRenders', renders);
      });
    },
    loadRender(renderData: any) {
      this.$router.push('/rendereditor/' + renderData._id);
    }
  }
});
</script>

<style scoped>
.render-item {
  margin: 0.5rem 0;
}
</style>