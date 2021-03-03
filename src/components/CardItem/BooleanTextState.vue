<template>
  <p v-if="showLabel">
    {{ label }}
  </p>
  <p>{{ showState }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'BooleanTextState',
  props: {
    showLabel: {
      type: Boolean,
      required: true
    },
    label: {
      type: String,
      required: false,
      default: ''
    },
    value: {
      type: Boolean,
      required: true
    },
    on: {
      type: String,
      required: false,
      default: 'on'
    },
    off: {
      type: String,
      required: false,
      default: 'off'
    }
  },
  computed: {
    showState(): string {
      return this.value ? this.on : this.off;
    }
  }
});
</script>
