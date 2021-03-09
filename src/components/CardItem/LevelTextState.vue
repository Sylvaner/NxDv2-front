<template>
  <p v-if="label !== ''">{{ label }}</p>
  <p>{{ showState }}<span v-if="unit !== ''"> {{ unit }}</span></p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LevelTextState',
  props: {
    label: {
      type: String,
      required: false,
      default: ''
    },
    state: {
      type: Object,
      required: true
    },
    unit: {
      type: String,
      required: false
    }
  },
  computed: {
    showState(): string {
      return this.$store.getters.deviceState(this.state.deviceId, this.state.capability);
    }
  }
});
</script>
