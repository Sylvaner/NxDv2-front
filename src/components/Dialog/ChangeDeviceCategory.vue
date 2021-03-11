<template>
  <Dialog header="Change device category" v-model:visible="showed">
    Coucou
  </Dialog>
</template>

<script lang="ts">
import mitt from 'mitt';
import { defineComponent } from 'vue'
import Dialog from 'primevue/dialog';

export default defineComponent({
  name: 'ChangeDeviceCategory',
  components: {
    Dialog
  },
  data: () => {
    return {
      showed: false
    }
  },
  mounted() {
    this.eventBus.on('showChangeDeviceCategoryDialog', e => { console.log(e) });
  },
  methods: {
    showDialog(data: any) {
      console.log(data);
    }
  }
})
</script>

<style>
</style>