<template>
  <p v-if="showLabel">
    {{ label }}
  </p>
  <p>{{ showState }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { store } from '../../store/index';
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
    state: {
      type: Object,
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
      return this.$store.getters.deviceState(this.state.deviceId, this.state.capabilityName) ? this.on : this.off;
    }
  }
});
</script>
