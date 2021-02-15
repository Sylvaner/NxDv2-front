<template>
  <Card>
    <template #title>{{ device.name }}</template>
    <template #content>
      Capacités : {{ Object.keys(device.capabilities).join(', ') }}
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "primevue/card";

export default defineComponent({
  name: "UnknownTile",
  components: {
    Card
  },
  props: {
    device: {
      type: Object
    }
  }
});
</script>
