<template>
  <h4 v-if="label !== ''">{{ label }}</h4>
  <i :class="['device-state-icon', showStateIcon]" @click="toggle"></i>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseState from './BaseState';

export default defineComponent({
  name: 'ToggleStateIcon',
  mixins: [BaseState],
  props: {
    onIcon: {
      type: String,
      required: false,
      default: 'on'
    },
    offIcon: {
      type: String,
      required: false,
      default: 'off'
    },
    label: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    showStateIcon(): string {
      return this.stateValue ? this.onIcon : this.offIcon;
    }
  }
});
</script>

<style>
i.device-state-icon {
  display: block;
  text-align: center;
  font-size: 2rem;
  margin: 0.5rem 0;
}
</style>
