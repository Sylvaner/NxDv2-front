<template>
  <Card>
    <template #title>{{ device.name }}</template>
    <template #content>
      Capacités : {{ Object.keys(device.capabilities).join(', ') }}
    </template>
  </Card>
</template>

<script>
import Card from 'primevue/card';

export default ({
  name: 'UnknownTile',
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
