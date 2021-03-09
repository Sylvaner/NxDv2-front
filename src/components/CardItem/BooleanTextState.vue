<template>
  <p v-if="label !== ''">
    {{ label }}
  </p>
  <p>{{ showState }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BooleanTextState',
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
    onLabel: {
      type: String,
      required: false,
      default: 'on'
    },
    offLabel: {
      type: String,
      required: false,
      default: 'off'
    }
  },
  computed: {
    showState(): string {
      return this.$store.getters.deviceState(this.state.deviceId, this.state.capability) ? this.onLabel : this.offLabel;
    }
  }
});
</script>
